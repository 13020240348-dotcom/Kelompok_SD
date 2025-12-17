import React, { useState, useEffect } from 'react';

const StatusSewaPelanggan = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Semua');

  useEffect(() => {
    const savedOrders = localStorage.getItem('riwayatPesanan');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]);
    }
  }, []);

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
    if (status === 'Sedang Disewa') return 1; 
    if (status === 'Selesai') return 3; 
    return 0;
  };

  const steps = [
    { label: "Siap Diambil", stepIndex: 1, icon: "📦" },
    { label: "Kembalikan", stepIndex: 2, icon: "⏳" },
    { label: "Selesai", stepIndex: 3, icon: "✨" },
  ];

  const filteredOrders = activeTab === 'Semua' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const styles = {
    container: { padding: '20px', color: '#fff', fontFamily: "'Segoe UI', sans-serif", maxWidth: '1000px', margin: '0 auto' },
    header: { marginBottom: '25px', borderBottom: '1px solid #333', paddingBottom: '15px' },
    
    tabContainer: { display: 'flex', gap: '12px', marginBottom: '30px', overflowX: 'auto', paddingBottom:'5px' },
    tabBtn: (isActive) => ({
      padding: '10px 20px', 
      background: isActive ? 'linear-gradient(135deg, #ff4d4d, #c0392b)' : '#2a2a2a',
      color: isActive ? '#fff' : '#888', 
      border: 'none',
      borderRadius: '30px', 
      cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', transition: '0.3s',
      boxShadow: isActive ? '0 4px 15px rgba(255, 77, 77, 0.4)' : 'none'
    }),
    card: { 
      backgroundColor: '#1e1e1e', borderRadius: '16px', padding: '25px', marginBottom: '25px', 
      borderLeft: 'none',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      border: '1px solid #333'
    },
    statusBar: (status) => ({
      position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
      background: status === 'Selesai' ? '#2ecc71' : status === 'Sedang Disewa' ? '#3498db' : '#f1c40f'
    }),

    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' },
    bajuTitle: { fontSize: '20px', fontWeight: '800', margin: 0, color: '#fff', letterSpacing: '0.5px' },
    subText: { fontSize: '13px', color: '#aaa', marginTop: '4px' },
    
    priceTag: { fontSize: '18px', fontWeight: 'bold', color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', padding: '5px 10px', borderRadius: '8px' },
    dateBox: { fontSize: '13px', color: '#ddd', background: '#333', padding: '8px 15px', borderRadius: '8px', marginTop: '15px', display: 'inline-block', border: '1px solid #444' },

    stepperWrapper: {
      marginTop: '30px', padding: '20px', background: '#252525', borderRadius: '12px',
      position: 'relative', border: '1px solid #333'
    },
    stepperContainer: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2
    },
    
    lineBackground: {
      position: 'absolute', top: '50%', left: '40px', right: '40px', height: '4px', background: '#444', transform: 'translateY(-50%)', zIndex: 1, borderRadius: '4px'
    },
    lineProgress: (progress) => ({
      position: 'absolute', top: '50%', left: '40px', height: '4px', 
      background: 'linear-gradient(90deg, #2ecc71, #00b894)', 
      transform: 'translateY(-50%)', zIndex: 1, borderRadius: '4px',
      width: progress === 3 ? 'calc(100% - 80px)' : progress === 1 ? 'calc(50% - 40px)' : '0%',
      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 10px rgba(46, 204, 113, 0.5)'
    }),

    stepItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 },

    circle: (isActive, isCompleted) => ({
      width: '45px', height: '45px', borderRadius: '50%',
      background: isCompleted || isActive ? 'linear-gradient(135deg, #2ecc71, #27ae60)' : '#333',
      border: isCompleted || isActive ? 'none' : '2px solid #555',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '20px',
      boxShadow: isCompleted || isActive ? '0 0 20px rgba(46, 204, 113, 0.6)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      transform: isActive ? 'scale(1.1)' : 'scale(1)',
      cursor: 'default'
    }),

    label: (isActive, isCompleted) => ({
      marginTop: '12px', fontSize: '12px', fontWeight: isActive || isCompleted ? 'bold' : 'normal',
      color: isActive || isCompleted ? '#fff' : '#666',
      transition: 'all 0.3s'
    }),

    alertBox: { marginTop: '20px', padding: '12px', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', borderRadius: '8px', color: '#ff6b6b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' },
    emptyState: { textAlign: 'center', padding: '60px 20px', color: '#666', border: '2px dashed #444', borderRadius: '16px', background: '#252525' }
  };

  const PackageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.78 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path><polyline points="2.32 6.16 12 11 21.68 6.16"></polyline><line x1="12" y1="22.76" x2="12" y2="11"></line></svg>;
  
  const TimeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
  
  const CheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin:0, fontSize: '28px'}}>Status Sewa</h2>
        <p style={{color:'#888', fontSize:'14px', marginTop:'5px'}}>Pantau perjalanan pesanan Anda secara real-time.</p>
      </div>

      <div style={styles.tabContainer}>
        {['Semua', 'Menunggu Verifikasi', 'Sedang Disewa', 'Selesai'].map(tab => (
          <button key={tab} style={styles.tabBtn(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => {
            const warningMsg = checkDeadline(order.tglKembali, order.status);
            const currentProgress = getProgressStep(order.status);
            
            return (
              <div key={index} style={styles.card}>
                <div style={styles.statusBar(order.status)}></div>
                <div style={styles.row}>
                  <div>
                    <h3 style={styles.bajuTitle}>{order.baju}</h3>
                    <div style={styles.subText}>{order.kategori} • #{order.id}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={styles.priceTag}>{order.total}</div>
                    <div style={{fontSize:'12px', color: order.statusBayar==='Lunas'?'#2ecc71':'#e74c3c', marginTop:'6px', fontWeight:'bold'}}>
                      {order.statusBayar ? order.statusBayar.toUpperCase() : 'BELUM LUNAS'}
                    </div>
                  </div>
                </div>

                <div style={styles.dateBox}>
                  📅 Sewa: {order.tglSewa} <span style={{color:'#666', margin:'0 8px'}}>s/d</span> {order.tglKembali}
                </div>

                {order.status !== 'Menunggu Verifikasi' ? (
                  <div style={styles.stepperWrapper}>
                    <div style={styles.lineBackground}></div>
                    <div style={styles.lineProgress(currentProgress)}></div>
                    <div style={styles.stepperContainer}>
                      <div style={styles.stepItem}>
                        <div style={styles.circle(currentProgress >= 1, currentProgress >= 1)}>
                          {currentProgress >= 1 ? <PackageIcon /> : <span style={{fontSize:'14px'}}>1</span>}
                        </div>
                        <span style={styles.label(currentProgress >= 1, currentProgress >= 1)}>Diambil</span>
                      </div>
                      <div style={styles.stepItem}>
                        <div style={styles.circle(currentProgress >= 2, currentProgress >= 2)}>
                          {currentProgress >= 2 ? <CheckIcon /> : <TimeIcon />}
                        </div>
                        <span style={styles.label(currentProgress >= 2, currentProgress >= 2)}>Kembalikan</span>
                      </div>
                      <div style={styles.stepItem}>
                        <div style={styles.circle(currentProgress === 3, currentProgress === 3)}>
                           <CheckIcon />
                        </div>
                        <span style={styles.label(currentProgress === 3, currentProgress === 3)}>Selesai</span>
                      </div>
                    </div>
                  </div>
                ) : (
                   <div style={{marginTop:'25px', textAlign:'center', padding:'20px', background:'rgba(241, 196, 15, 0.05)', border:'1px dashed #f1c40f', borderRadius:'12px'}}>
                      <div style={{fontSize:'30px', marginBottom:'10px'}}>⏳</div>
                      <div style={{color:'#f1c40f', fontWeight:'bold'}}>Menunggu Konfirmasi Admin</div>
                      <div style={{fontSize:'12px', color:'#aaa', marginTop:'5px'}}>
                        Kami sedang mengecek pembayaran Anda. Mohon tunggu sebentar.
                      </div>
                   </div>
                )}

                {warningMsg && (
                  <div style={styles.alertBox}>
                    <span style={{fontSize:'18px'}}>⚠️</span> {warningMsg}
                  </div>
                )}
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