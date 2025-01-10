import { Outlet } from "react-router-dom";

import AuthContainer from "@/components/organisms/AuthContainer";

import { useFetchLessons } from "@/hooks/lessons/useFetchLessons";

export default function CoursesPage() {
  useFetchLessons();

  return (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  );
}
