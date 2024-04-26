let P = []; // Array untuk menyimpan nilai populasi
let t = []; // Array untuk menyimpan nilai waktu
let r; // Variabel untuk konstanta pertumbuhan
let K; // Variabel untuk kapasitas dukungan

// Nilai yang bisa diinput oleh pengguna
let P0 = 20; // Populasi awal
let dt = 0.1; // Interval waktu
let tMax = 10; // Waktu maksimum simulasi

let grafik; // Variabel untuk grafik Chart.js

function setup() {
  createCanvas(400, 400);
  
  // Membuat input untuk konstanta pertumbuhan
  r = createInput('0.8'); // Input default
  r.position(20, 40);
  let p = createP('Konstanta Pertumbuhan'); // Teks penjelas
  p.style('fontsize', "14px");
  p.position(20, 0);
  
  // Membuat input untuk kapasitas dukungan
  K = createInput('80'); // Input default, 
  K.position(20, 80);
  let k = createP('Kapasitas Dukungan'); // Teks penjelas
  k.style('fontsize', "14px");
  k.position(20, 45);
  
  solve(); // Menjalankan fungsi solve sebelum inisiasi
  r.changed(solve); // Menjalankan fungsi solve ketika nilai r berubah
  K.changed(solve); // Menjalankan fungsi solve ketika nilai K berubah
  
  // Konfigurasi untuk grafik
  grafik = new Chart(this, config);
}

function draw() {
  background(220);
  grafik.update(); // Memperbarui grafik
}

function solve() {
  P[0] = P0; // Menetapkan populasi awal
  t[0] = 0; // Menetapkan waktu awal
  let rs = float(r.value()); // Mengambil nilai r dari input dan mengubahnya menjadi float
  let Ks = float(K.value()); // Mengambil nilai K dari input dan mengubahnya menjadi float
  let iterNum = int(tMax / dt); // Menghitung jumlah iterasi
  
  // Loop untuk menghitung nilai populasi pada setiap interval waktu
  for (let i = 0; i < iterNum; i++) {
    P[i + 1] = P[i] + dt * rs * P[i] * (1 - P[i] / Ks); // Persamaan logistik
    t[i + 1] = (i + 1) * dt; // Menyimpan nilai waktu
  }
}
