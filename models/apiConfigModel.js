// models/apiConfigModel.js
const mongoose = require('mongoose');

// Define the API Configuration Schema
const apiConfigSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  headers: {
    type: Object,
    required: true
  },
  body: {
    type: Object,
    required: true
  },
  sampleResponse: {
    type: Object,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ApiConfig', apiConfigSchema);
