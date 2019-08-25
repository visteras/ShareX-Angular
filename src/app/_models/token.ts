export type Token = {
  id: number;
  user_id: number;
  name: string;
  token: string;
  type: string;
  created_unix: number;
  last_action_unix: number;
  is_active: boolean;
}

export type NewToken = {
  token_type: string
  token_name: string
}
