export interface APIResponse<T = undefined> {
  message: string;
  data?: T
}

export interface APIErrorResponse<T = undefined> {
  message: string;
  error?: T
}

export function isAPIErrorResponse<T>(error: any): error is APIErrorResponse<T> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response.data.message === 'string' &&
    ('error' in error || error.error === undefined)
  );
}