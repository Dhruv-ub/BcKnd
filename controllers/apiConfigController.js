// // controllers/apiConfigController.js
// const ApiConfig = require('../models/apiConfigModel'); // Corrected the import path

// // Create a new API configuration
// exports.createApiConfig = async (req, res) => {
//     try {
//         const { method, url, headers, body, sampleResponse } = req.body;
//         const newApiConfig = new ApiConfig({
//             method,
//             url,
//             headers,
//             body,
//             sampleResponse
//         });
//         const savedApiConfig = await newApiConfig.save();
//         res.status(201).json(savedApiConfig);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating API config", error });
//     }
// };

// // Get all API configurations
// exports.getApiConfigs = async (req, res) => {
//     try {
//         const apiConfigs = await ApiConfig.find();
//         res.status(200).json(apiConfigs);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching API configs", error });
//     }
// };

// // Delete an API configuration by ID
// exports.deleteApiConfig = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedApiConfig = await ApiConfig.findByIdAndDelete(id);
//         if (!deletedApiConfig) {
//             return res.status(404).json({ message: "API config not found" });
//         }
//         res.status(200).json({ message: "API config deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting API config", error });
//     }
// };

const ApiConfig = require('../models/apiConfigModel');

// Fetch all configurations
const getAllConfigs = async (req, res) => {
    try {
        const configs = await ApiConfig.find();
        res.status(200).json(configs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch configurations' });
    }
};

// Create a new configuration
const createConfig = async (req, res) => {
    try {
        const config = new ApiConfig(req.body);
        const savedConfig = await config.save();
        res.status(201).json(savedConfig);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create configuration' });
    }
};

// Fetch a configuration by ID
const getConfigById = async (req, res) => {
    try {
        const { id } = req.params;
        const config = await ApiConfig.findById(id);
        if (!config) {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch configuration' });
    }
};

// Delete a configuration by ID
const deleteConfigById = async (req, res) => {
    try {
        const { id } = req.params;
        const config = await ApiConfig.findByIdAndDelete(id);
        if (!config) {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.status(200).json({ message: 'Configuration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete configuration' });
    }
};

// Update a configuration partially by ID
const updateConfigById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedConfig = await ApiConfig.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedConfig) {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.status(200).json(updatedConfig);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update configuration' });
    }
};

module.exports = {
    getAllConfigs,
    createConfig,
    getConfigById,
    deleteConfigById,
    updateConfigById
};
