import React from 'react';

const Header = ({ language, setLanguage }) => {
  return (
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px'}}>
      <div style={{color: 'white', fontSize: '24px', fontWeight: '700'}}>BGSC Leaderboard</div>
      <div>
        <button onClick={() => setLanguage('en')} style={{marginRight: '8px', padding: '8px 16px'}}>EN</button>
        <button onClick={() => setLanguage('ko')} style={{padding: '8px 16px'}}>한국어</button>
      </div>
    </header>
  );
};

export default Header;
