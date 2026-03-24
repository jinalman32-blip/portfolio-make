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
  data: {
    name: String,
    email: String,
    phone: String,
    summary: String,
    skills: [String],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        year: String
      }
    ],
    projects: [
      {
        name: String,
        description: String,
        link: String
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
