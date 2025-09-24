import { RouterProvider } from 'react-router';

import { Toaster } from '@/ui';

import { routes } from './routes';

export const AppProvider = () => {
  return (
    <>
      <RouterProvider router={routes} />;
      <Toaster />
    </>
  );
};
