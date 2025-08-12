import { createBrowserRouter } from "react-router-dom";
import VaultLayout from "@/components/layout/VaultLayout";
import HomeTab from "@/pages/dashboard/HomeTab";
import ShopTab from "@/pages/dashboard/ShopTab";
import MessagesTab from "@/pages/dashboard/MessagesTab";
import AchievementsTab from "@/pages/dashboard/AchievementsTab";
import LeaderboardTab from "@/pages/dashboard/LeaderboardTab";
import ProfileTab from "@/pages/dashboard/ProfileTab";
import AdminIndex from "@/pages/dashboard/admin/AdminIndex";
import Landing from "@/pages/Landing";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <Landing /> },

  {
    element: <ProtectedRoute />, // alles darunter nur mit E-Mail
    children: [
      {
        path: "/",
        element: <VaultLayout />,
        children: [
          { index: true, element: <HomeTab /> },
          { path: "shop", element: <ShopTab /> },
          { path: "messages", element: <MessagesTab /> },
          { path: "achievements", element: <AchievementsTab /> },
          { path: "leaderboard", element: <LeaderboardTab /> },
          { path: "profile", element: <ProfileTab /> },
          { path: "admin", element: <AdminIndex /> }
        ]
      }
    ]
  },

  // Fallback: unbekannte Routen -> /login
  { path: "*", element: <Landing /> }
]);
