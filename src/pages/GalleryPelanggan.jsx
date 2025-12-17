import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GalleryPelanggan = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (items && items.length > 0) {
      setSelectedItem(items[0]);
    }
  }, [items]);

  const handleSewa = () => {
    if (selectedItem) {
      navigate('/payment-pelanggan', { state: { baju: selectedItem } });
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '90vh',
      gap: '20px',
      color: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
      paddingBottom: '10px',
      borderBottom: '1px solid #333'
    },
    title: { fontSize: '24px', fontWeight: '700', margin: 0 },
    headerIcons: { display: 'flex', alignItems: 'center', gap: '20px' },
    iconBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' },
    
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
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '15px',
      paddingBottom: '20px'
    },
    card: (isActive) => ({
      backgroundColor: isActive ? '#2a2a2a' : '#1e1e1e',
      padding: '12px',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '200px', 
      transition: 'all 0.3s ease',
      border: isActive ? '2px solid #ff4d4d' : '2px solid transparent',
      boxShadow: isActive ? '0 0 15px rgba(255, 77, 77, 0.3)' : '0 4px 6px rgba(0,0,0,0.2)',
      transform: isActive ? 'scale(1.02)' : 'scale(1)',
      position: 'relative',
    }),
    
    imageBox: {
      width: '100%',
      height: '130px', 
      borderRadius: '8px',
      backgroundColor: '#333',
      marginBottom: '10px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '30px'
    },
    imgSmall: { width: '100%', height: '100%', objectFit: 'cover' },

    cardTitle: (isActive) => ({
      color: isActive ? '#fff' : '#ddd',
      fontSize: '13px',
      fontWeight: '600',
      textAlign: 'center',
      margin: '5px 0 0 0',
      lineHeight: '1.4'
    }),
    rightPanel: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      color: '#000',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      height: '100%',
      boxSizing: 'border-box'
    },
    detailLabel: {
      position: 'absolute', top: '15px', right: '15px', background: '#000',
      color: '#fff', padding: '4px 10px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold',
    },
    bigPreviewBox: {
      flex: 1,
      maxHeight: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: '12px',
      margin: '30px 0 15px 0',
      overflow: 'hidden',
      border: '1px solid #ddd'
    },
    imgBig: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '10px' 
    },

    infoContainer: { textAlign: 'center', marginBottom: '10px' },
    
    itemTitleBig: { margin: '0', fontSize: '18px', fontWeight: '800' },
    itemCatBig: { margin: '2px 0', color: '#666', fontSize:'12px' },
    priceTag: { fontSize: '20px', fontWeight: '800', color: '#ff4d4d', margin: '8px 0' },
    
    sewaButton: {
      backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px',
      borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
      width: '100%', transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      marginTop: 'auto'
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>Gallery Baju</h2>
        <div style={styles.headerIcons}>
          <button style={styles.iconBtn}>
            <div style={{textAlign:'right', marginRight:'8px'}}>
              <div style={{fontSize:'14px', fontWeight:'bold'}}>Pelanggan</div>
              <div style={{fontSize:'10px', color:'#ccc'}}>Online</div>
            </div>
            <div style={{width:'35px', height:'35px', background:'#333', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>U</div>
          </button>
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.leftPanel}>
          <div style={styles.grid}>
            {items && items.map((item) => {
              const isActive = selectedItem?.id === item.id;
              return (
                <div 
                  key={item.id} 
                  style={styles.card(isActive)}
                  onClick={() => setSelectedItem(item)}
                >
                  <div style={styles.imageBox}>
                    {item.img ? (
                      <img src={item.img} alt={item.model} style={styles.imgSmall} />
                    ) : (
                      <span>{item.kategori.includes('Wanita') ? '👗' : '👔'}</span>
                    )}
                  </div>

                  <h4 style={styles.cardTitle(isActive)}>{item.model}</h4>
                  <span style={{fontSize:'11px', color: isActive ? '#ccc' : '#666', marginTop:'4px'}}>
                    Stok: {item.stok}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.detailLabel}>Detail</div>
          
          {selectedItem ? (
            <>
              <div style={styles.bigPreviewBox}>
                 {selectedItem.img ? (
                    <img src={selectedItem.img} alt={selectedItem.model} style={styles.imgBig} />
                 ) : (
                    <div style={{fontSize:'60px'}}>
                      {selectedItem.kategori.includes('Wanita') ? '👗' : '👔'}
                    </div>
                 )}
              </div>
              
              <div style={styles.infoContainer}>
                <h2 style={styles.itemTitleBig}>{selectedItem.model}</h2>
                <p style={styles.itemCatBig}>{selectedItem.kategori}</p>
                <div style={styles.priceTag}>{selectedItem.harga}</div>
                <p style={{fontSize:'11px', color: selectedItem.stok > 0 ? 'green' : 'red', fontWeight:'bold', margin:0}}>
                  {selectedItem.stok > 0 ? `Stok Tersedia: ${selectedItem.stok}` : 'Stok Habis'}
                </p>
              </div>

              <button 
                style={{
                  ...styles.sewaButton,
                  opacity: selectedItem.stok > 0 ? 1 : 0.5,
                  cursor: selectedItem.stok > 0 ? 'pointer' : 'not-allowed',
                  transform: selectedItem.stok > 0 ? 'scale(1)' : 'scale(0.98)'
                }}
                onClick={handleSewa}
                disabled={selectedItem.stok <= 0}
                onMouseEnter={(e) => { if(selectedItem.stok>0) e.target.style.background = '#333' }}
                onMouseLeave={(e) => { if(selectedItem.stok>0) e.target.style.background = '#000' }}
              >
                {selectedItem.stok > 0 ? 'Sewa Sekarang' : 'Stok Habis'}
              </button>
            </>
          ) : (
            <div style={{display:'flex', flex:1, alignItems:'center', justifyContent:'center', color:'#888', fontSize:'13px', textAlign:'center'}}>
              Pilih baju untuk melihat detail
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GalleryPelanggan;