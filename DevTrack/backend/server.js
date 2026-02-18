const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes

// 1. Get All Attendance (with filters)
app.get('/api/attendance', async (req, res) => {
    const { user_id, start_date, end_date } = req.query;

    let query = supabase.from('attendance').select('*');

    if (user_id) query = query.eq('user_id', user_id);
    if (start_date && end_date) query = query.gte('date', start_date).lte('date', end_date);

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 2. Mark Attendance (Check-in/Check-out)
app.post('/api/attendance', async (req, res) => {
    const { user_id, date, status, check_in, check_out } = req.body;

    // Check if attendance already exists for this date
    const { data: existing } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', user_id)
        .eq('date', date)
        .single();

    if (existing) {
        if (check_out) {
            // Update checkout
            const { data, error } = await supabase
                .from('attendance')
                .update({ check_out })
                .eq('id', existing.id)
                .select();

            if (error) return res.status(500).json({ error: error.message });
            return res.json(data[0]);
        }
        return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    const { data, error } = await supabase
        .from('attendance')
        .insert([{ user_id, date, status, check_in, check_out }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// 3. Get Activities
app.get('/api/activities', async (req, res) => {
    const { user_id, start_date, end_date } = req.query;

    let query = supabase.from('activities').select('*');

    if (user_id) query = query.eq('user_id', user_id);
    if (start_date && end_date) query = query.gte('date', start_date).lte('date', end_date);

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 4. Log Activity
app.post('/api/activities', async (req, res) => {
    const { user_id, date, title, description, hours, category } = req.body;

    const { data, error } = await supabase
        .from('activities')
        .insert([{ user_id, date, title, description, hours, category }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
