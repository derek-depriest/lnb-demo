# Prediction Markets Dashboard

## Goal
Build a real-time dashboard that aggregates prediction market data and visualizes trending predictions, price movements, and market activity.

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts or Chart.js
- **State Management**: React Query for data fetching
- **Real-time**: Optional SignalR if adding backend, otherwise polling

## Data Sources
- **Polymarket**: Use their public API - `https://gamma-api.polymarket.com/` (no auth required for public markets)
- **Manifold Markets**: REST API at `https://api.manifold.markets/v0/` (fully open, no key needed)
- **Kalshi**: Has a public API but requires sign-up - skip if time-constrained

## Core Features
1. **Market Grid**: Display active prediction markets with current odds
2. **Trending Section**: Show markets with highest volume or price movement
3. **Detail View**: Click into a market to see price history chart
4. **Auto-refresh**: Poll APIs every 30-60 seconds for updates
5. **Filters**: Category, date range, or probability range filters

## Quick Start
```bash
npm create vite@latest markets-dashboard -- --template react-ts
cd markets-dashboard
npm install
npm install recharts tailwindcss autoprefixer postcss @tanstack/react-query
npx tailwindcss init -p
```

## API Examples

**Polymarket - Get active markets:**
```
GET https://gamma-api.polymarket.com/markets
```

**Manifold - Get trending markets:**
```
GET https://api.manifold.markets/v0/markets?limit=20&sort=24-hour-volume
```

## Development Approach
- Start with fetching and displaying raw market data
- Add basic styling and grid layout
- Implement charting for price history
- Add filtering and sorting
- Polish UI and add refresh mechanism

## Stretch Goals
- Compare odds across platforms for same events
- Historical price tracking with local storage
- Market alerts based on threshold movements
- Sentiment indicator based on volume changes
