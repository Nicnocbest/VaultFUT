import { useState } from "react";
import { supabase } from "./supabase";

export default function LootDropAdmin() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [coins, setCoins] = useState(500);

  const sendToUser = async () => {
    if (!email) return alert("E-Mail angeben");
    const { data: user, error } = await supabase.from("profiles").select("id").eq("email", email).single();
    if (error || !user) return alert("User nicht gefunden");
    await supabase.from("user_lootdrops").insert({
      user_id: user.id, title, description: desc, coins, status: "unclaimed"
    });
    setEmail(""); setTitle(""); setDesc(""); setCoins(500);
    alert("Lootdrop erstellt!");
  };

  return (
    <div className="space-y-3 rounded-lg p-4 bg-white/5 border border-white/10">
      <div className="font-semibold">📦 Lootdrop</div>
      <input className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
             placeholder="Target E-Mail" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
             placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
                placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <input type="number" className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
             value={coins} onChange={e=>setCoins(parseInt(e.target.value||"0"))} />
      <button className="px-3 py-2 bg-yellow-500 text-black rounded" onClick={sendToUser}>Send</button>
    </div>
  );
}
