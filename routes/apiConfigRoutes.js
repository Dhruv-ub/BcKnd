// // routes/apiConfigRoutes.js
// const express = require('express');
// const router = express.Router();
// const apiConfigController = require('../controllers/apiConfigController');

// // Create new API config
// router.post('/', apiConfigController.createApiConfig);

// // Get all API configs
// router.get('/', apiConfigController.getApiConfigs);

// // Delete API config by ID
// router.delete('/:id', apiConfigController.deleteApiConfig);

// module.exports = router;


const express = require('express');
const { 
    getAllConfigs, 
    createConfig, 
    getConfigById, 
    deleteConfigById, 
    updateConfigById 
} = require('../controllers/apiConfigController');
const router = express.Router();

// Route to fetch all configurations
router.get('/', getAllConfigs);

// Route to create a new configuration
router.post('/', createConfig);

// Route to fetch a configuration by ID
router.get('/:id', getConfigById);

// Route to delete a configuration by ID
router.delete('/:id', deleteConfigById);

// Route to update a configuration partially by ID
router.patch('/:id', updateConfigById);

module.exports = router;
