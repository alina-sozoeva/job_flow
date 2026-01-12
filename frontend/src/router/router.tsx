import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../pages";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
