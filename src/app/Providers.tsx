import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

export const Providers = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          position: 'top-right',
          style: {
            color: 'var(--text)',
            background: 'var(--toast-background)',
          },
        }}
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};
