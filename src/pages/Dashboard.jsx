import React, { useState, useEffect } from 'react'

export default function Dashboard({ items, customers }){
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    income: 0,
    pending: 0,
    active: 0,
    totalProducts: 0,
    totalStok: 0
  })

  useEffect(() => {
    const productCount = items.length
    const stokCount = items.reduce((sum, i) => sum + parseInt(i.stok || 0), 0)

    const savedOrders = localStorage.getItem('riwayatPesanan')
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : []
    setOrders(parsedOrders)

    let income = 0
    let pending = 0
    let active = 0

    parsedOrders.forEach(o => {
      if (['Sedang Disewa', 'Selesai'].includes(o.status)) {
        
        let rawTotal = o.total ? String(o.total) : "0";
        
        let mainPart = rawTotal.split(',')[0]; 

        let numberString = mainPart.replace(/[^0-9]/g, '');
        
        let val = parseInt(numberString) || 0;
        
        income += val;
      }

      if (o.status === 'Menunggu Verifikasi') pending++
      if (o.status === 'Sedang Disewa') active++
    })

    setStats({
      income,
      pending,
      active,
      totalProducts: productCount,
      totalStok: stokCount
    })
  }, [items])

  const handleUpdateStatus = (id, newStatus) => {
    const updatedList = orders.map(order => {
      if (order.id === id) {
        return { 
          ...order, 
          status: newStatus,
          statusBayar: newStatus === 'Sedang Disewa' ? 'Lunas' : (newStatus === 'Ditolak' ? 'Dibatalkan' : order.statusBayar),
          isRead: false 
        }
      }
      return order
    })
    saveAndRefresh(updatedList)
  }

  const handleDeleteOrder = (id) => {
    if(window.confirm("Hapus riwayat pesanan ini secara permanen?")) {
      const updatedList = orders.filter(order => order.id !== id);
      saveAndRefresh(updatedList);
    }
  }

  const handleResetIncome = () => {
    if(window.confirm("⚠️ PERINGATAN: Ini akan menghapus SEMUA riwayat pesanan yang sudah 'Selesai' untuk me-reset Pendapatan menjadi Rp 0. Lanjutkan?")) {
      const activeOrders = orders.filter(o => 
        o.status === 'Menunggu Verifikasi' || o.status === 'Sedang Disewa'
      );
      saveAndRefresh(activeOrders);
    }
  }
  const saveAndRefresh = (data) => {
    setOrders(data);
    localStorage.setItem('riwayatPesanan', JSON.stringify(data));
    window.location.reload();
  }

  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num)

  const badgeStyle = (status) => {
    let bg = '#333', col = '#ccc';
    if(status === 'Menunggu Verifikasi') { bg = 'rgba(241, 196, 15, 0.1)'; col = '#f1c40f'; }
    if(status === 'Sedang Disewa') { bg = 'rgba(52, 152, 219, 0.1)'; col = '#3498db'; }
    if(status === 'Selesai') { bg = 'rgba(46, 204, 113, 0.1)'; col = '#2ecc71'; }
    if(status === 'Ditolak') { bg = 'rgba(231, 76, 60, 0.1)'; col = '#e74c3c'; }
    return { backgroundColor: bg, color: col, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', border: `1px solid ${col}` }
  }

  const btnStyle = (color) => ({
    padding: '6px 12px', borderRadius: '6px', border: 'none', color: '#fff', 
    backgroundColor: color, cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', marginRight: '5px'
  })

  const gridStyle = {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px'
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <h2>Dashboard Admin</h2>
          <p style={{color:'#888', fontSize:'12px', margin:0}}>Selamat datang kembali, Admin.</p>
        </div>
        <div className="topbar-right">
          <div className="avatar">
            <div className="avatar-pic" style={{background:'#ff4d4d'}}>A</div>
            <div className="avatar-name">Super Admin</div>
          </div>
        </div>
      </header>
      <main className="content">
        <div style={gridStyle}>
          <div className="stat-card" style={{borderLeft: '4px solid #2ecc71', position:'relative'}}>
            <div className="stat-icon" style={{background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71'}}>💰</div>
            <div className="stat-info">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div className="stat-label">Total Pendapatan</div>
                <button 
                  onClick={handleResetIncome}
                  title="Reset Pendapatan (Hapus Riwayat Selesai)"
                  style={{background:'none', border:'none', cursor:'pointer', fontSize:'14px', padding:0}}
                >
                  🔄
                </button>
              </div>
              <div className="stat-value" style={{color: '#2ecc71', fontSize: '18px', lineHeight:'1.2'}}>
                {formatRupiah(stats.income)}
              </div>
            </div>
          </div>
          <div className="stat-card" style={{borderLeft: '4px solid #f1c40f'}}>
            <div className="stat-icon" style={{background: 'rgba(241, 196, 15, 0.1)', color: '#f1c40f'}}>🔔</div>
            <div className="stat-info">
              <div className="stat-label">Pesanan Baru</div>
              <div className="stat-value">{stats.pending}</div>
            </div>
          </div>
          <div className="stat-card" style={{borderLeft: '4px solid #3498db'}}>
            <div className="stat-icon" style={{background: 'rgba(52, 152, 219, 0.1)', color: '#3498db'}}>👕</div>
            <div className="stat-info">
              <div className="stat-label">Sedang Disewa</div>
              <div className="stat-value">{stats.active}</div>
            </div>
          </div>
          <div className="stat-card" style={{borderLeft: '4px solid #9b59b6'}}>
            <div className="stat-icon" style={{background: 'rgba(155, 89, 182, 0.1)', color: '#9b59b6'}}>📦</div>
            <div className="stat-info">
              <div className="stat-label">Total Stok Baju</div>
              <div className="stat-value">{stats.totalStok} Pcs</div>
            </div>
          </div>
        </div>
        <div className="panel" style={{marginTop: '25px'}}>
          <h3 className="panel-title">Pesanan Masuk (Real-time)</h3>
          <div className="table-wrap">
            {orders.length > 0 ? (
              <table className="items-table">
                <thead>
                  <tr>
                    <th>ID Sewa</th>
                    <th>Penyewa</th>
                    <th>Barang</th>
                    <th>Jadwal</th>
                    <th>Bukti</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td style={{fontSize:'12px', color:'#888'}}>{order.id}</td>
                      <td>
                        <div style={{fontWeight:'bold', fontSize:'14px'}}>{order.namaPenyewa || 'Tanpa Nama'}</div>
                        <div style={{fontSize:'11px', color:'#666'}}>Pelanggan</div>
                      </td>
                      <td>
                        <strong>{order.baju}</strong>
                        <div style={{fontSize:'11px', color:'#666'}}>{order.kategori}</div>
                      </td>
                      <td style={{fontSize:'12px'}}>
                        {order.tglSewa}<br/>s/d {order.tglKembali}
                      </td>
                      <td>
                        <button 
                          style={{background:'none', border:'none', color:'#3498db', cursor:'pointer', fontSize:'12px'}}
                          onClick={() => alert(`Membuka bukti transfer: ${order.bukti}`)}
                        >
                          Lihat Foto
                        </button>
                      </td>
                      <td style={{fontWeight:'bold', color:'#ff4d4d'}}>{order.total}</td>
                      <td>
                        <span style={badgeStyle(order.status)}>{order.status}</span>
                      </td>
                      <td>
                        <div style={{display:'flex', gap:'5px'}}>
                          
                          {order.status === 'Menunggu Verifikasi' && (
                            <>
                              <button style={btnStyle('#2ecc71')} onClick={() => handleUpdateStatus(order.id, 'Sedang Disewa')}>✅ Terima</button>
                              <button style={btnStyle('#e74c3c')} onClick={() => handleUpdateStatus(order.id, 'Ditolak')}>❌ Tolak</button>
                            </>
                          )}

                          {order.status === 'Sedang Disewa' && (
                            <button style={btnStyle('#3498db')} onClick={() => handleUpdateStatus(order.id, 'Selesai')}>🏁 Selesai</button>
                          )}

                          {(order.status === 'Selesai' || order.status === 'Ditolak') && (
                            <button 
                              style={btnStyle('#e74c3c')} 
                              onClick={() => handleDeleteOrder(order.id)}
                              title="Hapus Data Permanen"
                            >
                              🗑️ Hapus
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{textAlign:'center', padding:'40px', color:'#666'}}>
                Belum ada pesanan masuk.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}