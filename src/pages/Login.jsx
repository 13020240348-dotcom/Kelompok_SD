import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    } else {
      alert("Harap isi username dan password!");
    }
  };

  const colors = {
    bg: '#212121',
    highlight: '#2d2d2d',
    shadow: '#151515',
    primaryRed: '#ff4d4d',
    textWhite: '#e0e0e0',
    textGrey: '#888',
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
      fontFamily: "'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },

    orb: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${colors.primaryRed}, transparent)`,
      filter: 'blur(80px)',
      top: '10%',
      left: '20%',
      opacity: 0.3,
      zIndex: 0,
    },
    card: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: '350px',
      padding: '40px',
      borderRadius: '25px',
      backgroundColor: colors.bg,
      boxShadow: `20px 20px 60px ${colors.shadow}, -20px -20px 60px ${colors.highlight}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '10px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: colors.textWhite,
      letterSpacing: '1px',
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: colors.textGrey,
      marginLeft: '10px',
      marginBottom: '8px',
      display: 'block',
      letterSpacing: '1px',
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      borderRadius: '50px',
      border: 'none',
      outline: 'none',
      backgroundColor: colors.bg,
      color: colors.textWhite,
      fontSize: '14px',
      boxShadow: `inset 6px 6px 10px ${colors.shadow}, inset -6px -6px 10px ${colors.highlight}`,
      boxSizing: 'border-box',
    },

    roleContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '10px',
    },
    roleButton: (isSelected) => ({
      flex: 1,
      padding: '12px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      backgroundColor: colors.bg,

      color: isSelected ? colors.primaryRed : colors.textGrey,
      boxShadow: isSelected
        ? `inset 4px 4px 8px ${colors.shadow}, inset -4px -4px 8px ${colors.highlight}`
        : `5px 5px 10px ${colors.shadow}, -5px -5px 10px ${colors.highlight}`,
      transform: isSelected ? 'scale(0.98)' : 'scale(1)',
    }),
    submitButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '50px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      cursor: 'pointer',
      marginTop: '15px',
      background: `linear-gradient(145deg, ${colors.primaryRed}, #cc0000)`,
      boxShadow: isHovered 
        ? `inset 4px 4px 8px rgba(0,0,0,0.2)`
        : `5px 5px 15px ${colors.shadow}, -5px -5px 15px ${colors.highlight}`,
      transition: 'all 0.2s ease',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.orb}></div>

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.title}>ZAGO<span style={{color: colors.primaryRed}}>.</span></div>
          <p style={{fontSize: '12px', color: colors.textGrey, marginTop: '5px'}}>Access Control</p>
        </div>

        <form onSubmit={handleLogin}>
          <div>
            <label style={styles.label}>PILIH AKSES</label>
            <div style={styles.roleContainer}>
              <div 
                style={styles.roleButton(role === 'admin')}
                onClick={() => setRole('admin')}
              >
                ADMIN
              </div>
              <div 
                style={styles.roleButton(role === 'pelanggan')}
                onClick={() => setRole('pelanggan')}
              >
                PELANGGAN
              </div>
            </div>
          </div>

          <div style={{marginTop: '20px'}}>
            <label style={styles.label}>USERNAME</label>
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={{marginTop: '20px'}}>
            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;