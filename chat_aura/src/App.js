import React, { useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';

// PUBLIC_INTERFACE
/**
 * Ensures the App always syncs its CSS variables and background color
 * to match the selected theme (dark/light) set via NavBar.
 * Updates :root theme variables for both modes.
 */
function App() {
  useEffect(() => {
    // Theme is managed via NavBar storing "talkbuddy-theme" in localStorage and body[data-theme]
    // This ensures App root variables and background update instantly with the toggle.
    function applyThemeVars(theme) {
      const r = document.documentElement;
      if (theme === 'dark') {
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
    }
    // Observe theme changes and apply instantly
    const observer = new MutationObserver(() => {
      const theme = document.body.dataset.theme || 'light';
      applyThemeVars(theme);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    // Initial apply
    applyThemeVars(document.body.dataset.theme || 'light');
    return () => observer.disconnect();
  }, []);

  return (
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
  );
}

export default App;