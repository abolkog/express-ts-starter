export type ResponseMeta = {
  [key: string]: unknown;
};

export const successResponse = <T>(data: T, meta: ResponseMeta = {}) => ({
  data,
  meta
});

export const errorResponse = (error: string, statusCode: number) => ({
  error,
  statusCode
});
