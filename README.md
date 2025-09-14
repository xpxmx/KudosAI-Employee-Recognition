# KudosAI MVP - Employee Recognition Platform

A Next.js application that provides AI-powered employee recognition with a unique points advance/loan system. Employees can redeem rewards even with negative balances, and points automatically repay advances as they earn recognition.

## Features

### 🤖 AI-Powered Recognition
- AI-generated personalized kudos messages
- Manager and peer-to-peer recognition
- Context-aware message generation

### 💰 Points Advance System
- Employees can redeem rewards with negative balances
- Automatic loan repayment when earning new points
- Transparent loan history tracking

### 🎉 Visual Feedback
- Confetti animations on redemption
- Real-time point updates
- Celebration effects for engagement

### 👥 Team Features
- Peer recognition dashboard
- Team leaderboard
- Social currency system

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Database**: In-memory mock database

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── pages/
│   ├── api/                 # API routes
│   │   ├── kudos.js        # Manager recognition
│   │   ├── redeem.js       # Perk redemption
│   │   ├── peer-recognize.js # Peer recognition
│   │   └── employees.js    # Employee data
│   ├── manager.js          # Manager dashboard
│   ├── worker.js           # Worker dashboard
│   ├── peer.js             # Peer recognition
│   ├── leaderboard.js      # Team leaderboard
│   └── index.js            # Home page
├── lib/
│   └── db.js               # Mock database
├── styles/
│   └── globals.css         # Global styles
└── components/             # Reusable components
```

## Key Features Explained

### Points Advance System
- Employees can redeem perks even with insufficient points
- Negative balance represents a "points loan"
- New recognition automatically repays outstanding advances
- Transparent loan history and repayment tracking

### AI Recognition
- Managers can recognize employees with AI-generated messages
- Peers can recognize each other to build team culture
- Points are automatically distributed and tracked

### Visual Polish
- ZayZoon brand colors throughout
- Confetti animations on successful actions
- Responsive design for mobile and desktop
- Hover effects and smooth transitions

## API Endpoints

- `POST /api/kudos` - Manager recognition
- `POST /api/redeem` - Perk redemption (standard or advance)
- `POST /api/peer-recognize` - Peer recognition
- `GET /api/employees` - Get all employees
- `GET /api/employees/[id]` - Get specific employee
- `GET /api/perks` - Get available perks
- `GET /api/peer-recognitions` - Get peer recognition history

## Demo Flow

1. **Manager Dashboard**: View team, recognize employees with AI messages
2. **Worker Dashboard**: See points balance, redeem perks (standard or advance)
3. **Peer Recognition**: Employees recognize each other
4. **Leaderboard**: View team performance and recent activity

## Customization

### Brand Colors
The app uses ZayZoon brand colors defined in `tailwind.config.js`:
- Primary: `#00A9A5` (Teal)
- Secondary: `#FF6F00` (Orange)
- Accent: `#9C27B0` (Purple)

### Database
Mock data is defined in `lib/db.js`. To add real database integration:
1. Replace mock functions with actual database calls
2. Update API routes to use new database functions
3. Add proper error handling and validation

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT License - feel free to use this project for your hackathon or business needs!
