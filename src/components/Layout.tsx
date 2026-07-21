import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative">{children}</main>
      <footer className="border-t border-ink-200 bg-white px-6 py-8 text-center">
        <p className="text-xs text-ink-500">
          数据保存在你本地浏览器（localStorage）· 清浏览器数据会丢失 · 基于 Pokémon Elite Redux v2.65 改版
        </p>
      </footer>
    </div>
  );
}
