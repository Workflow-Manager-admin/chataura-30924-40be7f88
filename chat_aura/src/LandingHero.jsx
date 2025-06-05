import React from "react";

// PUBLIC_INTERFACE
/**
 * Hero section for TalkBuddy landing page, centered layout and modern style.
 */
export default function LandingHero() {
  return (
    <section
      className="tb-hero-section"
      id="home"
      aria-labelledby="tb-hero-title"
    >
      <div className="tb-hero-inner">
        <div className="tb-hero-left">
          <div className="tb-hero-subtitle">Your AI Conversation Partner</div>
          <h1 className="tb-hero-title" id="tb-hero-title">
            TalkBuddy: <br />
            <span className="tb-hero-gradient">
              Chat Naturally with AI
            </span>
          </h1>
          <div className="tb-hero-desc">
            Ask anything, get instant, human-like responses. Secure, private, available 24/7. Try a <span style={{ fontWeight: 500, color: "var(--accent,#FFD166)" }}>smarter</span> chat today.
          </div>
          <a
            href="#chat"
            className="tb-cta-btn"
            tabIndex={0}
            role="button"
            aria-label="Get Started with TalkBuddy"
          >
            Get Started
          </a>
        </div>
        <div className="tb-hero-right" aria-hidden="true">
          {/* Fluid blob background + animated ai-robot SVG */}
          <div className="tb-hero-blob">
            <svg width="250" height="220" viewBox="0 0 340 300" fill="none">
              <defs>
                <linearGradient id="mainBlobGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4F8CFF" />
                  <stop offset="70%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
              <path d="M47.3,165.1Q32.1,230.3,90.9,242.8Q149.7,255.4,205,258Q260.3,260.6,282,211.9Q303.7,163.3,295.9,120.1Q288.2,76.8,243.5,40.9Q198.9,5,132.5,30.1Q66.2,55.2,47.3,165.1Z"
                fill="url(#mainBlobGrad)" opacity="0.85" />
            </svg>
            <div className="tb-hero-bot-illus">
              {/* Simple AI bot SVG, animated mouth */}
              <svg width="76" height="68" viewBox="0 0 76 68">
                <ellipse
                  cx="38" cy="39.5" rx="27" ry="26"
                  fill="#fff" opacity="0.97"
                  style={{ filter: "drop-shadow(0 6px 32px #4F8CFF99)" }}
                />
                <ellipse cx="27" cy="32" rx="3.5" ry="4" fill="#23272F" />
                <ellipse cx="49" cy="32" rx="3.5" ry="4" fill="#23272F" />
                <rect x="31" y="46.5" width="14" height="5.5" rx="3" fill="#FFD166" style={{ transition: "all 0.3s" }}>
                  <animate attributeName="y" values="46.5;47.5;46.5" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="height" values="5.5;7.5;5.5" dur="1.2s" repeatCount="indefinite" />
                </rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
