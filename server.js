const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

let server;  // Server instance to control start/stop

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route to handle search queries
app.use(express.json());
app.post('/api/query', (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    res.json(`You searched for: "${query}"`);
});

// POST route to "start" the server (simulated by responding to requests)
app.post('/start', (req, res) => {
    if (server) {
        res.json({ message: 'Server is already running.' });
    } else {
        server = app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
            res.json({ message: 'Server started successfully.' });
        });
    }
});

// POST route to "stop" the server (simulated by stopping responses)
app.post('/stop', (req, res) => {
    if (server) {
        server.close(() => {
            console.log('Server stopped.');
            server = null;
            res.json({ message: 'Server stopped successfully.' });
        });
    } else {
        res.json({ message: 'Server is not running.' });
    }
});

// Start the server when this script runs
server = app.listen(port, () => {
    console.log(`Server initialized at http://localhost:${port}`);
    import('open').then((open) => {
        open.default(`http://localhost:${port}`);
    }).catch((err) => {
        console.error('Failed to open browser:', err);
    });
});