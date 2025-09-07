import React, { useEffect, useState } from 'react';
import GigList from '../components/GigList';
import GigForm from '../components/GigForm';

const headerStyle = {
  background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
  color: '#fff',
  padding: '0 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '70px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: '30px',
  borderRadius: '0 0 16px 16px',
};

const navStyle = {
  display: 'flex',
  gap: '25px',
};

const navItemStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'background 0.2s',
};

function App() {
  const [gigs, setGigs] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gigs`)
      .then(res => res.json())
      .then(data => setGigs(data));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f3f6f9', minHeight: '100vh' }}>
      <header style={headerStyle}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          Freelancer Marketplace
        </div>
        <nav style={navStyle}>
          <a href="#" style={navItemStyle}>Home</a>
          <a href="#gigs" style={navItemStyle}>Gigs</a>
          <a href="#about" style={navItemStyle}>About</a>
          <button onClick={() => setShowSignup(true)} style={{ ...navItemStyle, background: '#fff', color: '#1976d2', border: 'none', cursor: 'pointer' }}>Sign Up</button>
          {user ? (
            <span style={{ ...navItemStyle, background: '#e3f2fd', color: '#1976d2' }}>Welcome, {user.username}</span>
          ) : (
            <button onClick={() => setShowSignin(true)} style={{ ...navItemStyle, background: '#fff', color: '#1976d2', border: 'none', cursor: 'pointer' }}>Sign In</button>
          )}
        </nav>
      </header>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>
        <GigForm setGigs={setGigs} />
        <GigList gigs={gigs} />
      </div>
      {showSignup && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {React.createElement(require('../components/SignupForm').default, { onClose: () => setShowSignup(false) })}
        </React.Suspense>
      )}
      {showSignin && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {React.createElement(require('../components/SigninForm').default, { onClose: () => setShowSignin(false), onLogin: (u) => { setUser(u); setShowSignin(false); } })}
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
