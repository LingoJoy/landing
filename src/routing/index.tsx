import CourseList from "@/components/organisms/CourseList";
import CourseListDev from "@/components/organisms/CourseListDev";
import PopularPhrases from "@/components/organisms/PopularPhrases";
import AnalyzePage from "@/components/pages/AnalyzePage";
import ChatPage from "@/components/pages/ChatPage";
import ChildrenPage from "@/components/pages/ChildrenPage";
import CreateAccountPage from "@/components/pages/CreateAccountPage";
import DidYouKnowPage from "@/components/pages/DidYouKnowPage";
import EmailPage from "@/components/pages/EmailPage";
import FactPage from "@/components/pages/FactPage";
import LandingPage from "@/components/pages/LandingPage";
import LoginPage from "@/components/pages/LoginPage";
import MoneyBackPage from "@/components/pages/MoneyBackPage";
import MotivationPage from "@/components/pages/MotivationPage";
import NewestPremiumPage from "@/components/pages/NewestPremiumPage";
import NewLandingPage from "@/components/pages/NewLandingPage";
import NewPremiumPage from "@/components/pages/NewPremiumPage";
import PayPage from "@/components/pages/PayPage";
import PersonalizationPage from "@/components/pages/PersonalizationPage";
import PlanPage from "@/components/pages/PlanPage";
import PremiumPage from "@/components/pages/PremiumPage";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import Profile from "@/components/pages/ProfilePage";
import StartPage from "@/components/pages/StartPage";
import TermsAndConditionsPage from "@/components/pages/TermsAndConditionsPage";
import TermsOfSubcriptionsPage from "@/components/pages/TermsOfSubcriptionsPage";
import TimePage from "@/components/pages/TimePage";
import VocabularyPage from "@/components/pages/VocabularyPage";
import WordsPage from "@/components/pages/WordsPage";
import { ContactUsTemplate, EmailTemplate, LanguageTemplate, ManagePersonalTemplate, PasswordTemplate, PaymentsTemplate, ProfileTemplate, TermsTemplate } from "@/components/templates";
import NotificationTemplate from "@/components/templates/Notification";
import { ERoutes } from "@/constants/pages";
import React, { createElement, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingNbPage from "../components/pages/LandingNbPage";
import LandingPr2Page from "../components/pages/LandingPr2Page";
import LandingPrPage from "../components/pages/LandingPrPage";
import NewLandingPremiumPage from "../components/pages/NewLandingPremiumPage";

const CoursesPage = React.lazy(() => import("@/components/pages/Courses"));

export const router = createBrowserRouter([
  {
    path: ERoutes.COURSES,
    element: <Suspense fallback={<div>Loading Courses...</div>}>{createElement(CoursesPage)}</Suspense>,
    children: [
      { element: <CourseList />, index: true },
      {
        path: "dev",
        element: <CourseListDev />, 
        index: true,
      },
    ],
  },
  { path: ERoutes.POPULAR_PHRASES, element: <PopularPhrases /> },
  { path: ERoutes.PROFILE, element: <Profile />, children: [
    { element: <ProfileTemplate />, index: true },
    { path: ERoutes.PASSWORD, element: <PasswordTemplate />, index: true },
    { path: ERoutes.EMAIL, element: <EmailTemplate />, index: true },
    { path: ERoutes.MANAGE_INFORMATION, element: <ManagePersonalTemplate />, index: true },
    { path: ERoutes.TERMS, element: <TermsTemplate />, index: true },
    { path: ERoutes.LANGUAGE, element: <LanguageTemplate />, index: true },
    { path: ERoutes.CONTACT, element: <ContactUsTemplate />, index: true },
    { path: ERoutes.PAYMENTS, element: <PaymentsTemplate />, index: true },
  ]},
  { path: ERoutes.QUESTIONNAIRE_START, element: <StartPage /> },
  { path: ERoutes.LOGIN, element: <LoginPage /> },
  { path: ERoutes.QUESTIONNAIRE_MOTIVATION, element: <MotivationPage /> },
  { path: ERoutes.QUESTIONNAIRE_VOCABULARY, element: <VocabularyPage /> },
  { path: ERoutes.QUESTIONNAIRE_PERSONALIZATION, element: <PersonalizationPage /> },
  { path: ERoutes.QUESTIONNAIRE_CHILDREN, element: <ChildrenPage /> },
  { path: ERoutes.QUESTIONNAIRE_TIME, element: <TimePage /> },
  { path: ERoutes.QUESTIONNAIRE_ANALYZE, element: <AnalyzePage /> },
  { path: ERoutes.QUESTIONNAIRE_EMAIL, element: <EmailPage /> },
  { path: ERoutes.KNOW, element: <DidYouKnowPage /> },
  { path: ERoutes.PAY, element: <PayPage /> },
  { path: ERoutes.SIGN_UP, element: <CreateAccountPage /> },
  { path: ERoutes.LANDING, element: <LandingPage /> },
  { path: ERoutes.NEW_LANDING, element: <NewLandingPage /> },
  { path: ERoutes.NEW_PREMIUM, element: <NewPremiumPage /> },
  { path: ERoutes.NEWEST_LANDING, element: <NewestPremiumPage /> },
  { path: ERoutes.WORDS, element: <WordsPage /> },
  { path: ERoutes.PLAN, element: <PlanPage /> },
  { path: ERoutes.FACT, element: <FactPage /> },
  { path: ERoutes.PREMIUM, element: <PremiumPage /> },
  { path: ERoutes.TERMS_AND_CONDITIONS, element: <TermsAndConditionsPage /> },
  { path: ERoutes.SUBSCRIPTIONS, element: <TermsOfSubcriptionsPage /> },
  { path: ERoutes.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
  { path: ERoutes.MONEY, element: <MoneyBackPage /> },
  { path: ERoutes.CHAT, element: <ChatPage /> },
  { path: ERoutes.NOTIFICATION, element: <NotificationTemplate /> },
  {
    path: ERoutes.NOT_FOUND,
    element: <Navigate to={ERoutes.QUESTIONNAIRE_START} />,
  },
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.NEW_LANDING_PREMIUM, element: <NewLandingPremiumPage /> }] : []),
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.LANDING_PR, element: <LandingPrPage /> }] : []),
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.LANDING_PR2, element: <LandingPr2Page /> }] : []),
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.LANDING_PR3, element: <LandingPr2Page /> }] : []),
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.LANDING_PR4, element: <LandingPr2Page /> }] : []),
  ...(window.location.hostname !== "lingojoy.app" ? [{ path: ERoutes.LANDING_NB, element: <LandingNbPage /> }] : []),
]);
