const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend (Vite React)
app.use(express.json()); // Enable JSON body parsing for incoming requests

// API Routes
app.use('/api', require('./routes/health'));

// Root route welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Colabz API Server! System status is operational.');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Colabz Backend running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
