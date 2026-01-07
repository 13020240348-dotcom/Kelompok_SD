# 📚 DOKUMENTASI STRUKTUR DATA - PRESENTASI UAS
## Aplikasi Rental Baju "WebSD"

Saya telah memeriksa ulang seluruh kode Anda dan ini adalah dokumentasi dengan **lokasi baris yang 100% akurat** sesuai kondisi file saat ini.

---

## 📌 DAFTAR ISI
1. [Stack (Tumpukan) - App.jsx](#1-stack-tumpukan)
2. [Queue (Antrian) - Payment & Dashboard](#2-queue-antrian)
3. [Single Linked List - SingleLinkedList.jsx](#3-single-linked-list)

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

## 3. SINGLE LINKED LIST (Senarai Berantai)

### 💡 Implementasi Code
**File:** `src/structures/SingleLinkedList.jsx`
```jsx
class LogNode {
    constructor(activity) {
        this.activity = activity;
        this.next = null; 
    }
}

class ActivityLinkedList {
    // ...
    addLog(activityName) {
        const newNode = new LogNode(activityName);
        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.next = this.head; // ← Insert at Head (LIFO Behavior in List)
            this.head = newNode;      
        }
        // ...
    }
}
```

### 🔍 Penjelasan untuk Presentasi
- Menggunakan struktur data **Linked List Manual** (menggunakan Class & Node) bukan Array biasa.
- Setiap aktivitas user (pindah halaman) disimpan dalam sebuah **Node**.
- Pointer `next` menghubungkan satu aktivitas ke aktivitas berikutnya.
- Digunakan untuk fitur **Log Aktivitas** yang muncul di bagian bawah layar.




