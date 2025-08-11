import AdsLinksAdmin from "./AdsLinksAdmin";
import BroadcastAdmin from "./BroadcastAdmin";
import LootDropAdmin from "./LootDropAdmin";

export default function AdminIndex() {
  // TODO: Admin-Check (per profile.role oder Email)
  return (
    <div className="space-y-4">
      <div className="text-xl font-bold">🛠 Admin</div>
      <div className="grid md:grid-cols-2 gap-4">
        <AdsLinksAdmin />
        <BroadcastAdmin />
        <LootDropAdmin />
        <div className="rounded-lg p-4 bg-white/5 border border-white/10">🎭 Events – TODO</div>
      </div>
    </div>
  );
}
