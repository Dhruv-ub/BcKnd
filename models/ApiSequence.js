const mongoose = require('mongoose');

const apiSequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flow: [
    {
      apiConfig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiConfig', // Reference to ApiConfig model
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('ApiSequence', apiSequenceSchema);
