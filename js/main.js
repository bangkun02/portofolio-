/* =========================================================
   Render isi dari data.js + semua animasi (GSAP + ScrollTrigger + Lenis).
   Untuk mengganti isi, edit data.js — file ini tidak perlu diubah.
   ========================================================= */
(function () {
  'use strict';
  const D = window.PORTFOLIO || {};
  const P = D.portfolio || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const FALLBACK = 'assets/placeholder/placeholder-1.svg';

  /* ---------- Ikon (gaya garis) ---------- */
  const ICONS = {
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowDR: '<path d="m7 7 10 10"/><path d="M17 7v10H7"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    tiktok: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'
  };
  const icon = (n) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.globe}</svg>`;
  const initials = (s) => String(s || '?').split(/\s+/).filter((w) => /^[\p{L}\p{N}]/u.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '•';

  // Gambar yang gagal dimuat → diganti placeholder
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = FALLBACK; }
  }, true);

  // kategori yang daftarnya kosong di data.js tidak ditampilkan (Projects selalu tampil)
  const CATS = [
    { key: 'projects', label: 'Projects', icon: 'code' },
    { key: 'certificates', label: 'Certificates', icon: 'award' },
    { key: 'awards', label: 'Awards', icon: 'trophy' }
  ].filter((c) => c.key === 'projects' || (P[c.key] || []).length);

  /* =========================================================
     RENDER
     ========================================================= */
  const name = D.name || {};
  const fullName = [name.first, name.last].filter(Boolean).join(' ') || 'Nama Kamu';

  function render() {
    document.title = (D.meta && D.meta.title) || `${fullName} | Portofolio`;
    const md = $('meta[name="description"]');
    if (md) md.content = (D.meta && D.meta.description) || D.about || '';
    if (D.accent) {
      document.documentElement.style.setProperty('--accent', D.accent);
      document.documentElement.style.setProperty('--accent-2', D.accent);
    }

    $('#loaderName').textContent = fullName;
    const hero = D.hero || {};
    $('#heroSmall').textContent = hero.small ?? 'WELCOME TO MY';
    $('#heroBig').textContent = hero.big ?? 'PORTOFOLIO';
    $('#heroPerson').src = hero.person || 'assets/hero/orang.svg';
    $('#heroPerson').alt = '';
    $('.l-person').classList.toggle('half', hero.personMode === 'half');
    $('.l-person').classList.toggle('half-big', hero.personMode === 'half-big');
    if (hero.personSize) document.documentElement.style.setProperty('--person-half-h', hero.personSize + 'vh');
    if (hero.personX != null) $('#heroPerson').style.left = hero.personX + '%';
    if (hero.photo && window.Hero3D && Hero3D.mount($('.l-sky'), hero.photo)) $('#heroSky').remove();
    else $('#heroSky').src = hero.photo || hero.sky || 'assets/hero/langit-kota.svg';
    $('#heroScene').src = hero.scene || 'assets/hero/kota.svg';
    $('#heroFront').src = hero.front || 'assets/hero/depan-kota.svg';

    // About
    $('#greeting').textContent = D.greeting || "Hi, I'm";
    $('#nameFirst').textContent = name.first || '';
    $('#nameLast').textContent = name.last || '';
    if (D.role) $('#role').textContent = D.role; else $('#role').remove();
    $('#photoBase').src = D.photo || 'assets/foto-profil.svg';
    $('#photoBase').alt = `Foto ${fullName}`;
    $('#photoColor').src = D.photoHover || D.photo || 'assets/foto-profil.svg';
    $('#aboutPhoto').classList.toggle('has-alt', !!D.photoHover);
    $('#aboutText').textContent = D.about || '';
    const cv = $('#cvBtn');
    if (D.cv) { cv.href = D.cv; cv.innerHTML = `${icon('file')}<span>View CV</span>`; } else cv.remove();
    $('#projBtn').innerHTML = `${icon('code')}<span>View Projects</span>`;

    const tlItem = (it, i) => `
      <li class="tl-item">
        <span class="tl-num">${i + 1}</span>
        <div class="tl-body">
          <div class="tl-top">
            ${it.logo ? `<img class="tl-logo" src="${esc(it.logo)}" alt="" loading="lazy">` : `<span class="tl-logo tl-initial">${esc(initials(it.place))}</span>`}
            <span class="tl-place">${esc(it.place)}</span>
            ${it.period ? `<span class="chip">${esc(it.period)}</span>` : ''}
          </div>
          <h4 class="tl-title">${esc(it.title)}</h4>
          <p class="tl-meta">${esc(it.subtitle)}${it.tag ? `<span>•</span><span class="tag">${esc(it.tag)}</span>` : ''}</p>
        </div>
      </li>`;
    $('#eduList').innerHTML = (D.education || []).map(tlItem).join('');
    $('#expList').innerHTML = (D.experience || []).map(tlItem).join('');

    // Keahlian
    const S = D.skills || [];
    $('#skills').innerHTML = S.length ? `<h3 class="tl-head reveal">Keahlian</h3><div class="skill-grid">${S.map((g) =>
      `<div class="skill-card reveal"><h4>${esc(g.group)}</h4><div class="chips">${(g.items || []).map((s) => `<span class="skill">${esc(s)}</span>`).join('')}</div></div>`).join('')}</div>` : '';

    $('#folders').style.setProperty('--folder-cols', CATS.length);
    $('#folders').innerHTML = CATS.map((c) => {
      const list = P[c.key] || [];
      const imgs = list.slice(0, 3).map((x) => `<img src="${esc(x.image)}" alt="" loading="lazy">`).join('');
      return `<button class="folder" type="button" data-goto="${c.key}" aria-label="Lihat ${c.label}">
        <span class="folder-back"></span>
        <span class="folder-papers">${imgs}</span>
        <span class="folder-front">
          <span class="folder-count"><b data-count="${list.length}">${list.length}</b><em>${c.label}</em></span>
          <span class="folder-more">${icon('more')}</span>
        </span>
      </button>`;
    }).join('');

    // Portfolio
    $('#pfBig').textContent = D.portfolioTitle || 'PORTOFOLIO';
    $('#pfArrow').innerHTML = icon('arrowDR');
    $('#tabs').style.gridTemplateColumns = `repeat(${CATS.length}, 1fr)`;
    $('#tabs').style.maxWidth = 240 * CATS.length + 'px';
    $('#tabs').innerHTML = '<span class="tab-ind" id="tabInd"></span>' + CATS.map((c, i) =>
      `<button class="tab${i === 0 ? ' active' : ''}" type="button" role="tab" aria-selected="${i === 0}" data-tab="${c.key}">${icon(c.icon)}<span>${c.label}</span></button>`).join('');
    $('#carPrev').innerHTML = icon('left');
    $('#carNext').innerHTML = icon('right');

    if (!(D.gallery || []).length) $('#galleryWrap').remove();
    else $('#gallery').innerHTML = (D.gallery || []).map((g, i) =>
      `<figure class="g-item" data-i="${i}"><div class="g-inner"><img src="${esc(g.image)}" alt="${esc(g.caption || 'Foto galeri')}" draggable="false" loading="lazy">${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</div></figure>`).join('');

    // Contact
    const C = D.contact || {};
    $('#contactTitle').textContent = C.title || 'Hubungi Saya';
    $('#contactText').textContent = C.text || '';
    $$('.field-ic').forEach((s) => (s.innerHTML = icon(s.dataset.icon)));
    $('#sendBtn').innerHTML = `${icon('send')}<span>Kirim Pesan</span>`;
    $('#socialList').innerHTML = (D.socials || []).map((s) =>
      `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener">
        <span class="social-ic">${icon(s.icon)}</span>
        <span class="social-txt"><b>${esc(s.label)}</b><small>${esc(s.handle)}</small></span>
        ${icon('external')}
      </a>`).join('');

    $('#footer').textContent = D.footer || `© ${new Date().getFullYear()} ${fullName}. All rights reserved.`;
    $('#modalClose').innerHTML = icon('close');

    // Kunang-kunang di hero
    const ff = $('#fireflies');
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('span');
      s.style.left = (8 + Math.random() * 84) + '%';
      s.style.top = (45 + Math.random() * 45) + '%';
      s.style.setProperty('--d', (5 + Math.random() * 6).toFixed(1) + 's');
      s.style.setProperty('--delay', (-Math.random() * 8).toFixed(1) + 's');
      s.style.setProperty('--mx', ((Math.random() - .5) * 80).toFixed(0) + 'px');
      s.style.setProperty('--my', (-20 - Math.random() * 60).toFixed(0) + 'px');
      ff.appendChild(s);
    }
  }

  /* ---------- Kartu carousel ---------- */
  const track = $('#track');
  let currentTab = 'projects';
  function renderCards(key, animate) {
    currentTab = key;
    const list = P[key] || [];
    track.innerHTML = list.length ? list.map((x, i) => `
      <article class="pcard">
        <div class="pcard-img"><img src="${esc(x.image)}" alt="${esc(x.title)}" loading="lazy" draggable="false"></div>
        <div class="pcard-body">
          <h4>${esc(x.title)}</h4>
          <p>${esc(x.description)}</p>
          <button class="btn btn-sm" type="button" data-open="${key}:${i}">Details ${icon('arrow')}</button>
        </div>
      </article>`).join('') : '<p class="empty">Belum ada item di kategori ini.</p>';
    track.scrollLeft = 0;
    if (animate && window.gsap) gsap.fromTo($$('.pcard', track), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', clearProps: 'transform' });
    updateCarBtns();
  }
  function updateCarBtns() {
    const max = track.scrollWidth - track.clientWidth - 4;
    $('#carPrev').disabled = track.scrollLeft <= 4;
    $('#carNext').disabled = track.scrollLeft >= max;
  }
  function moveTabInd() {
    const a = $('.tab.active'), ind = $('#tabInd');
    if (!a || !ind) return;
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
  }
  function setTab(key, animate) {
    $$('.tab').forEach((t) => { const on = t.dataset.tab === key; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
    moveTabInd();
    renderCards(key, animate);
  }

  /* ---------- Teks split per huruf ---------- */
  function split(el, clip = true) {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(' ').forEach((word, wi, arr) => {
      const w = document.createElement('span');
      w.className = clip ? 'w' : '';
      w.style.display = 'inline-block';
      w.setAttribute('aria-hidden', 'true');
      for (const ch of word) { const c = document.createElement('span'); c.className = 'ch'; c.textContent = ch; w.appendChild(c); }
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return $$('.ch', el);
  }

  /* ---------- Galeri: tata letak acak + drag ---------- */
  function seeded(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
  function layoutGallery() {
    const g = $('#gallery');
    if (!g) return; // galeri kosong → bagiannya sudah dihapus
    const items = $$('.g-item', g);
    if (!items.length) return;
    const W = g.clientWidth;
    const cols = W < 560 ? 2 : W < 960 ? 3 : 4;
    const cellW = W / cols;
    const itemW = Math.min(250, cellW * 0.84);
    const cellH = itemW * 1.2;
    const rows = Math.ceil(items.length / cols);
    g.style.height = rows * cellH + 70 + 'px';
    items.forEach((el, i) => {
      const r = seeded(i + 3), c = i % cols, row = Math.floor(i / cols);
      const left = Math.max(0, Math.min(W - itemW, c * cellW + (cellW - itemW) / 2 + (r() - 0.5) * cellW * 0.3));
      el.style.width = itemW + 'px';
      el.style.left = left + 'px';
      el.style.top = row * cellH + 20 + (r() - 0.5) * cellH * 0.25 + 'px';
      el.style.setProperty('--rot', ((r() - 0.5) * 18).toFixed(1) + 'deg');
    });
  }
  let zTop = 10;
  function makeDraggable(el) {
    let sx = 0, sy = 0, ox = 0, oy = 0, on = false;
    el.addEventListener('pointerdown', (e) => {
      on = true; sx = e.clientX; sy = e.clientY;
      el.setPointerCapture(e.pointerId); el.style.zIndex = ++zTop; el.classList.add('dragging');
    });
    el.addEventListener('pointermove', (e) => {
      if (!on) return;
      el.style.setProperty('--dx', ox + e.clientX - sx + 'px');
      el.style.setProperty('--dy', oy + e.clientY - sy + 'px');
    });
    const end = (e) => { if (!on) return; on = false; ox += e.clientX - sx; oy += e.clientY - sy; el.classList.remove('dragging'); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  /* ---------- Posisi tanah di hero (supaya kaki pas di punggung bukit) ---------- */
  // jarak pijakan dari bawah gambar scene (viewBox 1600×900); bisa diatur di data.js → hero.ground
  const GROUND_UNITS = +((D.hero && D.hero.ground) || 263);
  function computeGround() {
    const box = $('#heroSticky');
    const W = box.clientWidth, H = box.clientHeight;
    const s = Math.max((1.06 * W) / 1600, (1.06 * H) / 900);
    document.documentElement.style.setProperty('--ground', GROUND_UNITS * s - 0.03 * H + 'px');
  }

  /* ---------- Modal ---------- */
  let lenis = null;
  const modal = $('#modal');
  let lastFocus = null;
  function openModal(key, i) {
    const x = (P[key] || [])[i];
    if (!x) return;
    lastFocus = document.activeElement;
    $('#modalImg').src = x.image || FALLBACK;
    $('#modalImg').alt = x.title || '';
    const cat = CATS.find((c) => c.key === key);
    $('#modalMeta').textContent = [cat && cat.label, x.date].filter(Boolean).join(' • ');
    $('#modalTitle').textContent = x.title || '';
    $('#modalDesc').textContent = x.description || '';
    $('#modalTags').innerHTML = (x.tags || []).map((t) => `<span>${esc(t)}</span>`).join('');
    $('#modalLinks').innerHTML = (x.links || []).filter((l) => l.url).map((l) =>
      `<a class="btn btn-sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon('external')}</a>`).join('');
    modal.hidden = false;
    if (lenis) lenis.stop();
    $('#modalClose').focus();
    if (window.gsap) {
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('.modal-card', { y: 40, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' });
    }
  }
  function closeModal() {
    if (modal.hidden) return;
    const done = () => { modal.hidden = true; if (lenis) lenis.start(); if (lastFocus) lastFocus.focus(); };
    if (window.gsap) gsap.to(modal, { opacity: 0, duration: 0.25, onComplete: done }); else done();
  }

  /* ---------- Navbar ---------- */
  function moveIndicator(a, hop) {
    const ind = $('#navIndicator'), m = $('#mascot');
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
    m.style.transform = `translateX(${a.offsetLeft + a.offsetWidth / 2}px)`;
    if (hop && window.gsap) gsap.fromTo('.mascot-face', { y: 0 }, { y: -10, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out' });
  }
  function setActive(id) {
    const a = $(`[data-nav="${id}"]`);
    if (!a || a.classList.contains('active')) return;
    $$('[data-nav]').forEach((x) => x.classList.toggle('active', x === a));
    moveIndicator(a, true);
  }

  let isLight = false;
  function setLight(on) {
    if (on === isLight) return;
    isLight = on;
    document.documentElement.classList.toggle('light', on);
    window.Topo && Topo.setTheme(on);
  }

  function scrollToTarget(sel) {
    const el = $(sel);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  /* =========================================================
     INTERAKSI (tetap jalan walau GSAP gagal dimuat)
     ========================================================= */
  function bindUI() {
    $$('[data-nav]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollToTarget(a.getAttribute('href')); }));
    $$('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollToTarget(a.getAttribute('href')); }));
    $$('.folder').forEach((f) => f.addEventListener('click', () => { setTab(f.dataset.goto, true); scrollToTarget('#pfContent'); }));
    $('#tabs').addEventListener('click', (e) => { const t = e.target.closest('.tab'); if (t && !t.classList.contains('active')) setTab(t.dataset.tab, true); });

    const step = () => { const c = $('.pcard', track); return c ? c.offsetWidth + 24 : 300; };
    $('#carPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('#carNext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', updateCarBtns, { passive: true });
    track.addEventListener('click', (e) => {
      const b = e.target.closest('[data-open]');
      if (b && !track.dataset.moved) { const [k, i] = b.dataset.open.split(':'); openModal(k, +i); }
    });
    // drag-to-scroll carousel pakai mouse
    if (finePointer) {
      let down = false, sx = 0, sl = 0;
      track.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.target.closest('button')) return; down = true; sx = e.clientX; sl = track.scrollLeft; delete track.dataset.moved; });
      addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 5) { track.classList.add('dragging'); track.dataset.moved = '1'; }
        track.scrollLeft = sl - dx;
      });
      addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('dragging'); setTimeout(() => delete track.dataset.moved, 0); });
    }

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    $('#modalClose').addEventListener('click', closeModal);
    addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    $('#contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target), C = D.contact || {};
      const nm = f.get('name'), em = f.get('email'), msg = f.get('message');
      const body = `Halo, saya ${nm} (${em}).\n\n${msg}`;
      if (C.formMode === 'whatsapp' && C.whatsapp) {
        window.open(`https://wa.me/${String(C.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
      } else {
        location.href = `mailto:${C.email || ''}?subject=${encodeURIComponent('Pesan dari portofolio — ' + nm)}&body=${encodeURIComponent(body)}`;
      }
    });

    // Spotlight foto About
    const ph = $('#aboutPhoto'), color = $('#photoColor');
    const st = { r: 0 };
    // variabel posisi/ukuran lingkaran dipasang di wadah, dipakai oleh kedua lapisan foto
    const apply = () => ph.style.setProperty('--r', st.r.toFixed(1) + 'px');
    ph.addEventListener('pointermove', (e) => {
      const b = ph.getBoundingClientRect();
      ph.style.setProperty('--x', e.clientX - b.left + 'px');
      ph.style.setProperty('--y', e.clientY - b.top + 'px');
    });
    if (window.gsap) {
      const R = D.photoHover ? 170 : 150;
      ph.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') gsap.to(st, { r: R, duration: 0.5, ease: 'power3.out', onUpdate: apply }); });
      ph.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') gsap.to(st, { r: 0, duration: 0.5, ease: 'power3.in', onUpdate: apply }); });
      // HP/tablet: ketuk foto untuk membuka/menutup versi kedua (lingkaran membesar dari titik ketukan)
      ph.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' || !D.photoHover) return;
        gsap.to(st, { r: st.r > 10 ? 0 : ph.offsetHeight * 1.5, duration: 0.8, ease: 'power3.inOut', onUpdate: apply });
      });
    }

    // Mata maskot mengikuti kursor
    const eyes = $('.eyes'), mascot = $('#mascot');
    addEventListener('pointermove', (e) => {
      const b = mascot.getBoundingClientRect();
      const a = Math.atan2(e.clientY - (b.top + 14), e.clientX - b.left);
      eyes.style.transform = `translate(${(Math.cos(a) * 2.2).toFixed(2)}px, ${(Math.sin(a) * 2).toFixed(2)}px)`;
    }, { passive: true });

    // Galeri
    layoutGallery();
    if (finePointer) $$('.g-item').forEach(makeDraggable);
    $$('.g-item').forEach((el) => el.addEventListener('pointerdown', () => (el.style.zIndex = ++zTop)));

    computeGround();
    moveIndicator($('[data-nav].active'), false);
    setTab('projects', false);

    let rt;
    addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        computeGround(); layoutGallery(); moveTabInd(); updateCarBtns();
        moveIndicator($('[data-nav].active'), false);
        window.ScrollTrigger && ScrollTrigger.refresh();
      }, 150);
    });
  }

  /* =========================================================
     ANIMASI
     ========================================================= */
  function initMotion() {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll (Lenis) disinkronkan dengan ScrollTrigger
    if (!reduce && window.Lenis) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
    }

    // Topo canvas tidak perlu digambar selama hero menutupi layar
    const heroEl = $('#home');
    window.Topo && Topo.setSkip(() => scrollY < heroEl.offsetHeight - innerHeight - 2);

    /* ---- 1. HERO: kamera "maju" menembus hutan ---- */
    gsap.timeline({ scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
      .to('.l-forest', { scale: 2.8, ease: 'power2.in', duration: 1 }, 0)
      .to('.l-sky', { scale: 1.15, duration: 1, ease: 'none' }, 0)
      .to('.l-mountain', { scale: 1.35, duration: 1, ease: 'none' }, 0)
      .to('.l-person', { scale: 1.35, duration: 1, ease: 'none' }, 0)
      .to('.l-title', { scale: 1.15, duration: 1, ease: 'none' }, 0)
      .fromTo('.hero-title', { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.18)
      .to('.scroll-hint', { opacity: 0, duration: 0.1 }, 0)
      .to('.hero-fade', { opacity: 1, duration: 0.28, ease: 'none' }, 0.72);

    // Parallax mengikuti mouse (lapisan dekat bergerak lebih jauh)
    gsap.set('#heroPerson', { xPercent: -50 });
    if (finePointer && !reduce) {
      // (foto 3D sudah punya parallax sendiri di shader, jadi #heroSky hanya ada di tema SVG)
      const L = [['#heroSky', 8, true], ['.hero-title', 14], ['.l-mountain > img', 16], ['#heroPerson', 20], ['.l-forest > img', 42, true]]
        .filter(([s]) => $(s))
        .map(([s, d, y]) => ({ d, x: gsap.quickTo(s, 'x', { duration: 1.2, ease: 'power3' }), y: y ? gsap.quickTo(s, 'y', { duration: 1.2, ease: 'power3' }) : null }));
      heroEl.addEventListener('pointermove', (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        L.forEach((l) => { l.x(-nx * l.d); if (l.y) l.y(-ny * l.d * 0.5); });
      });
    }

    /* ---- 2. ABOUT ---- */
    gsap.from(split($('#aboutTitle')), { yPercent: 110, stagger: 0.04, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '#aboutTitle', start: 'top 85%' } });

    const nameChars = [...split($('#nameFirst')), ...split($('#nameLast'))];
    gsap.timeline({ scrollTrigger: { trigger: '#aboutGrid', start: 'top 72%' } })
      .from('#greeting', { x: -40, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from(nameChars, { yPercent: 110, stagger: 0.025, duration: 0.8, ease: 'power4.out' }, '-=0.4')
      .from('#aboutPhoto', { y: 120, opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out' }, 0);
    gsap.to('#aboutPhoto', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '#aboutGrid', start: 'top bottom', end: 'bottom top', scrub: true } });

    $$('.reveal').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

    // Timeline: garis "tergambar" saat di-scroll, item muncul bergantian
    $$('.tl-wrap').forEach((w) => {
      gsap.fromTo($('.tl-line', w), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top 75%', end: 'bottom 60%', scrub: true } });
      gsap.from($$('.tl-item', w), { x: -40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: w, start: 'top 80%' } });
    });

    // Folder + angka menghitung naik
    gsap.from('.folder', { y: 80, opacity: 0, rotateX: -20, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#folders', start: 'top 85%' } });
    $$('.folder b[data-count]').forEach((b) => {
      const n = +b.dataset.count, o = { v: 0 };
      b.textContent = '0';
      gsap.to(o, { v: n, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: b, start: 'top 92%' }, onUpdate: () => (b.textContent = Math.round(o.v)) });
    });

    /* ---- 3. PORTFOLIO: teks raksasa → zoom menembus huruf O → dunia terang ---- */
    const big = $('#pfBig');
    const bigChars = split(big, false);
    const target = bigChars.find((c) => /o/i.test(c.textContent)) || bigChars[Math.floor(bigChars.length / 2)];
    // Titik zoom = tengah huruf "O" pertama; sekaligus digeser ke tengah layar
    const O = { x: 0, y: 0 };
    const setOrigin = () => {
      // offsetParent huruf = #pfBig (position: relative), jadi offset sudah relatif ke judul
      O.x = target.offsetLeft + target.offsetWidth / 2;
      O.y = target.offsetTop + target.offsetHeight * 0.52;
      big.style.transformOrigin = `${O.x}px ${O.y}px`;
    };
    setOrigin();
    ScrollTrigger.addEventListener('refreshInit', setOrigin);
    const LIGHT_AT = 0.74;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#pfIntro', start: 'top 65%', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (s) => setLight(s.progress > LIGHT_AT),
        onRefresh: (s) => setLight(s.progress > LIGHT_AT)
      }
    })
      .fromTo(bigChars, { yPercent: 120, opacity: 0, rotate: 10 }, { yPercent: 0, opacity: 1, rotate: 0, stagger: 0.02, duration: 0.2, ease: 'power3.out' }, 0)
      .to(big, { scale: 45, duration: 0.6, ease: 'power3.in' }, 0.3)
      .to(big, { x: () => big.offsetWidth / 2 - O.x, y: () => big.offsetHeight / 2 - O.y, duration: 0.45, ease: 'power2.inOut' }, 0.3)
      .fromTo('#pfReveal', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 0.26, ease: 'power2.in' }, 0.5)
      .to(big, { opacity: 0, duration: 0.06 }, 0.86)
      .to('#pfReveal', { opacity: 0, duration: 0.08 }, 0.92);

    gsap.from(split($('#pfTitle')), { yPercent: 110, stagger: 0.04, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: '#pfTitle', start: 'top 88%' } });
    gsap.from('#pfArrow', { x: -30, y: -30, opacity: 0, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: '#pfTitle', start: 'top 88%' } });
    gsap.from('#tabs', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#tabs', start: 'top 90%' } });
    gsap.from('.carousel', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.carousel', start: 'top 90%' } });

    // Galeri: foto "dilempar" ke meja saat di-scroll (hanya jika galeri diisi)
    if ($('#gallery')) {
      gsap.from(split($('#galleryTitle')), { yPercent: 110, stagger: 0.04, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: '#galleryTitle', start: 'top 88%' } });
      gsap.from('.g-inner', {
        y: () => innerHeight * 0.45, rotate: (i) => (i % 2 ? 1 : -1) * 28, opacity: 0, scale: 0.7, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '#gallery', start: 'top 92%', end: 'top 30%', scrub: 1 }
      });
    }

    /* ---- 4. CONTACT ---- */
    gsap.from(split($('#contactTitle')), { yPercent: 110, stagger: 0.035, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '#contactTitle', start: 'top 88%' } });
    gsap.from('.social', { x: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '#socialList', start: 'top 88%' } });

    /* ---- Navbar aktif per section ---- */
    ['home', 'about', 'portfolio', 'contact'].forEach((id) =>
      ScrollTrigger.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => s.isActive && setActive(id) }));

    /* ---- Kursor lingkaran ---- */
    if (finePointer && !reduce) {
      document.body.classList.add('has-cursor');
      const ring = $('.cursor-ring');
      const xr = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' }), yr = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });
      addEventListener('pointermove', (e) => { xr(e.clientX); yr(e.clientY); }, { passive: true });
      document.addEventListener('pointerover', (e) => {
        document.body.classList.toggle('cursor-hover', !!e.target.closest('a, button, .g-item'));
        document.body.classList.toggle('cursor-hide', !!e.target.closest('#aboutPhoto'));
      });
    }

    addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ---------- Loader → intro hero ---------- */
  function runLoader(done) {
    const bar = $('#loaderBar'), pct = $('#loaderPct'), p = { v: 0 };
    const paint = () => { bar.style.transform = `scaleX(${p.v / 100})`; pct.textContent = Math.round(p.v) + '%'; };
    const t1 = gsap.to(p, { v: 90, duration: 2, ease: 'power2.out', onUpdate: paint });
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true; t1.kill();
      gsap.to(p, {
        v: 100, duration: 0.4, onUpdate: paint, onComplete: () => {
          gsap.to('#loader', { yPercent: -100, duration: 1, ease: 'power4.inOut', onComplete: () => $('#loader').remove() });
          done();
        }
      });
    };
    if (document.readyState === 'complete') setTimeout(finish, 400); else addEventListener('load', finish);
    setTimeout(finish, 5000);
  }

  function intro() {
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    ScrollTrigger.refresh();
    const d = 0.35;
    gsap.from('.l-forest > img', { scale: 1.35, duration: 2.4, delay: d, ease: 'power3.out' });
    gsap.from('.l-sky > *', { scale: 1.2, duration: 2.6, delay: d, ease: 'power3.out' });
    gsap.from('.l-mountain > img', { yPercent: 6, duration: 2.2, delay: d, ease: 'power3.out' });
    gsap.from('#heroPerson', { y: 80, opacity: 0, duration: 1.6, delay: d + 0.5, ease: 'power3.out' });
    gsap.from('#navWrap', { y: -100, opacity: 0, duration: 1, delay: d + 0.8, ease: 'power3.out' });
    gsap.from('.scroll-hint', { opacity: 0, y: 20, duration: 0.8, delay: d + 1.4 });
  }

  /* ---------- Mulai ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  render();
  bindUI();

  if (!window.gsap || !window.ScrollTrigger) {
    // Tanpa internet/CDN: tampilkan halaman tanpa animasi
    $('#loader').remove();
    document.body.classList.remove('is-loading');
    return;
  }
  initMotion();
  runLoader(intro);
})();
