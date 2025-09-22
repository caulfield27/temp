import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { Loader } from '@/ui/loader/Loader';

import { Header } from './_components';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[var(--container_mw)] pt-8 m-auto">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
