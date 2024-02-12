import * as http from 'node:http';
import { getRequests, postRequest, putRequest } from './requests.ts';
import { Result } from 'types';

const server = http.createServer((req, res) => {
  let result: Result = { status: 404, content: 'Page is not found' };
  let body: Buffer[] = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', async () => {
    try {
      const data = Buffer.concat(body).toString('utf-8');
      let input = req.url?.trim() || '';
      if (input.endsWith('/')) input = input.slice(0, -1);

      switch (req.method) {
        case 'GET':
          result = getRequests(input);
          break;
        case 'POST':
          result = postRequest(JSON.parse(data));
          break;
        case 'PUT':
          result = putRequest(JSON.parse(data), input);
          break;
        case 'DELETE':
          // getRequests(req.url?.trim());
          break;
      }

      res.writeHead(result.status, {
        'Content-Type': 'application/json',
      });
      res.statusCode = result.status;
      res.end(JSON.stringify(result.content));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify(`Errors on the server: ${(e as Error).message}`));
    }
  });
});

server.listen(8080, () => {
  console.log('Server started on port 3000');
});
