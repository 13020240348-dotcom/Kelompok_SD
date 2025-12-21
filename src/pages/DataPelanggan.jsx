import React, { useState, useEffect } from 'react'

export default function DataPelanggan() {
  const [customers, setCustomers] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  useEffect(() => {
    loadCustomersData()
  }, [])
  const loadCustomersData = () => {
    const savedOrders = localStorage.getItem('riwayatPesanan')
    const orders = savedOrders ? JSON.parse(savedOrders) : []
    const uniqueCustomers = {}
    orders.forEach(order => {
      const nameKey = order.namaPenyewa || 'Tanpa Nama'
      if (!uniqueCustomers[nameKey]) {
        uniqueCustomers[nameKey] = {
          id: `C-${nameKey.substring(0,3).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
          nama: nameKey,
          nomor: order.nomorHp || '-', 
          verifikasi: 'KTP OK', 
          sewaAktif: 0,
          isBlacklist: false
        }
      }
      if (order.status === 'Sedang Disewa') {
        uniqueCustomers[nameKey].sewaAktif += 1
      }
      if (order.status === 'Ditolak') {
        uniqueCustomers[nameKey].isBlacklist = true
        uniqueCustomers[nameKey].verifikasi = 'Pernah Ditolak'
      }
    })
    setCustomers(Object.values(uniqueCustomers))
  }
  const blacklistCustomers = customers.filter(c => c.isBlacklist);
  const handleDelete = (namaPelanggan) => {
    if (window.confirm(`Hapus data pelanggan "${namaPelanggan}" dan semua riwayat transaksinya?`)) {
      const savedOrders = localStorage.getItem('riwayatPesanan')
      const orders = savedOrders ? JSON.parse(savedOrders) : []
      const newOrders = orders.filter(o => o.namaPenyewa !== namaPelanggan)
      localStorage.setItem('riwayatPesanan', JSON.stringify(newOrders))
      loadCustomersData()
    }
  }
  const filtered = customers.filter(c => 
    c.nama.toLowerCase().includes(searchName.toLowerCase()) &&
    c.nomor.includes(searchPhone)
  )
  const handleChatWA = (nomor, nama) => {
    let cleanNum = nomor.replace(/[^0-9]/g, '');
    if (cleanNum.startsWith('0')) {
        cleanNum = '62' + cleanNum.substring(1);
    }
    const msg = `Halo Kak ${nama}, kami dari Admin Zago Store...`;
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  }
  const styles = {
    container: { padding: '20px 40px', color: '#fff', fontFamily: "'Inter', sans-serif", minHeight: '100vh' },
    topbar: { 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', 
      background: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(10px)',
      padding: '15px 25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' 
    },
    pageTitle: { fontSize: '20px', fontWeight: '800', margin: 0, background: 'linear-gradient(90deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    profileArea: { display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' },
    notifBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', position: 'relative', padding: '5px', transition:'transform 0.2s' },
    badge: { position: 'absolute', top: '-2px', right: '-2px', background: '#e74c3c', color: 'white', fontSize: '9px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border:'2px solid #1e1e1e' },
    notifDropdown: { 
      position: 'absolute', top: '45px', right: '0', width: '260px', background: 'rgba(30,30,30,0.95)', 
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', zIndex: 100, backdropFilter:'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' 
    },
    notifItem: { padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: '#e74c3c', fontWeight:'bold' },
    adminBadge: { display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' },
    avatarAdmin: { width: '28px', height: '28px', background: 'linear-gradient(135deg, #ff4d4d, #c0392b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' },
    controls: { display: 'flex', gap: '10px', marginBottom: '25px', flexWrap:'wrap' },
    searchBox: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 12px', width: '220px', transition: '0.3s' },
    input: { background: 'transparent', border: 'none', color: '#fff', marginLeft: '8px', width: '100%', outline: 'none', fontSize:'13px' },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '15px'
    },
    card: (isBlacklist) => ({
        background: isBlacklist ? 'rgba(231, 76, 60, 0.05)' : 'rgba(30, 30, 30, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '15px',
        border: isBlacklist ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        transition: 'transform 0.2s',
        overflow: 'hidden'
    }),
    avatarUser: (isBlacklist) => ({
        width: '45px', height: '45px',
        borderRadius: '50%',
        background: isBlacklist ? '#e74c3c' : 'linear-gradient(135deg, #3498db, #8e44ad)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', 
        fontWeight: 'bold', color: '#fff',
        marginBottom: '10px',
        border: '2px solid rgba(255,255,255,0.1)'
    }),
    name: { fontSize: '15px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#fff' }, // Font nama dikecilkan
    phone: { fontSize: '12px', color: '#aaa', display:'flex', alignItems:'center', gap:'4px', marginBottom:'10px' },
    badgesContainer: { display: 'flex', gap: '5px', marginBottom: '15px' },
    statusBadge: (type) => {
      let bg = '#333', col = '#ccc';
      if (type === 'ok') { bg = 'rgba(46, 204, 113, 0.15)'; col = '#2ecc71'; }
      if (type === 'warn') { bg = 'rgba(241, 196, 15, 0.15)'; col = '#f1c40f'; }
      if (type === 'danger') { bg = 'rgba(231, 76, 60, 0.15)'; col = '#e74c3c'; }
      return { padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', background: bg, color: col, border: `1px solid ${col}44` }
    },
    cardFooter: { 
        display: 'flex', gap: '8px', width: '100%', paddingTop: '10px', 
        borderTop: '1px solid rgba(255,255,255,0.05)' 
    },
    waBtn: {
        flex: 1, padding: '6px', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71',
        border: '1px solid rgba(46, 204, 113, 0.3)', borderRadius: '6px', cursor: 'pointer',
        fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
        transition: '0.2s'
    },
    delBtn: {
        padding: '6px 10px', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c',
        border: '1px solid rgba(231, 76, 60, 0.3)', borderRadius: '6px', cursor: 'pointer',
        fontSize: '12px', transition: '0.2s'
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <div>
           <h2 style={styles.pageTitle}>Database Pelanggan</h2>
           <p style={{fontSize:'11px', color:'#888', margin:'3px 0 0 0'}}>Kelola data penyewa dan blacklist.</p>
        </div>
        <div style={styles.profileArea}>
          <div style={{position: 'relative'}}>
            <button style={styles.notifBtn} onClick={() => setShowNotif(!showNotif)}>
              {'🔔'}
              {blacklistCustomers.length > 0 && (
                <span style={styles.badge}>{blacklistCustomers.length}</span>
              )}
            </button>
            {showNotif && (
              <div style={styles.notifDropdown}>
                <h4 style={{margin: '0 0 10px 0', color: '#fff', fontSize: '11px', borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:'5px'}}>{'⚠️'} Blacklist Monitor</h4>
                {blacklistCustomers.length > 0 ? (
                  blacklistCustomers.map(c => (
                    <div key={c.id} style={styles.notifItem}>
                      <span>{c.nama}</span>
                      <span>BLACKLIST</span>
                    </div>
                  ))
                ) : (
                  <div style={{color: '#888', fontSize: '11px', textAlign: 'center', padding: '10px'}}>Aman. Tidak ada pelanggan bermasalah.</div>
                )}
              </div>
            )}
          </div>
          <div style={styles.adminBadge}>
            <div style={styles.avatarAdmin}>A</div>
            <span style={{fontSize: '13px', fontWeight: '500'}}>Super Admin</span>
          </div>
        </div>
      </div>
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <span style={{color: '#888', fontSize:'14px'}}>{'🔍'}</span>
          <input 
            style={styles.input} 
            value={searchName} 
            onChange={e => setSearchName(e.target.value)} 
            placeholder="Cari nama..." 
          />
        </div>
        <div style={styles.searchBox}>
          <span style={{color: '#888', fontSize:'14px'}}>{'📱'}</span>
          <input 
            style={styles.input} 
            value={searchPhone} 
            onChange={e => setSearchPhone(e.target.value)} 
            placeholder="Cari nomor..." 
          />
        </div>
      </div>
      <div style={styles.gridContainer}>
        {filtered.length > 0 ? (
            filtered.map((c, index) => (
                <div 
                    key={index} 
                    style={styles.card(c.isBlacklist)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={styles.avatarUser(c.isBlacklist)}>
                        {c.nama.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.name}>{c.nama}</div>
                    <div style={styles.phone}>
                        <span>{'📞'}</span> {c.nomor}
                    </div>
                    <div style={styles.badgesContainer}>
                        <span style={styles.statusBadge(c.isBlacklist ? 'danger' : 'ok')}>
                            {c.verifikasi}
                        </span>
                        <span style={styles.statusBadge(c.sewaAktif > 0 ? 'ok' : 'warn')}>
                            {c.sewaAktif > 0 ? `${c.sewaAktif} Aktif` : '0 Aktif'}
                        </span>
                    </div>
                    <div style={styles.cardFooter}>
                        <button 
                            style={styles.waBtn}
                            onClick={() => handleChatWA(c.nomor, c.nama)}
                            onMouseEnter={(e) => { e.target.style.background = 'rgba(46, 204, 113, 0.2)'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'rgba(46, 204, 113, 0.1)'; }}
                        >
                            {'💬'} Chat
                        </button>
                        <button 
                            style={styles.delBtn}
                            onClick={() => handleDelete(c.nama)}
                            title="Hapus Data"
                        >
                            {'🗑️'}
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div style={{gridColumn: '1 / -1', textAlign:'center', padding:'40px', color:'#666', border:'2px dashed rgba(255,255,255,0.1)', borderRadius:'16px'}}>
                <div style={{fontSize:'30px', marginBottom:'10px'}}>{'👥'}</div>
                <p style={{fontSize:'14px'}}>Data pelanggan tidak ditemukan.</p>
            </div>
        )}
      </div>
    </div>
  )
}