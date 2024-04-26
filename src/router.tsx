import IdentityForm from "./screens/IdentityForm/IdentityForm";
import NotFound404 from "./screens/404/NotFound404";

import Home from "./screens/home/Home";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "identityform",
    element: <IdentityForm />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
];

export default router;
