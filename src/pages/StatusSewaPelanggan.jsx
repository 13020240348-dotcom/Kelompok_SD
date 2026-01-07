import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StatusSewaPelanggan = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Semua');

  useEffect(() => {
    //Implementasi Queue (Dequeue/proses antrian)
    const savedOrders = localStorage.getItem('riwayatPesanan');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]);
    }
  }, []);

  // --- LOGIKA ASLI (TIDAK DIUBAH) ---
  const checkDeadline = (tglKembali, status) => {
    if (status !== 'Sedang Disewa') return null;
    const today = new Date();
    const due = new Date(tglKembali);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1 && diffDays >= 0) return "⚠️ Waktu pengembalian kurang dari sehari!";
    else if (diffDays < 0) return "🚨 Terlambat! Segera kembalikan baju.";
    return null;
  };

  const getProgressStep = (status) => {
    if (status === 'Menunggu Verifikasi') return 0;
    if (status === 'Sedang Diantar') return 1;
    if (status === 'Sedang Disewa') return 2;
    if (status === 'Selesai') return 3; 
    return 0;
  };

  const filteredOrders = activeTab === 'Semua' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  // Fungsi Tambahan: Hubungi Admin via WA
  const handleContactAdmin = (order) => {
    const message = `Halo Admin, saya ingin tanya status pesanan #${order.id} (${order.baju}).`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Helper Warna Status
  const getStatusColor = (status) => {
    switch(status) {
        case 'Menunggu Verifikasi': return '#f1c40f'; // Kuning
        case 'Sedang Diantar': return '#e67e22'; // Orange
        case 'Sedang Disewa': return '#3498db'; // Biru
        case 'Selesai': return '#2ecc71'; // Hijau
        case 'Ditolak': return '#e74c3c'; // Merah
        default: return '#888';
    }
  };

  // --- STYLING MODERN (GLASSMORPHISM) ---
  const styles = {
    container: { 
      padding: '20px', 
      color: '#fff', 
      fontFamily: "'Inter', sans-serif", 
      maxWidth: '900px', 
      margin: '0 auto',
      minHeight: '80vh'
    },
    header: { 
        marginBottom: '30px', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        paddingBottom: '20px', 
        display:'flex', 
        justifyContent:'space-between', 
        alignItems:'center' 
    },
    title: { 
        fontSize: '28px', 
        fontWeight: '800', 
        margin: 0,
        background: 'linear-gradient(90deg, #fff, #aaa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', 
    },
    backBtn: { 
        background: 'rgba(255,255,255,0.1)', 
        border: 'none', 
        color: '#ccc', 
        cursor: 'pointer', 
        fontSize: '13px', 
        padding: '8px 16px', 
        borderRadius: '20px',
        transition: '0.3s'
    },
    
    // Tabs Modern
    tabContainer: { display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom:'5px' },
    tabBtn: (isActive) => ({
      padding: '8px 20px', 
      background: isActive ? '#ff4d4d' : 'rgba(255,255,255,0.05)',
      color: isActive ? '#fff' : '#888', 
      border: isActive ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.1)', 
      borderRadius: '30px', 
      cursor: 'pointer', 
      fontSize: '13px', 
      fontWeight: '600', 
      whiteSpace: 'nowrap', 
      transition: '0.3s',
      backdropFilter: 'blur(5px)'
    }),

    // Kartu Tiket Modern
    card: { 
      backgroundColor: 'rgba(30, 30, 30, 0.6)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px', 
      marginBottom: '25px', 
      position: 'relative', 
      overflow: 'hidden', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)', 
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column'
    },
    
    // Header Kartu (ID & Status)
    cardHeader: (status) => ({
        padding: '15px 25px',
        background: `linear-gradient(90deg, ${getStatusColor(status)}22, rgba(0,0,0,0))`,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    orderId: { fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color:'#fff' },
    statusBadge: (status) => ({
        background: getStatusColor(status),
        color: '#fff',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: `0 0 10px ${getStatusColor(status)}66`
    }),

    // Body Kartu
    cardBody: { padding: '25px' },
    
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' },
    
    categoryText: { fontSize: '12px', color: '#ff4d4d', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing:'1px', marginBottom:'5px' },
    bajuTitle: { fontSize: '22px', fontWeight: '800', margin: 0, color: '#fff' },
    
    priceTag: { fontSize: '20px', fontWeight: '800', color: '#ff4d4d' },
    paymentStatus: (status) => ({
        fontSize: '11px', 
        color: status === 'Lunas' ? '#2ecc71' : '#e74c3c', 
        fontWeight: 'bold', 
        marginTop: '5px',
        textAlign: 'right'
    }),
    
    infoBox: { 
        fontSize: '13px', 
        color: '#ddd', 
        background: 'rgba(255,255,255,0.05)', 
        padding: '12px 20px', 
        borderRadius: '10px', 
        marginTop: '20px', 
        display: 'flex', 
        gap:'20px', 
        alignItems:'center', 
        border: '1px solid rgba(255,255,255,0.1)' 
    },

    // Stepper Modern
    stepperWrapper: { marginTop: '30px', padding: '0 10px' },
    stepperContainer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' },
    
    lineBackground: { position: 'absolute', top: '20px', left: '20px', right: '20px', height: '3px', background: '#444', zIndex: 0 },
    lineProgress: (progress) => ({
      position: 'absolute', top: '20px', left: '20px', height: '3px', 
      background: 'linear-gradient(90deg, #2ecc71, #00b894)', 
      zIndex: 1, 
      width: progress === 3 ? 'calc(100% - 40px)' : progress >= 1 ? 'calc(50% - 20px)' : '0%',
      transition: 'width 0.6s ease',
      boxShadow: '0 0 10px rgba(46, 204, 113, 0.5)'
    }),

    stepItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '60px' },

    circle: (isActive) => ({
      width: '40px', height: '40px', borderRadius: '50%',
      background: isActive ? '#2ecc71' : '#222',
      border: isActive ? 'none' : '2px solid #555',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '18px',
      boxShadow: isActive ? '0 0 15px rgba(46, 204, 113, 0.5)' : 'none',
      transition: 'all 0.4s', transform: isActive ? 'scale(1.1)' : 'scale(1)',
      marginBottom: '10px'
    }),

    label: (isActive) => ({
      fontSize: '11px', fontWeight: isActive ? 'bold' : 'normal', textAlign: 'center',
      color: isActive ? '#fff' : '#666', transition: 'all 0.3s'
    }),

    // Alerts & Buttons
    alertBox: { marginTop: '20px', padding: '12px', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', borderRadius: '8px', color: '#ff6b6b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' },
    diantarBox: { marginTop: '20px', padding: '12px', background: 'rgba(230, 126, 34, 0.1)', border: '1px solid #e67e22', borderRadius: '8px', color: '#e67e22', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' },
    
    waButton: {
        marginTop: '20px', width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', 
        color: '#ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.3s'
    },

    emptyState: { textAlign: 'center', padding: '60px 20px', color: '#666', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }
  };

  const PackageIcon = () => <span>📦</span>;
  const TruckIcon = () => <span>🚚</span>;
  const TimeIcon = () => <span>⏳</span>;
  const CheckIcon = () => <span>✅</span>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Status Sewa</h2>
          <p style={{color:'#888', fontSize:'13px', margin:'5px 0 0 0'}}>Pantau perjalanan pesanan Anda</p>
        </div>
        <button style={styles.backBtn} onClick={() => navigate('/gallery-pelanggan')}>← Kembali Belanja</button>
      </div>

      {/* TABS */}
      <div style={styles.tabContainer}>
        {['Semua', 'Menunggu Verifikasi', 'Sedang Diantar', 'Sedang Disewa', 'Selesai'].map(tab => (
          <button key={tab} style={styles.tabBtn(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* LIST PESANAN */}
      <div>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => {
            const warningMsg = checkDeadline(order.tglKembali, order.status);
            const currentProgress = getProgressStep(order.status);
            const isDelivery = order.metodeAmbil === 'diantar';
            
            return (
              <div key={index} style={styles.card}>
                
                {/* HEADER TIKET */}
                <div style={styles.cardHeader(order.status)}>
                    <span style={styles.orderId}>ID: #{order.id}</span>
                    <span style={styles.statusBadge(order.status)}>{order.status}</span>
                </div>

                {/* BODY TIKET */}
                <div style={styles.cardBody}>
                    <div style={styles.row}>
                        <div>
                            <div style={styles.categoryText}>{order.kategori}</div>
                            <h3 style={styles.bajuTitle}>{order.baju}</h3>
                        </div>
                        <div>
                            <div style={styles.priceTag}>{order.total}</div>
                            <div style={styles.paymentStatus(order.statusBayar)}>
                                {order.statusBayar ? order.statusBayar.toUpperCase() : 'BELUM LUNAS'}
                            </div>
                        </div>
                    </div>

                    <div style={styles.infoBox}>
                        <div>📅 {order.tglSewa} ➔ {order.tglKembali}</div>
                        <div style={{height:'20px', width:'1px', background:'#444'}}></div>
                        <div>{isDelivery ? '🚚 Diantar Kurir' : '🏬 Ambil Ditempat'}</div>
                    </div>

                    {/* STEPPER PROGRESS */}
                    {order.status !== 'Menunggu Verifikasi' && order.status !== 'Ditolak' ? (
                      <div style={styles.stepperWrapper}>
                        <div style={styles.stepperContainer}>
                          <div style={styles.lineBackground}></div>
                          <div style={styles.lineProgress(currentProgress)}></div>
                          
                          {/* Step 1 */}
                          <div style={styles.stepItem}>
                            <div style={styles.circle(currentProgress >= 1)}>
                              {isDelivery ? <TruckIcon /> : <PackageIcon />}
                            </div>
                            <span style={styles.label(currentProgress >= 1)}>{isDelivery ? 'Dikirim' : 'Siap'}</span>
                          </div>

                          {/* Step 2 */}
                          <div style={styles.stepItem}>
                            <div style={styles.circle(currentProgress >= 2)}>
                              {currentProgress >= 2 ? <CheckIcon /> : <TimeIcon />}
                            </div>
                            <span style={styles.label(currentProgress >= 2)}>Disewa</span>
                          </div>

                          {/* Step 3 */}
                          <div style={styles.stepItem}>
                            <div style={styles.circle(currentProgress === 3)}>
                               <CheckIcon />
                            </div>
                            <span style={styles.label(currentProgress === 3)}>Selesai</span>
                          </div>

                        </div>
                      </div>
                    ) : (
                        order.status === 'Menunggu Verifikasi' && (
                            <div style={{marginTop:'20px', textAlign:'center', padding:'15px', background:'rgba(241, 196, 15, 0.1)', border:'1px dashed #f1c40f', borderRadius:'10px'}}>
                                <span style={{fontSize:'20px'}}>⏳</span>
                                <div style={{fontSize:'13px', color:'#f1c40f', fontWeight:'bold', marginTop:'5px'}}>Menunggu Konfirmasi Admin</div>
                            </div>
                        )
                    )}

                    {/* ALERT BOXES */}
                    {order.status === 'Sedang Diantar' && (
                      <div style={styles.diantarBox}>
                        <span>🚚</span> Kurir sedang dalam perjalanan menuju lokasi Anda.
                      </div>
                    )}
                    {warningMsg && (
                      <div style={styles.alertBox}>
                        <span>⚠️</span> {warningMsg}
                      </div>
                    )}

                    {/* HUBUNGI ADMIN */}
                    <button 
                        style={styles.waButton} 
                        onClick={() => handleContactAdmin(order)}
                        onMouseEnter={(e) => { e.target.style.borderColor='#25D366'; e.target.style.color='#25D366'; }}
                        onMouseLeave={(e) => { e.target.style.borderColor='rgba(255,255,255,0.2)'; e.target.style.color='#ccc'; }}
                    >
                        💬 Hubungi Admin via WhatsApp
                    </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyState}>
            <div style={{fontSize:'40px', marginBottom:'15px'}}>📭</div>
            <p style={{margin:0, fontWeight:'bold', fontSize:'16px'}}>Belum ada riwayat pesanan.</p>
            <p style={{fontSize:'13px', marginTop:'5px'}}>Sewa baju adat favoritmu sekarang!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusSewaPelanggan;