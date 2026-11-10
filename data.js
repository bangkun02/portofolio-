/* =====================================================================
   DATA PORTOFOLIO — CUKUP EDIT FILE INI
   ---------------------------------------------------------------------
   • Ganti teks di antara tanda kutip "...".
   • Taruh foto di folder assets/ lalu tulis path-nya, mis. "assets/foto-saya.png".
   • Mau tambah/kurangi item? Duplikat/hapus satu blok { ... } (perhatikan koma).
   • Logo/gambar boleh dikosongkan "" → otomatis diganti inisial.
   • Daftar yang kosong [] otomatis disembunyikan (mis. sertifikat, galeri).
   ===================================================================== */
window.PORTFOLIO = {
  /* ---------- Identitas ---------- */
  name: { first: "Muhamad Hadli", last: "Al Furqon" },
  greeting: "Hi, I'm",
  role: "UI/UX Engineer | AI-Powered Web Builder",
  meta: {
    title: "",                      // kosong = otomatis "Nama Lengkap | Portofolio"
    description: "Portofolio Muhamad Hadli Al Furqon — UI/UX Engineer & AI-Powered Web Builder di bidang pendidikan Islam. Yogyakarta, Indonesia."
  },
  accent: "#2563eb",                // warna utama (tombol, indikator, dll)

  /* ---------- Hero (layar pembuka) ---------- */
  hero: {
    small: "WELCOME TO MY",
    big: "PORTOFOLIO",
    // Foto kamu tampak BELAKANG, background transparan (PNG/WebP). Lihat PANDUAN.md
    person: "assets/hero/orang-belakang.webp",
    personMode: "half",   // "half" = setengah badan, kecil, berdiri di dek di depan pagar | "half-big" = setengah badan, besar dari bawah layar | "full" = badan utuh, kaki di pijakan
    personX: 50,          // posisi horizontal (0 = kiri, 50 = tengah, 100 = kanan)
    personSize: 34,       // tinggi foto untuk mode "half" (% tinggi layar). Di HP otomatis 80%-nya

    // TEMA AKTIF: FOTO KOTA 3D
    photo: "assets/hero/kota-foto.jpg",  // foto latar (efek 3D otomatis). Pakai foto lanskap, makin besar resolusi makin tajam
    scene: "assets/hero/dek.svg",        // dek observasi tempat berdiri
    front: "assets/hero/daun.svg",       // daun buram paling dekat kamera
    ground: 120                          // tinggi pijakan dari bawah (satuan 1600×900)

    /* TEMA LAIN — hapus baris photo di atas, lalu pakai salah satu:
       Kota ilustrasi : sky "assets/hero/langit-kota.svg", scene "assets/hero/kota.svg",   front "assets/hero/depan-kota.svg", ground 263
       Gunung         : sky "assets/hero/langit.svg",      scene "assets/hero/gunung.svg", front "assets/hero/hutan.svg",      ground 263 */
  },

  /* ---------- About ---------- */
  photo: "assets/foto-profil.webp",       // potret setengah badan, background transparan lebih bagus
  photoHover: "assets/foto-spider-topeng-v2.webp",  // muncul di lingkaran saat kursor diarahkan ke foto (HP: ketuk foto). Kosongkan "" = efek hitam-putih → berwarna
  about:
    "UI/UX Engineer dan AI-Powered Web Builder dengan latar belakang Pendidikan Agama Islam (S1 & S2). Aku merancang antarmuka yang intuitif dan membangun website berbasis AI untuk pendidikan — mulai dari konsep dan desain di Figma hingga implementasi — agar produk digital tidak hanya berfungsi, tetapi juga bermakna bagi penggunanya.",
  cv: "assets/cv-muhamad-hadli-al-furqon.pdf",  // kosong "" = tombol View CV disembunyikan

  education: [
    { place: "UIN Sunan Kalijaga Yogyakarta", period: "", title: "Magister (S2) Pendidikan Agama Islam", subtitle: "Yogyakarta", tag: "S2", logo: "" },
    { place: "Universitas Negeri Padang", period: "", title: "Sarjana (S1) Pendidikan Agama Islam", subtitle: "Padang, Sumatera Barat", tag: "S1", logo: "" }
  ],

  experience: [
    { place: "Freelance / Independen", period: "", title: "UI/UX Engineer & AI Web Builder", subtitle: "Yogyakarta, Indonesia", tag: "Freelance", logo: "" },
    { place: "Partner Belajar Metodologi Penelitian", period: "", title: "Merancang metodologi penelitian berbasis AI", subtitle: "Website pembelajaran berbasis AI", tag: "AI · Edukasi", logo: "" },
    { place: "Rida Tahsin", period: "", title: "Aplikasi tahsin digital untuk belajar & memperbaiki bacaan Al-Qur'an", subtitle: "Koreksi makharijul huruf dengan AI", tag: "AI · Al-Qur'an", logo: "" },
    { place: "Dashboard Bimbingan Tugas Akhir", period: "", title: "Konsultasi & pemeriksaan tugas akhir mahasiswa berbasis AI", subtitle: "Skripsi · Tesis · Disertasi", tag: "AI · Akademik", logo: "" },
    { place: "Integrasi Chatbot & Asisten Virtual", period: "", title: "Sistem pelayanan integratif di website", subtitle: "Meningkatkan kualitas interaksi & pengalaman pengguna", tag: "LLM", logo: "" }
  ],

  skills: [
    { group: "UI/UX Design", items: ["Figma", "Wireframing", "Prototyping", "Design System", "User Research", "Usability Testing", "User Flow"] },
    { group: "Web & AI", items: ["AI-Powered Web Builder", "Integrasi AI (Chatbot & LLM)", "Prompt Engineering", "HTML", "CSS", "JavaScript", "Responsive Design"] },
    { group: "Pemrograman & Data", items: ["Python", "Otomatisasi Data", "Analisis Data"] },
    { group: "Perkantoran", items: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Google Workspace"] },
    { group: "Soft Skills", items: ["Komunikasi", "Problem Solving", "Manajemen Proyek", "Kolaborasi Tim"] }
  ],

  /* ---------- Portofolio (tab) ---------- */
  portfolioTitle: "PORTOFOLIO",     // teks raksasa transisi gelap → terang
  portfolio: {
    projects: [
      {
        title: "Partner Belajar Metodologi Penelitian",
        image: "assets/proyek/metodologi-ai.webp",
        description:
          "Asisten belajar berbasis AI untuk mata kuliah Metodologi Penelitian (dosen pengampu: Dr. Shaleh, UIN Sunan Kalijaga). Mahasiswa bisa bertanya apa saja tentang materi kuliah dan jawabannya diambil dari 13 materi yang tersedia, jadi tetap sesuai isi perkuliahan.\n\n" +
          "Fitur: tanya-jawab dengan AI, tanya isi dokumen sendiri (unggah dokumen), contoh pertanyaan siap klik, unduh materi, profil dosen & pengembang, karya ilmiah dosen, dan Panel Dosen untuk mengelola materi.",
        tags: ["Streamlit", "Python", "LLM", "Chatbot Materi Kuliah"],
        date: "",
        links: [{ label: "Buka Aplikasi", url: "https://metodologi-penelitian-ai.streamlit.app/" }]
      },
      {
        title: "Rida Tahsin — Tahsin AI",
        image: "assets/proyek/ridha-tahsin.webp",
        description:
          "Aplikasi tahsin digital untuk belajar dan memperbaiki bacaan Al-Qur'an. Pengguna memilih surah dan ayat, membaca teks Arab lengkap dengan transliterasi dan terjemahan, lalu mendengarkan contoh bacaan qari (Mishary Rashid Alafasy).\n\n" +
          "Setelah itu pengguna merekam bacaannya sendiri (atau mengunggah file audio). AI mengubah suara menjadi teks (Whisper) lalu mengoreksi makharijul huruf dengan LLM (Groq/Gemini). Tersedia juga Panduan Makhraj dan Riwayat latihan untuk memantau perkembangan.",
        tags: ["Streamlit", "Speech-to-Text", "LLM", "Al-Qur'an"],
        date: "",
        links: [{ label: "Buka Aplikasi", url: "https://ridha-tahsin.streamlit.app/" }]
      },
      {
        title: "Cek Sistematika Penulisan Tugas Akhir",
        image: "assets/proyek/bimbingan-ta.webp",
        description:
          "Dashboard konsultasi dan bimbingan tugas akhir berbasis AI (pembimbing: Prof. Dr. Imam Machali, S.Pd.I, M.Pd). Mahasiswa mengunggah naskah skripsi, tesis, atau disertasi (DOCX/PDF), lalu AI memeriksa kesesuaian sistematika penulisannya dengan panduan.\n\n" +
          "Ada tiga menu: Bimbingan Penulisan Tugas Akhir, Bimbingan Penulisan Proposal, dan File Panduan (unduh panduan & instrumen). Hasil AI bersifat bantuan; keputusan akhir tetap pada dosen pembimbing.",
        tags: ["Streamlit", "AI Review", "DOCX/PDF", "Akademik"],
        date: "",
        links: [{ label: "Buka Aplikasi", url: "https://bimbinganimammachalli.streamlit.app/" }]
      }
    ],
    certificates: [],   // isi seperti contoh projects di atas → tab & folder Certificates muncul otomatis
    awards: []          // sama, untuk Awards
  },

  /* ---------- Galeri foto (bisa di-drag di desktop) ---------- */
  // Kosong = bagian Galeri disembunyikan. Contoh: { image: "assets/galeri/kegiatan-1.jpg", caption: "Seminar AI" }
  gallery: [],

  /* ---------- Kontak ---------- */
  contact: {
    title: "Hubungi Saya",
    text: "Butuh website berbasis AI atau desain UI/UX untuk pendidikan? Kirim pesan saja, ya!",
    email: "mhadlialfurqon433@gmail.com",
    whatsapp: "6282278220606",      // pakai kode negara, tanpa +
    formMode: "mailto"              // "mailto" = buka aplikasi email, "whatsapp" = buka chat WA
  },

  // icon yang tersedia: linkedin, instagram, github, tiktok, youtube, mail, whatsapp, globe
  socials: [
    { label: "Email", handle: "mhadlialfurqon433@gmail.com", url: "mailto:mhadlialfurqon433@gmail.com", icon: "mail" },
    { label: "WhatsApp", handle: "0822-7822-0606", url: "https://wa.me/6282278220606", icon: "whatsapp" },
    { label: "Google Scholar", handle: "Publikasi ilmiah", url: "https://scholar.google.com/citations?user=cMfQ31UAAAAJ&hl=en", icon: "globe" },
    { label: "ORCID", handle: "0009-0006-5845-7187", url: "https://orcid.org/0009-0006-5845-7187", icon: "globe" }
  ],

  footer: ""                        // kosong = otomatis "© tahun Nama. All rights reserved."
};
