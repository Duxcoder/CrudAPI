import Users from './database.ts';
import { Result, User, UserBase } from './types.ts';
import { checkPathUser, extractId } from './utils.ts';
import { validate } from 'uuid';

const getUserById = (id: string): Result => {
  if (!validate(id)) return { status: 400, content: 'User id is invalid' };
  if (id in Users.getUsers()) {
    return { status: 200, content: Users.getUser(id) as User };
  } else {
    return { status: 404, content: 'User is not found' };
  }
};

export const getRequests = (path: string = ''): Result => {
  const id = extractId(path);

  switch (true) {
    case path === '/api/users':
      return { status: 200, content: Users.getUsers() };
    case checkPathUser(path):
      return getUserById(id);
  }
  return { status: 404, content: 'Page is not found' };
};

export const postRequest = (data: UserBase): Result => {
  if (!data.username || !data.age || !data.hobbies) {
    return { status: 400, content: 'Missing required fields' };
  }

  const user = Users.createUser(data);
  return { status: 201, content: user };
};

export const putRequest = (data: UserBase, path: string = ''): Result => {
  const id = extractId(path);

  if (!validate(id)) {
    return { status: 400, content: 'User id is invalid' };
  }

  if (!Users.getUser(id)) return { status: 404, content: 'User is not found' };

  const user = Users.updateUser(id, data);
  return { status: 200, content: user };
};

export const deleteRequest = (path: string = ''): Result => {
  const id = extractId(path);

  if (!validate(id)) {
    return { status: 400, content: 'User id is invalid' };
  }

  if (!Users.getUser(id)) return { status: 404, content: 'User is not found' };

  const user = Users.deleteUser(id);

  return { status: 204, content: user as User };
};
