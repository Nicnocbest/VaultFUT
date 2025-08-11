import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Topbar() {
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    let channel: any;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("profiles").select("coins").eq("id", user.id).single();
      if (data) setCoins(data.coins ?? 0);

      channel = supabase.channel("coins_rt")
        .on("postgres_changes",
            { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${user.id}` },
            payload => setCoins(payload.new.coins ?? 0)
        ).subscribe();
    })();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-[#0f0f0f]/80 backdrop-blur border-b border-white/10">
      <div className="h-14 flex items-center justify-between px-4 md:px-6">
        <div className="text-yellow-400 font-semibold">🔐 Vault • <span className="text-white">Unlock Rewards</span></div>
        <div className="flex items-center gap-3">
          <div className="text-yellow-400">💰 {coins}</div>
          <div className="w-8 h-8 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
