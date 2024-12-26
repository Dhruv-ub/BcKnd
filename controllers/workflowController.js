// // controllers/workflowController.js
// const Workflow = require('../models/workflowModel');
// const ApiConfig = require('../models/apiConfigModel');

// // Create a new workflow
// exports.createWorkflow = async (req, res) => {
//   try {
//     const { name, apiConfigIds } = req.body;
//     const newWorkflow = new Workflow({ name, apiConfigs: apiConfigIds });
//     await newWorkflow.save();
//     res.status(201).json({ message: 'Workflow created successfully', data: newWorkflow });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating workflow', error });
//   }
// };

// // Get all workflows
// exports.getAllWorkflows = async (req, res) => {
//   try {
//     const workflows = await Workflow.find().populate('apiConfigs');
//     res.status(200).json(workflows);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving workflows', error });
//   }
// };


const Workflow = require('../models/workflowModel');
const ApiConfig = require('../models/apiConfigModel');

// Create a new workflow
exports.createWorkflow = async (req, res) => {
  try {
    const { name, apiConfigs } = req.body;
    const newWorkflow = new Workflow({ name, apiConfigs });
    await newWorkflow.save();
    res.status(201).json(newWorkflow);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workflow', error });
  }
};

// Retrieve all workflows
exports.getAllWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find().populate('apiConfigs');
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows', error });
  }
};

// Execute a workflow
exports.executeWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const workflow = await Workflow.findById(id).populate('apiConfigs');
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    let responseData;
    const logs = [];
    for (const config of workflow.apiConfigs) {
      // Simulate API request execution (replace with actual HTTP request)
      const { method, url, headers, body } = config;
      try {
        // Simulate successful API call
        responseData = { url, method, headers, body }; // Placeholder response
        logs.push({ status: 'Success', responseData });
      } catch (error) {
        logs.push({ status: 'Error', responseData: error.message });
        break;
      }
    }

    // Save logs to workflow
    workflow.logs = workflow.logs.concat(logs);
    await workflow.save();

    res.status(200).json({ message: 'Workflow executed', logs });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow', error });
  }
};

// Get logs for a specific workflow
exports.getWorkflowLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const workflow = await Workflow.findById(id).select('logs');
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json(workflow.logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error });
  }
};
