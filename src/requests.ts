import { users } from './database.ts';
import { Result, User } from './types.ts';
import { checkPathUser } from './utils.ts';
import { validate, v4 as uuidv4 } from 'uuid';

const getUserById = (id: string): Result => {
  if (!validate(id)) return { status: 400, content: 'User id is invalid' };
  if (id in users) {
    return { status: 200, content: users[id] as User };
  } else {
    return { status: 404, content: 'User is not found' };
  }
};

export const getRequests = (path: string = ''): Result => {
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

export const postRequest = ({
  username,
  age,
  hobbies,
}: {
  username: string;
  age: string;
  hobbies: string[];
}): Result => {
  if (!username || !age || !hobbies || hobbies.length === 0) {
    return { status: 400, content: 'Missing required fields' };
  }

  const user: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users[user.id] = user;
  return { status: 201, content: user };
};
