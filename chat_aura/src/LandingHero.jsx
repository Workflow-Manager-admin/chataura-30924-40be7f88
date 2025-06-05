import React from "react";

/**
 * PUBLIC_INTERFACE
 * Hero section for TalkBuddy landing page.
 * This section features a vertically and horizontally centered layout, strong modern gradient, clear subtitle/title/button, and an animated chat SVG.
 * All layout and style are controlled with `landing.css` and theme vars.
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
          {/* Minimal modern chat bubble SVG with orb gradient background */}
          <div className="tb-hero-bubble-outer">
            <div className="tb-hero-animated-orb"></div>
            <svg
              className="tb-hero-chat-bubble"
              width="133"
              height="108"
              viewBox="0 0 133 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="bubbleGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4F8CFF" />
                  <stop offset="100%" stopColor="#FFD166" />
                </linearGradient>
                <filter id="bubbleShadow" x="-6" y="-6" width="145" height="120" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0.5" dy="5" stdDeviation="7" floodColor="#23272f" floodOpacity="0.19" />
                </filter>
              </defs>
              <path
                d="M22 16C22 7.163 31.137 0 42.5 0H90.5C101.863 0 111 7.163 111 16V65C111 73.84 101.862 81 90.5 81H53.5L27.5 107V81H42.5C31.138 81 22 73.84 22 65V16Z"
                fill="url(#bubbleGrad)"
                filter="url(#bubbleShadow)"
                style={{ transition: "fill 0.45s" }}
                opacity="0.96"
              />
              {/* Simulate a message */}
              <rect x="44" y="24" rx="4" width="45" height="10" fill="#fff" fillOpacity="0.92" />
              <rect x="44" y="40" rx="4" width="35" height="8" fill="#fff" fillOpacity="0.74" />
              <rect x="44" y="53" rx="3" width="22" height="7" fill="#fff" fillOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
