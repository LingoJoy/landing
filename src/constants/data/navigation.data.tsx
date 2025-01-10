import Courses from "@/assets/courses.svg";
import Star from "@/assets/star.svg";
import Messages from "@/assets/messages.svg";
import Profile from "@/assets/profile.svg";

import { ERoutes, ELocalization } from "@/constants";

interface INavigation {
  id: number;
  label: ELocalization;
  text: ELocalization;
  icon: JSX.Element;
  url: ERoutes;
}

export const NAVIGATION_DATA: INavigation[] = [
  {
    id: 0,
    label: ELocalization.COURSES,
    text: ELocalization.COURSES,
    icon: <Courses />,
    url: ERoutes.COURSES,
  },
  {
    id: 1,
    label: ELocalization.POPULAR_PHRASES,
    text: ELocalization.POPULAR_PHRASES,
    icon: <Star />,
    url: ERoutes.POPULAR_PHRASES,
  },
  {
    id: 2,
    label: ELocalization.CHAT,
    text: ELocalization.CHAT,
    icon: <Messages />,
    url: ERoutes.CHAT,
  },
  {
    id: 3,
    label: ELocalization.PROFILE,
    text: ELocalization.PROFILE,
    icon: <Profile />,
    url: ERoutes.PROFILE,
  },
];
