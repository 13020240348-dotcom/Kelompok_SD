import React, { useState, useEffect } from 'react'

export default function DataPelanggan() {
  const [customers, setCustomers] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')

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

  return (
    <>
      <style>{`
        .custom-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-top: 10px;
        }
        .page-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin: 0;
        }
        .search-group {
          display: flex;
          gap: 15px;
        }
        .search-box {
          display: flex;
          align-items: center;
          background: #000;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 8px 12px;
          width: 220px;
        }
        .search-box input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          margin-left: 10px;
          outline: none;
          font-size: 14px;
        }
        .search-box input::placeholder { color: #666; }
        .icon-search { color: #666; font-size: 16px; }
        .icon-action { color: #fff; cursor: pointer; margin-left: 5px; }

        .status-ok { color: #4ade80; font-weight: bold; font-size: 13px; } /* Hijau */
        .status-warn { color: #fbbf24; font-weight: bold; font-size: 13px; } /* Kuning */
        .status-danger { color: #ef4444; font-weight: bold; font-size: 13px; } /* Merah */
        
        .items-table { width: 100%; border-collapse: collapse; color: #ccc; }
        .items-table th { text-align: left; padding: 15px; border-bottom: 1px solid #333; color: #888; font-size: 13px; }
        .items-table td { padding: 15px; border-bottom: 1px solid #222; font-size: 14px; }
        
        .small-btn { padding: 6px 12px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; margin-right: 8px; transition: 0.2s; }
        .small-btn:hover { opacity: 0.8; }
        .del { background: transparent; color: #ef4444; border: 1px solid #ef4444; }
        .del:hover { background: #ef4444; color: white; }
        
        .pager { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
        .arrow { background: #222; color: white; border: 1px solid #333; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
      `}</style>

      <div style={{display:'flex', justifyContent:'flex-end', padding:'15px 30px', borderBottom:'1px solid #222'}}>
         <div className="avatar" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
            <span>🔔</span>
            <div style={{width:'30px', height:'30px', background:'#333', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>A</div>
            <span>Admin</span>
         </div>
      </div>

      <main className="content" style={{padding: '30px'}}>
        <div className="custom-header">
          <h2 className="page-title">Data Pelanggan</h2>
          
          <div className="search-group">
            <div className="search-box">
              <span className="icon-search">📞</span>
              <input 
                value={searchPhone} 
                onChange={e => setSearchPhone(e.target.value)} 
                placeholder="Cari nomor..." 
              />
              <span className="icon-action">🔍</span>
            </div>
            <div className="search-box">
              <span className="icon-search">👤</span>
              <input 
                value={searchName} 
                onChange={e => setSearchName(e.target.value)} 
                placeholder="Cari nama..." 
              />
              <span className="icon-action">🔍</span>
            </div>
          </div>
        </div>

        <div className="panel" style={{background:'#1a1a1a', border:'none', borderRadius:'12px', padding:'5px', boxShadow:'0 4px 10px rgba(0,0,0,0.3)'}}>
          <div className="table-wrap">
            <table className="items-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Nomor</th>
                  <th>Verifikasi KTP</th>
                  <th>Sewa Aktif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((c, index) => (
                    <tr key={index}>
                      <td>{c.id}</td>
                      <td style={{color: c.isBlacklist ? '#ef4444' : 'white', fontWeight: 'bold'}}>
                        {c.nama} {c.isBlacklist ? '(BLACKLIST)' : ''}
                      </td>
                      <td>{c.nomor}</td>
                      <td className={c.isBlacklist ? 'status-danger' : 'status-ok'}>
                        {c.verifikasi}
                      </td>
                      <td className={c.sewaAktif > 0 ? 'status-ok' : 'status-warn'}>
                        {c.sewaAktif > 0 ? `${c.sewaAktif} Item` : '0 Item'}
                      </td>
                      
                      <td className="actions">
                        <button className="small-btn" style={{background:'white', color:'black', fontWeight:'bold'}} onClick={() => alert(`Detail Pelanggan: ${c.nama}`)}>Lihat</button>
                        <button className="small-btn del" onClick={() => handleDelete(c.nama)}>Hapus</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{textAlign:'center', padding:'40px', color:'#666'}}>
                      Belum ada data pelanggan yang tersimpan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pager">
              <button className="arrow">←</button>
              <button className="arrow">→</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}