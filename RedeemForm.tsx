import { useState } from "react";
import { supabase } from "./supabase";

export default function RedeemForm() {
  const [code, setCode] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Bitte einloggen.");
    const { data, error } = await supabase.rpc("redeem_ad_code", { _user: user.id, _code: code });
    if (error) return alert("Redeem-Fehler.");
    if (!data?.ok) return alert(`❌ ${data?.error || "redeem failed"}`);
    alert(`🎉 +${data.coins} Coins!`);
    setCode("");
  };

  return (
    <form onSubmit={submit}>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter code"
             className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 outline-none" />
      <button className="mt-2 px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-500">Redeem</button>
    </form>
  );
}
