import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import IdentityForm from "./screens/IdentityForm/IdentityForm";
import Home from "./screens/Home/Home";

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
  ],

  {
    basename: "/",
  }
);

export default router;
