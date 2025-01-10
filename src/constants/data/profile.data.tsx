import { ReactNode } from "react";

import Bag from "@/assets/bag.svg";

import { ERoutes } from "@/constants/pages";
import { ELocalization } from "@/constants/localization";

interface ISubMenu {
  id: number;
  title: ELocalization;
  icon: ReactNode;
  url?: string;
  rightIcon?: string;
  button?: ReactNode;
  onClick?: () => void;
  log?: string;
}

export interface IMenu {
  id: number;
  title: ELocalization;
  subMenu: ISubMenu[];
}

export interface ILevel {
  id: number;
  title: string;
  subTitle: string;
  level: string;
}

export interface INotification {
  id: number;
  title: string;
  subTitle: string;
  active?: boolean;
}

export const DEFAULT_PAYMENT_MENU: IMenu[] = [
  {
    id: 0,
    title: ELocalization.PROFILE_PURCHASES,
    subMenu: [
      {
        id: 0,
        title: ELocalization.PROFILE_PAYMENTS,
        icon: <Bag />,
        url: ERoutes.PAYMENTS,
      },
    ],
  },
];

export const DEFAULT_LEVELS: ILevel[] = [
  {
    id: 0,
    title: "Level A1-A2",
    subTitle: "Beginner",
    level: "A1",
  },
  {
    id: 1,
    title: "Level B1",
    subTitle: "Intermediate",
    level: "B1",
  },
  {
    id: 2,
    title: "Level B2",
    subTitle: "Upper-Intermediate",
    level: "B2",
  },
  {
    id: 3,
    title: "Level C1",
    subTitle: "Advanced",
    level: "C1",
  },
];

export const DEFAULT_NOTIFICATIONS: INotification[] = [
  // {
  //   id: 0,
  //   title: "Daily Reminder 🌟",
  //   subTitle:
  //     "Time to practice your English skills! Spend 10 minutes on your lesson today. ",
  //   active: true,
  // },
  // {
  //   id: 1,
  //   title: "New Lesson Available 📚 ",
  //   subTitle:
  //     "A new lesson in English is ready for you! Start learning now and unlock new vocabulary. ",
  //   active: true,
  // },
  // {
  //   id: 2,
  //   title: "Milestone Achievement 🎉",
  //   subTitle:
  //     "Congratulations! You've reached a 7-day streak in learning English! Keep up the great work! ",
  //   active: true,
  // },
  // {
  //   id: 3,
  //   title: "Quiz Reminder",
  //   subTitle:
  //     "Ready for a challenge? Test your knowledge with a quick quiz on English. 📝",
  // },
  // {
  //   id: 4,
  //   title: "Vocabulary Booster",
  //   subTitle:
  //     "Learn 5 new words in English today! Expand your vocabulary effortlessly. 🗣️",
  // },
  // {
  //   id: 5,
  //   title: "Weekend Challenge",
  //   subTitle:
  //     "Weekend Challenge: Complete 3 lessons in English and earn extra points! 🚀",
  // },
  // {
  //   id: 6,
  //   title: "Cultural Insight",
  //   subTitle:
  //     "Did you know? [Interesting fact about the language or culture]. Learn more in your next lesson! 🌍",
  // },
];
