"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/lib/useFavorites";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { favorites, ready } = useFavorites();
  const count = ready ? favorites.length : 0;

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link href="/" className="brand">
          Parcel
        </Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            {LINKS.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="nav-link"
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="saved-count" aria-live="polite">
          Favorites <span>{count}</span>
        </p>
      </div>
    </header>
  );
}
