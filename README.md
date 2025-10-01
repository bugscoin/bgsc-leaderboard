# BGSC Leaderboard

Real-time leaderboard and ranking system for BGSC token holders on BNB Chain. Features wallet registration, time-weighted balance tracking, and competitive rankings with reward tiers.

## System Overview

Hybrid architecture combining on-chain data with off-chain computation for optimal performance. Smart contract events are indexed and processed to calculate time-weighted average balances, providing fair ranking that accounts for holding duration.

### Tech Stack

**Frontend:**
- **React 18.2** - Component-based UI with hooks
- **Wagmi 2.5 + Viem 2.7** - Type-safe Ethereum interactions
- **RainbowKit 2.2** - Multi-wallet connection (Binance Wallet, WalletConnect)
- **Styled Components 6.1** - CSS-in-JS with theming
- **Framer Motion 10.16** - Smooth animations and transitions
- **Axios 1.6** - HTTP client with retry logic

**Build Tools:**
- **CRACO 7.1** - Custom React Scripts configuration
- **Webpack Obfuscator** - Production code obfuscation
- **Terser** - Advanced minification

### Backend Requirements

Backend API (separate repository) must provide:
- Wallet registration endpoints
- Balance snapshot tracking
- Time-weighted average calculation
- Leaderboard pagination
- Ineligible wallet filtering

## Architecture

### Time-Weighted Average System

Rankings use time-weighted averages to prevent manipulation:

```
TWA = Σ(balance_i × time_i) / total_time
```

This ensures:
- Long-term holders ranked higher
- Prevents flash loan manipulation
- Fair representation of commitment

### Data Flow

1. User registers wallet on-chain
2. Backend indexes registration event
3. Periodic balance snapshots (configurable interval)
4. TWA calculated from snapshot history
5. Rankings updated and cached
6. Frontend polls for leaderboard updates

### Caching Strategy

- **Leaderboard Cache**: 139 minutes TTL
- **User Data Cache**: localStorage with expiry
- **Balance Snapshots**: Incremental updates only
- Server-side Redis for hot data

## Project Structure

```
src/
├── components/              # React components
│   ├── Header.js
│   ├── Leaderboard.js
│   ├── WalletInfoCard.js
│   └── RegisterWalletButton.js
├── services/               # API clients
│   ├── api.js
│   └── apiClient.js
├── utils/                  # Utilities
│   ├── binanceWallet.js
│   ├── walletConnector.js
│   ├── cacheManager.js
│   └── timeWeightedAverage.js
└── App.js                 # Main application
```

## Features

### Wallet Registration
- On-chain registration with signature verification
- Email/social media optional metadata
- KYC integration ready (not included)
- Registration fee (anti-spam)

### Leaderboard Display
- Paginated rankings (default: 50 per page)
- Real-time rank updates
- User highlight in leaderboard
- Rank change indicators (↑↓)
- Reward tier badges

### Ranking Algorithm

Time-weighted balance with configurable parameters:

```javascript
{
  snapshotInterval: 3600,      // 1 hour
  minimumSnapshots: 168,       // 1 week of data
  decayFactor: 0.95,          // Recent weight
  minimumBalance: 100         // Entry threshold
}
```

### Ineligible Wallets

Certain wallets excluded from rankings:
- Exchange wallets
- Team/treasury wallets
- Locked/vesting contracts
- Flagged addresses

Managed via admin interface (not included).

## Development

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm start
```

Runs on `http://localhost:3000`

### Environment Variables

Create `.env`:
```env
REACT_APP_API_URL=https://api.bgscleaderboard.com/api
REACT_APP_BGSC_CONTRACT=0xa4B68D48D7bc6f04420e8077E6F74bdeF809dEa3
REACT_APP_WALLET_CONNECT_PROJECT_ID=...
```

## Production Build

Build optimized bundle:
```bash
npm run build
```

Build process:
1. Webpack compilation
2. Code obfuscation (except libraries)
3. Console removal
4. Asset optimization
5. Build version injection

Output: `build/` directory

### Build Configuration

CRACO config (`craco.config.js`) customizes:
- Webpack obfuscation settings
- Terser options for minification
- Library exclusions from obfuscation
- Source map generation (disabled)

Obfuscation exclusions:
- node_modules
- RainbowKit/Wagmi libraries
- WalletConnect SDK
- React/ReactDOM

## API Integration

### Required Endpoints

**Registration:**
```
POST /api/wallet/register
{
  address: string,
  signature: string,
  metadata?: object
}
```

**Leaderboard:**
```
GET /api/leaderboard?page=1&limit=50
Response: {
  rankings: Array<{
    rank: number,
    address: string,
    balance: string,
    timeWeightedAverage: string,
    rankChange: number
  }>,
  total: number,
  page: number
}
```

**User Info:**
```
GET /api/wallet/:address
Response: {
  rank: number,
  balance: string,
  isRegistered: boolean,
  isEligible: boolean
}
```

## Performance Optimizations

- Virtualized list rendering (1000+ items)
- Debounced scroll events
- Memoized calculations
- Lazy component loading
- Image lazy loading
- Service worker caching (PWA ready)

## Security Features

- Address checksum validation
- Signature verification for registration
- Rate limiting (client-side)
- XSS protection
- CSRF tokens
- API request signing

## Network Support

Primary: BNB Chain Mainnet (chainId: 56)

Contract address: `0xa4B68D48D7bc6f04420e8077E6F74bdeF809dEa3`

## Wallet Support

Integrated wallets:
- Binance Wallet (native)
- MetaMask
- WalletConnect v2
- Trust Wallet
- Coinbase Wallet

Custom Binance Wallet connector included for optimal UX.

## Analytics Integration

Frontend supports:
- Google Analytics
- Mixpanel
- Custom event tracking

Configure in environment variables.

## Monitoring

Production monitoring via:
- Sentry error tracking
- Performance metrics
- API response times
- User engagement analytics

## Browser Compatibility

Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires Web3 wallet extension or mobile wallet app.

## Roadmap

Planned features:
- [ ] Historical rank charts
- [ ] Reward distribution tracking
- [ ] Wallet badges/achievements
- [ ] Social features (following)
- [ ] Mobile app

## License

Proprietary - All rights reserved
