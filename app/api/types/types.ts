type HTTPStatusCode = 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 409 | 500;

interface Response<T = unknown> {
  success: boolean;
  message: string;
  status: HTTPStatusCode;
  data?: T;
}

interface RegisterUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  termsAccepted: boolean;
  newsletter: boolean;
}

export type { Response, HTTPStatusCode, RegisterUserRequest };
