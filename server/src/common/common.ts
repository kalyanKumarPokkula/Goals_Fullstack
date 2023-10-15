export interface LoginI {
  email: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}

export interface PayloadToJwt {
  userId: string;
  email: string;
}

export interface GoalPayload {
  goal: string;
  userId: string;
}

interface Response {
  data?: object;
  success: boolean;
  message?: string;
  err?: object;
}

export function commanResponse(data: Response) {
  return data;
}