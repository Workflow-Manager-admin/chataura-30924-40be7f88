import React, { useContext } from "react";
import { ThemeContext } from "./App";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

// PUBLIC_INTERFACE
/**
 * HomePage dashboard for TalkBuddy.
 * Modern, theme-aware, responsive page with:
 * 1. NavBar
 * 2. Welcome/Hero section w/ CTA
 * 3. Feature cards grid (icon, animation)
 * 4. Quote/Fun Fact area
 * 5. Footer
 */
export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  // Static quote/fun fact (API-ready, for now static)
  const quote = {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    funFact: "Did you know? Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs!"
  };

  // Feature cards data
  const features = [
    {
      title: "Talk Now",
      icon: (
        <span aria-hidden="true" className="tb-feature-svg tb-ico">
          <svg width={38} height={38} viewBox="0 0 38 38" fill="none">
            <defs>
              <linearGradient id="talkNowGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#4F8CFF"/>
                <stop offset="1" stopColor="#FFD166"/>
              </linearGradient>
            </defs>
            <circle cx="19" cy="19" r="18" fill="url(#talkNowGrad)" />
            <path d="M27 13.2c1 .22 1.64 1.10 1.64 2.07v7.44c0 .98-.67 1.86-1.7 2.08l-13.44 2.9C11.17 28.06 10 27.12 10 25.97V12.98c0-1.14 1.17-2.09 2.38-1.83l13.49 2.86Z" fill="#fff" opacity="0.82"/>
            <path d="M14.6 16.74l7.88 1.7c.52.11.52.89 0 1l-7.88 1.7c-.39.08-.72-.28-.72-.77v-2.86c0-.49.33-.85.72-.77z" fill="#4F8CFF" />
          </svg>
        </span>
      ),
      description: "Start a new conversation instantly.",
      href: "#chat",
      gradient: "linear-gradient(103deg, #4F8CFF 51%, #FFD166 108%)"
    },
    {
      title: "History",
      icon: (
        <span aria-hidden="true" className="tb-feature-svg tb-ico">
          <svg width={38} height={38} viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18" fill="#FFD166" />
            <path d="M19 10v9l6 3.5" stroke="#4F8CFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      ),
      description: "Review your past chats (coming soon).",
      href: "#history",
      gradient: "linear-gradient(99deg, #FFD166 60%, #4F8CFF 125%)"
    },
    {
      title: "Daily Insights",
      icon: (
        <span aria-hidden="true" className="tb-feature-svg tb-ico">
          <svg width={38} height={38} viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18" fill="url(#dailyGrad)" />
            <defs>
              <linearGradient id="dailyGrad" x1="6" y1="6" x2="33" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD166"/>
                <stop offset="1" stopColor="#4F8CFF"/>
              </linearGradient>
            </defs>
            <rect x="13" y="11" width="12" height="16" rx="4" fill="#fff" opacity="0.87"/>
            <path d="M19 14v6l4 2" stroke="#4F8CFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      ),
      description: "Get inspiring tips & facts each day.",
      href: "#insights",
      gradient: "linear-gradient(91deg, #FFD166 62%, #93b5ff 125%)"
    },
    {
      title: "Customize",
      icon: (
        <span aria-hidden="true" className="tb-feature-svg tb-ico">
          <svg width={38} height={38} viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18" fill="#e9f3ff"/>
            <path d="M24.45 18a5.45 5.45 0 01-10.88 1.42c4.03-1.68 6.37-4.14 8.04-8.04A5.45 5.45 0 0124.45 18z" fill="#4F8CFF"/>
            <circle cx="19" cy="18" r="2.7" fill="#FFD166"/>
          </svg>
        </span>
      ),
      description: "Personalize your experience.",
      href: "#customize",
      gradient: "linear-gradient(101deg, #e9f3ff 60%, #FFD166 135%)"
    }
  ];

  return (
    <div className={`tb-dashboard-root tb-theme--${theme}`}>
      <NavBar />

      {/* Hero section */}
      <section className="tb-dash-hero" id="home">
        <div className="tb-dash-hero-inner">
          <div className="tb-dash-hero-content">
            <h1 className="tb-dash-title">
              Welcome to <span className="tb-dash-gradient">TalkBuddy</span>
            </h1>
            <div className="tb-dash-subtitle">
              Your modern AI-powered assistant, ready to chat and inspire.
            </div>
            <div className="tb-dash-description">
              Enjoy natural conversations, daily insights, and total privacy.<br />
              <span style={{ fontWeight: 500, color: "var(--accent, #FFD166)" }}>Switch themes</span>, explore features, or <span style={{ fontWeight: 700 }}>start chatting now!</span>
            </div>
            <Link to="/chat" className="tb-dash-cta" tabIndex={0} role="button" aria-label="Start Chatting">
              Start Chatting
            </Link>
          </div>
          <div className="tb-dash-orb-bg" aria-hidden="true"></div>
        </div>
      </section>

      {/* Features grid */}
      <section className="tb-dash-features" id="features" aria-labelledby="tb-features-title">
        <h2 className="tb-dash-features-title" id="tb-features-title">Quick Access</h2>
        <div className="tb-dash-features-grid" role="list">
          {features.map((f, i) =>
            f.href === "#chat" ? (
              <Link
                className="tb-dash-feature-card"
                key={f.title}
                tabIndex={0}
                to="/chat"
                style={{ background: f.gradient }}
                role="listitem"
                aria-label={f.title + ": " + f.description}
              >
                <div className="tb-dash-feature-icon">{f.icon}</div>
                <div className="tb-dash-feature-title">{f.title}</div>
                <div className="tb-dash-feature-description">{f.description}</div>
              </Link>
            ) : (
              <a
                className="tb-dash-feature-card"
                key={f.title}
                tabIndex={0}
                href={f.href}
                style={{ background: f.gradient }}
                role="listitem"
                aria-label={f.title + ": " + f.description}
              >
                <div className="tb-dash-feature-icon">{f.icon}</div>
                <div className="tb-dash-feature-title">{f.title}</div>
                <div className="tb-dash-feature-description">{f.description}</div>
              </a>
            )
          )}
        </div>
      </section>

      {/* Quote/Fun Fact */}
      <section className="tb-dash-quote-section" id="fact">
        <div className="tb-dash-quote-card">
          <div className="tb-dash-quote-icon" aria-hidden="true">💡</div>
          <blockquote className="tb-dash-quote-text">
            “{quote.text}”
          </blockquote>
          <div className="tb-dash-quote-author">— {quote.author}</div>
          <div className="tb-dash-funfact">
            <span className="tb-dash-funfact-icon" aria-hidden="true">✨</span>
            {quote.funFact}
          </div>
        </div>
      </section>

      <Footer />

      {/* Embedded style for *dashboard* styles */}
      <style>{`
        .tb-dashboard-root {
          min-height: 100vh;
          background: var(--base-dark, #23272F);
          color: var(--text-color);
          font-family: 'Poppins', 'Montserrat', 'Raleway', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          transition: background 0.65s cubic-bezier(.71,.01,.39,1.13);
        }
        .tb-dash-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 340px;
          padding-top: 105px;
          padding-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .tb-dash-hero-inner {
          max-width: 970px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: stretch;
          position: relative;
        }
        .tb-dash-hero-content {
          flex: 1 1 360px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 250px;
          max-width: 550px;
          padding: 0 28px;
        }
        .tb-dash-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 0.37em;
          letter-spacing: -0.015em;
          line-height: 1.12;
          color: var(--text-color);
          font-family: 'Montserrat', 'Poppins', sans-serif;
          transition: color 0.55s;
        }
        .tb-dash-gradient {
          background: linear-gradient(93deg, var(--base-light, #4F8CFF), var(--accent, #FFD166) 79%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tb-dash-subtitle {
          color: var(--base-light, #4F8CFF);
          font-weight: 600;
          font-size: 1.16rem;
          margin-bottom: 0.9em;
          letter-spacing: 0.01em;
        }
        .tb-dash-description {
          font-size: 1.13rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.53;
          max-width: 520px;
          transition: color 0.39s;
        }
        .tb-dash-cta {
          display: inline-block;
          background: linear-gradient(97deg,var(--base-light),var(--accent) 80%);
          color: #fff;
          font-weight: 700;
          border: none;
          border-radius: 22px;
          font-size: 1.15em;
          padding: 15px 42px;
          box-shadow: 0 4px 19px #FFD16628, 0 2px 13px #4F8CFF16;
          text-decoration: none;
          outline: none;
          transition: background 0.29s, color 0.24s, box-shadow 0.23s, filter 0.16s;
          margin-top: 2px;
        }
        .tb-dash-cta:hover, .tb-dash-cta:focus {
          background: linear-gradient(93deg, #7691ff 70%, #FFD166 100%);
          color: #23272F;
          filter: brightness(1.025);
          box-shadow: 0 8px 29px #FFD16661, 0 3px 16px #4F8CFF44;
        }
        .tb-dash-cta:active {
          background: linear-gradient(85deg, #4F8CFF 68%, #ffd166 100%);
        }
        .tb-dash-orb-bg {
          position: absolute;
          right: -60px;
          top: 42px;
          width: 230px;
          height: 230px;
          border-radius: 50%;
          background: radial-gradient(circle at 65% 38%, var(--base-light, #4F8CFF) 54%, var(--accent, #FFD166) 100%, transparent 116%);
          filter: blur(8.5px) drop-shadow(0 12px 70px #FFD16677);
          opacity: .74;
          z-index: 1;
          animation: tb-dashboard-orb 5s ease-in-out infinite alternate;
          transition: background 0.58s, filter 0.37s, opacity 0.31s;
        }
        @keyframes tb-dashboard-orb {
          0% { opacity: .68; filter: blur(5.5px) drop-shadow(0 22px 64px #FFD16635);}
          100% { opacity: .93; filter: blur(15px) drop-shadow(0 16px 90px #4F8CFF26);}
        }
        .tb-dash-features {
          padding: 18px 0 0px 0;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tb-dash-features-title {
          font-size: 2.1rem;
          color: var(--base-light, #4F8CFF);
          font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
          font-weight: 700;
          margin-bottom: 19px;
          letter-spacing: -0.009em;
          text-align: center;
          margin-top: 10px;
        }
        .tb-dash-features-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(215px,1fr));
          gap: 2.1rem 2.3rem;
          max-width: 930px;
          margin: 0 auto 7px auto;
        }
        .tb-dash-feature-card {
          /* Soft corners, modern card with animated gradient bg and shadow */
          border-radius: 18px;
          min-height: 190px;
          min-width: 0;
          padding: 24px 22px;
          box-shadow: 0 8px 32px #4F8CFF16, 0 4px 17px #FFD16624, var(--shadow-card);
          border: 1.6px solid var(--border-color, #ececf5);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-decoration: none;
          color: #23272F;
          outline: none;
          position: relative;
          overflow: hidden;
          transition: 
            background 0.54s cubic-bezier(.71,.01,.39,1.13),
            color 0.26s,
            box-shadow 0.29s,
            border 0.19s,
            filter 0.24s;
          cursor: pointer;
          opacity: 0.97;
        }
        .tb-dash-feature-card:focus, .tb-dash-feature-card:hover {
          box-shadow: 0 10px 34px #FFD16634, 0 9px 32px #4F8CFF21;
          border: 2.3px solid var(--accent, #FFD166);
          filter: brightness(1.045);
          opacity: 1;
          z-index: 2;
        }
        .tb-dash-feature-icon {
          margin-bottom: 14px;
          font-size: 2.36rem;
          filter: drop-shadow(0 3px 14px #FFD16614);
        }
        .tb-dash-feature-title {
          font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
          font-size: 1.23rem;
          font-weight: 700;
          margin-bottom: 2px;
          color: #324668;
          letter-spacing: 0.01em;
        }
        .tb-dash-feature-description {
          font-family: 'Raleway', Arial, sans-serif;
          color: #57607a;
          font-size: 1.08rem;
          font-weight: 500;
          margin-top: 0;
        }
        .tb-dash-feature-card:focus .tb-dash-feature-title,
        .tb-dash-feature-card:hover .tb-dash-feature-title {
          color: var(--accent,#FFD166);
        }
        .tb-dash-feature-card:focus .tb-dash-feature-description,
        .tb-dash-feature-card:hover .tb-dash-feature-description {
          color: #23272F;
        }
        .tb-ico svg {
          display: block;
          border-radius: 100%;
          box-shadow: 0 3px 16px #FFD16615;
          transition: box-shadow 0.33s;
        }
        .tb-dash-feature-card:focus .tb-ico svg,
        .tb-dash-feature-card:hover .tb-ico svg {
          box-shadow: 0 5px 29px #FFD16638, 0 1.5px 8px #4F8CFF35;
        }
        .tb-dash-quote-section {
          margin: 42px 0 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .tb-dash-quote-card {
          background: var(--card-bg, #fff);
          border-radius: 27px;
          box-shadow: 0 8px 39px #4F8CFF13, 0 4px 23px #FFD16617, var(--shadow-card);
          border: 1.5px solid var(--border-color, #e6eef5);
          padding: 26px 36px 18px 36px;
          max-width: 460px;
          text-align: center;
          margin: 0 auto;
          position: relative;
          transition: background 0.54s, box-shadow 0.32s, border 0.18s;
        }
        .tb-dash-quote-icon {
          font-size: 2.6rem;
          margin-bottom: 13px;
          color: var(--base-light, #4F8CFF);
          filter: drop-shadow(0 3.5px 22px #FFD16644);
        }
        .tb-dash-quote-text {
          font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
          font-size: 1.19rem;
          font-weight: 600;
          color: #23272F;
          quotes: "“" "”" "‘" "’";
          margin: 0;
          line-height: 1.48;
        }
        .tb-dash-quote-author {
          font-family: 'Raleway', Arial, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          margin: 10px 0 0 0;
          color: var(--base-light, #4F8CFF);
        }
        .tb-dash-funfact {
          margin-top: 18px;
          font-size: 1.05rem;
          color: var(--accent, #FFD166);
          font-family: 'Poppins', Arial, sans-serif;
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7em;
          text-align: center;
        }
        .tb-dash-funfact-icon {
          font-size: 1.5em;
        }
        @media (max-width: 1000px) {
          .tb-dash-hero-inner { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 12px; 
          }
          .tb-dash-orb-bg { 
            right: -19vw;
            top: 49px;
            width: 160px;
            height: 160px;
          }
          .tb-dash-hero-content { max-width: 90vw; }
        }
        @media (max-width: 700px) {
          .tb-dash-title { font-size: 1.59rem; }
          .tb-dash-subtitle { font-size: 1.02rem; }
          .tb-dash-hero { padding-top: 73px; }
          .tb-dash-hero-content { padding: 0 12px; }
          .tb-dash-features-title { font-size: 1.13rem; }
          .tb-dash-features-grid { gap: 1rem 1.3rem; }
          .tb-dash-feature-card { min-height: 134px; font-size: 0.99rem; padding: 16px 8px; }
          .tb-dash-quote-card { padding: 16px 9px; font-size: 1rem; }
        }
        @media (max-width: 500px) {
          .tb-dash-hero-content { padding: 0 2px; }
        }
      `}</style>
    </div>
  );
}
