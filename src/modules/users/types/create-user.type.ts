export interface CreateUser {
  name: string;
  email: string;
  password: string;
  login_active: boolean;
  rol_id: number;
}
