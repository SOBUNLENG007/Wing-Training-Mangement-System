export type AuthUser = {
  id:         number;
  name:       string;
  email:      string;
  role:       "admin" | "trainer" | "employee";
  department: string;
};

export type LoginRequest = {
  email:    string;
  password: string;
};

export type LoginResponse = {
  accessToken:  string;
  refreshToken: string;
  user:         AuthUser;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  payload: T;
};