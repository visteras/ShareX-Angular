export type User = {
  id: number;
  lower_name: string;
  name: string;
  login_name: string;
  email: string;
  passwd: string;
  must_change_password: boolean;
  language: string;
  description: string;
  created_unix: number;
  updated_unix: number;
  last_login_unix: number;
  last_action_unix: number;
  is_active: boolean;
  is_admin: boolean;
  theme: string;
}
