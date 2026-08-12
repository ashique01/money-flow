import { api } from "@/lib/api";
import { API } from "@/lib/endpoints";

export interface AuthUser {
  user_id: string;

  name: string;

  email: string;

  avatar: string;
}

export interface LoginResponse {
  authenticated: boolean;

  user: AuthUser;
}

export async function login(email: string) {
  return api.post<LoginResponse>(API.LOGIN, {
    email,
  });
}
