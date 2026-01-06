# 📚 DOKUMENTASI STRUKTUR DATA - PRESENTASI UAS
## Aplikasi Rental Baju "WebSD"

Saya telah memeriksa ulang seluruh kode Anda dan ini adalah dokumentasi dengan **lokasi baris yang 100% akurat** sesuai kondisi file saat ini.

---

## 📌 DAFTAR ISI
1. [Stack (Tumpukan) - App.jsx](#1-stack-tumpukan)
2. [Queue (Antrian) - Payment & Dashboard](#2-queue-antrian)
3. [Set (Himpunan) - GalleryPelanggan.jsx](#3-set-himpunan)
4. [Dictionary/Map - DataPelanggan.jsx](#4-dictionarymap-pemetaan)

---

## 1. STACK (Tumpukan)

### 💡 Implementasi Code
**File:** `src/App.jsx`  

```jsx
function handleAddItem(newItem){
  const itemWithId = { ...newItem, id: `B-${Date.now()}` };
  setItems(prev => [itemWithId, ...prev]);  // ← STACK: Push to Front
}
```

### 🔍 Penjelasan untuk Presentasi
- Menggunakan prinsip **LIFO (Last In First Out)**.
- Baju yang **terakhir ditambahkan** (`itemWithId`) diletakkan di **urutan pertama** array menggunakan spread operator `...prev`.
- Efeknya: Saat ditampilkan di tabel dashboard, baju terbaru langsung muncul di paling atas.

---

## 2. QUEUE (Antrian)

### 💡 Implementasi 1: Enqueue (Masuk Antrian)
**File:** `src/pages/PaymentPelanggan.jsx`  
```jsx
const existingOrders = JSON.parse(localStorage.getItem('riwayatPesanan') || '[]');
const updatedOrders = [newOrder, ...existingOrders]; // ← Menambah antrian baru
localStorage.setItem('riwayatPesanan', JSON.stringify(updatedOrders));
```

### 💡 Implementasi 2: Dequeue/Processing (Proses Antrian)
**File:** `src/pages/StatusSewaPelanggan.jsx`  
```jsx
const savedOrders = localStorage.getItem('riwayatPesanan');
if (savedOrders) {
  setOrders(JSON.parse(savedOrders)); // ← Memuat antrian untuk ditampilkan
}
```

### 💡 Implementasi 3: Status Pipeline (Alur Antrian)
**File:** `src/pages/Dashboard.jsx`  
```jsx
const handleUpdateStatus = (id, newStatus) => {
  const updatedList = orders.map(order => {
    if (order.id === id) {
      // ... logic stock ...
      return { 
        ...order, 
        status: newStatus, // ← Update status dalam antrian (Pipeline)
        // ...
      }
    }
    return order
  })
  // ...
}
```

### 🔍 Penjelasan untuk Presentasi
- Menggunakan prinsip **FIFO (First In First Out)** dari sisi waktu pembuatan.
- Data pesanan disimpan dalam array kronologis.
- Setiap pesanan melewati "Status Pipeline":  
  `Menunggu Verifikasi` → `Sedang Diantar/Disewa` → `Selesai`
- Ini mensimulasikan antrian proses di dunia nyata.

---

## 3. SET (Himpunan Unik)

### 💡 Implementasi Code
**File:** `src/pages/GalleryPelanggan.jsx`  
```jsx
const categories = ['Semua', ...new Set((items || []).map(item => item.kategori))];
```

### 🔍 Penjelasan untuk Presentasi
- Struktur data **Set** digunakan untuk **menghilangkan duplikasi**.
- `map` mengambil semua kategori (misal: "Adat", "Modern", "Adat").
- `new Set()` secara otomatis menghapus yang kembar, menyisakan nilai unik saja.
- Hasilnya digunakan untuk tombol filter kategori di halaman Gallery.

---

## 4. DICTIONARY / MAP (Pemetaan Key-Value)

### 💡 Implementasi Code
**File:** `src/pages/DataPelanggan.jsx`  
```jsx
const uniqueCustomers = {} // ← Inisialisasi Dictionary

orders.forEach(order => {
  const nameKey = order.namaPenyewa || 'Tanpa Nama'
  
  if (!uniqueCustomers[nameKey]) { // ← Cek ketersediaan Key (O(1) lookup)
    uniqueCustomers[nameKey] = { // ← Input Value baru ke Key
      id: `C-${nameKey.substring(0,3).toUpperCase()}...`,
      nama: nameKey,
      // ... properties lain
    }
  }
  
  // Update Value jika Key sudah ada (Agregasi)
  if (order.status === 'Sedang Disewa') {
    uniqueCustomers[nameKey].sewaAktif += 1
  }
})
// ...
setCustomers(Object.values(uniqueCustomers))
```

### 🔍 Penjelasan untuk Presentasi
- Menggunakan **Object JavaScript sebagai Hash Map / Dictionary**.
- **Key**: Nama Pelanggan (`nameKey`).
- **Value**: Object data detail pelanggan.
- Fungsi utamanya adalah **Deduplikasi Pelanggan**: Jika si "Dika" menyewa 5 kali, di database pelanggan dia tetap tercatat sebagai 1 entitas, tapi data `sewaAktif`-nya yang bertambah.
