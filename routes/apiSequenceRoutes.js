const express = require('express');
const router = express.Router();
const ApiSequence = require('../models/ApiSequence'); // Correct model import

// Create a new API Sequence
router.post('/', async (req, res) => {
  try {
    const { name, flow } = req.body;

    // Validate input
    if (!name || !Array.isArray(flow)) {
      return res.status(400).json({ error: 'Invalid input. Name and flow are required.' });
    }

    // Save API Sequence with the provided flow
    const apiSequence = new ApiSequence({ name, flow });
    await apiSequence.save();

    res.status(201).json({ message: 'API Sequence created successfully.', apiSequence });
  } catch (error) {
    console.error('Error creating API sequence:', error);
    res.status(500).json({ error: 'Failed to create API sequence.' });
  }
});

// Retrieve an API Sequence by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiSequence = await ApiSequence.findById(id).populate('flow.apiConfig'); // Populate referenced ApiConfig objects
    if (!apiSequence) return res.status(404).json({ error: 'API sequence not found.' });

    res.json(apiSequence);
  } catch (error) {
    console.error('Error fetching API sequence:', error);
    res.status(500).json({ error: 'Failed to fetch API sequence.' });
  }
});

// Retrieve all API Sequences
router.get('/', async (req, res) => {
  try {
    const apiSequences = await ApiSequence.find().populate('flow.apiConfig'); // Populate referenced ApiConfig objects
    res.json(apiSequences);
  } catch (error) {
    console.error('Error fetching API sequences:', error);
    res.status(500).json({ error: 'Failed to fetch API sequences.' });
  }
});

// Update the order of the flow in an API sequence by name
router.put('/update-order/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { apiConfigs } = req.body;

    if (!Array.isArray(apiConfigs)) {
      return res.status(400).json({ error: 'API Configs must be an array.' });
    }

    // Find the API sequence by name
    const apiSequence = await ApiSequence.findOne({ name }); 
    if (!apiSequence) {
      return res.status(404).json({ error: 'API sequence not found.' });
    }

    // Reorder the flow in the database based on the new order of apiConfigs
    const updatedFlow = apiConfigs.map((apiConfig, index) => ({
      apiConfig: apiConfig._id, // Use the _id of the ApiConfig
      order: index + 1, // Assign new order starting from 1
    }));

    apiSequence.flow = updatedFlow;
    await apiSequence.save();

    res.json({ message: 'API flow order updated successfully.' });
  } catch (error) {
    console.error('Error updating API order:', error);
    res.status(500).json({ error: 'Failed to update API flow order.' });
  }
});

module.exports = router;
