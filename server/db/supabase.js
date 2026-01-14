const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use Service Key for backend!

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Supabase URL or Key missing in server .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
