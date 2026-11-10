/* Foto hero "3D" (2.5D) — WebGL.
   - Peta kedalaman sintetis: bagian bawah foto dianggap dekat, bagian atas (cakrawala) jauh.
   - Mouse  → parallax per kedalaman (dekat bergeser lebih jauh dari yang jauh).
   - Scroll → dolly zoom: bagian dekat membesar lebih cepat daripada bagian jauh.
   - Sedikit color grading: highlight lampu dibuat bercahaya + vignette. */
(function () {
  'use strict';

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uImg; uniform vec2 uRes; uniform vec2 uImgRes;
uniform vec2 uMouse; uniform float uScroll; uniform float uTime; uniform float uIntro;

float depthAt(vec2 uv){
  float d = smoothstep(.02, 1., uv.y);                       // bawah = dekat
  d = max(d, smoothstep(.6, 0., length((uv - vec2(0., 1.)) * vec2(1.7, 1.))));  // pohon kiri bawah
  d = max(d, smoothstep(.6, 0., length((uv - vec2(1., 1.)) * vec2(1.7, 1.))));  // pohon kanan bawah
  return d;
}
vec2 project(vec2 uv, float d){
  vec2 focus = vec2(.5, .58);
  float z = 1. + uScroll * (.10 + .5 * d) + uIntro * (.08 + .2 * d);
  uv = (uv - focus) / z + focus;
  uv += uMouse * (d - .35) * .02;
  return uv;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; uv.y = 1. - uv.y;
  float ca = uRes.x / uRes.y, ia = uImgRes.x / uImgRes.y;
  vec2 s = ca > ia ? vec2(1., ia / ca) : vec2(ca / ia, 1.);
  vec2 iuv = (uv - .5) * s / 1.08 + .5;                      // cover + ruang aman untuk parallax
  // dua langkah: kedalaman dihitung ulang di titik yang sudah digeser → lebih sedikit "melar"
  vec2 a = project(iuv, depthAt(iuv));
  vec2 b = project(iuv, depthAt(a));
  vec3 c = texture2D(uImg, clamp(b, .001, .999)).rgb;

  float l = dot(c, vec3(.299, .587, .114));
  c += c * smoothstep(.5, 1., l) * .45;                      // lampu kota bercahaya
  c = pow(c, vec3(1.05));                                    // kontras sedikit
  c *= vec3(.94, .98, 1.06);                                 // nuansa malam
  float v = smoothstep(1.15, .25, length((uv - .5) * vec2(1., .9)));
  c *= mix(.5, 1., v);
  gl_FragColor = vec4(c, 1.);
}`;

  function mount(container, src) {
    const canvas = document.createElement('canvas');
    canvas.className = 'hero3d';
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false });
    if (!gl) return false;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return false;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ['uImg', 'uRes', 'uImgRes', 'uMouse', 'uScroll', 'uTime', 'uIntro'].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

    container.appendChild(canvas);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = container.closest('section');
    const st = { mx: 0, my: 0, tx: 0, ty: 0, sc: 0, intro: reduce ? 0 : 1, ready: false, w: 1, h: 1 };

    const img = new Image();
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform1i(U.uImg, 0);
      gl.uniform2f(U.uImgRes, img.naturalWidth, img.naturalHeight);
      st.ready = true;
    };
    img.onerror = () => console.warn('Foto hero tidak ditemukan:', src);
    img.src = src;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = Math.max(1, Math.floor(container.clientWidth * dpr));
      st.h = Math.max(1, Math.floor(container.clientHeight * dpr));
      canvas.width = st.w; canvas.height = st.h; gl.viewport(0, 0, st.w, st.h);
    }
    resize(); addEventListener('resize', resize);

    if (!reduce) {
      hero.addEventListener('pointermove', (e) => {
        st.tx = (e.clientX / innerWidth - 0.5) * 2;
        st.ty = (e.clientY / innerHeight - 0.5) * 2;
      });
      // HP: miringkan perangkat untuk efek yang sama (jika diizinkan browser)
      addEventListener('deviceorientation', (e) => {
        if (e.gamma == null) return;
        st.tx = Math.max(-1, Math.min(1, e.gamma / 25));
        st.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      });
    }

    const lerp = (a, b, t) => a + (b - a) * t;
    function frame() {
      requestAnimationFrame(frame);
      if (!st.ready || document.hidden) return;
      const max = Math.max(1, hero.offsetHeight - innerHeight);
      if (scrollY > hero.offsetHeight) return; // hero sudah lewat
      st.mx = lerp(st.mx, st.tx, 0.06); st.my = lerp(st.my, st.ty, 0.06);
      st.sc = lerp(st.sc, Math.min(1, scrollY / max), 0.12);
      if (!document.body.classList.contains('is-loading')) st.intro = lerp(st.intro, 0, 0.02); // zoom pembuka setelah loader
      gl.uniform2f(U.uRes, st.w, st.h);
      gl.uniform2f(U.uMouse, st.mx, st.my);
      gl.uniform1f(U.uScroll, st.sc);
      gl.uniform1f(U.uIntro, st.intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
    return true;
  }

  window.Hero3D = { mount };
})();
