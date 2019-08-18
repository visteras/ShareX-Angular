import {User} from './_models/user';

export type Query = {
  users(page: number): User[];
  lastUser: User;
  user(id: number): User;
}
