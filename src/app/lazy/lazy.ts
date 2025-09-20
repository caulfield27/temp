import { lazy } from 'react';

export const LazyHomePage = lazy(() => import('../../pages/home'));

export const LazyLogin = lazy(() => import('../../pages/login'));

export const LazyApplications = lazy(() => import('../../pages/applications'));

export const LazyProcess = lazy(() => import('../../pages/process'));

export const LazyOrganization = lazy(() => import('../../pages/organization'));
