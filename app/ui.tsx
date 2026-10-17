// Pieces shared by every page: the frame (rail, top bar, contact, footer) and repeated blocks.
import Link from "next/link";
import type { ReactNode } from "react";
import { links, posts, railTicker } from "./data";
import { Icon } from "./icons";
import { NavLinks, type NavItem } from "./nav";
import { ThemeToggle } from "./theme-toggle";

// Nav for pages other than home: links lead back to the home sections; `current` underlines this page.
export function pageNav(current?: string): NavItem[] {
  const items: NavItem[] = [
    { href: "/#overview", label: "Overview" },
    { href: "/#experience", label: "Experience" },
    { href: "/study", label: "Study" },
    { href: "/#projects", label: "Projects" },
    { href: "/#stack", label: "Stack" },
    { href: "/#record", label: "Record" },
    ...(posts.length ? [{ href: "/#writing", label: "Writing" }] : []),
    { href: "#contact", label: "Contact" },
  ];
  return items.map((i) => (i.href === current ? { ...i, current: true } : i));
}

export function Hexagon({ rotate = 0, className = "" }: { rotate?: number; className?: string }) {
  return (
    <svg className={`hex ${className}`} viewBox="0 0 200 180" style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <polygon
        points="105,2 186,48 176,140 85,178 6,128 18,34"
        fill="none"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Head({
  label,
  title,
  sub,
  rotate,
  level = 2,
}: {
  label: string;
  title: string;
  sub?: string;
  rotate: number;
  level?: 1 | 2;
}) {
  const Title = level === 1 ? "h1" : "h2";
  return (
    <header className="head">
      <p className="label">{label}</p>
      <Title>{title}</Title>
      {sub && <p className="sub">{sub}</p>}
      <Hexagon rotate={rotate} />
    </header>
  );
}

export function Stats({ items }: { items: { label: string; value: string; note: string }[] }) {
  return (
    <ul className="stats">
      {items.map((s) => (
        <li key={s.label} className="chamfer">
          <div className="in">
            <p className="label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
            <p className="stat-note">{s.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// First column is the row header; the rest are numbers. On phones each cell shows its column name.
export function DataTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th key={c} scope="col" className={i ? "num" : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("|")}>
              <th scope="row">{r[0]}</th>
              {r.slice(1).map((cell, i) => (
                <td key={cols[i + 1]} className="num" data-label={cols[i + 1]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Logo: the signature, traced to /signature.svg and painted in the text colour (follows light/dark).
function Signature() {
  return <span className="signature" aria-hidden="true" />;
}

function Mark({ className }: { className: string }) {
  return (
    <Link className={`mark ${className}`} href="/#overview" aria-label="Shikhar Saxena, home">
      <Signature />
    </Link>
  );
}

// The rail scrolls real numbers, like a telemetry feed (read top to bottom).
function Ticker() {
  return (
    <>
      {railTicker.map(([value, label]) => (
        <span key={value} className="tick">
          <b>{value}</b> {label}
        </span>
      ))}
    </>
  );
}

export function Shell({ nav, children }: { nav: NavItem[]; children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="rail">
        <Mark className="mark-rail" />
        <div className="rail-marquee" aria-hidden="true">
          <div className="rail-track">
            <Ticker />
            <Ticker />
          </div>
        </div>
        <p className="rail-status">
          <span className="dot" /> Open to work
        </p>
      </aside>

      <div className="page">
        <header className="topbar">
          <Mark className="mark-top" />
          <nav aria-label="Sections">
            <NavLinks items={nav} />
          </nav>
          <div className="actions">
            <ThemeToggle />
            <a className="icon-btn" href={links.github} aria-label="GitHub" title="GitHub">
              <Icon name="github" />
            </a>
            <a className="icon-btn" href={links.linkedin} aria-label="LinkedIn" title="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a className="icon-btn" href={links.leetcode} aria-label="LeetCode" title="LeetCode">
              <Icon name="code" />
            </a>
            <Link className="icon-btn solid" href={links.resumePage}>
              <Icon name="file" size={18} /> Résumé
            </Link>
          </div>
        </header>

        <main>
          {children}

          <section id="contact" className="contact">
            <p>Hiring for backend, forward-deployed or GPU work? Let&rsquo;s talk.</p>
            <a className="contact-email" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            <p className="contact-links">
              <a href={links.github}>GitHub</a>
              <a href={links.linkedin}>LinkedIn</a>
              <a href={links.leetcode}>LeetCode</a>
              <Link href={links.resumePage}>Résumé</Link>
            </p>
          </section>
        </main>

        <footer className="footer">
          <span className="footer-mark">
            <Signature />
          </span>
          <p>© 2026 Shikhar Saxena</p>
          <p className="footer-tags">Backend · Forward-deployed · GPU · Edge AI</p>
        </footer>
      </div>
    </div>
  );
}
