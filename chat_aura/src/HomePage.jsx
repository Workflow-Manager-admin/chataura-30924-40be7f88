import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "./App";
import NavBar from "./NavBar";
import Footer from "./Footer";

/**
 * Icon: paper plane SVG for the send button (modern, tiny, accessible).
 */
function SendIcon({ size = 23 }) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ display: "block" }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      tabIndex={-1}
    >
      <path
        d="M3 20L21 12L3 4V10L17 12L3 14V20Z"
        fill="currentColor"
        opacity="0.81"
      />
    </svg>
  );
}

// Simple demo: sample placeholder chat messages with alternating alignment.
const DEMO_CHAT_HISTORY = [
  {
    id: 1,
    sender: "assistant",
    text: "Hello! 👋 How can I help you today?",
    timestamp: "09:00",
  },
  {
    id: 2,
    sender: "user",
    text: "Hi! What can you do?",
    timestamp: "09:01",
  },
  {
    id: 3,
    sender: "assistant",
    text: "I can answer questions, have conversations, and help with many topics. Ask me anything!",
    timestamp: "09:01",
  },
];


// PUBLIC_INTERFACE
/**
 * HomePage/ChatPage of TalkBuddy; modern, theme-supportive, responsive.
 */
export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState(DEMO_CHAT_HISTORY);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef();

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message
  function handleSend(e) {
    if (typeof e === "object") e.preventDefault();
    const text = input.trim();
    if (!text) return;
    // Simulate sending: add user message, delay AI echo.
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "assistant",
          text: "I'm just a demo AI! Replace me with OpenAI integration. 😊",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 950);
  }

  // Submit on Enter
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  }

  return (
    <div className={`tb-homepage-root tb-theme--${theme}`}>
      <NavBar />

      <main className="tb-chatpage-main" id="chat">
        <div className="tb-chat-card-shadow">
          <section
            className="tb-chat-card"
            aria-label="TalkBuddy conversation window"
          >
            <header className="tb-chat-card-header" id="tb-chat-title">
              <span className="tb-chat-card-ai-icon" aria-hidden="true">
                🤖
              </span>
              <span className="tb-chat-card-title">TalkBuddy Chat</span>
            </header>

            <div
              className="tb-chat-history"
              ref={chatWindowRef}
              role="log"
              aria-live="polite"
            >
              {messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
            </div>

            <form
              className="tb-chat-input-row"
              autoComplete="off"
              onSubmit={handleSend}
              role="search"
              aria-label="Send a message to TalkBuddy"
            >
              <textarea
                className="tb-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={900}
                placeholder="Type your message…"
                aria-label="Chat message input"
                required
                tabIndex={0}
              />
              <button
                className="tb-send-btn"
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                tabIndex={0}
              >
                <SendIcon />
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />

      {/* Bottom quick nav bar (optional for mobile) */}
      <nav
        className="tb-bottom-nav"
        aria-label="Quick navigation"
      >
        <a href="#home" className="tb-bnav-link" aria-label="Go to home">
          <span aria-hidden="true">🏠</span>
          <span className="tb-bnav-label">Home</span>
        </a>
        <a href="#chat" className="tb-bnav-link active" aria-current="page" aria-label="Go to chat">
          <span aria-hidden="true">💬</span>
          <span className="tb-bnav-label">Chat</span>
        </a>
        <a href="#about" className="tb-bnav-link" aria-label="Learn about TalkBuddy">
          <span aria-hidden="true">📖</span>
          <span className="tb-bnav-label">About</span>
        </a>
      </nav>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Render single chat bubble with styles, alignment, timestamp.
 */
function ChatBubble({ msg }) {
  const isUser = msg.sender === "user";
  return (
    <div
      className={
        "tb-chat-bubble-row" + (isUser ? " from-user" : " from-ai")
      }
      aria-label={
        (isUser ? "You: " : "AI: ") +
        msg.text +
        " " +
        (msg.timestamp || "")
      }
    >
      {isUser ? null : (
        <span className="tb-chat-bubble-avatar" aria-hidden="true">
          🤖
        </span>
      )}
      <div
        className={
          "tb-chat-bubble" +
          (isUser ? " user" : " ai")
        }
        tabIndex={0}
      >
        <span className="tb-chat-bubble-text">{msg.text}</span>
        <span className="tb-chat-bubble-time">{msg.timestamp}</span>
      </div>
      {isUser ? (
        <span className="tb-chat-bubble-avatar" aria-hidden="true">
          <svg
            width={28}
            height={28}
            viewBox="0 0 512 512"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="256" cy="256" r="256" fill="#4F8CFF" />
            <path
              d="M384 360c0-40-32-72-72-72h-48c-40 0-72 32-72 72"
              stroke="#fff"
              strokeWidth={11}
              strokeLinecap="round"
            />
            <ellipse
              cx="200"
              cy="220"
              rx="28"
              ry="35"
              fill="#fff"
              opacity="0.98"
            />
            <ellipse
              cx="310"
              cy="220"
              rx="28"
              ry="35"
              fill="#fff"
              opacity="0.98"
            />
          </svg>
        </span>
      ) : null}
    </div>
  );
}
