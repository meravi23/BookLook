// Load HTTP module
const http = require('http');
const fs = require('fs');

// Create HTTP server and listen on port 8000 for requests
http
    .createServer((request, response) => {
        // Set response HTTP header with HTTP status and Content type
        response.writeHead(200, {
            'Content-Type': 'text/json'
        });

        fs.readFile('sellersServer.json’, (err, content) => {
            response.write(content); // write response to client - content of json file
            response.end();
        });
    })
    .listen(8000);
console.log('Server running at http://127.0.0.1:8000');
