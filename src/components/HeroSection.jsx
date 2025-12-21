import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUWnnq0cTvwft9wRcYkuVLJRHP_5bU-v7yQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ45i7w9_HguxYE0DxynDBLh78e1lW3IshEQ&s',
    'https://bams.jambiprov.go.id/wp-content/uploads/2023/04/pantai-losari.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const styles = {
    heroContainer: {
      position: 'relative',
      height: '92vh', 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff',
      backgroundImage: `url('${images[currentImageIndex]}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '0px', 
      boxShadow: 'none',
      marginTop: '0px',
      transition: 'background-image 1s ease-in-out',
      backgroundColor: '#222'
    },
    overlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
      zIndex: 1
    },
    content: {
      position: 'relative',
      zIndex: 2,
      padding: '20px',
      maxWidth: '800px'
    },
    chip: {
      display: 'inline-block',
      padding: '8px 16px',
      background: 'rgba(255, 77, 77, 0.2)',
      border: '1px solid #ff4d4d',
      borderRadius: '30px',
      color: '#ff4d4d',
      fontWeight: 'bold',
      fontSize: '12px',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      backdropFilter: 'blur(5px)'
    },
    title: {
      fontSize: 'clamp(36px, 6vw, 72px)', 
      fontWeight: '900',
      marginBottom: '20px',
      textShadow: '2px 2px 15px rgba(0,0,0,0.9)',
      lineHeight: '1.1'
    },
    subtitle: {
      fontSize: 'clamp(16px, 2vw, 24px)',
      marginBottom: '40px',
      color: '#f0f0f0',
      fontWeight: '400',
      maxWidth: '600px',
      margin: '0 auto 50px auto',
      textShadow: '1px 1px 5px rgba(0,0,0,0.5)'
    },
    ctaButton: {
      padding: '18px 50px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#fff',
      background: 'linear-gradient(135deg, #ff4d4d, #c0392b)',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(255, 77, 77, 0.4)',
      transition: 'all 0.3s',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    dotsContainer: {
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px',
      zIndex: 3
    },
    dot: (active) => ({
      width: active ? '35px' : '10px',
      height: '10px',
      background: active ? '#ff4d4d' : 'rgba(255,255,255,0.3)',
      borderRadius: '5px',
      transition: 'all 0.3s',
      cursor: 'pointer'
    })
  };

  return (
    <div style={styles.heroContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.chip}>Warisan Sulawesi Selatan</div>
        <h1 style={styles.title}>
          Keanggunan Budaya,<br /> Kebanggaan Kita.
        </h1>
        <p style={styles.subtitle}>
          Jelajahi keindahan Baju Bodo, Jas Tutup, dan busana lainnya. 
          Sewa mudah, lestarikan budaya dengan gaya.
        </p>
        <button 
          style={styles.ctaButton}
          onClick={() => navigate('/gallery-pelanggan')} 
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05) translateY(-3px)';
            e.target.style.boxShadow = '0 15px 35px rgba(255, 77, 77, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(255, 77, 77, 0.4)';
          }}
        >
          Lihat Koleksi Baju ➜
        </button>
      </div>
      <div style={styles.dotsContainer}>
        {images.map((_, idx) => (
          <div 
            key={idx} 
            style={styles.dot(idx === currentImageIndex)}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroSection;