# HealthTech Portfolio

A modern web-based portfolio created for a health technology company that specialises in data-driven clinical solutions, machine learning and NLP.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)

## Features

### Landing Page

- **Hero Section** - A banner with call-to-action buttons
- **Sticky Navigation** - Navigation to all sections
- **Services Section** - Showcases Machine Learning, NLP, and Data Analytics offered by company
- **About Section** - Company information with stats and mission statement
- **News Feed** - Live API NHS Digital news integration
- **Contact Form** - Validated form with email submission to backend**

### Technical Features

- Responsive design (mobile-friendly)
- Form validation (client-side)
- Downloadable capability statement (PDF)
- In-memory storage fallback when database unavailable
- SQL Server integration with Windows Authentication support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Front-End | React.js, Tailwind CSS |
| Back-End | Node.js, Express.js |
| Database | SQL Server |

## Getting Started

### Prerequisites

- Node.js
- npm
- SQL Server

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client-portfolio
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment** (optional)

   Create/edit `server/.env`:

   ```env
   # SQL Server Database (Windows Authentication)
   DB_SERVER=localhost
   DB_NAME=PortfolioDB

   # Server
   PORT=5000
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm start
   ```

   The server will run on http://localhost:5000

2. **Start the frontend** (in a new terminal)

   ```bash
   cd client
   npm start
   ```

   The app will open at http://localhost:3000

### Available Scripts

#### Client

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

#### Server

| Command | Description |
|---------|-------------|
| `npm start` | Start the Express server |
| `npm run dev` | Start with nodemon (auto-reload) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/news` | Fetch health/tech news feed |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `DB_SERVER` | localhost | SQL Server host |
| `DB_NAME` | PortfolioDB | Database name |

## Deployment

The project includes CI/CD pipeline configuration for automated deployments. See `.github/workflows/` for details.
