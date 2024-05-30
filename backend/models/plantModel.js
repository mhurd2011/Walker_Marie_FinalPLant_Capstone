// backend/models/plantModel.js
const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;