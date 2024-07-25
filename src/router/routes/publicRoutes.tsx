import { lazy } from "react";

import { LoadingContainer } from "../../containers";

import { ERoutes } from "../../constants";

const LandingPage = LoadingContainer(
  lazy(() => import("../../pages/LandingPage")),
);
const PremiumPage = LoadingContainer(
  lazy(() => import("../../pages/PremiumPage")),
);
const TermsOfSubcriptionsPage = LoadingContainer(
  lazy(() => import("../../pages/TermsOfSubcriptionsPage")),
);
const TermsAndConditionsPage = LoadingContainer(
  lazy(() => import("../../pages/TermsAndConditionsPage")),
);
const PrivacyPolicyPage = LoadingContainer(
  lazy(() => import("../../pages/PrivacyPolicyPage")),
);
const MoneyBackPage = LoadingContainer(
  lazy(() => import("../../pages/MoneyBackPage")),
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
    path: ERoutes.TERMS,
    element: <TermsAndConditionsPage />,
  },
  {
    path: ERoutes.SUBSCRIPTIONS,
    element: <TermsOfSubcriptionsPage />,
  },
  {
    path: ERoutes.PRIVACY_POLICY,
    element: <PrivacyPolicyPage />,
  },
  {
    path: ERoutes.MONEY,
    element: <MoneyBackPage />,
  },
  {
    path: ERoutes.NOT_FOUND,
    element: <>Not found</>,
  },
];
