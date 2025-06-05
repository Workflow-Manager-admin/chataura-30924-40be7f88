import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * NavBar component for TalkBuddy
 * Fixed, responsive top navigation with logo, links, and a visually-clear, animated dark/light toggle.
 * - Toggle shows distinct track/knob colors in each mode, syncs instantly, and is smooth.
 * - ARIA, keyboard, and color/animation details refined for maximal clarity.
 */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Chat", href: "#chat" },
  { label: "About", href: "#about" },
];

const POPPINS_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Raleway:wght@600;700&display=swap";

/**
 * PUBLIC_INTERFACE
 * Custom React hook to manage and sync light/dark theme for the site.
 * Updates `body[data-theme]` and localStorage instantly.
 */
function usePreferredTheme() {
  // Theme initialization: check localStorage, then OS preference, fallback to light.
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

    // Optionally, trigger a window event for future: could let other components directly sync
    window.dispatchEvent(new CustomEvent("theme-updated", { detail: { theme } }));
  }, [theme]);

  return [theme, setTheme];
}

export default function NavBar() {
  const [theme, setTheme] = usePreferredTheme();
  const switchButtonRef = useRef();

  // Insert font for header if missing
  useEffect(() => {
    if (!document.getElementById("talkbuddy-font-link")) {
      const link = document.createElement("link");
      link.href = POPPINS_FONT_URL;
      link.rel = "stylesheet";
      link.id = "talkbuddy-font-link";
      document.head.appendChild(link);
    }
  }, []);

  // Enhanced keyboard accessibility: focus ring and immediate toggle
  function handleThemeToggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  // Make interaction instant and keyboard-optimized
  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Enter" || e.code === "Space") {
      e.preventDefault();
      handleThemeToggle();
      // Optional: flash animation on space/enter (for feedback)
      if (switchButtonRef.current) {
        switchButtonRef.current.classList.add("tb-switch-pressed");
        setTimeout(() => {
          switchButtonRef.current.classList.remove("tb-switch-pressed");
        }, 220);
      }
    }
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

        {/* Enhanced Theme Toggle Switch - visually clear, instant, animated */}
        <div className="tb-theme-toggle-switch-container">
          <div
            ref={switchButtonRef}
            className={
              "tb-theme-toggle-switch--custom" +
              (theme === "dark" ? " is-dark" : " is-light")
            }
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            tabIndex={0}
            onClick={handleThemeToggle}
            onKeyDown={handleKeyDown}
            style={{ outline: "none" }}
          >
            {/* TRACK */}
            <div className="tb-switch-track" aria-hidden="true">
              {/* SLIDING KNOB */}
              <div className="tb-switch-knob">
                <span className="tb-switch-icon" aria-hidden="true">
                  {/* Icon animates - moon or sun */}
                  {theme === "dark" ? (
                    // Modern moon SVG for dark
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <path
                        d="M13.1 11.97A5.5 5.5 0 018.36 4.8a.3.3 0 00-.34-.42A7 7 0 1017 14.34a.3.3 0 00-.41-.33 5.47 5.47 0 01-3.49-2.04z"
                        fill="#FFD166"
                      />
                    </svg>
                  ) : (
                    // Modern sun SVG for light
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <circle cx="9" cy="9" r="4" fill="#FFD166"/>
                      <g stroke="#FFD166" strokeWidth="1.2" strokeLinecap="round">
                        <line x1="9" y1="1.8" x2="9" y2="0.2" />
                        <line x1="9" y1="16.2" x2="9" y2="17.8" />
                        <line x1="2.23" y1="2.23" x2="1.13" y2="1.13" />
                        <line x1="15.77" y1="15.77" x2="16.87" y2="16.87" />
                        <line x1="1.8" y1="9" x2="0.2" y2="9" />
                        <line x1="16.2" y1="9" x2="17.8" y2="9" />
                        <line x1="2.23" y1="15.77" x2="1.13" y2="16.87" />
                        <line x1="15.77" y1="2.23" x2="16.87" y2="1.13" />
                      </g>
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <span className="tb-switch-label">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </div>
        </div>
      </div>
      {/* Keep most style in NavBar.css, but patch in font + some nav bar responsiveness here */}
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

        .tb-theme-toggle-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 50%;
          outline: none;
          user-select: none;
          color: var(--tb-navbar-link-hover);
          transition: filter 0.22s, background 0.18s;
        }
        .tb-theme-toggle-icon:hover,
        .tb-theme-toggle-icon:focus {
          background: rgba(255, 209, 102, 0.14);
          filter: brightness(0.92) drop-shadow(0 0 7px #FFD16655);
          outline: 2px solid var(--tb-navbar-link-hover);
        }
        .tb-theme-toggle-icon:active {
          filter: brightness(0.87);
        }
        .tb-theme-icon {
          vertical-align: middle;
        }
        /* Add subtle burst for pressed state of switch */
        .tb-theme-toggle-switch--custom.tb-switch-pressed .tb-switch-knob {
          animation: tb-switch-press-burst 0.22s cubic-bezier(.3,1.6,.51,1.01);
        }
        @keyframes tb-switch-press-burst {
          0% { box-shadow: 0 3px 14px #FFD16633, 0 0 0 0 #FFD16644; }
          50% { box-shadow: 0 6px 22px #FFD166aa, 0 0 0 8px #FFD16622; }
          100% { box-shadow: 0 3px 9px #3333ff19, 0 1.4px 0 #FFD16677; }
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
