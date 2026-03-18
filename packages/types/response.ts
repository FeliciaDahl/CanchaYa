// Common response and pagination types

export interface PaginationOptions {
  page: number;
  limit: number;
  skip?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: Date;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp?: Date;
}
