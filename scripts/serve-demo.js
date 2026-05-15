'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const demoFile = path.join(__dirname, '..', 'demo', 'index.html');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(demoFile).pipe(res);
});

server.listen(PORT, () => {
  console.log(`compact-viz demo running at http://localhost:${PORT}`);
});
