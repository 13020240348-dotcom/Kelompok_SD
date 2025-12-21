import React, { useState } from 'react'

export default function KelolaBaju({ items, addItem, editItem, deleteItem }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [formData, setFormData] = useState({
    id: null, model: '', kategori: '', harga: '', stok: '', img: ''
  })
  const filteredItems = items.filter(item => 
    item.model.toLowerCase().includes(search.toLowerCase()) ||
    item.kategori.toLowerCase().includes(search.toLowerCase())
  )
  const lowStockItems = items.filter(item => parseInt(item.stok) < 3);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFormData({ ...formData, img: reader.result })
      reader.readAsDataURL(file)
    }
  }
  const openAddModal = () => {
    setFormData({ id: null, model: '', kategori: '', harga: '', stok: '', img: '' })
    setIsEditing(false)
    setIsModalOpen(true)
  }
  const openEditModal = (item) => {
    setFormData(item)
    setIsEditing(true)
    setIsModalOpen(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.model || !formData.harga) return alert("Nama dan Harga wajib diisi!")

    if (isEditing) {
      editItem(formData) 
      alert("✅ Data berhasil diperbarui!")
    } else {
      addItem(formData) 
      alert("✅ Baju baru ditambahkan!")
    }
    setIsModalOpen(false)
  }
  const styles = {
    container: { padding: '30px', color: '#fff', fontFamily: "'Inter', sans-serif", minHeight: '100vh' },
    topbar: { 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', 
      background: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(10px)',
      padding: '20px 30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' 
    },
    pageTitle: { fontSize: '24px', fontWeight: '800', margin: 0, background: 'linear-gradient(90deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    profileArea: { display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' },
    notifBtn: { background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', position: 'relative', padding: '5px', transition:'transform 0.2s' },
    badge: { position: 'absolute', top: '-2px', right: '-2px', background: '#ff4d4d', color: 'white', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border:'2px solid #1e1e1e' },
    notifDropdown: { 
      position: 'absolute', top: '50px', right: '0', width: '300px', background: 'rgba(30,30,30,0.95)', 
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', zIndex: 100, backdropFilter:'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' 
    },
    notifItem: { padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems:'center' },
    adminBadge: { display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' },
    avatar: { width: '32px', height: '32px', background: 'linear-gradient(135deg, #ff4d4d, #c0392b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', boxShadow:'0 4px 10px rgba(255,77,77,0.3)' },
    controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
    searchBox: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 15px', width: '350px', transition: '0.3s' },
    input: { background: 'transparent', border: 'none', color: '#fff', marginLeft: '10px', width: '100%', outline: 'none', fontSize:'14px' },
    btnAdd: { 
      background: 'linear-gradient(135deg, #ff4d4d, #c0392b)', color: 'white', border: 'none', 
      padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', 
      boxShadow: '0 4px 15px rgba(255, 77, 77, 0.3)', transition: 'transform 0.2s', display: 'flex', gap: '10px', alignItems: 'center', fontSize:'14px'
    },
    tableContainer: { background: 'rgba(30, 30, 30, 0.6)', backdropFilter:'blur(10px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { background: 'rgba(255,255,255,0.02)', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    th: { textAlign: 'left', padding: '18px', color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight:'700' },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.03)', transition: '0.2s' },
    td: { padding: '15px 18px', verticalAlign: 'middle', fontSize:'14px' },
    imgPreview: { width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover', background: '#333', border: '1px solid rgba(255,255,255,0.1)' },
    stockBadge: (stok) => ({
      padding: '4px 10px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold',
      background: stok < 3 ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)',
      color: stok < 3 ? '#e74c3c' : '#2ecc71',
      border: stok < 3 ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid rgba(46, 204, 113, 0.3)'
    }),
    actionBtn: (type) => ({
      padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginLeft: '8px',
      background: type === 'edit' ? 'rgba(241, 196, 15, 0.1)' : 'rgba(231, 76, 60, 0.1)',
      color: type === 'edit' ? '#f1c40f' : '#e74c3c',
      border: type === 'edit' ? '1px solid rgba(241, 196, 15, 0.2)' : '1px solid rgba(231, 76, 60, 0.2)',
      transition: '0.2s'
    }),
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modal: { background: '#1E1E1E', padding: '30px', borderRadius: '20px', width: '550px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' },
    modalTitle: { margin: '0 0 25px 0', fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', fontWeight:'800' },
    label: { display: 'block', marginBottom: '8px', fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginTop: '15px', textTransform:'uppercase', letterSpacing:'0.5px' },
    inputForm: { width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', outline: 'none', fontSize:'14px', boxSizing:'border-box' },
    modalBtnGroup: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }
  }
  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <div>
           <h2 style={styles.pageTitle}>Inventory Baju</h2>
           <p style={{fontSize:'12px', color:'#888', margin:'5px 0 0 0'}}>Kelola stok dan data produk di sini.</p>
        </div>
        <div style={styles.profileArea}>
          <div style={{position: 'relative'}}>
            <button 
                style={styles.notifBtn} 
                onClick={() => setShowNotif(!showNotif)}
                onMouseEnter={(e) => e.target.style.transform='scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform='scale(1)'}
            >
              🔔
              {lowStockItems.length > 0 && (
                <span style={styles.badge}>{lowStockItems.length}</span>
              )}
            </button>
            {showNotif && (
              <div style={styles.notifDropdown}>
                <h4 style={{margin: '0 0 15px 0', color: '#fff', fontSize: '14px', borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:'10px'}}>⚠️ Peringatan Stok Menipis</h4>
                {lowStockItems.length > 0 ? (
                  lowStockItems.map(i => (
                    <div key={i.id} style={styles.notifItem}>
                      <span style={{color:'#ddd'}}>{i.model}</span>
                      <span style={{color: '#ff4d4d', fontWeight: 'bold', fontSize:'12px', background:'rgba(255,77,77,0.1)', padding:'2px 8px', borderRadius:'4px'}}>Sisa {i.stok}</span>
                    </div>
                  ))
                ) : (
                  <div style={{color: '#888', fontSize: '13px', textAlign: 'center', padding: '10px'}}>Semua stok aman terkendali.</div>
                )}
              </div>
            )}
          </div>
          <div style={styles.adminBadge}>
            <div style={styles.avatar}>A</div>
            <span style={{fontSize: '13px', fontWeight: '600'}}>Super Admin</span>
          </div>
        </div>
      </div>
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <span style={{color: '#888', fontSize:'18px'}}>🔍</span>
          <input 
            style={styles.input} 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Cari nama baju atau kategori..." 
          />
        </div>
        <button 
          style={styles.btnAdd} 
          onClick={openAddModal}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <span>➕</span> Tambah Produk Baru
        </button>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Gambar</th>
              <th style={styles.th}>Detail Produk</th>
              <th style={styles.th}>Kategori</th>
              <th style={styles.th}>Harga Sewa</th>
              <th style={styles.th}>Status Stok</th>
              <th style={{...styles.th, textAlign: 'right', paddingRight: '30px'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id} style={styles.tr}>
                <td style={styles.td}>
                  {item.img ? (
                      <img src={item.img} alt="img" style={styles.imgPreview} onError={(e)=>{e.target.onerror=null; e.target.src='https://via.placeholder.com/50'}} />
                  ) : (
                      <div style={{...styles.imgPreview, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px'}}>👗</div>
                  )}
                </td>
                <td style={styles.td}>
                  <div style={{fontWeight: '700', fontSize: '14px', color:'#fff'}}>{item.model}</div>
                  <div style={{fontSize: '11px', color: '#888', marginTop:'2px'}}>ID: {item.id}</div>
                </td>
                <td style={styles.td}>
                  <span style={{background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.05)'}}>
                      {item.kategori}
                  </span>
                </td>
                <td style={styles.td} style={{color: '#f1c40f', fontWeight: 'bold'}}>{item.harga}</td>
                <td style={styles.td}>
                  <span style={styles.stockBadge(item.stok)}>
                      {item.stok < 3 ? `⚠️ Sisa ${item.stok}` : `✅ ${item.stok} Unit`}
                  </span>
                </td>
                <td style={{...styles.td, textAlign: 'right'}}>
                  <button style={styles.actionBtn('edit')} onClick={() => openEditModal(item)} title="Edit Data">✏️</button>
                  <button style={styles.actionBtn('delete')} onClick={() => { if(window.confirm('Yakin hapus data ini?')) deleteItem(item.id) }} title="Hapus Permanen">🗑️</button>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'60px', color:'#666', fontSize:'14px'}}>Data tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>{isEditing ? '✏️ Edit Data Baju' : '➕ Tambah Baju Baru'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div>
                  <label style={styles.label}>NAMA MODEL</label>
                  <input name="model" value={formData.model} onChange={handleChange} style={styles.inputForm} placeholder="Nama baju..." autoFocus />
                </div>
                <div>
                  <label style={styles.label}>KATEGORI</label>
                  <select name="kategori" value={formData.kategori} onChange={handleChange} style={styles.inputForm}>
                    <option value="">- Pilih Kategori -</option>
                    <option value="Pria/Adat">Pria/Adat</option>
                    <option value="Wanita/Adat">Wanita/Adat</option>
                    <option value="Anak-anak">Anak-anak</option>
                  </select>
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div>
                  <label style={styles.label}>HARGA SEWA (RP)</label>
                  <input name="harga" value={formData.harga} onChange={handleChange} style={styles.inputForm} placeholder="Contoh: Rp 150.000" />
                </div>
                <div>
                  <label style={styles.label}>STOK AWAL (PCS)</label>
                  <input name="stok" type="number" value={formData.stok} onChange={handleChange} style={styles.inputForm} placeholder="0" />
                </div>
              </div>
              <div>
                <label style={styles.label}>GAMBAR PRODUK</label>
                <input name="img" value={formData.img} onChange={handleChange} style={{...styles.inputForm, marginBottom:'10px'}} placeholder="Paste URL Gambar di sini..." />
                <div style={{background:'rgba(255,255,255,0.02)', padding:'15px', borderRadius:'10px', border:'1px dashed #555', textAlign:'center', cursor:'pointer'}}>
                  <input type="file" onChange={handleImageUpload} style={{fontSize:'12px', color:'#aaa'}} />
                  <div style={{fontSize:'10px', color:'#666', marginTop:'5px'}}>atau upload file dari komputer</div>
                </div>
              </div>
              {formData.img && (
                  <div style={{textAlign:'center', marginTop:'20px'}}>
                      <img src={formData.img} alt="Preview" style={{height:'100px', borderRadius:'8px', border:'1px solid #444', boxShadow:'0 5px 15px rgba(0,0,0,0.5)'}} />
                  </div>
              )}
              <div style={styles.modalBtnGroup}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{padding:'10px 25px', background:'transparent', border:'1px solid #555', color:'#ccc', borderRadius:'8px', cursor:'pointer', fontSize:'13px'}}>Batal</button>
                <button type="submit" style={{padding:'10px 30px', background:'linear-gradient(135deg, #ff4d4d, #c0392b)', border:'none', color:'white', borderRadius:'8px', cursor:'pointer', fontWeight:'bold', boxShadow:'0 5px 15px rgba(255, 77, 77, 0.3)'}}>Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}