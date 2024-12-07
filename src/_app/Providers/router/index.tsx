import CapsuleDetailPage from "@/_app/pages/CapsuleDetailPage";
import CreateCapsulePage from "@/_app/pages/CreateCapsulePage";
import CreateMessagePage from "@/_app/pages/CreateMessagePage";
import LandingPage from "@/_app/pages/LandingPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/capsule/create",
    element: <CreateCapsulePage />,
  },
  {
    path: "/capsule",
    element: <CapsuleDetailPage />,
  },
  {
    path: "/capsule/message/create",
    element: <CreateMessagePage />,
  },
]);

export default router;
