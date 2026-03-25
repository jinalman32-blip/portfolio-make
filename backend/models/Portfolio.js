const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'My Portfolio'
  },
  template: {
    type: String,
    default: 'modern'
  },
  resumeFile: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'processing'],
    default: 'draft'
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
