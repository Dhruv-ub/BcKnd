// // models/workflowModel.js
// const mongoose = require('mongoose');

// // Define the Workflow Schema
// const workflowSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   apiConfigs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'ApiConfig',
//       required: true
//     }
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model('Workflow', workflowSchema);


// models/workflowModel.js
const mongoose = require('mongoose');

// Define the Workflow Schema
const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apiConfigs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ApiConfig',
      required: true
    }
  ],
  logs: [
    {
      timestamp: { type: Date, default: Date.now }, // When the log entry was created
      status: { type: String, enum: ['Success', 'Error'], default: 'Success' }, // Status of the API workflow execution
      responseData: { type: mongoose.Schema.Types.Mixed }, // Response or debug data
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Workflow', workflowSchema);
