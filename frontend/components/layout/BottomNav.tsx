"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <Link href="/home" className={pathname === "/home" ? "active" : ""}><span>⌂</span>Home</Link>
      <Link href="/discover" className={pathname === "/discover" ? "active" : ""}><span>◎</span>Discover</Link>
      <Link href="/matches" className={pathname === "/matches" ? "active" : ""}><span>♥</span>Matches</Link>
    </nav>
  );
}
