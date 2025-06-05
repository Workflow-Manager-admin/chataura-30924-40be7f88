import React, { useContext, useRef, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeContext } from "./App";
import "./ChatPage.css";

/**
 * PUBLIC_INTERFACE
 * ChatPage.jsx — Styled, theme-aware, responsive chat UI for TalkBuddy.
 * Features:
 * - Fixed NavBar at top (reuses global NavBar)
 * - Central chat card with themed gradient, modern rounded corners, shadow
 * - Chat history region (vertically scrollable, flex)
 * - Message bubbles (user/AI, alignment, color, optional timestamp)
 * - Input bar at bottom with paper plane icon/button
 * - Accessible, responsive, light/dark transitions
 * THIS IS STATIC — no backend or message sending logic yet.
 */
const DEMO_MESSAGES = [
  {
    from: "ai",
    text: "Hi there! 👋 How can I help you today?",
    time: "10:00 am",
  },
  {
    from: "user",
    text: "Hello! Tell me a fun fact.",
    time: "10:00 am",
  },
  {
    from: "ai",
    text: "Did you know? Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs! 🍯",
    time: "10:01 am",
  },
];

function PaperPlaneIcon({ color = "#fff", size = 22 }) {
  // Inline SVG paper plane for Send button
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <path
        d="M4 20L20 12L4 4V10L16 12L4 14V20Z"
        fill={color}
      />
      <title>Send</title>
    </svg>
  );
}

function UserAvatar() {
  // Optionally, use initials or emoji; fallback for user
  return (
    <span className="tb-chat-bubble-avatar" aria-label="You">
      <span role="img" aria-label="User">
        🧑
      </span>
    </span>
  );
}

function AiAvatar() {
  // Fancier AI: colored orb or emoji
  return (
    <span className="tb-chat-bubble-avatar" aria-label="AI">
      <span role="img" aria-label="TalkBuddy">
        🤖
      </span>
    </span>
  );
}

// Message bubble component
function ChatBubble({ from, text, time }) {
  const isUser = from === "user";
  return (
    <div
      className={`tb-chat-bubble-row from-${isUser ? "user" : "ai"}`}
      tabIndex={-1}
      aria-live="polite"
    >
      {/* Avatar left for ai, right for user */}
      {!isUser && <AiAvatar />}
      <div
        className={`tb-chat-bubble ${isUser ? "user" : "ai"}`}
        tabIndex={0}
        role="group"
        aria-label={isUser ? "Your message" : "AI message"}
      >
        <span className="tb-chat-bubble-text">{text}</span>
        <span className="tb-chat-bubble-time">{time}</span>
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
}

export default function ChatPage() {
  const { theme } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const chatHistoryRef = useRef();

  // Auto-scroll to bottom on load/demo messages render
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, []);

  // Demo: handle Enter key for input (static, clears input only)
  function handleInputKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setInput("");
    }
  }

  // Determine theme-aware root class for chat page
  const themeRootClass =
    theme === "dark" ? "tb-theme--dark" : "tb-theme--light";

  return (
    <div className={`tb-homepage-root ${themeRootClass}`}>
      {/* NavBar fixed at top */}
      <NavBar />

      {/* Main chat section */}
      <main className="tb-chatpage-main" tabIndex={-1}>
        <div className="tb-chat-card-shadow">
          <section className="tb-chat-card" aria-label="Chat window">
            {/* Header */}
            <div className="tb-chat-card-header">
              <span className="tb-chat-card-ai-icon" aria-hidden="true">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  tabIndex={-1}
                  style={{ display: "block" }}
                  aria-hidden="true"
                >
                  <circle
                    cx="13.5"
                    cy="13.5"
                    r="13.5"
                    fill={theme === "dark" ? "#FFD166" : "#4F8CFF"}
                  />
                  <path
                    d="M7.2 21.04v-3.03c-1.12-1.15-1.71-2.7-1.71-4.17 0-4.19 3.49-7.62 8.01-7.62 4.53 0 8.01 3.43 8.01 7.62 0 4.18-3.48 7.61-8.01 7.61-1.24 0-2.76-.34-4.06-1.1l-2.24 1.69z"
                    fill="#fff"
                    opacity="0.61"
                  />
                </svg>
              </span>
              <span className="tb-chat-card-title">TalkBuddy • Chat</span>
            </div>
            {/* Chat history region */}
            <div
              className="tb-chat-history"
              ref={chatHistoryRef}
              tabIndex={0}
              role="log"
              aria-live="polite"
              aria-label="Chat history"
            >
              {DEMO_MESSAGES.map((msg, i) => (
                <ChatBubble
                  from={msg.from}
                  key={i}
                  text={msg.text}
                  time={msg.time}
                />
              ))}
            </div>
            {/* Input row (sticky at card bottom) */}
            <div className="tb-chat-input-row" role="search">
              <textarea
                className="tb-chat-input"
                rows={1}
                maxLength={600}
                value={input}
                aria-label="Message input"
                placeholder="Type your message..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                tabIndex={0}
                autoFocus={false}
                disabled={false}
              />
              <button
                className="tb-send-btn"
                type="button"
                aria-label="Send message"
                tabIndex={0}
                disabled={input.trim().length === 0}
                // Demo: clear input only on click
                onClick={() => setInput("")}
              >
                <PaperPlaneIcon color="#fff" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Optional mobile bottom nav (for quick nav, not interactive here) */}
      <nav className="tb-bottom-nav" role="navigation" aria-label="Bottom navigation">
        <a className="tb-bnav-link active" href="#chat" aria-label="Current: Chat">
          <span role="img" aria-label="Chat" style={{fontSize: "1.13em"}}>💬</span>
          <span className="tb-bnav-label">Chat</span>
        </a>
        <a className="tb-bnav-link" href="#about" aria-label="About TalkBuddy">
          <span role="img" aria-label="Info" style={{fontSize: "1.1em"}}>ℹ️</span>
          <span className="tb-bnav-label">About</span>
        </a>
      </nav>

      {/* App footer */}
      <Footer />
    </div>
  );
}
