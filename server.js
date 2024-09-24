// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());  // To allow cross-origin requests
app.use(bodyParser.json());  // To parse incoming JSON data

// POST route to handle search queries
app.post('/api/query', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    // Here, we are just echoing back the query. You can add real logic later.
    res.json(`You searched for: "${query}"`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
