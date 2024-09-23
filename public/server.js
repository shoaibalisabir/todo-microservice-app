const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '.')));

// Endpoint to get service URLs
app.get('/get-service-urls', (req, res) => {
    res.json({
        userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:3000',
        taskServiceUrl: process.env.TASK_SERVICE_URL || 'http://localhost:3001',
        htmlServiceUrl: process.env.HTML_SERVICE_URL || 'http://localhost:8080'
    });
});

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`HTML frontend running on port ${PORT}`);
});
