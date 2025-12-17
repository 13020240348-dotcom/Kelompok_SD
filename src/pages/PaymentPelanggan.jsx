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
      kategori: item.kategori,
      tglSewa: formData.tglSewa,
      tglKembali: formData.tglKembali,
      total: formatRupiah(totalHarga),
      status: 'Menunggu Verifikasi',
      statusBayar: 'Belum Lunas',
      metode: paymentCategory === 'bank' ? `Transfer ${selectedMethod.name}` : paymentCategory.toUpperCase(),
      bukti: buktiBayar ? buktiBayar.name : 'Bukti.jpg',
      isRead: false 
    };

    const existingOrders = JSON.parse(localStorage.getItem('riwayatPesanan') || '[]');
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('riwayatPesanan', JSON.stringify(updatedOrders));

    alert("Pesanan Berhasil Dikirim! Menunggu verifikasi admin.");
    navigate('/status-sewa-pelanggan');
  };

  if (!item) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Barang tidak ditemukan. <button onClick={() => navigate('/gallery-pelanggan')}>Kembali</button></div>;

  const styles = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '10px 20px', fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#fff' },
    headerStep: { display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' },
    backBtn: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' },
    gridForm: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' },
    cardDark: { background: '#1e1e1e', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
    label: { display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px', fontWeight: '600' },
    input: { width: '100%', padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: 'white', borderRadius: '6px', marginBottom: '15px', outline: 'none', fontSize: '13px' },
    paymentWrapper: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    totalBig: { fontSize: '24px', fontWeight: '800', color: '#ff4d4d', margin: '0' },
    tabContainer: { display: 'flex', gap: '10px', marginBottom: '15px' },
    tabBtn: (active) => ({
      flex: 1, padding: '10px', background: active ? '#ff4d4d' : '#2a2a2a', 
      color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px'
    }),
    logoGridContainer: { maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' },
    logoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
    logoCard: (active) => ({
      background: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer',
      border: active ? '2px solid #ff4d4d' : '2px solid transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px',
      transition: 'transform 0.2s', transform: active ? 'scale(1.02)' : 'scale(1)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }),
    logoImg: { maxHeight: '30px', maxWidth: '80%', objectFit: 'contain' },
    rekBox: { background: '#252525', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '3px solid #ff4d4d' },
    copyBtn: { marginLeft: '10px', background: '#444', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' },
    qrisContainer: { background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    uploadBox: {
      border: '2px dashed #444', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: '#222', transition: '0.3s'
    },
    btnPrimary: { width: '100%', padding: '12px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' },
    
    summaryImg: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }
  };

  const BankIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>);
  const WalletIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>);
  const QrIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M3 14h7v7H3z"/></svg>);

  return (
    <div style={styles.container}>
      <div style={styles.headerStep}>
        {step === 2 && (
          <button onClick={() => setStep(1)} style={styles.backBtn}>
            &larr; Kembali
          </button>
        )}
        <div style={{marginLeft: 'auto', fontWeight: 'bold', fontSize: '14px', color: '#ff4d4d'}}>
          Langkah {step}/2
        </div>
      </div>

      {step === 1 && (
        <div style={styles.gridForm}>
          <div style={styles.cardDark}>
            <h4 style={{marginTop:0, marginBottom:'15px'}}>Informasi Penyewa</h4>
            
            <label style={styles.label}>NAMA LENGKAP</label>
            <input 
              type="text" 
              name="nama" 
              placeholder="Masukkan nama lengkap..." 
              style={styles.input} 
              onChange={handleInputChange} 
            />
            <label style={styles.label}>NOMOR HP (WhatsApp)</label>
            <input 
              type="tel" 
              name="nomorHp" 
              placeholder="Contoh: 0812xxxxxxxx" 
              style={styles.input} 
              onChange={handleInputChange} 
            />

            <div style={{display:'flex', gap:'15px'}}>
              <div style={{flex:1}}>
                <label style={styles.label}>TANGGAL SEWA</label>
                <input type="date" name="tglSewa" style={styles.input} onChange={handleInputChange} />
              </div>
              <div style={{flex:1}}>
                <label style={styles.label}>TANGGAL KEMBALI</label>
                <input type="date" name="tglKembali" style={styles.input} onChange={handleInputChange} />
              </div>
            </div>
            
            <label style={styles.label}>UPLOAD KTP (WAJIB)</label>
            <input type="file" accept="image/*" style={styles.input} onChange={handleFileChange} />
            
            <label style={styles.label}>METODE PENGAMBILAN</label>
            <div style={{display:'flex', gap:'15px', marginBottom:'15px', fontSize:'13px'}}>
              <label style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer'}}>
                <input type="radio" name="metodeAmbil" value="ambil_ditempat" defaultChecked onChange={handleInputChange} /> Ambil Ditempat
              </label>
              <label style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer'}}>
                <input type="radio" name="metodeAmbil" value="diantar" onChange={handleInputChange} /> Diantar (+Ongkir)
              </label>
            </div>
            
            <label style={styles.label}>CATATAN</label>
            <textarea name="catatan" rows="2" style={{...styles.input, resize:'none', marginBottom:0}} placeholder="Ukuran, dll..." onChange={handleInputChange}></textarea>
          </div>
          
          <div style={styles.cardDark}>
            <h4 style={{marginTop:0, marginBottom:'15px'}}>Ringkasan</h4>
            <div style={{textAlign:'center', padding:'15px', background:'#2a2a2a', borderRadius:'8px', marginBottom:'15px'}}>
              
              {item.img ? (
                <img src={item.img} alt={item.model} style={styles.summaryImg} />
              ) : (
                <div style={{fontSize:'40px'}}>{item.kategori.includes('Wanita') ? '👗' : '👔'}</div>
              )}
              
              <h5 style={{margin:'5px 0', fontSize:'14px'}}>{item.model}</h5>
              <p style={{color:'#888', fontSize:'11px', margin:0}}>{item.kategori}</p>
            </div>
            <label style={styles.label}>JUMLAH SEWA</label>
            <input type="number" name="jumlah" min="1" max={item.stok} value={formData.jumlah} style={styles.input} onChange={handleInputChange} />
            <div style={{borderTop:'1px solid #333', paddingTop:'10px', marginTop:'5px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'16px', fontWeight:'bold'}}>
                <span>Total</span>
                <span style={{color:'#ff4d4d'}}>{formatRupiah(totalHarga)}</span>
              </div>
            </div>
            <button style={styles.btnPrimary} onClick={handleBayarSekarang}>Lanjut Bayar</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={styles.paymentWrapper}>
          <div style={styles.cardDark}>
            <h4 style={{marginTop:0, marginBottom:'15px'}}>Pilih Pembayaran</h4>
            
            <div style={styles.tabContainer}>
              <button style={styles.tabBtn(paymentCategory === 'bank')} onClick={() => setPaymentCategory('bank')}>
                <BankIcon /> Bank
              </button>
              <button style={styles.tabBtn(paymentCategory === 'ewallet')} onClick={() => setPaymentCategory('ewallet')}>
                <WalletIcon /> E-Wallet
              </button>
              <button style={styles.tabBtn(paymentCategory === 'qris')} onClick={() => setPaymentCategory('qris')}>
                <QrIcon /> QRIS
              </button>
            </div>

            <div style={styles.logoGridContainer}>
              {paymentCategory === 'bank' && (
                <div style={styles.logoGrid}>
                  {DATA_BANK.map(bank => (
                    <div key={bank.id} style={styles.logoCard(selectedMethod?.id === bank.id)} onClick={() => setSelectedMethod(bank)}>
                      <img src={bank.logo} alt={bank.name} style={styles.logoImg} />
                    </div>
                  ))}
                </div>
              )}
              {paymentCategory === 'ewallet' && (
                <div style={styles.logoGrid}>
                  {DATA_EWALLET.map(ewallet => (
                    <div key={ewallet.id} style={styles.logoCard(selectedMethod?.id === ewallet.id)} onClick={() => setSelectedMethod(ewallet)}>
                      <img src={ewallet.logo} alt={ewallet.name} style={styles.logoImg} />
                    </div>
                  ))}
                </div>
              )}
              {paymentCategory === 'qris' && (
                <div style={styles.qrisContainer}>
                  <p style={{marginBottom:'5px', fontWeight:'bold', color:'#333', fontSize:'12px'}}>Zago Store QRIS</p>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PembayaranZagoStore" alt="QR Code" style={{width:'150px', height:'150px', borderRadius:'6px', border:'1px solid #ddd'}} />
                  <p style={{fontSize:'11px', color:'#555', marginTop:'10px'}}>Scan dengan E-Wallet apa saja</p>
                </div>
              )}
            </div>

            {selectedMethod && paymentCategory !== 'qris' && (
              <div style={styles.rekBox}>
                <div style={{color:'#888', fontSize:'11px'}}>No. Rekening / VA</div>
                <div style={{fontSize:'16px', fontWeight:'bold', margin:'2px 0', display:'flex', alignItems:'center'}}>
                  {selectedMethod.no}
                  <button style={styles.copyBtn} onClick={() => alert('Nomor disalin!')}>SALIN</button>
                </div>
                <div style={{color:'#aaa', fontSize:'12px'}}>a.n {selectedMethod.an}</div>
              </div>
            )}
          </div>
          <div style={styles.cardDark}>
            <div style={{textAlign:'center', marginBottom:'20px'}}>
              <p style={{color:'#aaa', fontSize:'12px', margin:0}}>Total Tagihan</p>
              <h1 style={styles.totalBig}>{formatRupiah(totalHarga)}</h1>
            </div>

            <label style={styles.label}>UPLOAD BUKTI TRANSFER</label>
            <div style={styles.uploadBox}
                 onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ff4d4d'}
                 onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444'}>
              <input type="file" accept="image/*" onChange={(e) => setBuktiBayar(e.target.files[0])} style={{display:'none'}} id="uploadBukti" />
              <label htmlFor="uploadBukti" style={{cursor:'pointer', width:'100%', display:'block'}}>
                <div style={{fontSize:'28px', marginBottom:'5px'}}>📤</div>
                <div style={{fontSize:'12px', color: buktiBayar ? '#ff4d4d' : '#888', fontWeight: buktiBayar ? 'bold' : 'normal'}}>
                  {buktiBayar ? `${buktiBayar.name.substring(0,15)}...` : "Upload Bukti"}
                </div>
              </label>
            </div>

            <button style={styles.btnPrimary} onClick={handleKonfirmasi}>Konfirmasi Bayar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPelanggan;