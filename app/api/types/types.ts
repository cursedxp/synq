type HTTPStatusCode = 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 409 | 500;

interface Response<T = unknown> {
  success: boolean;
  message: string;
  status: HTTPStatusCode;
  data?: T;
}

export type { Response, HTTPStatusCode };
