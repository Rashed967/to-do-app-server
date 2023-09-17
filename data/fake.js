const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if(req.method === 'OPTIONS'){
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url === '/api/send-data' && req.method === 'POST') {
    let body = '';

    // Listen for data chunks in the request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const taskToEntry = JSON.parse(body);
        console.log('Data from client:', taskToEntry);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received successfully' }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }


});

const port = 3000;
const hsot = 'localhost';

server.listen(port, hsot, () => {
  console.log('Server is running');
});
