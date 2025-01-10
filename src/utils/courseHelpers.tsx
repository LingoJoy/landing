import File from "@/assets/icons/file-icon.svg";
import Headphone from "@/assets/icons/headphone-icon.svg";
import Pencil from "@/assets/icons/pencil-icon.svg";
import Chat from "@/assets/icons/popular-chat.svg";
import Notebook from "@/assets/icons/notebook.svg";

import { CourseTitle, CourseType } from "@/types";

export const renderIconCourseType = (courseType: string) => {
  const icons = {
    [CourseType.Vocabulary]: <File />,
    [CourseType.ListeningSpeaking]: <Headphone />,
    [CourseType.Grammar]: <Pencil />,
    [CourseType.PopularPhrases]: <Chat />,
    [CourseType.Reading]: <Notebook />,
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
  lessons: { [x: string]: { status: string } },
) => {
  const finished = lessons[courseId];

  if (finished && finished.status === "completed") return true;

  return false;
};
