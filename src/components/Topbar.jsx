import React from 'react'

export default function Topbar({ title = "Kelola Baju", onOpenCreate, query, setQuery }){
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{title}</h2>
      </div>
      {onOpenCreate && (
        <div className="topbar-right">
          <button className="btn add-btn" onClick={onOpenCreate}>+ Tambah Baju</button>

          <div className="search">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari Baju" />
            <button className="search-btn">🔍</button>
          </div>

          <button className="icon-btn" title="Notifikasi" aria-label="notifikasi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8"></path><path d="M13.73 21a2 2 0 01-3.46 0"></path></svg>
          </button>

          <div className="avatar">
            <div className="avatar-pic">A</div>
            <div className="avatar-name">Admin</div>
          </div>
        </div>
      )}
    </header>
  )
}
