import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import KelolaBaju from './pages/KelolaBaju'
import DataPelanggan from './pages/DataPelanggan'
import GalleryPelanggan from './pages/GalleryPelanggan'
import PaymentPelanggan from './pages/PaymentPelanggan'
import StatusSewaPelanggan from './pages/StatusSewaPelanggan'
import HeroSection from './components/HeroSection'
import LinkedListVisualizer, { activityManager } from './structures/SingleLinkedList.jsx'

const initialItems = [
  { id: 'B100', model: 'Baju Bodo Navy Modern', kategori: 'Wanita/Adat', stok: 12, harga: 'Rp. 100.000', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Baju_Bodo.jpg' },
  { id: 'B101', model: 'Jas Tutup Burgundy', kategori: 'Pria/Adat', stok: 10, harga: 'Rp. 150.000', img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Jas_Tutup.jpg' },
  { id: 'B102', model: 'Kebaya Labbu Premium', kategori: 'Wanita/Adat', stok: 5, harga: 'Rp. 250.000', img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Kebaya_Indonesia.jpg' },
]

const initialCustomers = [
  { id: 'P100', nama: 'Dika', nomor: '0812-xxxx', verifikasi: 'KTP OK', aktif: '2 Item' },
  { id: 'P101', nama: 'Siti', nomor: '0813-xxxx', verifikasi: 'KTP OK', aktif: '1 Item' },
]

const AppLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const userRole = localStorage.getItem('userRole'); 

  useEffect(() => {
    let pageName = path;
    if (path === '/') pageName = 'Login Page';
    else if (path === '/dashboard') pageName = 'Halaman Dashboard';
    else if (path === '/kelola-baju') pageName = 'Kelola Baju';
    else if (path === '/data-pelanggan') pageName = 'Data Pelanggan';
    else if (path === '/home-pelanggan') pageName = 'Home Pelanggan';
    else if (path === '/gallery-pelanggan') pageName = 'Gallery';
    else if (path === '/payment-pelanggan') pageName = 'Pembayaran';
    else if (path === '/status-sewa-pelanggan') pageName = 'Status Sewa';
    
    activityManager.addLog(`Membuka ${pageName}`);
  }, [path]);

  if (path === '/') return <>{children}</>;
  
  const adminPages = ['/dashboard', '/kelola-baju', '/data-pelanggan'];
  
  if (userRole === 'pelanggan' && adminPages.includes(path)) {
    return <Navigate to="/home-pelanggan" replace />;
  }
  
  const customerPages = ['/home-pelanggan', '/gallery-pelanggan', '/payment-pelanggan', '/status-sewa-pelanggan'];
  
  if (userRole === 'admin' && customerPages.includes(path)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="app" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212', color:'#fff' }}>
      <Sidebar />
      <div className="main-area" style={{ flex: 1, position: 'relative', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{flex: 1}}>
           {children}
        </div>
        {path !== '/' && (
           <div style={{padding: '0 20px 20px 20px'}}>
             <LinkedListVisualizer />
           </div>
        )}
      </div>
    </div>
  );
};

export default function App(){
  const [items, setItems] = useState(() => {
    const savedNew = localStorage.getItem('dataBaju');
    if (savedNew) return JSON.parse(savedNew);
    const savedOld = localStorage.getItem('items');
    if (savedOld) return JSON.parse(savedOld);
    return initialItems;
  })

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers')
    return saved ? JSON.parse(saved) : initialCustomers
  })

  useEffect(() => {
    localStorage.setItem('dataBaju', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers))
  }, [customers])

  function handleAddItem(newItem){
    const itemWithId = { ...newItem, id: `B-${Date.now()}` };
    setItems(prev => [itemWithId, ...prev]);
  }
  function handleEditItem(updatedItem){
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  }
  function handleDeleteItem(id){
    setItems(prev => prev.filter(i => i.id !== id));
  }
  function handleDeleteCustomer(id){
    setCustomers(prev => prev.filter(c => c.id !== id));
  }
  const containerStyle = { maxWidth:'1200px', margin:'0 auto', padding: '20px 30px' };

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<div style={containerStyle}><Dashboard items={items} customers={customers} /></div>} />
          <Route path="/kelola-baju" element={<div style={containerStyle}><KelolaBaju items={items} addItem={handleAddItem} editItem={handleEditItem} deleteItem={handleDeleteItem} /></div>} />
          <Route path="/data-pelanggan" element={<div style={containerStyle}><DataPelanggan customers={customers} onDelete={handleDeleteCustomer} /></div>} />
          <Route 
            path="/home-pelanggan" 
            element={<HeroSection />} 
          />
          <Route 
            path="/gallery-pelanggan" 
            element={
              <div style={containerStyle}>
                 <div style={{marginBottom:'20px', fontSize:'14px', color:'#888'}}>
                    <a href="/home-pelanggan" style={{color:'#ff4d4d', textDecoration:'none'}}>← Kembali ke Home</a>
                 </div>
                 <GalleryPelanggan items={items} />
              </div>
            } 
          />
          <Route path="/payment-pelanggan" element={<div style={containerStyle}><PaymentPelanggan /></div>} />
          <Route path="/status-sewa-pelanggan" element={<div style={containerStyle}><StatusSewaPelanggan /></div>} />
        </Routes>
      </AppLayout>
    </Router>
  )
}