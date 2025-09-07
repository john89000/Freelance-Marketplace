import React, { useState } from 'react';

function GigForm({ setGigs }) {
  const [form, setForm] = useState({ title: '', description: '', budget: '', postedBy: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/gigs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newGig = await res.json();
    setGigs(prev => [...prev, newGig]);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      padding: '30px 24px',
      marginBottom: '30px',
      maxWidth: '500px',
      margin: '0 auto 30px auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
    }}>
      <h2 style={{ color: '#1976d2', marginBottom: '10px', textAlign: 'center' }}>Post a New Gig</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #bdbdbd',
          fontSize: '1rem',
          marginBottom: '6px',
        }}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #bdbdbd',
          fontSize: '1rem',
          minHeight: '70px',
          marginBottom: '6px',
        }}
        required
      ></textarea>
      <input
        name="budget"
        placeholder="Budget"
        type="number"
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #bdbdbd',
          fontSize: '1rem',
          marginBottom: '6px',
        }}
        required
      />
      <input
        name="postedBy"
        placeholder="Your Name"
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #bdbdbd',
          fontSize: '1rem',
          marginBottom: '6px',
        }}
        required
      />
      <button
        type="submit"
        style={{
          background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginTop: '10px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          transition: 'background 0.2s',
        }}
      >Post Gig</button>
    </form>
  );
}

export default GigForm;
