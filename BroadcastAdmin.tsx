import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function BroadcastAdmin() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [priority, setPriority] = useState("normal");
  const [list, setList] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("broadcasts").select("*").order("created_at", { ascending: false });
    setList(data || []);
  };
  useEffect(() => { load(); }, []);

  const send = async () => {
    if (!title || !msg) return;
    await supabase.from("broadcasts").insert({ title, message: msg, priority, is_active: true });
    setTitle(""); setMsg(""); load();
  };

  const deactivate = async (id: string) => {
    await supabase.from("broadcasts").update({ is_active: false }).eq("id", id);
    load();
  };

  return (
    <div className="space-y-3 rounded-lg p-4 bg-white/5 border border-white/10">
      <div className="font-semibold">📢 Broadcast</div>
      <input className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
             placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded"
                placeholder="Message" value={msg} onChange={e=>setMsg(e.target.value)} />
      <select className="px-3 py-2 bg-black/30 border border-white/10 rounded"
              value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="low">low</option>
        <option value="normal">normal</option>
        <option value="critical">critical</option>
      </select>
      <button className="px-3 py-2 bg-emerald-600 rounded" onClick={send}>Send</button>

      <div className="space-y-2">
        {list.map(b=>(
          <div key={b.id} className="p-3 border border-white/10 rounded flex items-center justify-between">
            <div className="text-sm">{b.title} — {b.priority} — {b.is_active? "active":"off"}</div>
            {b.is_active && <button className="px-2 py-1 bg-white/10 rounded" onClick={()=>deactivate(b.id)}>Deactivate</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
