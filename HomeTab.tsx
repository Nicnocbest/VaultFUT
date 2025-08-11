import WatchAdButton from "./WatchAdButton";
import RedeemForm from "./RedeemForm";

export default function HomeTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/30">
        <div className="font-semibold text-red-300">⚠️ Attention</div>
        <div className="text-sm text-red-200">Broadcast placeholder (hook to DB later)</div>
      </div>

      <div className="rounded-lg p-4 bg-white/5 border border-white/10">
        <div className="font-semibold mb-2">📅 Daily Login</div>
        <button className="px-4 py-2 bg-emerald-600 rounded hover:scale-[1.02] transition">
          Claim today’s bonus
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg p-4 bg-white/5 border border-white/10">
          <div className="font-semibold mb-2">🎥 Watch Ad</div>
          <WatchAdButton />
          <div className="text-xs text-white/60 mt-2">Daily cap: 5 000 coins / 24h</div>
        </div>
        <div className="rounded-lg p-4 bg-white/5 border border-white/10">
          <div className="font-semibold mb-2">🔑 Redeem Code</div>
          <RedeemForm />
        </div>
      </div>
    </div>
  );
}
