import { useEffect, useState } from "react";
import { supabase } from "./supabase";

type LinkRow = { id: string; url: string; reward_coins: number; is_active: boolean };

export default function AdsLinksAdmin() {
  const [rows, setRows] = useState<LinkRow[]>([]);
  const [url, setUrl] = useState("");
  const [coins, setCoins] = useState(100);

  const load = async () => {
    const { data, error } = await supabase
      .from("ad_links")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setRows(data || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!url) return;
    await supabase.from("ad_links").insert({ url, reward_coins: coins, is_active: true });
    setUrl(""); setCoins(100); load();
  };

  const toggle = async (id: string, cur: boolean) => {
    await supabase.from("ad_links").update({ is_active: !cur }).eq("id", id);
    load();
  };

  return (
    <div className="space-y-3 rounded-lg p-4 bg-white/5 border border-white/10">
      <div className="font-semibold">🔗 Ad Links</div>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded"
               placeholder="https://linkvertise.com/…"
               value={url} onChange={e=>setUrl(e.target.value)} />
        <input className="w-28 px-3 py-2 bg-black/30 border border-white/10 rounded"
               type="number" value={coins} onChange={e=>setCoins(parseInt(e.target.value||"0"))} />
        <button className="px-3 py-2 bg-yellow-500 text-black rounded" onClick={add}>Add</button>
      </div>

      <div className="space-y-2">
        {rows.map(r=>(
          <div key={r.id} className="p-3 border border-white/10 rounded flex items-center justify-between">
            <div className="text-sm truncate">{r.url} · 💰 {r.reward_coins} · {r.is_active ? "active":"inactive"}</div>
            <button className="px-2 py-1 bg-white/10 rounded" onClick={()=>toggle(r.id, r.is_active)}>
              {r.is_active ? "Disable":"Enable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
