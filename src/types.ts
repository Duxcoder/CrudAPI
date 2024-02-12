export interface User {
  id: string;
  username: string;
  age: string;
  hobbies: string[];
}
export interface Users {
  [key: string]: User;
}

export interface Result {
  status: 400 | 404 | 200 | 201;
  content: string | User | Users;
}
