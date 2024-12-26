const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiConfigRoutes = require('./routes/apiConfigRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const apiSequenceRoutes = require('./routes/apiSequenceRoutes'); // Import sequence routes
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Basic route to test server is running
app.get('/', (req, res) => {
    res.send('API Maker Backend');
});

// Routes
app.use('/api/config', apiConfigRoutes);
app.use('/api/sequences', apiSequenceRoutes);
app.use('/api/workflows', workflowRoutes);

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



