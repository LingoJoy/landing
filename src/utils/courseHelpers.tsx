import File from "@/assets/icons/file-icon.png";
import Headphone from "@/assets/icons/headphone-icon.png";
import Pencil from "@/assets/icons/pencil-icon.png";
import Chat from "@/assets/icons/popular-chat.png";
import Notebook from "@/assets/icons/notebook.png";

import { CourseTitle, CourseType } from "@/types";

export const renderIconCourseType = (courseType: string) => {
  const icons = {
    [CourseType.Vocabulary]: <img src={File} alt="" />,
    [CourseType.ListeningSpeaking]: <img src={Headphone} alt="" />,
    [CourseType.Grammar]: <img src={Pencil} alt="" />,
    [CourseType.PopularPhrases]: <img src={Chat} alt="" />,
    [CourseType.Reading]: <img src={Notebook} alt="" />,
  };

  return icons[courseType as keyof typeof icons] || null;
};

export const renderIconCourseTitle = (courseType: string) => {
  const titles = {
    [CourseType.Vocabulary]: CourseTitle.Vocabulary,
    [CourseType.ListeningSpeaking]: CourseTitle.ListeningSpeaking,
    [CourseType.Grammar]: CourseTitle.Grammar,
    [CourseType.PopularPhrases]: CourseTitle.PopularPhrases,
    [CourseType.Reading]: CourseTitle.Reading,
  };

  return titles[courseType as keyof typeof titles] || null;
};

export const getFinished = (
  courseId: string,
  lessons: { [x: string]: { status: string, exercises?: { [key: string]: string }}},
) => {
  const finished = lessons[courseId];

  if (finished && finished.status === "completed") return true;

  return false;
};

export const getInProgress = (
  courseId: string,
  lessons: { [x: string]: { status: string, exercises?: { [key: string]: string }}},
) => {
  const progress = lessons[courseId];

  if (progress && progress.status === "in_progress") return true;

  return false;
};
