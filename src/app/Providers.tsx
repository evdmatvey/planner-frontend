import { LazyMotion, domAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

export const Providers = () => {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              color: 'var(--text)',
              background: 'var(--toast-background)',
            },
          }}
        />
        <RouterProvider router={router} />
      </LazyMotion>
    </>
  );
};
