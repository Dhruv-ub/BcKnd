// // routes/workflowRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createWorkflow, getAllWorkflows } = require('../controllers/workflowController');

// // Route for creating a new workflow
// router.post('/', createWorkflow);

// // Route for retrieving all workflows
// router.get('/', getAllWorkflows);

// module.exports = router;


// routes/workflowRoutes.js
const express = require('express');
const router = express.Router();
const {
  createWorkflow,
  getAllWorkflows,
  executeWorkflow,
  getWorkflowLogs
} = require('../controllers/workflowController');

// Route for creating a new workflow
router.post('/', createWorkflow);

// Route for retrieving all workflows
router.get('/', getAllWorkflows);

// Route for executing a workflow by ID
router.post('/execute/:id', executeWorkflow);

// Route for retrieving logs of a specific workflow
router.get('/:id/logs', getWorkflowLogs);

module.exports = router;
