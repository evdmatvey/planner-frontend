import toast from 'react-hot-toast';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const toastifyError = (error: any) => {
  console.log(error);
  if (error instanceof Array) {
    error.forEach((err) => toast.error(err));
  }

  if (typeof error === 'string') {
    toast.error(error);
  }
};
