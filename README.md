# Portofolio — Muhamad Hadli Al Furqon

UI/UX Engineer | AI-Powered Web Builder · Yogyakarta, Indonesia

Website portofolio statis (HTML, CSS, dan JavaScript, tanpa proses build) dengan animasi scroll dan efek 3D.

- **Isi website** diatur dari [`data.js`](data.js): nama, pengalaman, keahlian, proyek, dan kontak.
- **Panduan edit** lengkap ada di [`PANDUAN.md`](PANDUAN.md).

## Teknologi
- [GSAP](https://gsap.com/) + ScrollTrigger: animasi yang mengikuti scroll
- [Lenis](https://lenis.darkroom.engineering/): smooth scroll
- WebGL: latar garis kontur (`js/topo.js`) dan foto hero 3D (`js/hero3d.js`)

## Menjalankan di komputer
```
python -m http.server 5173
```
Lalu buka http://localhost:5173

## Deploy
Website ini statis, jadi bisa langsung di-hosting di Vercel, Netlify, GitHub Pages, atau Cloudflare Pages tanpa pengaturan build.
