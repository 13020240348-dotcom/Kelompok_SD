import React, { useState } from 'react'

export default function KelolaBaju({ items, addItem, editItem, deleteItem }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    id: null,
    model: '',
    kategori: '',
    harga: '',
    stok: '',
    img: ''
  })
  const filteredItems = items.filter(item => 
    item.model.toLowerCase().includes(search.toLowerCase()) ||
    item.kategori.toLowerCase().includes(search.toLowerCase())
  )
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result })
      }
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
    globalTopbar: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid #222' },
    adminProfile: { display: 'flex', alignItems: 'center', gap: '15px', color: 'white' },
    adminAvatar: { width: '35px', height: '35px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    
    pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingTop: '10px' },
    pageTitle: { fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 },
    
    controlsWrapper: { display: 'flex', gap: '15px', alignItems: 'center' },
    btnAdd: { background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
    
    searchBox: { display: 'flex', alignItems: 'center', background: '#000', border: '1px solid #333', borderRadius: '6px', padding: '8px 12px', width: '250px' },
    inputSearch: { background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '14px' },
    
    panelDark: { background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333', overflowX: 'auto' },
    
    table: { width: '100%', borderCollapse: 'collapse', color: '#ddd', minWidth: '600px' },
    th: { textAlign: 'left', padding: '15px', borderBottom: '1px solid #333', color: '#888', fontSize: '13px' },
    td: { padding: '15px', borderBottom: '1px solid #2a2a2a', fontSize: '14px' },
    imgPreview: { width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover', background: '#333' },
    
    btnEdit: { padding: '6px 12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontSize: '12px', fontWeight:'bold' },
    btnDelete: { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight:'bold' },

    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { background: '#1e1e1e', padding: '30px', borderRadius: '12px', width: '500px', maxWidth:'90%', border: '1px solid #444', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '8px', fontSize: '12px', color: '#aaa', fontWeight:'bold' },
    inputForm: { width: '100%', padding: '12px', background: '#2a2a2a', border: '1px solid #444', color: 'white', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' }
  }

  return (
    <>
      <div style={styles.globalTopbar}>
         <div style={styles.adminProfile}>
            <span style={{fontSize:'18px', cursor:'pointer'}}>🔔</span>
            <div style={styles.adminAvatar}>A</div>
            <span>Admin</span>
         </div>
      </div>
      <main className="content" style={{padding: '30px'}}>
        <div style={styles.pageHeader}>
          <h2 style={styles.pageTitle}>Kelola Baju</h2>
          <div style={styles.controlsWrapper}>
            <button style={styles.btnAdd} onClick={openAddModal}>
                <span>+</span> Tambah Baju
            </button>
            <div style={styles.searchBox}>
              <input style={styles.inputSearch} value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari Model..." />
              <span style={{color: '#57a6ff'}}>🔍</span>
            </div>
          </div>
        </div>
        <div style={styles.panelDark}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Gambar</th>
                <th style={styles.th}>Model Baju</th>
                <th style={styles.th}>Kategori</th>
                <th style={styles.th}>Harga Sewa</th>
                <th style={styles.th}>Stok</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>
                    {item.img ? <img src={item.img} alt="img" style={styles.imgPreview} /> : <div style={{...styles.imgPreview, display:'flex', alignItems:'center', justifyContent:'center'}}>👗</div>}
                  </td>
                  <td style={styles.td}><strong style={{color:'white'}}>{item.model}</strong></td>
                  <td style={styles.td}>{item.kategori}</td>
                  <td style={styles.td} style={{color: '#2ecc71', fontWeight:'bold'}}>{item.harga}</td>
                  <td style={styles.td}>{item.stok} Pcs</td>
                  <td style={styles.td}>
                    <button style={styles.btnEdit} onClick={() => openEditModal(item)}>✏️ Edit</button>
                    <button style={styles.btnDelete} onClick={() => { if(window.confirm('Yakin hapus?')) deleteItem(item.id) }}>🗑️ Hapus</button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr><td colSpan="6" style={{textAlign:'center', padding:'40px', color:'#666'}}>Tidak ada data baju.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={{marginTop:0, marginBottom:'20px'}}>{isEditing ? '✏️ Edit Data' : '➕ Tambah Baru'}</h2>
              <form onSubmit={handleSubmit}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>NAMA MODEL</label>
                    <input name="model" value={formData.model} onChange={handleChange} style={styles.inputForm} placeholder="Contoh: Jas Tutup..." autoFocus />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>KATEGORI</label>
                    <select name="kategori" value={formData.kategori} onChange={handleChange} style={styles.inputForm}>
                      <option value="">- Pilih -</option>
                      <option value="Pria/Adat">Pria/Adat</option>
                      <option value="Wanita/Adat">Wanita/Adat</option>
                      <option value="Anak-anak">Anak-anak</option>
                    </select>
                  </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>HARGA (RP)</label>
                    <input name="harga" value={formData.harga} onChange={handleChange} style={styles.inputForm} placeholder="Rp..." />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>STOK</label>
                    <input name="stok" type="number" value={formData.stok} onChange={handleChange} style={styles.inputForm} placeholder="0" />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>GAMBAR (URL/UPLOAD)</label>
                  <input name="img" value={formData.img} onChange={handleChange} style={{...styles.inputForm, marginBottom:'10px'}} placeholder="Paste URL Gambar..." />
                  <div style={{background:'#2a2a2a', padding:'10px', borderRadius:'6px', border:'1px dashed #555', textAlign:'center'}}>
                    <input type="file" onChange={handleImageUpload} style={{fontSize:'12px', color:'#ccc'}} />
                  </div>
                </div>
                {formData.img && <div style={{textAlign:'center', marginBottom:'15px'}}><img src={formData.img} alt="Preview" style={{height:'80px', borderRadius:'6px'}} /></div>}
                
                <div style={styles.modalActions}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{padding:'12px 24px', background:'transparent', border:'1px solid #555', color:'white', borderRadius:'8px', cursor:'pointer'}}>Batal</button>
                  <button type="submit" style={{padding:'12px 24px', background:'#ff4d4d', border:'none', color:'white', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  )
}