import { AxiosError } from 'axios';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: never | any): string => {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  } else {
    return error.message;
  }
};
