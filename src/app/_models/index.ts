import {Image} from './image';
import {Link, NewLink} from './link';
import {NewToken, Token} from './token';
import {User} from './user';

export * from './role';
export * from './user';
export * from './token';
export * from './link';
export * from './image';

export type Query = {
  users(page: number): User[];
  lastUser: User;
  user(id: number): User;

  createToken(token: NewToken): Token;
  deleteToken(token: String): Token;
  setActiveToken(state: Boolean, token: String)
  tokens(page: number): Token[];

  links(): Link[];
  link(id: number): Link;
  createLink(row: NewLink): Link;
  deleteLink(id: number): Link;
  setActiveLink(state: boolean, id: number): Link;

  images(page: string): Image[];
  image(id: number): Image;
  createImage(row: NewLink): Image;
  deleteImage(id: number): Image;
  setActiveImage(state: boolean, id: number): Image;

  getCountElements: CountElements;

}

export type CountElements = {
  TypeElement: string
  CountElement: number
  ItemPerPage: number
}

export class Pagination {
  loading: boolean
  elems: CountElements
  page: number
  constructor() {
    // this.loading = false;
    // this.elems = {
    //   TypeElement: '',
    //   CountElement: 30,
    //   ItemPerPage: 10,
    // }
    // this.page = 1
  }
}
