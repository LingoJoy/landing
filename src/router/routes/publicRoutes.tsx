import { lazy } from "react";

import { LoadingContainer } from "../../containers";

import { ERoutes } from "../../constants";

const LandingPage = LoadingContainer(
  lazy(() => import("../../pages/LandingPage")),
);
const PremiumPage = LoadingContainer(
  lazy(() => import("../../pages/PremiumPage")),
);

export const publicRoutes = [
  {
    path: ERoutes.START,
    element: <LandingPage />,
  },
  {
    path: ERoutes.PREMIUM,
    element: <PremiumPage />,
  },
  {
    path: ERoutes.NOT_FOUND,
    element: <>Not found</>,
  },
];
