import React, { useState } from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};
const formStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  padding: '32px 28px',
  minWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

export default function SignupForm({ onClose, onSignupSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    let data = {};
    let ok = false;
    try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      ok = res.ok;
      data = ok ? await res.json() : { message: 'Signup failed.' };
    } catch (err) {
      data = { message: 'Network error.' };
    }
    setMessage(data.message);
    if (ok) {
      setForm({ username: '', email: '', password: '' });
      if (typeof onSignupSuccess === 'function') onSignupSuccess();
    }
  };

  return (
    <div style={modalStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ color: '#1976d2', textAlign: 'center' }}>Sign Up</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #bdbdbd' }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #bdbdbd' }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #bdbdbd' }} />
        <button type="submit" style={{ background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px' }}>Sign Up</button>
        <button type="button" onClick={onClose} style={{ background: '#eee', color: '#1976d2', border: 'none', borderRadius: '6px', padding: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '6px' }}>Cancel</button>
  {message && <div style={{ color: message === 'User registered successfully.' ? 'green' : 'red', textAlign: 'center', marginTop: '10px' }}>{message}</div>}
      </form>
    </div>
  );
}
