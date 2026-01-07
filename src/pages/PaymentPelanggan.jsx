import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPelanggan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.baju;
  const [step, setStep] = useState(1);
  const [paymentCategory, setPaymentCategory] = useState('bank'); 
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [buktiBayar, setBuktiBayar] = useState(null);
  const [formData, setFormData] = useState({
    nama: '', 
    nomorHp: '',
    tglSewa: '', 
    tglKembali: '', 
    jumlah: 1, 
    metodeAmbil: 'ambil_ditempat', 
    catatan: '', 
    ktpFile: null,
  });

  const DATA_BANK = [
    { id: 'bca', name: 'BCA', no: '883-098-7712', an: 'ZAGO OFFICIAL', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
    { id: 'mandiri', name: 'Mandiri', no: '122-000-981-223', an: 'ZAGO OFFICIAL', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
    { id: 'bri', name: 'BRI', no: '3321-01-0022-50-3', an: 'ZAGO OFFICIAL', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg' },
    { id: 'bsi', name: 'BSI', no: '771-223-4455', an: 'ZAGO OFFICIAL', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg' },
  ];

  const DATA_EWALLET = [
    { id: 'gopay', name: 'GoPay', no: '0812-3456-7890', an: 'Zago Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
    { id: 'ovo', name: 'OVO', no: '0812-3456-7890', an: 'Zago Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
    { id: 'dana', name: 'DANA', no: '0812-3456-7890', an: 'Zago Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
    { id: 'shopee', name: 'ShopeePay', no: '0812-3456-7890', an: 'Zago Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg' },
  ];

  const parsePrice = (priceString) => item ? parseInt(priceString.replace(/[^0-9]/g, '')) : 0;
  const hargaSatuan = item ? parsePrice(item.harga) : 0;
  const totalHarga = hargaSatuan * formData.jumlah;
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, ktpFile: e.target.files[0] });
  
  const handleBayarSekarang = () => {
    // --- VALIDASI STOK (FIX LOGIC) ---
    const currentStok = parseInt(item.stok || 0);
    const requestJumlah = parseInt(formData.jumlah || 1);
    
    if (requestJumlah > currentStok) {
      alert(`Stok tidak mencukupi! Tersisa hanya ${currentStok} pcs.`);
      return; // Berhenti di sini, jangan lanjut
    }
    // ----------------------------------

    if (!formData.nama || !formData.nomorHp || !formData.tglSewa || !formData.tglKembali || !formData.ktpFile) {
      alert("Mohon lengkapi Nama, Nomor HP, Tanggal, dan Upload KTP!");
      return;
    }
    setStep(2);
  };

  const handleKonfirmasi = () => {
    if ((paymentCategory !== 'qris' && !selectedMethod) || !buktiBayar) {
      alert("Pilih metode pembayaran dan upload bukti bayar!");
      return;
    }
    const newOrder = {
      id: `INV-${Date.now()}`,
      namaPenyewa: formData.nama, 
      nomorHp: formData.nomorHp,
      baju: item.model,
      idBaju: item.id,
      kategori: item.kategori,
      tglSewa: formData.tglSewa,
      tglKembali: formData.tglKembali,
      jumlahSewa: formData.jumlah,
      total: formatRupiah(totalHarga),
      metodeAmbil: formData.metodeAmbil, 
      status: 'Menunggu Verifikasi',
      statusBayar: 'Belum Lunas',
      metode: paymentCategory === 'bank' ? `Transfer ${selectedMethod.name}` : paymentCategory.toUpperCase(),
      bukti: buktiBayar ? buktiBayar.name : 'Bukti.jpg',
      isRead: false 
    };
    const existingOrders = JSON.parse(localStorage.getItem('riwayatPesanan') || '[]');
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('riwayatPesanan', JSON.stringify(updatedOrders));
    const existingDataBaju = JSON.parse(localStorage.getItem('dataBaju') || '[]');
    const updatedDataBaju = existingDataBaju.map(baju => {
      if (baju.id === item.id) {
        const stokLama = parseInt(baju.stok);
        const jumlahSewa = parseInt(formData.jumlah);
        const sisaStok = stokLama - jumlahSewa;
        return { ...baju, stok: sisaStok < 0 ? 0 : sisaStok }; 
      }
      return baju;
    });
    localStorage.setItem('dataBaju', JSON.stringify(updatedDataBaju));
    alert("Pesanan Berhasil! Stok baju telah dikurangi.");
    window.location.href = '/status-sewa-pelanggan'; 
  };
  if (!item) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Barang tidak ditemukan. <button onClick={() => navigate('/gallery-pelanggan')} style={{padding:'8px 16px', background:'#ff4d4d', border:'none', color:'white', borderRadius:'5px', cursor:'pointer', marginTop:'10px'}}>Kembali ke Gallery</button></div>;
  const styles = {
    container: { 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: "'Inter', sans-serif", 
      color: '#fff',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column'
    },
    headerStep: { 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '20px', 
      paddingBottom: '15px', 
      borderBottom: '1px solid rgba(255,255,255,0.1)' 
    },
    backBtn: { 
      background: 'rgba(255,255,255,0.1)', 
      border: 'none', 
      color: '#ddd', 
      cursor: 'pointer', 
      fontSize: '14px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '20px',
      transition: '0.3s'
    },
    gridForm: { 
      display: 'grid', 
      gridTemplateColumns: '1.6fr 1fr', 
      gap: '25px',
    },
    cardGlass: { 
      background: 'rgba(30, 30, 30, 0.6)', 
      padding: '30px', 
      borderRadius: '20px', 
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    title: { marginTop: 0, marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', color:'#fff', letterSpacing:'0.5px' },
    label: { display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' },
    input: { 
      width: '100%', padding: '12px 15px', background: 'rgba(0,0,0,0.3)', 
      border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', 
      marginBottom: '20px', outline: 'none', fontSize: '14px', boxSizing: 'border-box',
      transition: 'border 0.3s'
    },
    summaryBox: { textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '20px' },
    summaryImg: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' },
    paymentWrapper: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
    totalBig: { fontSize: '32px', fontWeight: '800', color: '#ff4d4d', margin: '5px 0' },
    tabContainer: { display: 'flex', gap: '10px', marginBottom: '20px', background: 'rgba(0,0,0,0.2)', padding:'5px', borderRadius:'12px' },
    tabBtn: (active) => ({
      flex: 1, padding: '10px', background: active ? '#ff4d4d' : 'transparent', 
      color: active ? 'white' : '#888', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px'
    }),
    
    logoGridContainer: { maxHeight: '320px', overflowY: 'auto', paddingRight: '5px' },
    logoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
    logoCard: (active) => ({
      background: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer',
      border: active ? '2px solid #ff4d4d' : '2px solid transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px',
      transition: 'transform 0.2s, box-shadow 0.2s', 
      transform: active ? 'scale(1.02)' : 'scale(1)',
      boxShadow: active ? '0 5px 15px rgba(255,77,77,0.2)' : 'none'
    }),
    logoImg: { maxHeight: '35px', maxWidth: '80%', objectFit: 'contain' },
    
    rekBox: { 
      background: 'rgba(255, 77, 77, 0.1)', padding: '15px', borderRadius: '12px', marginTop: '20px', 
      border: '1px solid rgba(255, 77, 77, 0.3)', position: 'relative' 
    },
    copyBtn: { marginLeft: '10px', background: 'rgba(0,0,0,0.4)', border: 'none', color: 'white', padding: '4px 10px', borderRadius: '20px', cursor: 'pointer', fontSize: '10px', fontWeight:'bold' },
    
    qrisContainer: { background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    
    uploadBox: {
      border: '2px dashed rgba(255,255,255,0.2)', padding: '30px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', transition: '0.3s'
    },
    btnPrimary: { 
      width: '100%', padding: '15px', background: 'linear-gradient(135deg, #ff4d4d, #c0392b)', 
      color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', 
      cursor: 'pointer', marginTop: '20px', boxShadow: '0 10px 20px rgba(255, 77, 77, 0.3)',
      transition: 'transform 0.2s'
    },
  };

  const BankIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>);
  const WalletIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>);
  const QrIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M3 14h7v7H3z"/></svg>);

  return (
    <div style={styles.container}>
      <div style={styles.headerStep}>
        {step === 2 ? (
           <button onClick={() => setStep(1)} style={styles.backBtn} onMouseEnter={(e) => e.target.style.background='rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.target.style.background='rgba(255,255,255,0.1)'}>&larr; Kembali ke Data Diri</button>
        ) : (
           <div style={{color:'#888', fontSize:'14px'}}>Isi data diri penyewa</div>
        )}
        <div style={{marginLeft: 'auto', fontWeight: 'bold', fontSize: '14px', color: step === 1 ? '#fff' : '#ff4d4d', background: step === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,77,77,0.1)', padding:'5px 12px', borderRadius:'20px'}}>
          Langkah {step}/2
        </div>
      </div>
      {step === 1 && (
        <div style={styles.gridForm}>
          <div style={styles.cardGlass}>
            <h4 style={styles.title}>Informasi Penyewa</h4>
            <label style={styles.label}>NAMA LENGKAP</label>
            <input type="text" name="nama" placeholder="Masukkan nama lengkap..." style={styles.input} onChange={handleInputChange} value={formData.nama} />           
            <label style={styles.label}>NOMOR HP (WhatsApp)</label>
            <input type="tel" name="nomorHp" placeholder="Contoh: 0812xxxxxxxx" style={styles.input} onChange={handleInputChange} value={formData.nomorHp} />           
            <div style={{display:'flex', gap:'20px'}}>
              <div style={{flex:1}}>
                  <label style={styles.label}>TANGGAL SEWA</label>
                  <input type="date" name="tglSewa" style={styles.input} onChange={handleInputChange} value={formData.tglSewa} />
              </div>
              <div style={{flex:1}}>
                  <label style={styles.label}>TANGGAL KEMBALI</label>
                  <input type="date" name="tglKembali" style={styles.input} onChange={handleInputChange} value={formData.tglKembali} />
              </div>
            </div>
            <label style={styles.label}>UPLOAD FOTO KTP (WAJIB)</label>
            <input type="file" accept="image/*" style={styles.input} onChange={handleFileChange} />
            <label style={styles.label}>METODE PENGAMBILAN</label>
            <div style={{display:'flex', gap:'20px', marginBottom:'20px', fontSize:'14px'}}>
              <label style={{display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', padding:'10px', background:'rgba(255,255,255,0.05)', borderRadius:'10px', flex:1}}>
                  <input type="radio" name="metodeAmbil" value="ambil_ditempat" checked={formData.metodeAmbil === 'ambil_ditempat'} onChange={handleInputChange} /> 
                  Ambil Ditempat
              </label>
              <label style={{display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', padding:'10px', background:'rgba(255,255,255,0.05)', borderRadius:'10px', flex:1}}>
                  <input type="radio" name="metodeAmbil" value="diantar" checked={formData.metodeAmbil === 'diantar'} onChange={handleInputChange} /> 
                  Diantar (+Ongkir)
              </label>
            </div>
            <label style={styles.label}>CATATAN TAMBAHAN</label>
            <textarea name="catatan" rows="2" style={{...styles.input, resize:'none', marginBottom:0}} placeholder="Ukuran baju, request khusus, dll..." onChange={handleInputChange} value={formData.catatan}></textarea>
          </div>
          <div style={styles.cardGlass}>
            <h4 style={styles.title}>Ringkasan Pesanan</h4>
            <div style={styles.summaryBox}>
              {item.img ? <img src={item.img} alt={item.model} style={styles.summaryImg} /> : <div style={{fontSize:'60px', marginBottom:'20px'}}>{item.kategori.includes('Wanita') ? '👗' : '👔'}</div>}
              <h5 style={{margin:'5px 0', fontSize:'16px', fontWeight:'bold'}}>{item.model}</h5>
              <p style={{color:'#aaa', fontSize:'12px', margin:0}}>{item.kategori}</p>
            </div>
            <label style={styles.label}>JUMLAH SEWA (Stok: {item.stok})</label>
            <input type="number" name="jumlah" min="1" max={item.stok} value={formData.jumlah} style={styles.input} onChange={handleInputChange} /> 
            <div style={{borderTop:'1px dashed rgba(255,255,255,0.2)', paddingTop:'15px', marginTop:'10px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'18px', fontWeight:'bold'}}>
                <span>Total Bayar</span><span style={{color:'#ff4d4d'}}>{formatRupiah(totalHarga)}</span>
              </div>
            </div>
            <button 
                style={styles.btnPrimary} 
                onClick={handleBayarSekarang}
                onMouseEnter={(e) => e.target.style.transform='scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform='scale(1)'}
            >
                Lanjut ke Pembayaran ➔
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div style={styles.paymentWrapper}>
          <div style={styles.cardGlass}>
            <h4 style={styles.title}>Pilih Metode Pembayaran</h4>
            <div style={styles.tabContainer}>
              <button style={styles.tabBtn(paymentCategory === 'bank')} onClick={() => setPaymentCategory('bank')}><BankIcon /> Bank Transfer</button>
              <button style={styles.tabBtn(paymentCategory === 'ewallet')} onClick={() => setPaymentCategory('ewallet')}><WalletIcon /> E-Wallet</button>
              <button style={styles.tabBtn(paymentCategory === 'qris')} onClick={() => setPaymentCategory('qris')}><QrIcon /> QRIS</button>
            </div>
            <div style={styles.logoGridContainer}>
              {paymentCategory === 'bank' && <div style={styles.logoGrid}>{DATA_BANK.map(bank => <div key={bank.id} style={styles.logoCard(selectedMethod?.id === bank.id)} onClick={() => setSelectedMethod(bank)}><img src={bank.logo} alt={bank.name} style={styles.logoImg} /></div>)}</div>}
              {paymentCategory === 'ewallet' && <div style={styles.logoGrid}>{DATA_EWALLET.map(ewallet => <div key={ewallet.id} style={styles.logoCard(selectedMethod?.id === ewallet.id)} onClick={() => setSelectedMethod(ewallet)}><img src={ewallet.logo} alt={ewallet.name} style={styles.logoImg} /></div>)}</div>}
              {paymentCategory === 'qris' && (
                  <div style={styles.qrisContainer}>
                      <p style={{marginBottom:'10px', fontWeight:'bold', fontSize:'14px'}}>Zago Store QRIS</p>
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PembayaranZagoStore" alt="QR Code" style={{width:'180px', height:'180px', borderRadius:'8px', border:'1px solid #ddd'}} />
                      <p style={{fontSize:'12px', color:'#666', marginTop:'15px'}}>Scan menggunakan GoPay, OVO, Dana, atau Mobile Banking</p>
                  </div>
              )}
            </div>
            {selectedMethod && paymentCategory !== 'qris' && (
              <div style={styles.rekBox}>
                <div style={{color:'#ff4d4d', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>NO. REKENING / VIRTUAL ACCOUNT</div>
                <div style={{fontSize:'20px', fontWeight:'bold', margin:'5px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    {selectedMethod.no}
                    <button style={styles.copyBtn} onClick={() => alert('Nomor disalin!')}>SALIN</button>
                </div>
                <div style={{color:'#aaa', fontSize:'12px'}}>a.n {selectedMethod.an}</div>
              </div>
            )}
          </div>
          <div style={styles.cardGlass}>
            <div style={{textAlign:'center', marginBottom:'30px', background:'rgba(255,255,255,0.05)', padding:'20px', borderRadius:'15px'}}>
              <p style={{color:'#aaa', fontSize:'13px', margin:0, textTransform:'uppercase', letterSpacing:'1px'}}>Total Tagihan Anda</p>
              <h1 style={styles.totalBig}>{formatRupiah(totalHarga)}</h1>
            </div>

            <label style={styles.label}>UPLOAD BUKTI TRANSFER</label>
            <div 
                style={styles.uploadBox} 
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ff4d4d'} 
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              <input type="file" accept="image/*" onChange={(e) => setBuktiBayar(e.target.files[0])} style={{display:'none'}} id="uploadBukti" />
              <label htmlFor="uploadBukti" style={{cursor:'pointer', width:'100%', display:'block'}}>
                <div style={{fontSize:'32px', marginBottom:'10px'}}>📤</div>
                <div style={{fontSize:'14px', color: buktiBayar ? '#ff4d4d' : '#888', fontWeight: buktiBayar ? 'bold' : 'normal'}}>
                    {buktiBayar ? `File Terpilih: ${buktiBayar.name}` : "Klik untuk Upload Bukti Bayar"}
                </div>
              </label>
            </div>
            <button 
                style={styles.btnPrimary} 
                onClick={handleKonfirmasi}
                onMouseEnter={(e) => e.target.style.transform='scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform='scale(1)'}
            >
                Konfirmasi Pembayaran ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPelanggan;