import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('userRole', role);
        if (role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/home-pelanggan');
        }
        setLoading(false);
      }, 1000); 
    } else {
      alert("Harap isi username dan password!");
    }
  };
  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');

    body { margin: 0; overflow: hidden; }

    /* Background Aurora Bergerak */
    .aurora-bg {
      background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a2e);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: -2;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Efek Floating Blobs */
    .blob {
      position: absolute;
      filter: blur(80px);
      z-index: -1;
      opacity: 0.6;
      animation: floatBlob 10s infinite alternate;
    }
    .blob-1 { top: 10%; left: 10%; width: 300px; height: 300px; background: #ff4d4d; animation-delay: 0s; }
    .blob-2 { bottom: 20%; right: 10%; width: 350px; height: 350px; background: #8e44ad; animation-delay: 2s; }
    .blob-3 { bottom: 10%; left: 30%; width: 200px; height: 200px; background: #3498db; animation-delay: 4s; }

    @keyframes floatBlob {
      from { transform: translate(0, 0) scale(1); }
      to { transform: translate(30px, -50px) scale(1.1); }
    }

    /* Input Focus Effect */
    .modern-input:focus {
      background: rgba(255, 255, 255, 0.15) !important;
      border-color: #ff4d4d !important;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    /* Loading Spinner */
    .spinner {
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top: 3px solid #fff;
      width: 20px; height: 20px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `;
  const styles = {
    container: {
      minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'hidden'
    },
    glassCard: {
      position: 'relative', width: '100%', maxWidth: '380px', padding: '45px 35px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', gap: '25px',
      transform: 'translateY(0)', transition: 'all 0.3s'
    },
    header: { textAlign: 'center' },
    logoText: { fontSize: '36px', fontWeight: '800', color: '#fff', letterSpacing: '-1px', marginBottom: '5px' },
    logoDot: { color: '#ff4d4d' },
    subText: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: '400' },
    roleWrapper: {
      background: 'rgba(0,0,0,0.2)', borderRadius: '50px', padding: '5px',
      display: 'flex', position: 'relative', border: '1px solid rgba(255,255,255,0.05)'
    },
    roleBtn: (isActive) => ({
      flex: 1, padding: '10px', borderRadius: '50px', border: 'none', cursor: 'pointer',
      fontSize: '12px', fontWeight: 'bold', transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      background: isActive ? '#ff4d4d' : 'transparent',
      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
      boxShadow: isActive ? '0 5px 15px rgba(255, 77, 77, 0.4)' : 'none',
      transform: isActive ? 'scale(1.05)' : 'scale(1)'
    }),
    label: { fontSize: '11px', color: '#ccc', fontWeight: '600', marginBottom: '8px', display: 'block', marginLeft: '5px', textTransform: 'uppercase', letterSpacing: '1px' },
    input: {
      width: '100%', padding: '16px 20px', borderRadius: '14px',
      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
      color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    submitBtn: {
      width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
      background: 'linear-gradient(135deg, #ff4d4d, #c0392b)',
      color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(255, 77, 77, 0.3)',
      marginTop: '10px', transition: 'all 0.3s',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
    }
  };
  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>
      <div className="aurora-bg"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div style={styles.glassCard}>
        <div style={styles.header}>
          <div style={styles.logoText}>ZAGO<span style={styles.logoDot}>.</span></div>
          <p style={styles.subText}>Selamat datang kembali, silakan masuk.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={styles.roleWrapper}>
            <button 
              type="button"
              style={styles.roleBtn(role === 'admin')}
              onClick={() => setRole('admin')}
            >
              ADMIN
            </button>
            <button 
              type="button"
              style={styles.roleBtn(role === 'pelanggan')}
              onClick={() => setRole('pelanggan')}
            >
              PELANGGAN
            </button>
          </div>
          <div style={{marginTop: '25px'}}>
            <label style={styles.label}>Username</label>
            <input 
              className="modern-input"
              type="text" 
              placeholder="Ketik username Anda..." 
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{marginTop: '20px'}}>
            <label style={styles.label}>Password</label>
            <input 
              className="modern-input"
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            style={styles.submitBtn}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 77, 77, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 77, 77, 0.3)'; }}
          >
            {loading ? <div className="spinner"></div> : 'MASUK SEKARANG'}
          </button>
        </form>
        <div style={{textAlign:'center', fontSize:'12px', color:'rgba(255,255,255,0.3)', marginTop:'10px'}}>
          &copy; 2025 Zago Store System
        </div>
      </div>
    </div>
  );
};

export default Login;