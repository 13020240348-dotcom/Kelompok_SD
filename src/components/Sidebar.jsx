import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar(){
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('userRole')
  
  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }
  const styles = {
    sidebar: {
      width: '260px',
      background: '#1E1E1E',
      borderRight: '1px solid #333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '30px 20px',
      minHeight: '100vh',
      position: 'sticky',
      top: 0
    },
    brand: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '50px',
      paddingLeft: '10px',
      letterSpacing: '1px'
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    menuItem: (path) => {
      const isActive = location.pathname === path;
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 15px',
        textDecoration: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        background: isActive ? 'linear-gradient(90deg, #ff4d4d, #c0392b)' : 'transparent',
        color: isActive ? '#fff' : '#888',
        boxShadow: isActive ? '0 4px 15px rgba(255, 77, 77, 0.3)' : 'none'
      }
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 15px',
      cursor: 'pointer',
      color: '#e74c3c',
      fontWeight: 'bold',
      marginTop: 'auto',
      borderRadius: '12px',
      transition: '0.2s',
      background: 'rgba(231, 76, 60, 0.1)'
    }
  }

  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.brand}>
          Zago<span style={{color: '#ff4d4d'}}>.</span>
        </div>
        <nav style={styles.menu}>
          {role === 'admin' && (
            <>
              <Link to="/dashboard" style={styles.menuItem('/dashboard')}>
                <span>📊</span> Dashboard
              </Link>
              <Link to="/kelola-baju" style={styles.menuItem('/kelola-baju')}>
                <span>👕</span> Kelola Baju
              </Link>
              <Link to="/data-pelanggan" style={styles.menuItem('/data-pelanggan')}>
                <span>👥</span> Data Pelanggan
              </Link>
            </>
          )}
          {role === 'pelanggan' && (
            <>
              <Link to="/home-pelanggan" style={styles.menuItem('/home-pelanggan')}>
                <span>🏠</span> Home
              </Link>
              <Link to="/gallery-pelanggan" style={styles.menuItem('/gallery-pelanggan')}>
                <span>👗</span> Koleksi Baju
              </Link>
              <Link to="/status-sewa-pelanggan" style={styles.menuItem('/status-sewa-pelanggan')}>
                <span>📦</span> Status Sewa
              </Link>
            </>
          )}
        </nav>
      </div>
      <div 
        style={styles.logoutBtn} 
        onClick={handleLogout}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'}
      >
        <span>🚪</span> Log Out
      </div>
    </aside>
  )
}