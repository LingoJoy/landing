import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  ContactUsTemplate,
  ProfileTemplate,
  PasswordTemplate,
  EmailTemplate,
  ManagePersonalTemplate,
  TermsTemplate,
  LanguageTemplate,
  PaymentsTemplate,
} from "@/components/templates";
import CoursesPage from "@/components/pages/Courses";
import Profile from "@/components/pages/ProfilePage";
import StartPage from "@/components/pages/StartPage";
import LoginPage from "@/components/pages/LoginPage";
import MotivationPage from "@/components/pages/MotivationPage";
import VocabularyPage from "@/components/pages/VocabularyPage";
import PersonalizationPage from "@/components/pages/PersonalizationPage";
import ChildrenPage from "@/components/pages/ChildrenPage";
import TimePage from "@/components/pages/TimePage";
import AnalyzePage from "@/components/pages/AnalyzePage";
import EmailPage from "@/components/pages/EmailPage";
import DidYouKnowPage from "@/components/pages/DidYouKnowPage";
import PayPage from "@/components/pages/PayPage";
import CreateAccountPage from "@/components/pages/CreateAccountPage";
import PremiumPage from "@/components/pages/PremiumPage";
import TermsAndConditionsPage from "@/components/pages/TermsAndConditionsPage";
import TermsOfSubcriptionsPage from "@/components/pages/TermsOfSubcriptionsPage";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import MoneyBackPage from "@/components/pages/MoneyBackPage";
import ChatPage from "@/components/pages/ChatPage";
import CourseList from "@/components/organisms/CourseList";
import { NotificationTemplate } from "@/components/templates/Notification";
import PopularPhrases from "@/components/organisms/PopularPhrases";
import WordsPage from "@/components/pages/WordsPage";
import PlanPage from "@/components/pages/PlanPage";
import FactPage from "@/components/pages/FactPage";
import NewLandingPage from "@/components/pages/NewLandingPage";
import LandingPage from "@/components/pages/LandingPage";
import NewPremiumPage from "@/components/pages/NewPremiumPage";
import NewestPremiumPage from "@/components/pages/NewestPremiumPage";
import CourseListDev from "@/components/organisms/CourseListDev";

import { ERoutes } from "@/constants/pages";

export const router = createBrowserRouter([
  {
    path: ERoutes.COURSES,
    element: <CoursesPage />,
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
    element: <MotivationPage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_VOCABULARY,
    element: <VocabularyPage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_PERSONALIZATION,
    element: <PersonalizationPage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_CHILDREN,
    element: <ChildrenPage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_TIME,
    element: <TimePage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_ANALYZE,
    element: <AnalyzePage />,
  },
  {
    path: ERoutes.QUESTIONNAIRE_EMAIL,
    element: <EmailPage />,
  },
  {
    path: ERoutes.KNOW,
    element: <DidYouKnowPage />,
  },
  {
    path: ERoutes.PAY,
    element: <PayPage />,
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
    element: <WordsPage />,
  },
  {
    path: ERoutes.PLAN,
    element: <PlanPage />,
  },
  {
    path: ERoutes.FACT,
    element: <FactPage />,
  },
  {
    path: ERoutes.PREMIUM,
    element: <PremiumPage />,
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
    element: <Navigate to={ERoutes.QUESTIONNAIRE_START} />,
  },
]);