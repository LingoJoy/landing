import { Suspense } from "react";

import { Loader } from "../../components";

const LoadingContainer = (LazyComponent: React.ComponentType) => {
  return () => (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LoadingContainer;
