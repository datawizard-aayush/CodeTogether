const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * @route   GET /api/health
 * @desc    Health check endpoint to verify backend server & database status
 * @access  Public
 */
router.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected / Pending';
  
  res.status(200).json({
    status: 'success',
    message: 'Colabz Backend Server is running smoothly! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus
  });
});

module.exports = router;
