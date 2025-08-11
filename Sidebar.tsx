import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/messages", label: "Messages" },
  { to: "/achievements", label: "Achievements" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/profile", label: "Profile" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block border-r border-white/10 p-4 space-y-2">
      <div className="text-xl font-bold mb-4 text-yellow-400">VaultFUT</div>
      {links.map(l => (
        <NavLink key={l.to} to={l.to} end={l.to==="/"}
          className={({isActive}) =>
            `block rounded px-3 py-2 transition ${isActive? "bg-white/10":"hover:bg-white/5"}`}>
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
