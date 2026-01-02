# Web Developer & IT Support Technical Test

Selamat datang di repositori hasil pengerjaan technical test saya. Proyek ini terdiri dari tiga komponen utama: Portal landing page, Sistem Admin Toko (CRUD & Database), dan AI Chatbot (Gemini Integration).

## 🚀 Tampilan Aplikasi

### 1. Portal Landing Page
Halaman utama untuk mengakses kedua proyek.
![Portal Landing Page](./screenshots/portal.png)

### 2. Admin Shop System
Manajemen pembelian dan stok produk menggunakan MySQL.
![Admin Shop](./screenshots/admin-shop.png)

### 3. AI Chatbot Assistant
Chatbot cerdas menggunakan integrasi API Google Gemini.
![AI Chatbot](./screenshots/chatbot.png)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL dengan Sequelize ORM
- **Frontend:** EJS (Embedded JavaScript templates), Tailwind CSS, Alpine.js
- **AI Integration:** Google Gemini AI SDK (v2.5 Flash)
- **Tooling:** Laragon (Local Server), VS Code

---

## ⚙️ Instalasi & Konfigurasi

### 1. Persiapan Database (MySQL)
- Pastikan MySQL pada Laragon/XAMPP aktif.
- Buat database baru bernama `db_penjualan`.
- Masuk ke folder `admin-shop`, jalankan instalasi dan migrasi:
  ```bash
  npm install
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all