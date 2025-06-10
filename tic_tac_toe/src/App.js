import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

/**
 * Main App container for the TicTacToe Classic app.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <a
              href="https://react.dev/"
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Learn React
            </a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero" style={{ paddingTop: 80, paddingBottom: 32 }}>
            <div className="subtitle" style={{ color: "#4caf50" }}>
              TicTacToe Classic
            </div>
            <h1 className="title" style={{ fontSize: '2.7rem', marginBottom: 7 }}>
              Play TicTacToe
            </h1>
            <div className="description" style={{ marginBottom: 19 }}>
              Take turns as X and O and see who can win first. Can you outsmart your opponent?
            </div>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;