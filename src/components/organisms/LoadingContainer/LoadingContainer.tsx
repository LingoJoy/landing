import { Suspense } from "react";

const LoadingContainer = (LazyComponent: React.ComponentType) => {
  return () => (
    <Suspense>
      <LazyComponent />
    </Suspense>
  );
};

export default LoadingContainer;
