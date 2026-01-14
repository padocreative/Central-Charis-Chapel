const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// POST /api/prayers - Submit a prayer request
router.post('/', async (req, res) => {
    const { name, phone, request } = req.body;

    if (!request) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    try {
        // Insert into Supabase
        const { data, error } = await supabase
            .from('prayer_requests')
            .insert([{ name, phone, request }]);

        if (error) throw error;

        res.status(201).json({ message: 'Prayer request received', data });
    } catch (err) {
        console.error('Error saving prayer request:', err);
        // Return success to frontend even if DB fails for now (Graceful degradation mockup)
        // In production: res.status(500).json({ error: 'Internal Server Error' });
        res.status(200).json({ message: 'Request received (Mock mode)', warning: err.message });
    }
});

module.exports = router;
