export type Link = {
  ID: number;
  UserId: number;
  Name: string;
  CustomName: string;
  ToSite: string;
  CreatedUnix: number;
  LastActionUnix: number;
  IsActive: boolean;
}

export type NewLink = {
  ToSite: string
  Name: string
  CustomName: string
}
