import React from 'react'

export default function ItemsTable({ items, onDelete }){

  const getIcon = (item) => {
    if (item.photo) {
      return <img src={item.photo} alt={item.model} />;
    }
    const kategori = item.kategori ? item.kategori.toLowerCase() : '';
    const model = item.model ? item.model.toLowerCase() : '';

    if (kategori.includes('pria') || model.includes('jas')) {
      return '👔';
    }
    return '👗';
  }

  return (
    <div className="table-wrap">
      <table className="items-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Model</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td className="img-cell" style={{ fontSize: '24px' }}>
                {getIcon(it)}
              </td>
              
              <td>{it.model}</td>
              <td>{it.kategori}</td>
              <td>{it.stok} Pcs</td>
              <td>{it.harga}</td>
          
              <td className="actions">
                <button 
                  className="small-btn" 
                  style={{ 
                    marginRight: '8px', 
                    fontWeight: 'bold',
                    cursor: 'pointer' 
                  }}
                  onClick={() => alert("Fitur Edit untuk " + it.model)}
                >
                  Edit
                </button>
                <button 
                  className="small-btn del" 
                  onClick={()=>onDelete(it.id)}
                >
                  Hapus
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="pager">
        <button className="arrow">←</button>
        <button className="arrow">→</button>
      </div>
    </div>
  )
}