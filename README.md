# ValYou

ValYou is a full-stack web application for managing and visualizing personal financial transactions. It features user authentication, transaction tracking, and insightful data visualization.

## Features
- User registration and login
- Secure authentication (JWT-based)
- Add, view, and delete transactions
- Transaction summary and pie chart visualization
- Protected dashboard for authenticated users

## Tech Stack
- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express
- **Database:** (Add your DB, e.g., MongoDB, if used)

## Folder Structure
```
ValYou/
  back-end/        # Express server, API, models, routes
  front-end/       # React app (Vite), components, assets
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ValYou
```

### 2. Backend Setup
```bash
cd back-end
npm install
```

#### Environment Variables
Create a `.env` file in `back-end/` with the following (example):
```
PORT=5000
JWT_SECRET=your_jwt_secret
DB_URI=your_database_uri
```

#### Start Backend
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../front-end
npm install
```

#### Start Frontend
```bash
npm run dev
```

The frontend will typically run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:5000](http://localhost:5000).

## Usage
- Register a new account or log in.
- Add transactions with details.
- View your transaction list, summary, and pie chart.
- Log out securely.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

**Feel free to customize this README further for your project's needs!**
