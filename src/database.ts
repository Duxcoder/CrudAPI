import { UserBase, Users, User as UserType } from './types.ts';
import { v4 as uuidv4 } from 'uuid';

class User {
  private users: Users;
  constructor() {
    this.users = {
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
  }

  getUser(id: string) {
    return this.users[id];
  }

  updateUser(id: string, data: UserBase) {
    const user = { id, ...this.users[id], ...data };
    this.users[id] = user;
    return user;
  }

  createUser(data: UserBase) {
    const { username, age, hobbies } = data;
    const id = uuidv4();
    const user: UserType = {
      id,
      username,
      age,
      hobbies,
    };
    this.users[id] = user;
    return user;
  }

  getUsers() {
    return this.users;
  }

  deleteUser(id: string) {
    const temp = { ...this.users[id], ...{} };
    if (this.users[id]) delete this.users[id];
    return temp;
  }
}

export default new User();
