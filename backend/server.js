const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const mockStorage = require('./mockStorage'); // Add this line

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  process.env.FRONTEND_URL // <-- Add your Vercel URL here
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
let isDemoMode = false;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.log('❌ MongoDB Error:', err.message);
    console.log('🚀 Entering DEMO MODE (In-Memory Storage Enabled)');
    isDemoMode = true;
    
    // Patch models to use mock storage if DB fails
    const User = require('./models/User');
    const Portfolio = require('./models/Portfolio');
    
    // Simplified patching for demo
    if (isDemoMode) {
      User.findOne = mockStorage.users.findOne;
      User.find = mockStorage.users.find;
      User.create = mockStorage.users.create;
      User.findById = mockStorage.users.findById;
      
      Portfolio.find = mockStorage.portfolios.find;
      Portfolio.findOne = mockStorage.portfolios.findOne;
      Portfolio.create = mockStorage.portfolios.create;
      Portfolio.findOneAndUpdate = mockStorage.portfolios.findOneAndUpdate;
      Portfolio.findOneAndDelete = mockStorage.portfolios.findOneAndDelete;
    }
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/portfolios', require('./routes/portfolios'));
app.use('/api/ai', require('./routes/ai'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PortfolioMaker API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
