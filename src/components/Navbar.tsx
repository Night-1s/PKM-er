import { Link, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "仪表盘", en: "Dashboard" },
  { to: "/pokedex", label: "图鉴", en: "Pokedex" },
  { to: "/mechanics", label: "机制手册", en: "Mechanics" },
];

export default function Navbar() {
  const location = useLocation();
  // 在属性详情页时高亮仪表盘
  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
            }}
          >
            <Trophy className="h-5 w-5 text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold text-ink-800">ER 2.65 · 地狱全属性</p>
            <p className="text-xs text-ink-500">我的通关阵容记录</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? "bg-accent-50 text-accent-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
