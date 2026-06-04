import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";
import { CreateEvent } from "./pages/CreateEvent";
import { Profile } from "./pages/Profile";
import { TandemPartner } from "./pages/TandemPartner";
import { Community } from "./pages/Community";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <EventDetail />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "tandem-partner",
        element: <TandemPartner />,
      },
      {
        path: "community",
        element: <Community />,
      },
    ],
  },
]);