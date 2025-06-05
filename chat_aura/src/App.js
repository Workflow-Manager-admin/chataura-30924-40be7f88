import React, { useEffect, useState, useMemo, createContext, useCallback } from 'react';
import './App.css';
import NavBar from './NavBar';
import LandingHero from './LandingHero';
import LandingFeatures from './LandingFeatures';
import Footer from './Footer';
import ChatPage from './ChatPage'; // Added import
import './landing.css';

// PUBLIC_INTERFACE
/**
 * ThemeContext provides theme and setTheme for instant global theme switching.
 */
export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

/**
 * ThemeProvider wraps the app, propagates and applies theme everywhere.
 */
export function ThemeProvider({ children }) {
  const getInitialTheme = () =>
    localStorage.getItem('talkbuddy-theme') ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply theme & update root CSS vars and background for smooth transition
  const applyTheme = useCallback((themeValue) => {
    document.body.dataset.theme = themeValue;
    localStorage.setItem('talkbuddy-theme', themeValue);
    const r = document.documentElement;
    if (themeValue === 'dark') {
      r.style.setProperty('--base-dark', '#11141b');
      r.style.setProperty('--base-light', '#FFD166');
      r.style.setProperty('--text-color', '#fff');
      r.style.setProperty('--text-secondary', 'rgba(255,255,255,0.78)');
      r.style.setProperty('--border-color', 'rgba(255,255,255,0.13)');
      r.style.setProperty('--card-bg', '#171c2c');
      r.style.setProperty('--footer-bg', '#181B23');
      r.style.setProperty('--footer-color', '#FFD166');
      document.body.style.background =
        'linear-gradient(112deg,#11141b,#23272F 62%,#2e3644 99%)';
      document.body.style.color = '#fff';
      document.body.style.transition = 'background 0.55s, color 0.45s';
    } else {
      r.style.setProperty('--base-dark', '#F5F3ED');
      r.style.setProperty('--base-light', '#4F8CFF');
      r.style.setProperty('--text-color', '#23272F');
      r.style.setProperty('--text-secondary', '#555');
      r.style.setProperty('--border-color', 'rgba(23,8,2,0.08)');
      r.style.setProperty('--card-bg', '#fff');
      r.style.setProperty('--footer-bg', '#eae6de');
      r.style.setProperty('--footer-color', '#23272F');
      document.body.style.background =
        'linear-gradient(107deg,#FFF,#E7E3DB 60%,#d3e1fc 100%)';
      document.body.style.color = '#23272F';
      document.body.style.transition = 'background 0.55s, color 0.45s';
    }
    window.dispatchEvent(new CustomEvent('theme-updated', { detail: { theme: themeValue } }));
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    (tOrFunc) => {
      setThemeState((prev) => {
        const newTheme =
          typeof tOrFunc === 'function' ? tOrFunc(prev) : tOrFunc;
        applyTheme(newTheme);
        return newTheme;
      });
    },
    [applyTheme]
  );

  const ctxVal = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={ctxVal}>{children}</ThemeContext.Provider>
  );
}

/*
 * PUBLIC_INTERFACE
 * App's root: renders HomePage (dashboard) as main entry.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Chat page at /chat */}
          <Route path="/chat" element={<ChatPage />} />
          {/* Main landing page at / */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <main>
                  <LandingHero />
                  <LandingFeatures />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;