const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://api.conceptnet.io/";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.use('/conceptnet', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { [`^/conceptnet`]: ' ', }
}));

// Start Proxy
app.listen(PORT, HOST, () => { console.log(`Starting Proxy at ${HOST}:${PORT}`);});