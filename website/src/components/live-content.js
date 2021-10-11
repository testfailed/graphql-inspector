import React from 'react';
import {Loading} from './loading';
import dynamic from 'next/dynamic';

const ErrorBoundary = dynamic(() => import('../components/error-boundry'), { ssr: false})

const LiveContent = () => {
    const Diff = React.lazy(() => import('../components/diff'));

    return (
        <ErrorBoundary>
            <React.Suspense fallback={<Loading color="#fff" height="300px" />}>
                <Diff />
            </React.Suspense>
        </ErrorBoundary>
    );
};

export default LiveContent;
