import React, { useState, useEffect } from 'react';

const Leaderboard = ({ language }) => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      address: '0x' + Math.random().toString(36).substring(2, 15) + '...',
      balance: (Math.random() * 100000).toFixed(2)
    }));
    setRankings(mockData);
  }, []);

  return (
    <div style={{background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '32px', marginTop: '32px'}}>
      <h2 style={{marginBottom: '24px'}}>Top Holders</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e0e0e0'}}>
            <th style={{padding: '12px', textAlign: 'left'}}>Rank</th>
            <th style={{padding: '12px', textAlign: 'left'}}>Wallet</th>
            <th style={{padding: '12px', textAlign: 'right'}}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map(item => (
            <tr key={item.rank} style={{borderBottom: '1px solid #f0f0f0'}}>
              <td style={{padding: '16px'}}>{item.rank}</td>
              <td style={{padding: '16px'}}>{item.address}</td>
              <td style={{padding: '16px', textAlign: 'right'}}>{item.balance} BGSC</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
