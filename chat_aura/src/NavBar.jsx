import React, { useEffect, useRef, useContext, useState, useCallback } from "react";
import { ThemeContext } from "./App";

/**
 * NavBar component for TalkBuddy - Updated
 * - Removes Home/About links, keeps only logo, dark/light toggle, and adds a Settings (gear) icon with a modern dropdown.
 * - Dropdown: About Us, Contact, Help; keyboard- and screen-reader-accessible, closes on outside click, theme-aware.
 */
// PUBLIC_INTERFACE
const POPPINS_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Raleway:wght@600;700&display=swap";

export default function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const switchButtonRef = useRef();
  const settingsRef = useRef();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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

  // Theme toggle handler (update via context)
  const handleThemeToggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [setTheme]);

  // Keyboard accessibility and animation burst
  function handleToggleKeyDown(e) {
    if (e.key === " " || e.key === "Enter" || e.code === "Space") {
      e.preventDefault();
      handleThemeToggle();
      if (switchButtonRef.current) {
        switchButtonRef.current.classList.add("tb-switch-pressed");
        setTimeout(() => {
          switchButtonRef.current.classList.remove("tb-switch-pressed");
        }, 220);
      }
    }
  }

  // Handle Settings dropdown (open/close, accessibility)
  function handleSettingsClick(e) {
    setMenuOpen((open) => !open);
  }
  function handleSettingsKeyDown(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setMenuOpen(true);
      // Focus first menu item after open
      setTimeout(() => {
        if (menuRef.current) {
          const first = menuRef.current.querySelector('[tabIndex="0"]');
          if (first) first.focus();
        }
      }, 10);
    } else if (e.key === "Escape") {
      setMenuOpen(false);
      settingsRef.current?.focus();
    }
  }

  // Keyboard navigation for dropdown menu
  function handleMenuKeyDown(e) {
    const menuItems = Array.from(menuRef.current.querySelectorAll('[role="menuitem"]'));
    const idx = menuItems.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % menuItems.length;
      menuItems[next].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + menuItems.length) % menuItems.length;
      menuItems[prev].focus();
    } else if (e.key === "Tab") {
      setMenuOpen(false); // close on tab out
    } else if (e.key === "Escape") {
      setMenuOpen(false);
      settingsRef.current?.focus();
    }
  }

  // Closes dropdown on outside click or blur or theme update
  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        settingsRef.current &&
        !settingsRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", onDocClick);
    }
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isMenuOpen]);

  // Hide menu on theme change to avoid color mismatch or staleness
  useEffect(() => {
    setMenuOpen(false);
  }, [theme]);

  // Dropdown menu content
  const settingsMenu = (
    <ul
      className={`tb-settings-dropdown tb-dropdown-${theme}`}
      ref={menuRef}
      role="menu"
      aria-label="Settings Dropdown"
      tabIndex={-1}
      style={{ display: isMenuOpen ? "block" : "none" }}
      onKeyDown={handleMenuKeyDown}
    >
      <li role="menuitem" tabIndex={0}>
        <a href="#about" onClick={() => setMenuOpen(false)} tabIndex={0}>About Us</a>
      </li>
      <li role="menuitem" tabIndex={0}>
        <a href="#contact" onClick={() => setMenuOpen(false)} tabIndex={0}>Contact</a>
      </li>
      <li role="menuitem" tabIndex={0}>
        <a href="#help" onClick={() => setMenuOpen(false)} tabIndex={0}>Help</a>
      </li>
    </ul>
  );

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

        {/* Settings + Theme */}
        <div className="tb-navbar-actions">
          {/* Settings Icon with Dropdown */}
          <div className="tb-settings-wrapper">
            <button
              ref={settingsRef}
              className={`tb-settings-btn${isMenuOpen ? " tb-settings-btn--active" : ""}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-controls="tb-settings-dropdown"
              aria-label={isMenuOpen ? "Close settings menu" : "Open settings menu"}
              tabIndex={0}
              onClick={handleSettingsClick}
              onKeyDown={handleSettingsKeyDown}
              type="button"
            >
              {/* Unambiguous Gear Icon SVG for Settings */}
              <span className="tb-settings-gear" aria-hidden="true">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <title>Settings</title>
                  <g stroke={theme === "dark" ? "#FFD166" : "#4F8CFF"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle
                      cx="12"
                      cy="12"
                      r="3.2"
                      fill={theme === "dark" ? "#23272F" : "#fff"}
                    />
                    <path d="
                      M19.4 13.05c.04-.34.06-.68.06-1.05s-.02-.71-.06-1.05l2-1.56a.51.51 0 00.12-.65l-1.9-3.3a.51.51 0 00-.61-.24l-2.35.95a7.11 7.11 0 00-1.82-1.05l-.36-2.46A.5.5 0 0014 2.5h-4a.5.5 0 00-.5.43l-.36 2.46a6.66 6.66 0 00-1.82 1.05l-2.35-.95a.51.51 0 00-.61.24l-1.9 3.3a.51.51 0 00.12.65l2 1.56c-.04.34-.06.68-.06 1.05s.02.71.06 1.05l-2 1.56a.51.51 0 00-.12.65l1.9 3.3c.13.23.39.31.61.24l2.35-.95c.56.43 1.18.79 1.82 1.05l.36 2.46A.5.5 0 0010 21.5h4c.25 0 .46-.18.5-.43l.36-2.46c.64-.26 1.25-.63 1.82-1.05l2.35.95c.22.09.48 0 .61-.24l1.9-3.3a.51.51 0 00-.12-.65l-2-1.56z
                    "/>
                  </g>
                </svg>
              </span>
            </button>
            {settingsMenu}
          </div>

          {/* Enhanced Theme Toggle */}
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
              onKeyDown={handleToggleKeyDown}
              style={{ outline: "none" }}
            >
              {/* TRACK */}
              <div className="tb-switch-track" aria-hidden="true">
                {/* SLIDING KNOB */}
                <div className="tb-switch-knob">
                  <span className="tb-switch-icon" aria-hidden="true">
                    {/* Icon animates - moon or sun */}
                    {theme === "dark" ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path
                          d="M13.1 11.97A5.5 5.5 0 018.36 4.8a.3.3 0 00-.34-.42A7 7 0 1017 14.34a.3.3 0 00-.41-.33 5.47 5.47 0 01-3.49-2.04z"
                          fill="#FFD166"
                        />
                      </svg>
                    ) : (
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
      </div>
      {/* Additional style for dropdown/settings - with theme awareness */}
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
          --tb-navbar-link-hover: #4F8CFF;
          --tb-navbar-logo: #212121;
          --tb-navbar-btn-bg: #ffffff;
          --tb-settings-menu-bg: #f9f8f5;
          --tb-settings-menu-item: #23272F;
          --tb-settings-menu-item-hover: #4F8CFF;
          --tb-settings-gear-bg: #f3efe7;
          --tb-settings-gear-shadow: 0 1.5px 7px #4F8CFF19;
          --tb-settings-gear-accent: #FFD166;
        }
        .tb-navbar[data-theme="dark"] {
          --tb-navbar-bg: linear-gradient(to right, #000000, #1a1a1a, #333333);
          --tb-navbar-text: #fff;
          --tb-navbar-link-hover: #FFD166;
          --tb-navbar-logo: #FFD166;
          --tb-navbar-btn-bg: #181B23;
          --tb-settings-menu-bg: #20273b;
          --tb-settings-menu-item: #FFD166;
          --tb-settings-menu-item-hover: #4F8CFF;
          --tb-settings-gear-bg: #23272F;
          --tb-settings-gear-shadow: 0 3px 13px #FFD16616;
          --tb-settings-gear-accent: #FFD166;
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
        .tb-navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .tb-settings-wrapper {
          position: relative;
          margin-right: 0.83rem;
          display: flex;
          align-items: center;
        }
        .tb-settings-btn {
          background: var(--tb-settings-gear-bg, #fff);
          border: none;
          border-radius: 50%;
          width: 37px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--tb-settings-gear-shadow, 0 1.5px 7px #4F8CFF12);
          cursor: pointer;
          outline: none;
          transition: filter 0.2s, box-shadow 0.19s, background 0.21s;
          position: relative;
        }
        .tb-settings-btn:focus,
        .tb-settings-btn--active {
          filter: brightness(0.97) drop-shadow(0 0 5px var(--tb-settings-gear-accent,#FFD166));
          box-shadow: 0 0 0 2.5px var(--tb-navbar-link-hover,#4F8CFF);
          background: var(--tb-navbar-btn-bg,#fff);
        }
        .tb-settings-btn:active {
          filter: brightness(0.91);
        }
        .tb-settings-gear svg {
          display: block;
        }

        .tb-settings-dropdown {
          position: absolute;
          top: 45px;
          right: 1px;
          background: var(--tb-settings-menu-bg, #fff);
          color: var(--tb-settings-menu-item, #23272F);
          border: 1.3px solid var(--tb-navbar-link-hover,#4F8CFF);
          box-shadow: 0 8px 20px 0 #4F8CFF22, 0 2px 10px #FFD16618;
          padding: 0.65rem 0;
          border-radius: 13px;
          min-width: 148px;
          z-index: 2012;
          font-family: "Poppins", "Raleway", Arial, sans-serif;
          transition: background 0.34s, color 0.28s;
          outline: none;
        }
        .tb-settings-dropdown li {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tb-settings-dropdown li a {
          display: block;
          width: 100%;
          color: var(--tb-settings-menu-item,#23272F);
          font-weight: 600;
          font-size: 1.02rem;
          padding: 0.62em 1.11em;
          text-decoration: none;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.17s, color 0.12s;
          outline: none;
        }
        .tb-settings-dropdown li a:focus, .tb-settings-dropdown li a:hover,
        .tb-settings-dropdown li[aria-selected="true"] > a {
          background: var(--tb-settings-menu-item-hover, #FFD166);
          color: #fff;
        }
        .tb-settings-dropdown li:last-child a {
          border-bottom: none;
        }
        .tb-settings-dropdown li:not(:last-child) a {
          margin-bottom: 2px;
        }
        /* Hide dropdown when closed */
        .tb-settings-dropdown[style*="display: none"] {
          pointer-events: none;
        }

        /* Added drop shadow in both themes, extra for dark */
        .tb-dropdown-dark {
          box-shadow: 0 10px 32px #FFD16611,0 3px 12px #4F8CFF18,0 9px 26px #FFD16612;
        }
        .tb-dropdown-light {
          box-shadow: 0 6px 19px #4F8CFF19, 0 2px 13px #FFD16613;
        }

        /* Responsive & A11y tweaks */
        @media (max-width: 800px) {
          .tb-navbar-inner {
            padding: 0 16px;
          }
          .tb-logo {
            font-size: 1.35rem;
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
          .tb-theme-toggle {
            font-size: 1.23rem;
            padding: 4px;
          }
          .tb-settings-btn {
            width: 32px; height: 32px;
          }
        }
      `}</style>
    </nav>
  );
}
