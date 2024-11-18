const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('../frontend'));

app.post('/api/interact', async (req, res) => {
    try {
        const response = await axios.post(
            process.env.API_URL,
            req.body,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/widget-config', (req, res) => {
    res.json({
        ID: process.env.WIDGET_ID,
        region: process.env.WIDGET_REGION,
        render: 'bottom-right',
        stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
        ]
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 