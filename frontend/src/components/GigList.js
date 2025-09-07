import React from 'react';

const cardStyle = {
  background: '#f5f7fa',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  padding: '20px',
  margin: '15px 0',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const titleStyle = {
  color: '#1976d2',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: '8px',
};

const priceStyle = {
  background: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '5px',
  padding: '4px 10px',
  fontWeight: 'bold',
  marginTop: '8px',
};

function GigList({ gigs }) {
  return (
    <div>
      <h2 style={{ color: '#1976d2', marginBottom: '20px' }}>Available Gigs</h2>
      {gigs.map(g => (
        <div key={g._id} style={cardStyle}>
          <div style={titleStyle}>{g.title}</div>
          <div style={{ marginBottom: '8px' }}>{g.description}</div>
          <div style={priceStyle}>${g.budget}</div>
          <small style={{ color: '#666', marginTop: '10px' }}>Posted by: {g.postedBy}</small>
        </div>
      ))}
    </div>
  );
}

export default GigList;
