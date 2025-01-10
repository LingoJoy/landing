import { Outlet } from "react-router-dom";
import { Layout } from "@/components/templates";

export default function ProfilePage() {
  return (
    <Layout withoutPadding isSimpleType>
      <Outlet />
    </Layout>
  );
}
