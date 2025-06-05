import React, { useEffect, useState, useMemo, createContext, useCallback } from 'react';
import './App.css';
import NavBar from './NavBar';

// PUBLIC_INTERFACE
/**
 * ThemeContext provides theme and setTheme for instant global theme switching.
 * Applies theme to document.body, localStorage, and CSS variables.
 */
export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

// PUBLIC_INTERFACE
/**
 * ThemeProvider wraps the app, propagates and applies theme everywhere.
 */
export function ThemeProvider({ children }) {
  // Initialize theme: storage, OS preference, or default to "light"
  const getInitialTheme = () =>
    localStorage.getItem('talkbuddy-theme') ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply theme to data-theme, localStorage, CSS vars, and body color transition
  const applyTheme = useCallback((themeValue) => {
    // Set body attribute and persist
    document.body.dataset.theme = themeValue;
    localStorage.setItem('talkbuddy-theme', themeValue);

    // Apply root variables + background for maximal global effect
    const r = document.documentElement;
    if (themeValue === 'dark') {
      r.style.setProperty('--base-dark', '#11141b');
      r.style.setProperty('--base-light', '#FFD166');
      r.style.setProperty('--text-color', '#fff');
      r.style.setProperty('--text-secondary', 'rgba(255,255,255,0.78)');
      r.style.setProperty('--border-color', 'rgba(255,255,255,0.13)');
      document.body.style.background = 'linear-gradient(112deg,#11141b,#23272F 63%,#2e3644 99%)';
      document.body.style.color = '#fff';
    } else {
      r.style.setProperty('--base-dark', '#F5F3ED');
      r.style.setProperty('--base-light', '#4F8CFF');
      r.style.setProperty('--text-color', '#23272F');
      r.style.setProperty('--text-secondary', '#555');
      r.style.setProperty('--border-color', 'rgba(23,8,2,0.08)');
      document.body.style.background = 'linear-gradient(107deg,#FFF,#E7E3DB 60%,#d3e1fc 100%)';
      document.body.style.color = '#23272F';
    }
    // Optionally notify legacy listeners
    window.dispatchEvent(new CustomEvent('theme-updated', { detail: { theme: themeValue } }));
  }, []);

  // On theme change, apply everywhere
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Update theme state and propagate instantly
  const setTheme = useCallback((tOrFunc) => {
    setThemeState((prev) => {
      const newTheme =
        typeof tOrFunc === 'function' ? tOrFunc(prev) : tOrFunc;
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  // Context value is stable, keep updated theme/setTheme
  const ctxVal = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={ctxVal}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <NavBar />
        <main style={{ paddingTop: "72px" }}>
          <div className="container">
            <div className="hero" id="home">
              <div className="subtitle">AI Workflow Manager Template</div>
              <h1 className="title">chat_aura</h1>
              <div className="description">
                Start building your application.
              </div>
              <button className="btn btn-large" id="chat">
                Button
              </button>
              <div id="about" style={{ marginTop: "60px", fontSize: "1.08rem", color: "#888" }}>
                <strong>About:</strong> This is a template app; the Chat, Home, and About links in the NavBar smoothly navigate to these mock sections for demo.
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;