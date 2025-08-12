import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function VaultLayout() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <main className="min-h-screen">
        <Topbar />
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
