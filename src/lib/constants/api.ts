export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    BASE: `${API_BASE_URL}/auth`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    GOOGLE: `${API_BASE_URL}/google_user_login`,
    USER: (email: string) =>
      `${API_BASE_URL}/auth/user/${encodeURIComponent(email)}`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/logout`,
    EMAIL_SEND: `${API_BASE_URL}/request_email_send`,
  },
} as const;

export const API_HEADERS = {
  JSON: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  FORM_DATA: {
    "Content-Type": "multipart/form-data",
  },
  AUTH: (token: string) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }),
  AUTH_FORM_DATA: (token: string) => ({
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  }),
};

export type ApiEndpoints = typeof API_ENDPOINTS;
export type ApiHeaders = typeof API_HEADERS;

// Helper types for API responses
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};
