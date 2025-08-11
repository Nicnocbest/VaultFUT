import { useState } from "react";
import { supabase } from "./supabase";

export default function WatchAdButton() {
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = (sec:number) => {
    setCooldown(sec);
    const t = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleWatch = async () => {
    if (cooldown > 0) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Bitte einloggen.");

    const { data, error } = await supabase.rpc("assign_ad_code", { _user: user.id });
    if (error || !data?.url) return alert("Kein aktiver Ad-Link.");
    window.open(data.url, "_blank");
    startCooldown(45);
  };

  return (
    <button onClick={handleWatch}
      disabled={cooldown>0}
      className={`px-4 py-2 rounded transition ${cooldown? "bg-gray-600":"bg-yellow-500 hover:bg-yellow-400 text-black"}`}>
      {cooldown ? `Wait ${cooldown}s` : "🎥 Watch Ad"}
    </button>
  );
}
