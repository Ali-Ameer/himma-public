import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import IdentityForm from "./screens/IdentityForm/IdentityForm";
import NotFound404 from "./screens/404/NotFound404";
import Home from "./screens/home/Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "identityform",
          element: <IdentityForm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ],

  {
    basename: "/",
  }
);

export default router;
