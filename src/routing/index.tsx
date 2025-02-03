import { createBrowserRouter, Navigate } from "react-router-dom";
import { ContactUsTemplate, ProfileTemplate, PasswordTemplate, EmailTemplate, ManagePersonalTemplate, TermsTemplate, LanguageTemplate, PaymentsTemplate } from "@/components/templates";
import { createElement, lazy, Suspense } from "react";
import CreateAccountPage from "@/components/pages/CreateAccountPage";
import CourseListDev from "@/components/organisms/CourseListDev";
import CourseList from "@/components/organisms/CourseList";
import LoginPage from "@/components/pages/LoginPage";
import { ERoutes } from "@/constants/pages";

const pages = {
  CoursesPage: lazy(() => import("@/components/pages/Courses")),
  Profile: lazy(() => import("@/components/pages/ProfilePage")),
  StartPage: lazy(() => import("@/components/pages/StartPage")),
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
  TermsAndConditionsPage: lazy(() => import("@/components/pages/TermsAndConditionsPage")),
  TermsOfSubcriptionsPage: lazy(() => import("@/components/pages/TermsOfSubcriptionsPage")),
  PrivacyPolicyPage: lazy(() => import("@/components/pages/PrivacyPolicyPage")),
  MoneyBackPage: lazy(() => import("@/components/pages/MoneyBackPage")),
  ChatPage: lazy(() => import("@/components/pages/ChatPage")),
  CourseList: lazy(() => import("@/components/organisms/CourseList")),
  NotificationTemplate: lazy(() => import("@/components/templates/Notification")),
  PopularPhrases: lazy(() => import("@/components/organisms/PopularPhrases")),
  WordsPage: lazy(() => import("@/components/pages/WordsPage")),
  PlanPage: lazy(() => import("@/components/pages/PlanPage")),
  FactPage: lazy(() => import("@/components/pages/FactPage")),
  NewLandingPage: lazy(() => import("@/components/pages/NewLandingPage")),
  LandingPage: lazy(() => import("@/components/pages/LandingPage")),
  NewPremiumPage: lazy(() => import("@/components/pages/NewPremiumPage")),
  NewestPremiumPage: lazy(() => import("@/components/pages/NewestPremiumPage")),
  CourseListDev: lazy(() => import("@/components/organisms/CourseListDev")),
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
    element: <Suspense fallback={<div>Loading Popular phrases...</div>}>{createElement(pages.PopularPhrases)}</Suspense>,
  },
  {
    path: ERoutes.PROFILE,
    element: <Suspense fallback={<div>Loading Profile...</div>}>{createElement(pages.Profile)}</Suspense>,
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
    element: <Suspense fallback={<div>Loading Start...</div>}>{createElement(pages.StartPage)}</Suspense>,
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
    element: <Suspense fallback={<div>Loading Landing...</div>}>{createElement(pages.LandingPage)}</Suspense>,
  },
  {
    path: ERoutes.NEW_LANDING,
    element: <Suspense fallback={<div>Loading New landing...</div>}>{createElement(pages.NewLandingPage)}</Suspense>,
  },
  {
    path: ERoutes.NEW_PREMIUM,
    element: <Suspense fallback={<div>Loading New premium...</div>}>{createElement(pages.NewPremiumPage)}</Suspense>,
  },
  {
    path: ERoutes.NEWEST_LANDING,
    element: <Suspense fallback={<div>Loading Newest premium...</div>}>{createElement(pages.NewestPremiumPage)}</Suspense>,
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
    element: <Suspense fallback={<div>Loading Terms and Conditions...</div>}>{createElement(pages.TermsAndConditionsPage)}</Suspense>,
  },
  {
    path: ERoutes.SUBSCRIPTIONS,
    element: <Suspense fallback={<div>Loading Terms of Subcriptions...</div>}>{createElement(pages.TermsOfSubcriptionsPage)}</Suspense>,
  },
  {
    path: ERoutes.PRIVACY_POLICY,
    element: <Suspense fallback={<div>Loading Privacy policy...</div>}>{createElement(pages.PrivacyPolicyPage)}</Suspense>,
  },
  {
    path: ERoutes.MONEY,
    element: <Suspense fallback={<div>Loading Money back...</div>}>{createElement(pages.MoneyBackPage)}</Suspense>,
  },
  {
    path: ERoutes.CHAT,
    element: <Suspense fallback={<div>Loading Chat...</div>}>{createElement(pages.ChatPage)}</Suspense>,
  },
  {
    path: ERoutes.NOTIFICATION,
    element: <Suspense fallback={<div>Loading Notification template...</div>}>{createElement(pages.NotificationTemplate)}</Suspense>,
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
