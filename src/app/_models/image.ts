import {User} from './user';

export type Image = {
  ID: number;
  UserId: number;
  Name: string;
  CustomName: string;
  FileName: string;
  Size: number;
  MIMEType: string;
  CreatedUnix: number;
  LastActionUnix: number;
  IsActive: boolean;
  User: User;
  URI: string;
}
