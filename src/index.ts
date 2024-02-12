import * as http from 'node:http';
import { v4 as uuidv4, validate } from 'uuid';

console.log(uuidv4());
interface User {
  id: string;
  username: string;
  age: string;
  hobbies: string[];
}
interface Users {
  [key: string]: User;
}

interface Result {
  status: 400 | 404 | 200;
  content: string | User | Users;
}

const users: Users = {
  '8b056444-b6b3-46d4-acd9-416c119c5293': {
    id: '8b056444-b6b3-46d4-acd9-416c119c5293',
    username: 'Duxcoder',
    age: '12',
    hobbies: ['js'],
  },

  '75ba0f01-b739-4b63-a54e-b07d2241f796': {
    id: '75ba0f01-b739-4b63-a54e-b07d2241f796',
    username: 'Guest',
    age: '98',
    hobbies: ['cartoon'],
  },
};

const checkPathUser = (path: string) => {
  return path.split('/').length === 4 && path.startsWith('/api/users/');
};

const getUserById = (id: string): Result => {
  if (!validate(id)) return { status: 400, content: 'User id is invalid' };
  if (id in users) {
    return { status: 200, content: users[id] as User };
  } else {
    return { status: 404, content: 'User is not found' };
  }
};

const getRequests = (path: string = ''): Result => {
  const request = path.split('/');
  let id = '';
  if (request.length === 4) id = request[3] as string;

  switch (true) {
    case path === '/api/users':
      return { status: 200, content: users };
    case checkPathUser(path):
      return getUserById(id);
  }
  return { status: 404, content: 'Page is not found' };
};

const server = http.createServer((req, res) => {
  let result: Result = { status: 404, content: 'Page is not found' };
  switch (req.method) {
    case 'GET':
      result = getRequests(req.url?.trim());
      break;
    case 'POST':
      // getRequests(req.url?.trim());
      break;
    case 'PUT':
      // getRequests(req.url?.trim());
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
});

server.listen(8080, () => {
  console.log('Server started on port 3000');
});
