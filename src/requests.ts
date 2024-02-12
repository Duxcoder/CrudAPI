import { users } from './database.ts';
import { Result, User, UserBase } from './types.ts';
import { checkPathUser, extractId } from './utils.ts';
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
  const id = extractId(path);

  switch (true) {
    case path === '/api/users':
      return { status: 200, content: users };
    case checkPathUser(path):
      return getUserById(id);
  }
  return { status: 404, content: 'Page is not found' };
};

export const postRequest = ({ username, age, hobbies }: UserBase): Result => {
  if (!username || !age || !hobbies) {
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

export const putRequest = (data: UserBase, path: string = ''): Result => {
  const id = extractId(path);
  if (!users[id]) return { status: 404, content: 'User is not found' };

  const { username, age, hobbies } = data;
  if (!username || !age || !hobbies) {
    return { status: 400, content: 'Missing required fields' };
  }

  const user: User = { ...(users[id] as User), ...data };
  users[user.id] = user;
  return { status: 200, content: user };
};
