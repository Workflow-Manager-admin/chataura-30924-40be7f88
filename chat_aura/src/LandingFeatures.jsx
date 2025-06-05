import React from "react";

/**
 * PUBLIC_INTERFACE
 * Feature section for TalkBuddy landing page.
 * Renders a grid of visually-strong feature cards (icon, title, description).
 * All layout/styling is controlled by landing.css.
 */
const features = [
  {
    title: "Natural Conversations",
    icon: (
      <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>🗣️</span>
    ),
    description: "AI understands and talks like a human."
  },
  {
    title: "Anytime Support",
    icon: (
      <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>⏰</span>
    ),
    description: "Available 24/7, wherever you are."
  },
  {
    title: "Customizable Chat",
    icon: (
      <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>🎨</span>
    ),
    description: "Adjust tone, style, and more."
  },
  {
    title: "Privacy Focused",
    icon: (
      <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>🔒</span>
    ),
    description: "Your chats stay safe and secure."
  }
];

export default function LandingFeatures() {
  return (
    <section className="tb-features-section" id="features" aria-labelledby="features-title">
      <h2 className="tb-features-title" id="features-title">
        Why TalkBuddy?
      </h2>
      <div className="tb-features-grid" role="list">
        {features.map((f, i) => (
          <div
            className="tb-feature-card"
            key={f.title}
            tabIndex={0}
            role="listitem"
            aria-label={f.title + ": " + f.description}
          >
            <div className="tb-feature-icon">{f.icon}</div>
            <div className="tb-feature-card-title">{f.title}</div>
            <div className="tb-feature-card-description">{f.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
