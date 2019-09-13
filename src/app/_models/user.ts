export type User = {
  ID: number;
  LowerName: string;
  Name: string;
  LoginName: string;
  Email: string;
  Passwd: string;
  MustChangePassword: boolean;
  Language: string;
  Description: string;
  CreatedUnix: number;
  UpdatedUnix: number;
  LastLoginUnix: number;
  LastActionUnix: number;
  IsActive: boolean;
  IsAdmin: boolean;
  Theme: string;
}
