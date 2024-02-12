import * as http from 'node:http';
import {
  deleteRequest,
  getRequests,
  postRequest,
  putRequest,
} from './requests.ts';
import { Result } from 'types';
import dotenv from 'dotenv';

dotenv.config();

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
          result = deleteRequest(input);
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

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server started on port ', port);
});
