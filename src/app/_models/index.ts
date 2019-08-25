import {NewToken, Token} from './token';
import {User} from './user';

export * from './role'
export * from './user'
export * from './token'

export type Query = {
  createToken(token: NewToken): Token;
  users(page: number): User[];
  lastUser: User;
  user(id: number): User;
  tokens(page: number): Token[];
}
