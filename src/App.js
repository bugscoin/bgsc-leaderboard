import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import WalletInfoCard from './components/WalletInfoCard';
import RegisterWalletButton from './components/RegisterWalletButton';

const { publicClient } = configureChains([bsc], [publicProvider()]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient
});

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 20px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  color: white;
  margin-bottom: 16px;
  font-weight: 800;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 32px;
  color: white;
  font-weight: 700;
`;

function App() {
  const [language, setLanguage] = useState('en');
  const [stats, setStats] = useState({
    totalHolders: '1,234',
    totalRegistered: '567',
    averageBalance: '10,000'
  });
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    // Check if user wallet is registered
    checkRegistration();
  }, []);

  const checkRegistration = async () => {
    // Registration check logic
    setUserRegistered(false);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <AppContainer>
        <Header language={language} setLanguage={setLanguage} />

        <Content>
          <Title>BGSC Leaderboard</Title>
          <Subtitle>
            Track the top BGSC token holders and compete for rewards
          </Subtitle>

          <StatsBar>
            <StatCard>
              <StatLabel>Total Holders</StatLabel>
              <StatValue>{stats.totalHolders}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Registered Wallets</StatLabel>
              <StatValue>{stats.totalRegistered}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Average Balance</StatLabel>
              <StatValue>{stats.averageBalance} BGSC</StatValue>
            </StatCard>
          </StatsBar>

          {!userRegistered && <RegisterWalletButton />}

          <WalletInfoCard />

          <Leaderboard language={language} />
        </Content>
      </AppContainer>
    </WagmiConfig>
  );
}

export default App;
