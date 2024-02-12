export interface UserBase {
  username: string;
  age: string;
  hobbies: string[];
}
export interface User extends UserBase {
  id: string;
}
export interface Users {
  [key: string]: User;
}

export interface Result {
  status: 400 | 404 | 200 | 201;
  content: string | User | Users;
}
