import React from "react";

/**
 * PUBLIC_INTERFACE
 * Footer component for the TalkBuddy landing page.
 * Semantic, responsive, with smooth theme-state coloring and transition.
 */
export default function Footer() {
  return (
    <footer className="tb-footer" role="contentinfo">
      <div className="tb-footer-inner">
        <span className="tb-footer-logo" aria-label="TalkBuddy logo">
          💬
        </span>
        <span className="tb-footer-copyright">
          &copy; {new Date().getFullYear()} TalkBuddy. All rights reserved.
        </span>
        <span className="tb-footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {" · "}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
            Built with React
          </a>
        </span>
      </div>
    </footer>
  );
}
