import { lazy, Suspense } from 'react';
import { Loading } from './loading';
import dynamic from 'next/dynamic';

const ErrorBoundary = dynamic(() => import('../components/error-boundry'), {
  ssr: false,
});

const LiveContent = () => {
  const Diff = lazy(() => import('../components/diff'));

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading color="#fff" height="300px" />}>
        <Diff />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LiveContent;
