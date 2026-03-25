const express = require('express');
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Publicly fetch a LIVE portfolio by slug
router.get('/public/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { slug: req.params.slug, isLive: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: 'Live portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/portfolios — get all portfolios for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/portfolios — create new portfolio
router.post('/', protect, async (req, res) => {
  try {
    const { title, template, resumeFile, data } = req.body;

    const portfolio = await Portfolio.create({
      user: req.user._id,
      title: title || 'My Portfolio',
      template: template || 'modern',
      resumeFile,
      data,
      status: 'draft'
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/portfolios/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id, user: req.user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/portfolios/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/portfolios/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/portfolios/:id/publish — Mark as live
router.post('/:id/publish', protect, async (req, res) => {
  try {
    const { slug } = req.body;
    if (!slug) return res.status(400).json({ message: 'Slug is required for publishing' });

    const existing = await Portfolio.findOne({ slug, _id: { $ne: req.params.id } });
    if (existing) return res.status(400).json({ message: 'This custom URL is already taken' });

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isLive: true, slug, status: 'published' },
      { new: true }
    );

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Successfully published!', portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/portfolios/:id/unpublish — Mark as draft
router.post('/:id/unpublish', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isLive: false, status: 'draft' },
      { new: true }
    );

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Successfully unpublished!', portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
