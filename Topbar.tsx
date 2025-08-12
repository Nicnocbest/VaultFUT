import { getEmail, clearEmail } from "@/app/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Topbar(){
  const nav = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmail());
  }, []);

  const logout = () => {
    clearEmail();
    nav("/login", { replace: true });
  };

  return (
    <div className="sticky top-0 z-20 bg-[#0f0f0f]/80 backdrop-blur border-b border-white/10">
      <div className="h-14 flex items-center justify-between px-4 md:px-6">
        <div className="text-yellow-400 font-semibold">🔐 Vault • <span className="text-white">Unlock Rewards</span></div>
        <div className="flex items-center gap-3">
          {email && <div className="text-xs opacity-70">{email}</div>}
          <button onClick={logout} className="px-2 py-1 rounded bg-white/10 text-xs hover:bg-white/20">Logout</button>
        </div>
      </div>
    </div>
  );
}
