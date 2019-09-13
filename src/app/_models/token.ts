export type Token = {
  ID: number;
  UserId: number;
  Name: string;
  Token: string;
  Type: string;
  CreatedUnix: number;
  LastActionUnix: number;
  IsActive: boolean;
}

export type NewToken = {
  token_type: string
  token_name: string
}
