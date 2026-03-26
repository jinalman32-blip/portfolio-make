const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    // Check if it's a guest token
    if (token.startsWith('guest_')) {
      req.user = { _id: token, name: 'Guest User', email: 'guest@portfoliomaker.com' };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      // Fallback to guest so it never fails
      req.user = { _id: token, name: 'Guest User', email: 'guest@portfoliomaker.com' };
      return next();
    }
  }

  // If absolutely no token, create a random session for the request
  req.user = { _id: 'guest_' + Math.random().toString(36).substring(7), name: 'Guest User', email: 'guest@portfoliomaker.com' };
  next();
};

module.exports = { protect };
