# GitHub Activity Heat Map Generator

## Goal
Create beautiful visualizations of GitHub repository activity - contributor patterns, commit rhythms, "bus factor" analysis, and activity heat maps for any public repo.

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS
- **Charts**: D3.js or Recharts or Chart.js
- **Data Fetching**: Octokit (GitHub's official REST API client) or fetch
- **Date Utils**: date-fns for date manipulation

## Data Sources
- **GitHub REST API**: `https://api.github.com` (60 requests/hour unauthenticated, 5000 with token)
- **Key Endpoints**:
  - Repo info: `GET /repos/{owner}/{repo}`
  - Commits: `GET /repos/{owner}/{repo}/commits`
  - Contributors: `GET /repos/{owner}/{repo}/contributors`
  - Stats: `GET /repos/{owner}/{repo}/stats/contributors`
  - Punch card: `GET /repos/{owner}/{repo}/stats/punch_card`

## Core Features
1. **Repo Search**: Input owner/repo name, fetch data
2. **Commit Heat Map**: Calendar-style visualization (GitHub-style contribution graph)
3. **Contributor Breakdown**: Bar chart of top contributors by commits
4. **Activity Timeline**: Line chart showing commits over time
5. **Bus Factor Analysis**: Identify concentration of knowledge/contributions
6. **Time-of-Day Patterns**: When do commits typically happen?

## Quick Start
```bash
npm create vite@latest github-heatmap -- --template react-ts
cd github-heatmap
npm install
npm install @octokit/rest d3 tailwindcss autoprefixer postcss date-fns
npm install recharts
npx tailwindcss init -p
```

## API Examples

### Using Octokit
```typescript
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: 'optional_personal_access_token' // For higher rate limits
});

// Get commit activity
const { data } = await octokit.repos.getCommitActivityStats({
  owner: 'facebook',
  repo: 'react'
});
```

### Using Fetch (No Library)
```typescript
const response = await fetch('https://api.github.com/repos/facebook/react/stats/commit_activity');
const data = await response.json();
```

## Visualizations to Build

### 1. Contribution Heat Map (GitHub-style)
- Grid of days (52 weeks x 7 days)
- Color intensity based on commit count
- Hover shows date + count
- Use D3.js for best results or build with divs + CSS

### 2. Contributor Chart
- Bar chart: Top 10 contributors by commit count
- Show total commits, additions, deletions
- Click to filter timeline by that contributor

### 3. Commit Timeline
- Line or area chart showing commits per week/month
- Identify busy periods and quiet periods
- Overlay releases or milestones if available

### 4. Punch Card (Hour x Day)
- Heat map: Days of week (rows) x Hours of day (columns)
- Shows when team is most active
- Useful for understanding team time zones

### 5. Bus Factor Widget
- Calculate: How many contributors account for 80% of commits?
- Show risk level: Low (distributed) vs High (concentrated)
- List key contributors with % contribution

## Development Approach
1. Build repo search input and basic data fetching
2. Display raw stats to verify API connection
3. Implement one visualization at a time
4. Add loading states and error handling
5. Polish with responsive design and animations
6. Cache results to avoid rate limiting

## Rate Limiting Strategy
- Display remaining rate limit to user
- Cache fetched data in sessionStorage
- Optionally support personal access token input for higher limits
- Show friendly error if rate limited

## Stretch Goals
- Compare multiple repos side-by-side
- Export visualizations as PNG/SVG
- PR analysis: merge times, review patterns
- Language breakdown visualization
- Fork network visualization
- Issue/PR velocity tracking
- Integration with GitHub's GraphQL API for richer data
- Dark mode toggle

## Example Repos to Test With
- `facebook/react` - Large, active project
- `microsoft/vscode` - Different contribution pattern
- `torvalds/linux` - Massive scale
- Your own company's repos for demo

## Notes
- GitHub's statistics endpoints can take time to compute - they may return 202 on first request
- Handle 202 status by retrying after a few seconds
- Some stats endpoints have caching delays (updated every few hours)
