import { createBrowserRouter, Navigate } from "react-router-dom";
import { ContactUsTemplate, ProfileTemplate, PasswordTemplate, EmailTemplate, ManagePersonalTemplate, TermsTemplate, LanguageTemplate, PaymentsTemplate } from "@/components/templates";
import { createElement, lazy, Suspense } from "react";
import TermsOfSubcriptionsPage from "@/components/pages/TermsOfSubcriptionsPage";
import TermsAndConditionsPage from "@/components/pages/TermsAndConditionsPage";
import NotificationTemplate from "@/components/templates/Notification";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import NewestPremiumPage from "@/components/pages/NewestPremiumPage";
import CreateAccountPage from "@/components/pages/CreateAccountPage";
import PopularPhrases from "@/components/organisms/PopularPhrases";
import CourseListDev from "@/components/organisms/CourseListDev";
import NewLandingPage from "@/components/pages/NewLandingPage";
import NewPremiumPage from "@/components/pages/NewPremiumPage";
import MoneyBackPage from "@/components/pages/MoneyBackPage";
import CourseList from "@/components/organisms/CourseList";
import LandingPage from "@/components/pages/LandingPage";
import Profile from "@/components/pages/ProfilePage";
import LoginPage from "@/components/pages/LoginPage";
import StartPage from "@/components/pages/StartPage";
import ChatPage from "@/components/pages/ChatPage";
import { ERoutes } from "@/constants/pages";

const pages = {
  CoursesPage: lazy(() => import("@/components/pages/Courses")),
  MotivationPage: lazy(() => import("@/components/pages/MotivationPage")),
  VocabularyPage: lazy(() => import("@/components/pages/VocabularyPage")),
  PersonalizationPage: lazy(() => import("@/components/pages/PersonalizationPage")),
  ChildrenPage: lazy(() => import("@/components/pages/ChildrenPage")),
  TimePage: lazy(() => import("@/components/pages/TimePage")),
  AnalyzePage: lazy(() => import("@/components/pages/AnalyzePage")),
  EmailPage: lazy(() => import("@/components/pages/EmailPage")),
  DidYouKnowPage: lazy(() => import("@/components/pages/DidYouKnowPage")),
  PayPage: lazy(() => import("@/components/pages/PayPage")),
  PremiumPage: lazy(() => import("@/components/pages/PremiumPage")),
  WordsPage: lazy(() => import("@/components/pages/WordsPage")),
  PlanPage: lazy(() => import("@/components/pages/PlanPage")),
  FactPage: lazy(() => import("@/components/pages/FactPage")),
};

export const router = createBrowserRouter([
  {
    path: ERoutes.COURSES,
    element: <Suspense fallback={<div>Loading Courses...</div>}>{createElement(pages.CoursesPage)}</Suspense>,
    children: [
      { element: <CourseList />, index: true },
      {
        path: "dev",
        element: <CourseListDev />,
        index: true,
      },
    ],
  },
  {
    path: ERoutes.POPULAR_PHRASES,
    element: <PopularPhrases />,
  },
  {
    path: ERoutes.PROFILE,
    element: <Profile />,
    children: [
      { element: <ProfileTemplate />, index: true },
      {
        path: ERoutes.PASSWORD,
        element: <PasswordTemplate />,
        index: true,
      },
      {
        path: ERoutes.EMAIL,
        element: <EmailTemplate />,
        index: true,
      },
      {
        path: ERoutes.MANAGE_INFORMATION,
        element: <ManagePersonalTemplate />,
        index: true,
      },
      {
        path: ERoutes.TERMS,
        element: <TermsTemplate />,
        index: true,
      },
      {
        path: ERoutes.LANGUAGE,
        element: <LanguageTemplate />,
        index: true,
      },
      {
        path: ERoutes.CONTACT,
        element: <ContactUsTemplate />,
        index: true,
      },
      {
        path: ERoutes.PAYMENTS,
        element: <PaymentsTemplate />,
        index: true,
      },
    ],
  },
  {
    path: ERoutes.QUESTIONNAIRE_START,
    element: <StartPage />,
  },
  {
    path: ERoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_MOTIVATION,
    element: <Suspense fallback={<div>Loading Motivation...</div>}>{createElement(pages.MotivationPage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_VOCABULARY,
    element: <Suspense fallback={<div>Loading Vocabulary...</div>}>{createElement(pages.VocabularyPage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_PERSONALIZATION,
    element: <Suspense fallback={<div>Loading Personalization...</div>}>{createElement(pages.PersonalizationPage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_CHILDREN,
    element: <Suspense fallback={<div>Loading Vocabulary...</div>}>{createElement(pages.ChildrenPage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_TIME,
    element: <Suspense fallback={<div>Loading Time...</div>}>{createElement(pages.TimePage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_ANALYZE,
    element: <Suspense fallback={<div>Loading Analyze...</div>}>{createElement(pages.AnalyzePage)}</Suspense>,
  },
  {
    path: ERoutes.QUESTIONNAIRE_EMAIL,
    element: <Suspense fallback={<div>Loading Email...</div>}>{createElement(pages.EmailPage)}</Suspense>,
  },
  {
    path: ERoutes.KNOW,
    element: <Suspense fallback={<div>Loading Did you know...</div>}>{createElement(pages.DidYouKnowPage)}</Suspense>,
  },
  {
    path: ERoutes.PAY,
    element: <Suspense fallback={<div>Loading Pay...</div>}>{createElement(pages.PayPage)}</Suspense>,
  },
  {
    path: ERoutes.SIGN_UP,
    element: <CreateAccountPage />,
  },
  {
    path: ERoutes.LANDING,
    element: <LandingPage />,
  },
  {
    path: ERoutes.NEW_LANDING,
    element: <NewLandingPage />,
  },
  {
    path: ERoutes.NEW_PREMIUM,
    element: <NewPremiumPage />,
  },
  {
    path: ERoutes.NEWEST_LANDING,
    element: <NewestPremiumPage />,
  },
  {
    path: ERoutes.WORDS,
    element: <Suspense fallback={<div>Loading Words...</div>}>{createElement(pages.WordsPage)}</Suspense>,
  },
  {
    path: ERoutes.PLAN,
    element: <Suspense fallback={<div>Loading Plan...</div>}>{createElement(pages.PlanPage)}</Suspense>,
  },
  {
    path: ERoutes.FACT,
    element: <Suspense fallback={<div>Loading Fact...</div>}>{createElement(pages.FactPage)}</Suspense>,
  },
  {
    path: ERoutes.PREMIUM,
    element: <Suspense fallback={<div>Loading Premium...</div>}>{createElement(pages.PremiumPage)}</Suspense>,
  },
  {
    path: ERoutes.TERMS_AND_CONDITIONS,
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
    path: ERoutes.CHAT,
    element: <ChatPage />,
  },
  {
    path: ERoutes.NOTIFICATION,
    element: <NotificationTemplate />,
  },
  {
    path: ERoutes.NOT_FOUND,
    element: (
      <Suspense fallback={<div>Loading Questionnaire...</div>}>
        <Navigate to={ERoutes.QUESTIONNAIRE_START} />
      </Suspense>
    ),
  },
]);
