import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GalleryPelanggan = ({ items }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['Semua', ...new Set((items || []).map(item => item.kategori))];

  const filteredItems = items.filter(item => {
    const matchCategory = filter === 'Semua' ? true : item.kategori === filter;
    const matchSearch = item.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  useEffect(() => {
    if (filteredItems && filteredItems.length > 0) {
      setSelectedItem(filteredItems[0]);
    } else {
      setSelectedItem(null);
    }
  }, [filter, searchTerm, items]);

  const handleSewa = () => {
    if (selectedItem && selectedItem.stok > 0) {
      navigate('/payment-pelanggan', { state: { baju: selectedItem } });
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '85vh',
      gap: '15px',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '15px',
      flexWrap: 'wrap',
      gap: '10px'
    },
    titleSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: { 
      fontSize: '24px', 
      fontWeight: '800', 
      margin: 0,
      background: 'linear-gradient(90deg, #fff, #aaa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50px',
      padding: '8px 15px',
      border: '1px solid rgba(255,255,255,0.2)',
      width: '250px',
      backdropFilter: 'blur(5px)',
      transition: 'all 0.3s ease',
    },
    searchInput: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      outline: 'none',
      marginLeft: '10px',
      fontSize: '13px',
      width: '100%',
      fontWeight: '500'
    },
    
    filterContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '5px'
    },
    filterBtn: (isActive) => ({
      padding: '6px 16px',
      borderRadius: '50px',
      border: isActive ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.2)',
      background: isActive ? '#ff4d4d' : 'rgba(255,255,255,0.05)',
      color: isActive ? '#fff' : '#aaa',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '12px',
      fontWeight: '600',
      backdropFilter: 'blur(5px)'
    }),

    contentContainer: {
      display: 'flex',
      flex: 1,
      gap: '20px',
      overflow: 'hidden',
    },
    
    leftPanel: {
      flex: 3,
      overflowY: 'auto',
      paddingRight: '10px',
      scrollbarWidth: 'thin',
      scrollbarColor: '#444 #222'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '15px',
      paddingBottom: '20px'
    },
    
    card: (isActive) => ({
      background: isActive ? 'rgba(255, 77, 77, 0.1)' : 'rgba(30, 30, 30, 0.6)',
      padding: '10px',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      border: isActive ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.05)',
      transform: isActive ? 'scale(1.02)' : 'scale(1)',
      position: 'relative',
      backdropFilter: 'blur(10px)'
    }),
    
    imageBox: {
      width: '100%',
      height: '140px',
      borderRadius: '8px',
      backgroundColor: '#2a2a2a',
      marginBottom: '8px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    imgSmall: { width: '100%', height: '100%', objectFit: 'cover' },
    
    stockBadgeSmall: (stok) => ({
      position: 'absolute',
      top: '5px', right: '5px',
      background: stok > 0 ? 'rgba(0,0,0,0.6)' : 'rgba(231, 76, 60, 0.9)',
      color: '#fff', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 'bold'
    }),

    cardTitle: (isActive) => ({
      color: isActive ? '#fff' : '#ddd',
      fontSize: '13px',
      fontWeight: '700',
      textAlign: 'center',
      margin: '5px 0 0 0',
      lineHeight: '1.2'
    }),
    
    rightPanel: {
      flex: 1.1,
      background: 'rgba(255, 255, 255, 0.05)', 
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      height: '100%', 
      boxSizing: 'border-box'
    },
    
    detailLabel: {
      position: 'absolute', top: '15px', right: '15px', 
      background: '#ff4d4d', color: '#fff', 
      padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold',
      letterSpacing: '1px'
    },

    bigPreviewBox: {
      width: '100%',
      flex: 1,
      maxHeight: '280px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: '12px',
      margin: '30px 0 15px 0',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    imgBig: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },

    infoContainer: { textAlign: 'center', marginBottom: '10px' },
    itemTitleBig: { margin: '0', fontSize: '20px', fontWeight: '800', lineHeight: '1.2' },
    itemCatBig: { margin: '5px 0', color: '#aaa', fontSize:'12px', textTransform:'uppercase', letterSpacing:'1px' },
    priceTag: { fontSize: '24px', fontWeight: '800', color: '#ff4d4d', margin: '10px 0' },
    
    sewaButton: (disabled) => ({
      background: disabled ? '#444' : 'linear-gradient(135deg, #ff4d4d, #c0392b)', 
      color: disabled ? '#888' : '#fff', 
      border: 'none', padding: '12px',
      borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', 
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%', transition: 'all 0.3s', 
      boxShadow: disabled ? 'none' : '0 10px 25px rgba(255, 77, 77, 0.3)',
      marginTop: 'auto',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }),
  };
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2 style={styles.title}>Koleksi Baju</h2>
          <span style={{fontSize:'12px', color:'#888'}}>Temukan gaya terbaikmu</span>
        </div>
        <div 
          style={styles.searchBox} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ff4d4d'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
        >
          <span style={{fontSize:'16px'}}>🔍</span>
          <input 
            type="text" 
            placeholder="Cari model baju..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div style={styles.filterContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={styles.filterBtn(filter === cat)}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.leftPanel}>
          {filteredItems && filteredItems.length > 0 ? (
            <div style={styles.grid}>
              {filteredItems.map((item) => {
                const isActive = selectedItem?.id === item.id;
                return (
                  <div 
                    key={item.id} 
                    style={styles.card(isActive)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div style={styles.imageBox}>
                      <span style={styles.stockBadgeSmall(item.stok)}>
                        {item.stok > 0 ? `Stok: ${item.stok}` : 'Habis'}
                      </span>
                      {item.img ? (
                        <img 
                          src={item.img} 
                          alt={item.model} 
                          style={styles.imgSmall} 
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
                        />
                      ) : (
                        <div style={{fontSize:'30px'}}>{item.kategori.includes('Wanita') ? '👗' : '👔'}</div>
                      )}
                    </div>
                    <h4 style={styles.cardTitle(isActive)}>{item.model}</h4>
                    <span style={{fontSize:'11px', color: '#888', marginTop:'2px'}}>
                      {item.harga}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{textAlign:'center', padding:'50px', color:'#666', background:'rgba(255,255,255,0.05)', borderRadius:'12px'}}>
              <div style={{fontSize:'30px', marginBottom:'10px'}}>🕵️</div>
              Maaf, baju yang dicari tidak ditemukan.
            </div>
          )}
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.detailLabel}>PREVIEW</div>
          {selectedItem ? (
            <>
              <div style={styles.bigPreviewBox}>
                 {selectedItem.img ? (
                    <img 
                      src={selectedItem.img} 
                      alt={selectedItem.model} 
                      style={styles.imgBig} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                    />
                 ) : (
                    <div style={{fontSize:'80px'}}>
                      {selectedItem.kategori.includes('Wanita') ? '👗' : '👔'}
                    </div>
                 )}
              </div>
              
              <div style={styles.infoContainer}>
                <h2 style={styles.itemTitleBig}>{selectedItem.model}</h2>
                <p style={styles.itemCatBig}>{selectedItem.kategori}</p>
                <div style={styles.priceTag}>{selectedItem.harga}</div>
                
                <p style={{fontSize:'12px', color: selectedItem.stok > 0 ? '#2ecc71' : '#e74c3c', fontWeight:'bold', margin:'5px 0'}}>
                  {selectedItem.stok > 0 ? `● Stok Tersedia: ${selectedItem.stok}` : '● Stok Habis'}
                </p>
              </div>

              <button 
                style={styles.sewaButton(selectedItem.stok <= 0)}
                onClick={handleSewa}
                disabled={selectedItem.stok <= 0}
              >
                {selectedItem.stok > 0 ? 'SEWA SEKARANG' : 'STOK HABIS'}
              </button>
            </>
          ) : (
            <div style={{display:'flex', flex:1, alignItems:'center', justifyContent:'center', color:'#888', fontSize:'13px'}}>
              Pilih baju
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GalleryPelanggan;