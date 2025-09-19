import { Header } from '@/components/ui/header';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

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
