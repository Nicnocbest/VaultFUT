import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./tailwind.css"; // optional: falls du tailwind.css so nennst
import VaultLayout from "./VaultLayout";
import HomeTab from "./HomeTab";
import ShopTab from "./ShopTab";
import MessagesTab from "./MessagesTab";
import AchievementsTab from "./AchievementsTab";
import LeaderboardTab from "./LeaderboardTab";
import ProfileTab from "./ProfileTab";
import AdminIndex from "./AdminIndex";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
