import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar(){
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('userRole')
  const isActive = (path) => location.pathname === path ? 'active' : ''
  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">Zago<span style={{color: '#ff4d4d'}}>.</span></div>
        <nav className="menu">
          {role === 'admin' && (
            <>
              <Link to="/dashboard" className={`menu-item ${isActive('/dashboard')}`}>
                Dashboard
              </Link>
              <Link to="/kelola-baju" className={`menu-item ${isActive('/kelola-baju')}`}>
                Kelola Baju
              </Link>
              <Link to="/data-pelanggan" className={`menu-item ${isActive('/data-pelanggan')}`}>
                Data Pelanggan
              </Link>
            </>
          )}
          {role === 'pelanggan' && (
            <>
              <Link to="/gallery-pelanggan" className={`menu-item ${isActive('/gallery-pelanggan')}`}>
                Gallery
              </Link>
              <Link to="/payment-pelanggan" className={`menu-item ${isActive('/payment-pelanggan')}`}>
                Payment
              </Link>
              <Link to="/status-sewa-pelanggan" className={`menu-item ${isActive('/status-sewa-pelanggan')}`}>
                Status Sewa
              </Link>
            </>
          )}

        </nav>
      </div>
      <div className="logout" onClick={handleLogout} style={{cursor: 'pointer'}}>
        Log Out
      </div>
    </aside>
  )
}