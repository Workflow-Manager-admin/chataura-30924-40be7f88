import React from 'react';
import './App.css';
import NavBar from './NavBar';

function App() {
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