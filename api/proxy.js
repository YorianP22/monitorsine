// api/proxy.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Endpoint Google Apps Script yang sudah berisi semua fungsi (doPost)
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyjzVmFk2YosZLXEsSdAdDy0Y_2Qw6tGH-23Mj-94zmS7t9_sLfn2SHEUznbojwpyI-/exec';

// Proxy untuk semua permintaan POST
app.post('/api/proxy', async (req, res) => {
  try {
    const response = await fetch(GAS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // { action, args }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tangani OPTIONS untuk CORS preflight
app.options('/api/proxy', cors());

module.exports = app;
