import React, { useState, useRef } from 'react'

export default function ModalCreate({ open, onClose, onAdd }){
  const [photo, setPhoto] = useState('')
  const [model, setModel] = useState('')
  const [kategori, setKategori] = useState('Wanita/baju')
  const [stok, setStok] = useState(1)
  const [harga, setHarga] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const fileRef = useRef()

  function onFile(e){
    const f = e.target.files && e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = ev => setPhoto(ev.target.result)
    reader.readAsDataURL(f)
  }

  function formatRupiah(input) {
    if (!input && input !== 0) return ''
    const digits = String(input).replace(/\D/g, '')
    if (!digits) return ''
    return 'Rp.' + Number(digits).toLocaleString('id-ID')
  }

  function parseToNumber(formatted) {
    if (!formatted) return 0
    const digits = String(formatted).replace(/\D/g, '')
    return Number(digits) || 0
  }

  function submit(e){
    e.preventDefault()
    if(!model) return alert('Isi model')
    onAdd({ photo, model, kategori, stok, harga: formatRupiah(harga), hargaValue: parseToNumber(harga), deskripsi })
    // reset
    setPhoto('')
    setModel('')
    setKategori('Wanita/baju')
    setStok(1)
    setHarga('')
    setDeskripsi('')
    if(fileRef.current) fileRef.current.value = ''
  }

  if(!open) return null

  function onHargaChange(e){
    const raw = e.target.value
    const digits = raw.replace(/\D/g, '')
    setHarga(formatRupiah(digits))
  }

  return (
    <div className="modal" role="dialog">
      <div className="modal-panel">
        <div className="modal-header">
          <h3>Tambah Baju</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="create-form" onSubmit={submit}>
          <label className="field">
            <span>Foto</span>
            <div className="file-preview" onClick={()=>fileRef.current && fileRef.current.click()}>
              {photo ? <img src={photo} alt="preview" /> : <div className="placeholder">Klik untuk upload</div>}
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} />
            </div>
          </label>

          <label className="field">
            <span>Model</span>
            <input value={model} onChange={e=>setModel(e.target.value)} placeholder="Nama model / judul" />
          </label>

          <label className="field">
            <span>Kategori</span>
            <select value={kategori} onChange={e=>setKategori(e.target.value)}>
              <option>Wanita/baju</option>
              <option>Pria/Atasan</option>
              <option>Anak</option>
              <option>Lainnya</option>
            </select>
          </label>

          <div className="row">
            <label className="field small">
              <span>Stok</span>
              <input type="number" value={stok} onChange={e=>setStok(e.target.value)} min="0" />
            </label>
                <label className="field small">
              <span>Harga</span>
              <input value={harga} onChange={onHargaChange} placeholder="Rp. ..." />
            </label>
          </div>

          <label className="field">
            <span>Deskripsi</span>
            <textarea value={deskripsi} onChange={e=>setDeskripsi(e.target.value)} rows={3}></textarea>
          </label>

          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
