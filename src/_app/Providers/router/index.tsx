import IntroPage from "@/_app/pages/IntroPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroPage />,
  },
]);

export default router;
