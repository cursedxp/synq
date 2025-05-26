import { HTTPStatusCode, Response } from "../types/types";

export const createErrorResponse = (
  message: string,
  status: HTTPStatusCode = 400
): Response => ({
  success: false,
  message,
  status,
});

export const createSuccessResponse = <T>(
  message: string,
  data?: T,
  status: HTTPStatusCode = 200
): Response<T> => ({
  success: true,
  message,
  status,
  data,
});
