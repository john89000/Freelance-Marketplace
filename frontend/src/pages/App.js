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

  // check for existing user (remember me)
  useEffect(() => {
    const raw = localStorage.getItem('fm_user');
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setUser(u);
      } catch (e) {
        localStorage.removeItem('fm_user');
      }
    } else {
      // force signup modal on first visit
      setShowSignup(true);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    // fetch gigs only when user is authenticated
    fetch(`${process.env.REACT_APP_API_URL}/gigs`)
      .then(res => res.json())
      .then(data => setGigs(data));
  }, [user]);

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
        {!user ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1976d2' }}>Welcome</h2>
            <p style={{ color: '#444' }}>Please sign up or sign in to access gigs and post work.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              <button onClick={() => setShowSignup(true)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#1976d2', color: '#fff' }}>Sign Up</button>
              <button onClick={() => setShowSignin(true)} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #1976d2', background: '#fff', color: '#1976d2' }}>Sign In</button>
            </div>
          </div>
        ) : (
          <>
            <GigForm setGigs={setGigs} />
            <GigList gigs={gigs} />
          </>
        )}
      </div>
      {showSignup && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {React.createElement(require('../components/SignupForm').default, { onClose: () => setShowSignup(false), onSignupSuccess: () => { setShowSignup(false); setShowSignin(true); } })}
        </React.Suspense>
      )}
      {showSignin && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {React.createElement(require('../components/SigninForm').default, { onClose: () => setShowSignin(false), onLogin: (u) => { localStorage.setItem('fm_user', JSON.stringify(u)); setUser(u); setShowSignin(false); } })}
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
