import { createBrowserRouter } from 'react-router';

import {
  LazyApplications,
  LazyHomePage,
  LazyLogin,
  LazyOrganization,
  LazyProcess,
} from '@/app/lazy/lazy';

import Layout from '../../layout/Layout';

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
      {
        path: 'org',
        element: <LazyOrganization />,
      },
      {
        path: 'process/:name',
        element: <LazyProcess />,
      },
    ],
  },
  {
    path: '/login',
    element: <LazyLogin />,
  },
]);
