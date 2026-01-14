const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/prayers', require('./routes/prayers'));

// Health Check
app.get('/', (req, res) => {
    res.send('Central Charis Chapel Backend is Running 🚀');
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`➜  API Endpoint: http://localhost:${PORT}/api/prayers`);
});
