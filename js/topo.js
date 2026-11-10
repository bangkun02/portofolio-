/* Latar garis kontur (topografi) beranimasi — WebGL shader.
   Satu canvas fixed di belakang halaman, warnanya berpindah gelap ↔ terang. */
(function () {
  'use strict';
  const canvas = document.getElementById('topo');
  const noop = { setTheme() {}, setSkip() {} };
  if (!canvas) { window.Topo = noop; return; }

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' });
  if (!gl) { canvas.remove(); window.Topo = noop; return; }

  const deriv = gl.getExtension('OES_standard_derivatives');
  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = (deriv ? '#extension GL_OES_standard_derivatives : enable\n#define HAS_D\n' : '') + `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec3 uBg; uniform vec3 uLine;
uniform vec2 uMouse; uniform float uScroll; uniform float uAlpha;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec2 q = uv*1.25 + vec2(uTime*.010, uTime*.006 - uScroll*.12);
  float d = distance(uv, uMouse);
  float h = fbm(q) + .07*exp(-d*d*12.);
  float k = h*16.;
  float f = abs(fract(k-.5)-.5);
#ifdef HAS_D
  float w = fwidth(k)*1.2;
#else
  float w = .025;
#endif
  float line = 1. - smoothstep(0., w, f);
  float major = 1. - step(.5, mod(floor(k+.5), 4.));
  float a = uAlpha * mix(.6, 1.1, major) * (1. + 1.4*exp(-d*d*8.));
  gl_FragColor = vec4(mix(uBg, uLine, clamp(line*a, 0., 1.)), 1.);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) { canvas.remove(); window.Topo = noop; return; }
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  ['uRes', 'uTime', 'uBg', 'uLine', 'uMouse', 'uScroll', 'uAlpha'].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  const THEMES = {
    dark: { bg: [3, 7, 18], line: [110, 125, 150], alpha: 0.32 },
    light: { bg: [250, 250, 250], line: [150, 150, 160], alpha: 0.5 }
  };
  const norm = (t) => ({ bg: t.bg.map((v) => v / 255), line: t.line.map((v) => v / 255), alpha: t.alpha });
  let cur = norm(THEMES.dark), tgt = norm(THEMES.dark);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.floor(innerWidth * dpr); H = Math.floor(innerHeight * dpr);
    canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H);
  }
  resize(); addEventListener('resize', resize);

  const mouse = { x: 0.5 * innerWidth / innerHeight, y: 0.5, tx: 0.5 * innerWidth / innerHeight, ty: 0.5 };
  addEventListener('pointermove', (e) => { mouse.tx = e.clientX / innerHeight; mouse.ty = (innerHeight - e.clientY) / innerHeight; }, { passive: true });

  let skip = () => false;
  const start = performance.now();
  const lerp = (a, b, t) => a + (b - a) * t;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || skip()) return;
    const k = 0.08;
    for (let i = 0; i < 3; i++) { cur.bg[i] = lerp(cur.bg[i], tgt.bg[i], k); cur.line[i] = lerp(cur.line[i], tgt.line[i], k); }
    cur.alpha = lerp(cur.alpha, tgt.alpha, k);
    mouse.x = lerp(mouse.x, mouse.tx, 0.06); mouse.y = lerp(mouse.y, mouse.ty, 0.06);
    gl.uniform2f(U.uRes, W, H);
    gl.uniform1f(U.uTime, reduce ? 0 : (now - start) / 1000);
    gl.uniform3fv(U.uBg, cur.bg); gl.uniform3fv(U.uLine, cur.line); gl.uniform1f(U.uAlpha, cur.alpha);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.uniform1f(U.uScroll, scrollY / innerHeight);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  requestAnimationFrame(frame);

  window.Topo = {
    setTheme(light) { tgt = norm(light ? THEMES.light : THEMES.dark); },
    setSkip(fn) { skip = fn; }
  };
})();
