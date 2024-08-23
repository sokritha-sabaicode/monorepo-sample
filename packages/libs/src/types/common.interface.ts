export interface APIResponse<T = undefined> {
  message: string;
  data?: T
}

export interface APIErrorResponse<T = undefined> {
  message: string;
  error?: T
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: string;
}

export interface PaginationResponse<T> {
  [key: string]: T[] | number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}