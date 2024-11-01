type MockedRequest = {
  path?: string;
  headers?: Record<string, string>;
};

/**
 * Helper function for unit tests to create a mocked request object
 * @param {MockedRequest}  - - `path`: The path of the request. It is set to `'/'` by default.
 * @returns The function `mockRequest` returns an object with the properties `path` and `headers`.
 */
export const mockRequest = ({ path = '/', headers = {} }: MockedRequest) => {
  return {
    path,
    headers
  };
};
