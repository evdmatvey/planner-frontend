import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              color: 'var(--text)',
              background: 'var(--popup-background)',
            },
          }}
        />
        <RouterProvider router={router} />
      </LazyMotion>
    </QueryClientProvider>
  );
};
