const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  postedBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);
