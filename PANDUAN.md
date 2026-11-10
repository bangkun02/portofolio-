# Panduan Portofolio

Kamu cukup mengedit **`data.js`** dan mengganti gambar di folder **`assets/`**.
File lain (HTML, CSS, JS) tidak perlu disentuh.

## 1. Cara membuka

- **Paling gampang:** klik dua kali `index.html` (butuh internet karena library animasi diambil dari CDN).
- **Lebih stabil (disarankan):** buka terminal di folder ini, lalu jalankan:

  ```
  python -m http.server 5173
  ```

  Setelah itu buka http://localhost:5173 di browser.

## 2. Yang perlu diganti

| Yang diganti | Di mana | Tips |
|---|---|---|
| Nama, sapaan, deskripsi | `data.js` → `name`, `greeting`, `about` | — |
| Foto profil (About) | `data.js` → `photo` | PNG/WebP **background transparan**, potret setengah badan. Hapus background di remove.bg |
| Foto hero (berdiri di bukit) | `data.js` → `hero.person` | Foto **tampak belakang**, background transparan, badan utuh sampai kaki |
| CV | `data.js` → `cv` | Taruh `cv.pdf` di `assets/`, tulis `"assets/cv.pdf"`. Kosongkan untuk menyembunyikan tombol |
| Pendidikan & pengalaman | `education`, `experience` | `logo` boleh kosong → otomatis jadi inisial |
| Proyek / sertifikat / penghargaan | `portfolio.projects` / `certificates` / `awards` | Gambar rasio 16:10 paling pas. `links` muncul di jendela Details |
| Galeri | `gallery` | Foto potret (4:5) paling pas |
| Kontak | `contact`, `socials` | `formMode: "whatsapp"` + isi `whatsapp` agar form membuka chat WA |
| Warna utama | `accent` | Contoh: `"#16a34a"` (hijau), `"#e11d48"` (merah) |

Angka di kartu folder (Projects / Certificates / Awards) dihitung otomatis dari jumlah item.

## 3. Latar hero

**Tema aktif: foto kota 3D.** Isi `hero.photo` dengan foto lanskap mana saja (JPG/WebP).
Efek 3D dibuat otomatis oleh `js/hero3d.js`: bagian bawah foto dianggap dekat, bagian atas jauh.
- Gerakkan mouse: bagian dekat bergeser lebih jauh daripada bagian jauh (parallax kedalaman).
- Scroll: bagian dekat membesar lebih cepat (dolly zoom), seperti kamera maju ke kota.
- Di HP: memiringkan ponsel memberi efek yang sama (jika browser mengizinkan).

Agar tajam di layar 4K, pakai foto minimal 3840×2160. Foto sekarang berukuran 2000×1125.
`hero.ground` = tinggi pijakan (dek) dari bawah, dalam satuan 1600×900.

### Tema SVG (alternatif)

Hero terdiri dari 4 lapisan yang bergerak dengan kecepatan berbeda. Path-nya diatur di `data.js` → `hero`:

1. `sky`: langit senja kota, bulan, bintang (paling jauh, paling lambat)
2. `scene`: deretan gedung dengan jendela menyala dan atap tempat berdiri
3. `person`: foto kamu
4. `front`: gedung, kabel, dan pagar di dekat kamera (membesar paling cepat saat scroll)

Semua lapisan berformat SVG (vektor), jadi tetap tajam di layar berapa pun, termasuk 4K.
Tema gunung masih tersedia: `langit.svg`, `gunung.svg`, `hutan.svg`.

Kalau mau memakai **foto asli 4K** (mis. 3840×2160 dari Unsplash), isi `scene` dengan foto itu
dan kosongkan lapisan lain dengan file transparan. Lalu ubah `GROUND_UNITS` di `js/main.js`
(tinggi atap dari bawah gambar, dalam satuan 1600×900) supaya kaki tetap pas di pijakan.

## 4. Online-kan (gratis)

- **Vercel / Netlify:** buka netlify.com/drop lalu seret folder `portofolio-saya`. Selesai.
- **GitHub Pages:** upload isi folder ke repo, lalu buka Settings → Pages → Deploy from branch.

## 5. Bahan yang dipakai

- **GSAP 3 + ScrollTrigger**: semua animasi yang mengikuti scroll (parallax, zoom huruf, reveal)
- **Lenis**: smooth scroll
- **WebGL shader** (`js/topo.js`): latar garis kontur yang bergerak dan bereaksi ke mouse
- **SVG berlapis**: ilustrasi hero
- Font: Archivo Black (judul) + Plus Jakarta Sans (teks), dari Google Fonts
