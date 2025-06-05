import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * NavBar component for TalkBuddy
 * Fixed, responsive top navigation with logo, links, and dark/light toggle.
 * - Left: Logo ("💬 TalkBuddy") in bold, Poppins/Raleway font.
 * - Center/Right: Home, Chat, About navigation links.
 * - Far right: dark/light mode toggle (🌗 icon, functional).
 * - Adapt styling for light/dark.
 * - Smooth transitions, focus styling, accessible.
 */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Chat", href: "#chat" },
  { label: "About", href: "#about" },
];

const POPPINS_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Raleway:wght@600;700&display=swap";

function usePreferredTheme() {
  // Detect prefers-color-scheme on mount
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("talkbuddy-theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("talkbuddy-theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

export default function NavBar() {
  const [theme, setTheme] = usePreferredTheme();

  // Font loading: Insert Poppins/Raleway if not already present
  useEffect(() => {
    if (!document.getElementById("talkbuddy-font-link")) {
      const link = document.createElement("link");
      link.href = POPPINS_FONT_URL;
      link.rel = "stylesheet";
      link.id = "talkbuddy-font-link";
      document.head.appendChild(link);
    }
  }, []);

  function handleThemeToggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <nav
      className="tb-navbar"
      role="navigation"
      aria-label="Main navigation"
      data-theme={theme}
    >
      <div className="tb-navbar-inner">
        {/* Logo/App Name */}
        <div className="tb-logo" tabIndex={0} aria-label="TalkBuddy home">
          <span className="tb-logo-symbol" aria-hidden="true">
            💬
          </span>{" "}
          TalkBuddy
        </div>

        {/* Navigation Links */}
        <ul className="tb-nav-links" aria-label="Site sections">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="tb-nav-link"
                tabIndex={0}
                aria-label={label}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          className="tb-theme-toggle"
          onClick={handleThemeToggle}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <span className="tb-theme-icon" aria-hidden="true">
            {theme === "dark" ? "🌗" : "🌖"}
          </span>
        </button>
      </div>
      <style>{`
        @import url('${POPPINS_FONT_URL}');
        .tb-navbar {
          font-family: "Poppins", "Raleway", Arial, Helvetica, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          min-height: 62px;
          height: 64px;
          background: var(--tb-navbar-bg);
          color: var(--tb-navbar-text);
          box-shadow: 0 2px 14px 0 rgba(60,40,10,0.08);
          display: flex;
          align-items: center;
          z-index: 1200;
          transition: background 0.45s cubic-bezier(.54,.18,.3,1);
        }
        .tb-navbar[data-theme="light"] {
          --tb-navbar-bg: rgb(208, 204, 199);
          --tb-navbar-text: #23272F;
          --tb-navbar-link: #23272F;
          --tb-navbar-link-hover: #4F8CFF;
          --tb-navbar-logo: #212121;
          --tb-navbar-link-underline: #FFD166;
          --tb-shadow: 0 2px 12px 0 rgba(130,110,80,0.08);
        }
        .tb-navbar[data-theme="dark"] {
          --tb-navbar-bg: linear-gradient(to right, #000000, #1a1a1a, #333333);
          --tb-navbar-text: #fff;
          --tb-navbar-link: #F1F4FF;
          --tb-navbar-link-hover: #FFD166;
          --tb-navbar-logo: #FFD166;
          --tb-navbar-link-glow: #FFD16633;
          --tb-shadow: 0 3px 22px 2px rgba(33,33,66,0.18);
        }
        .tb-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }
        .tb-logo {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--tb-navbar-logo);
          display: flex;
          align-items: center;
          outline: none;
          user-select: none;
          cursor: pointer;
          transition: color 0.25s;
        }
        .tb-logo-symbol {
          margin-right: 7px;
          font-size: 2.4rem;
          color: var(--tb-navbar-link-hover);
        }
        .tb-nav-links {
          display: flex;
          list-style: none;
          gap: 2.2rem;
          margin: 0;
          padding: 0;
        }
        .tb-nav-link {
          color: var(--tb-navbar-link);
          font-size: 1.06rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.03em;
          padding: 5px 0;
          position: relative;
          transition: color 0.25s, text-shadow 0.33s;
          outline: none;
          border-radius: 2px;
        }
        .tb-nav-link:focus { 
          box-shadow: 0 0 0 2px var(--tb-navbar-link-hover);
        }
        .tb-navbar[data-theme="light"] .tb-nav-link:hover,
        .tb-navbar[data-theme="light"] .tb-nav-link:focus {
          color: var(--tb-navbar-link-hover);
        }
        .tb-navbar[data-theme="light"] .tb-nav-link:hover::after,
        .tb-navbar[data-theme="light"] .tb-nav-link:focus::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px; height: 2.5px;
          background: var(--tb-navbar-link-underline);
          border-radius: 1.5px;
          opacity: .95;
          transition: background 220ms cubic-bezier(0.22,0.57,0.21,1);
        }
        .tb-navbar[data-theme="dark"] .tb-nav-link:hover,
        .tb-navbar[data-theme="dark"] .tb-nav-link:focus {
          color: var(--tb-navbar-link-hover);
          text-shadow: 0 0 9px var(--tb-navbar-link-glow);
        }
        .tb-navbar[data-theme="dark"] .tb-nav-link:hover::after,
        .tb-navbar[data-theme="dark"] .tb-nav-link:focus::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -3px; height: 2.2px;
          background: var(--tb-navbar-link-hover);
          border-radius: 1px;
          filter: blur(1.2px);
          opacity: 0.79;
          box-shadow: 0 0 12px var(--tb-navbar-link-glow);
        }

        .tb-theme-toggle {
          background: none;
          border: none;
          font-size: 1.7rem;
          padding: 4px 10px;
          cursor: pointer;
          color: var(--tb-navbar-link-hover);
          transition: filter 0.26s, color 0.18s;
          border-radius: 50%;
        }
        .tb-theme-toggle:hover,
        .tb-theme-toggle:focus {
          filter: brightness(0.91) drop-shadow(0 0 8px #FFD16655);
          outline: 2px solid var(--tb-navbar-link-hover);
        }
        .tb-theme-icon {
          vertical-align: middle;
        }

        @media (max-width: 800px) {
          .tb-navbar-inner {
            padding: 0 16px;
          }
          .tb-logo {
            font-size: 1.35rem;
          }
          .tb-nav-links {
            gap: 1.2rem;
          }
        }
        @media (max-width: 480px) {
          .tb-navbar-inner {
            padding: 0 7px;
          }
          .tb-logo {
            font-size: 1.07rem;
            min-width: 0;
            margin-right: 5px;
          }
          .tb-nav-links {
            gap: 0.5rem;
          }
          .tb-theme-toggle {
            font-size: 1.23rem;
            padding: 4px;
          }
        }
      `}</style>
    </nav>
  );
}
