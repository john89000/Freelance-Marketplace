const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');

// Get all gigs
router.get('/', async (req, res) => {
  const gigs = await Gig.find();
  res.json(gigs);
});

// Create gig
router.post('/', async (req, res) => {
  const gig = new Gig(req.body);
  await gig.save();
  res.json(gig);
});

module.exports = router;
