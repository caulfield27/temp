import { createBrowserRouter } from 'react-router';
import Layout from '../../layout/Layout';
import { LazyApplications, LazyHomePage, LazyLogin } from '@/app/lazy/lazy';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LazyHomePage />,
      },
      {
        path: 'applications',
        element: <LazyApplications />,
      },
    ],
  },
  {
    path: '/login',
    element: <LazyLogin />,
  },
]);
