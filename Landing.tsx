import { FormEvent, useEffect, useMemo, useState } from "react";
import { getEmail, setEmail } from "@/app/auth";
import { useNavigate } from "react-router-dom";

type Particle = { id:number; left:string; delay:string; size:number; dur:string };

export default function Landing() {
  const nav = useNavigate();
  const [email, setEmailState] = useState(getEmail() ?? "");
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    // Schon eingeloggt? Direkt weiter
    if (getEmail()) nav("/", { replace: true });
  }, [nav]);

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: `${2 + Math.random() * 3}px`,
      dur: `${6 + Math.random() * 6}s`,
    })), []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Bitte gültige E‑Mail eingeben.");
      return;
    }
    setOpening(true);
    setTimeout(() => {
      setEmail(email);
      nav("/", { replace: true });
    }, 900); // kurze „Tresor öffnet“ Animation
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f0f0f] text-white">
      {/* Hintergrund-Gradient mit Shimmer */}
      <div className="absolute inset-0 opacity-30 animate-shimmer"
           style={{
             backgroundImage: "linear-gradient(120deg, rgba(255,215,0,.08), rgba(255,255,255,.03), rgba(255,215,0,.08))"
           }} />

      {/* Partikel / Funken */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map(p => (
          <div key={p.id} className="absolute bottom-0"
               style={{
                 left: p.left,
                 width: p.size,
                 height: p.size,
                 animation: `particles ${p.dur} linear ${p.delay} infinite`,
                 backgroundColor: "rgba(255,215,0,.35)",
                 borderRadius: "9999px"
               }} />
        ))}
      </div>

      {/* Inhalt */}
      <div className="relative z-10 grid place-items-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Tresor-Header */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[.04] p-6 mb-6">
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-yellow-400/40 animate-vault-door" />
            <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full border border-yellow-400/60 animate-vault-door"
                 style={{ animationDuration: "4.5s" }} />
            <div className="relative">
              <div className="text-2xl font-extrabold text-yellow-400 drop-shadow">🔐 VaultFUT</div>
              <div className="text-sm opacity-80">Unlock FIFA rewards by watching ads & redeeming codes</div>
            </div>
          </div>

          {/* Login Card */}
          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[.04] p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-sm opacity-80">Enter your email to open the vault</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-yellow-400/50"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmailState(e.target.value)}
                inputMode="email"
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-3 rounded-lg font-semibold transition
                ${opening ? "bg-gray-600" : "bg-yellow-500 hover:bg-yellow-400 text-black"}
              `}
              disabled={opening}
            >
              {opening ? "Opening…" : "Open the Vault"}
            </button>

            <p className="text-xs opacity-60">By entering, you accept our Terms.</p>
          </form>

          {/* Mini‑Hint */}
          <div className="mt-6 text-center text-sm opacity-70">
            Tip: Use a disposable email for testing – you can change later.
          </div>
        </div>
      </div>
    </div>
  );
}
