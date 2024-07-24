import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./routes";

const RouterContainer = (): JSX.Element => {
  return <RouterProvider router={createBrowserRouter(publicRoutes)} />;
};

export default RouterContainer;
