import React, { useState, useEffect } from 'react';

/* 
 * 1. LOGIC AREA (STRUKTUR DATA)
 * Ini adalah "Otak" struktur data Single Linked List
 */

class LogNode {
    constructor(activity) {
        this.activity = activity;
        this.timestamp = new Date().toLocaleTimeString('id-ID'); 
        this.next = null; 
    }
}

class ActivityLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
        this.listeners = []; // Array untuk subscribe perubahan (Observer Pattern sederhana)
    }

    addLog(activityName) {
        const newNode = new LogNode(activityName);

        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.next = this.head; 
            this.head = newNode;      
        }
        this.size++;

        if (this.size > 50) this.removeLast();
        
        this.notifyListeners(); // Kabari React bahwa ada data baru
    }

    removeLast() {
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
            this.size = 0;
            return;
        }
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        current.next = null;
        this.size--;
    }

    getAllLogs() {
        const logs = [];
        let current = this.head;
        while (current) {
            logs.push({
                activity: current.activity,
                timestamp: current.timestamp,
                // Kita tidak simpan 'next' node object biar aman di React state,
                // tapi kita simpan boolean hasNext untuk visualisasi
                hasNext: current.next !== null 
            });
            current = current.next;
        }
        return logs;
    }

    // Mekanisme Subscription agar Component bisa auto-update
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
}

// Instance Singleton
export const activityManager = new ActivityLinkedList();

/* 
 * 2. UI COMPONENT AREA (REACT VIEW)
 * Ini adalah "Tampilan" yang membungkus logika di atas
 */
const LinkedListVisualizer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 1. Ambil data awal
    setLogs(activityManager.getAllLogs());

    // 2. Subscribe ke perubahan data (Listener)
    // Jadi kalau ada log baru, component ini otomatis render ulang!
    const unsubscribe = activityManager.subscribe(() => {
        setLogs(activityManager.getAllLogs());
    });

    return () => unsubscribe(); // Cleanup saat unmount
  }, []);

  return (
    <div style={{marginTop: '30px', padding: '20px', background: '#1E1E1E', borderRadius: '12px', border: '1px solid #333'}}>
        <h3 style={{fontSize: '16px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff'}}>
            🔗 Log Aktivitas (Single Linked List)
            <span style={{fontSize:'10px', background:'#333', padding:'2px 6px', borderRadius:'4px', color:'#fff'}}>Live Structure Component</span>
        </h3>
        <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px'}}>
            {logs.length === 0 ? (
                <div style={{fontSize:'13px', color:'#666'}}>Belum ada aktivitas terekam session ini.</div>
            ) : (
                logs.map((log, idx) => (
                    <div key={idx} style={{display:'flex', alignItems:'center', opacity: 1 - (idx * 0.1)}}>
                        <div style={{
                            background: idx === 0 ? '#2ecc71' : '#333', 
                            color: idx === 0 ? '#000' : '#888',
                            padding: '8px 12px', 
                            borderRadius: '6px',
                            fontSize: '12px',
                            minWidth: '140px',
                            boxShadow: idx === 0 ? '0 0 10px rgba(46, 204, 113, 0.3)' : 'none'
                        }}>
                            <div style={{fontWeight:'bold', fontSize:'10px', opacity:0.8}}>{log.timestamp}</div>
                            <div>{log.activity}</div>
                        </div>
                        {log.hasNext && (
                            <div style={{margin: '0 8px', color: '#555'}}>➜</div>
                        )}
                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default LinkedListVisualizer;
