"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./icons";

// The inline script in layout.tsx sets data-theme before paint; this button flips it and remembers the choice.
const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  // undefined on the server, so the pressed state only appears after hydration (no mismatch)
  const dark = useSyncExternalStore(
    subscribe,
    () => root().dataset.theme === "dark",
    () => undefined,
  );

  function toggle() {
    const next = root().dataset.theme === "dark" ? "light" : "dark";
    root().dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage blocked: the theme still switches for this visit
    }
  }

  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={dark}
      title="Toggle dark mode"
    >
      <span className="icon-moon">
        <Icon name="moon" />
      </span>
      <span className="icon-sun">
        <Icon name="sun" />
      </span>
    </button>
  );
}
