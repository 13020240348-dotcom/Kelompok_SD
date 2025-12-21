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
      if (o.status === 'Sedang Disewa' || o.status === 'Sedang Diantar') active++
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
        if (newStatus === 'Selesai' || newStatus === 'Ditolak') {
          restoreStock(order);
        }
        return { 
          ...order, 
          status: newStatus,
          statusBayar: (newStatus === 'Sedang Disewa' || newStatus === 'Sedang Diantar') ? 'Lunas' : (newStatus === 'Ditolak' ? 'Dibatalkan' : order.statusBayar),
          isRead: false 
        }
      }
      return order
    })
    saveAndRefresh(updatedList)
  }
  const restoreStock = (order) => {
    const dataBaju = JSON.parse(localStorage.getItem('dataBaju') || '[]');
    const updatedBaju = dataBaju.map(item => {
      if ((order.idBaju && item.id === order.idBaju) || item.model === order.baju) {
         const stokBaru = parseInt(item.stok) + parseInt(order.jumlahSewa || 1);
         return { ...item, stok: stokBaru }
      }
      return item;
    });
    localStorage.setItem('dataBaju', JSON.stringify(updatedBaju));
  }
  const handleDeleteOrder = (id) => {
    if(window.confirm("Hapus riwayat pesanan ini secara permanen?")) {
      const updatedList = orders.filter(order => order.id !== id);
      saveAndRefresh(updatedList);
    }
  }

  const handleResetIncome = () => {
    if(window.confirm("⚠️ Reset Pendapatan akan menghapus pesanan yang sudah 'Selesai'. Lanjutkan?")) {
      const activeOrders = orders.filter(o => 
        o.status === 'Menunggu Verifikasi' || o.status === 'Sedang Disewa' || o.status === 'Sedang Diantar'
      );
      saveAndRefresh(activeOrders);
    }
  }
  const saveAndRefresh = (data) => {
    setOrders(data);
    localStorage.setItem('riwayatPesanan', JSON.stringify(data));
    window.location.reload();
  }
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
  const styles = {
    dashboard: {
      padding: '20px 40px',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    welcomeText: { fontSize: '22px', fontWeight: '700', margin: 0, color: '#fff' },
    subWelcome: { fontSize: '13px', color: '#888', marginTop: '2px' },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: (color) => ({
      background: 'rgba(30, 30, 30, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: `0 4px 15px rgba(0,0,0,0.2)`, 
      position: 'relative',
      overflow: 'hidden',
      height: '80px'
    }),
    glowBar: (color) => ({
      position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: color
    }),
    iconBox: (color) => ({
      width: '40px', height: '40px', borderRadius: '10px',
      background: `${color}22`, color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '20px'
    }),
    statLabel: { fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' },
    statValue: { fontSize: '20px', fontWeight: '700', color: '#fff' },
    panel: {
      background: 'rgba(30, 30, 30, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    panelTitle: { fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { textAlign: 'left', padding: '12px 15px', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', textTransform:'uppercase', fontSize:'11px', letterSpacing:'0.5px' },
    td: { padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' },
    badge: (status) => {
      let bg = '#333', col = '#ccc', border = '#444';
      if(status === 'Menunggu Verifikasi') { bg = 'rgba(241, 196, 15, 0.1)'; col = '#f1c40f'; border = col; }
      if(status === 'Sedang Diantar') { bg = 'rgba(230, 126, 34, 0.1)'; col = '#e67e22'; border = col; }
      if(status === 'Sedang Disewa') { bg = 'rgba(52, 152, 219, 0.1)'; col = '#3498db'; border = col; }
      if(status === 'Selesai') { bg = 'rgba(46, 204, 113, 0.1)'; col = '#2ecc71'; border = col; }
      if(status === 'Ditolak') { bg = 'rgba(231, 76, 60, 0.1)'; col = '#e74c3c'; border = col; }
      return { backgroundColor: bg, color: col, padding: '4px 10px', borderRadius: '50px', fontSize: '10px', fontWeight: 'bold', border: `1px solid ${border}44`, whiteSpace: 'nowrap' }
    },
    actionBtn: (color) => ({
      padding: '5px 10px', borderRadius: '6px', border: 'none', color: '#fff', 
      background: color, cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginRight: '5px',
      transition: '0.2s', boxShadow: `0 2px 5px ${color}44`
    }),
    photoBtn: { background: 'none', border: '1px solid #3498db', color: '#3498db', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }
  };
  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <div>
          <h2 style={styles.welcomeText}>Admin Dashboard</h2>
          <p style={styles.subWelcome}>Ringkasan aktivitas toko hari ini.</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', background:'rgba(255,255,255,0.05)', padding:'5px 10px', borderRadius:'30px'}}>
          <div style={{width:'8px', height:'8px', background:'#2ecc71', borderRadius:'50%'}}></div>
          <span style={{fontSize:'12px', fontWeight:'bold'}}>Admin Online</span>
        </div>
      </header>
      <div style={styles.statsGrid}>
        <div style={styles.statCard('#2ecc71')}>
          <div style={styles.glowBar('#2ecc71')}></div>
          <div style={styles.iconBox('#2ecc71')}>💰</div>
          <div style={{flex:1}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={styles.statLabel}>Pendapatan</div>
                <button onClick={handleResetIncome} title="Reset" style={{background:'none', border:'none', cursor:'pointer', fontSize:'12px', opacity:0.5, color:'#fff'}}>↺</button>
            </div>
            <div style={styles.statValue}>{formatRupiah(stats.income)}</div>
          </div>
        </div>
        <div style={styles.statCard('#f1c40f')}>
          <div style={styles.glowBar('#f1c40f')}></div>
          <div style={styles.iconBox('#f1c40f')}>🔔</div>
          <div>
            <div style={styles.statLabel}>Pesanan Baru</div>
            <div style={styles.statValue}>{stats.pending}</div>
          </div>
        </div>
        <div style={styles.statCard('#3498db')}>
          <div style={styles.glowBar('#3498db')}></div>
          <div style={styles.iconBox('#3498db')}>👕</div>
          <div>
            <div style={styles.statLabel}>Sedang Disewa</div>
            <div style={styles.statValue}>{stats.active}</div>
          </div>
        </div>
        <div style={styles.statCard('#9b59b6')}>
          <div style={styles.glowBar('#9b59b6')}></div>
          <div style={styles.iconBox('#9b59b6')}>📦</div>
          <div>
            <div style={styles.statLabel}>Total Stok</div>
            <div style={styles.statValue}>{stats.totalStok}</div>
          </div>
        </div>
      </div>
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <div style={styles.panelTitle}>
             Pesanan Terbaru
          </div>
        </div>
        <div style={styles.tableContainer}>
          {orders.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Penyewa</th>
                  <th style={styles.th}>Barang</th>
                  <th style={styles.th}>Ambil</th>
                  <th style={styles.th}>Tanggal</th>
                  <th style={styles.th}>Bukti</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td style={styles.td}>
                        <span style={{fontFamily:'monospace', color:'#666', fontSize:'11px'}}>{order.id}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{fontWeight:'bold'}}>{order.namaPenyewa}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{color:'#fff'}}>{order.baju}</div>
                      <div style={{fontSize:'10px', color:'#888'}}>Qty: {order.jumlahSewa}</div>
                    </td>
                    <td style={styles.td}>
                      {order.metodeAmbil === 'diantar' ? 
                        <span style={{color:'#e67e22', fontSize:'11px'}}>🚚 Diantar</span> : 
                        <span style={{color:'#3498db', fontSize:'11px'}}>Ambil Sendiri</span>
                      }
                    </td>
                    <td style={styles.td}>
                      <div style={{fontSize:'11px'}}>{order.tglSewa}</div>
                    </td>
                    <td style={styles.td}>
                      <button 
                        style={styles.photoBtn}
                        onClick={() => alert(`Membuka bukti transfer: ${order.bukti}`)}
                      >
                        Lihat
                      </button>
                    </td>
                    <td style={styles.td}>
                         <div style={{color:'#ff4d4d', fontWeight:'bold', fontSize:'12px'}}>{order.total}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badge(order.status)}>{order.status}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{display:'flex', gap:'3px'}}>
                        {order.status === 'Menunggu Verifikasi' && (
                          <>
                            {order.metodeAmbil === 'diantar' ? (
                                <button style={styles.actionBtn('#e67e22')} onClick={() => handleUpdateStatus(order.id, 'Sedang Diantar')} title="Kirim Barang">🚚</button>
                            ) : (
                                <button style={styles.actionBtn('#2ecc71')} onClick={() => handleUpdateStatus(order.id, 'Sedang Disewa')} title="Terima Pesanan">✅</button>
                            )}
                            <button style={styles.actionBtn('#e74c3c')} onClick={() => handleUpdateStatus(order.id, 'Ditolak')} title="Tolak Pesanan">❌</button>
                          </>
                        )}
                        {order.status === 'Sedang Diantar' && (
                            <button style={styles.actionBtn('#3498db')} onClick={() => handleUpdateStatus(order.id, 'Sedang Disewa')}>Sampai</button>
                        )}
                        {order.status === 'Sedang Disewa' && (
                          <button style={styles.actionBtn('#3498db')} onClick={() => handleUpdateStatus(order.id, 'Selesai')}>Selesai</button>
                        )}
                        {(order.status === 'Selesai' || order.status === 'Ditolak') && (
                          <button 
                            style={{...styles.actionBtn('transparent'), border:'1px solid #e74c3c', color:'#e74c3c'}} 
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Hapus"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{textAlign:'center', padding:'40px', color:'#666', fontSize:'13px'}}>
              Tidak ada pesanan aktif.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}