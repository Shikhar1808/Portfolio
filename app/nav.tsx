"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// `current` marks the page you're on. On the home page (in-page "#" links) the section in view is underlined instead.
export type NavItem = { href: string; label: string; current?: boolean };

export function NavLinks({ items }: { items: NavItem[] }) {
  const spy = items[0].href.startsWith("#");
  const [active, setActive] = useState(spy ? items[0].href : "");

  useEffect(() => {
    if (!spy) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(({ href }) => {
      const el = href.startsWith("#") && document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items, spy]);

  return (
    <ul className="nav-links">
      {items.map(({ href, label, current }) => (
        <li key={href}>
          <Link href={href} aria-current={current ? "page" : active === href ? "true" : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
