import * as http from 'node:http';
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
];

const server = http.createServer((request, response) => {
  // Handle GET request to /api/users
  if (request.method === 'GET' && request.url === '/api/users') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(users));
  } else {
    // Handle other requests
    response.writeHead(404);
    response.end();
  }
});

server.listen(8080, () => {
  console.log('Server started on port 3000');
});
