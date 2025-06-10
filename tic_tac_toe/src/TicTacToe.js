import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main TicTacToe Classic game container.
 *
 * Features:
 * - Two player play (alternating X and O)
 * - Win and draw detection
 * - Reset button
 * - Minimal, accessible design
 */
function TicTacToe() {
  // State for 3x3 board, current player, and game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "win", "draw"
  const [winner, setWinner] = useState(null);

  // List of all possible win combinations (indices)
  const WIN_PATTERNS = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // PUBLIC_INTERFACE
  /**
   * Handles a cell click on the board.
   * @param {number} idx - Index (0-8) of clicked cell.
   */
  function handleCellClick(idx) {
    if (board[idx] || gameStatus !== "playing") return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);

    // Check for win/draw
    const winnerSymbol = calculateWinner(nextBoard);
    if (winnerSymbol) {
      setGameStatus("win");
      setWinner(winnerSymbol);
    } else if (nextBoard.every(Boolean)) {
      setGameStatus("draw");
      setWinner(null);
    } else {
      setIsXNext((prev) => !prev);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Determines the winner ("X" or "O") if any, else null.
   * @param {Array<string|null>} boardArr
   */
  function calculateWinner(boardArr) {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        boardArr[a] &&
        boardArr[a] === boardArr[b] &&
        boardArr[a] === boardArr[c]
      ) {
        return boardArr[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  /**
   * Resets the board and game status to initial state.
   */
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinner(null);
  }

  // Render helpers
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        key={idx}
        aria-label={`cell ${idx + 1}`}
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || gameStatus !== "playing"}
        style={{
          color: board[idx] === "X" ? "#222222" : "#4caf50",
        }}
      >
        {board[idx]}
      </button>
    );
  }

  // Status text
  let statusText;
  if (gameStatus === "win") {
    statusText = (
      <span>
        <strong style={{ color: "#4caf50" }}>{winner}</strong> wins!
      </span>
    );
  } else if (gameStatus === "draw") {
    statusText = <span>It's a draw!</span>;
  } else {
    statusText = (
      <span>
        Turn: <strong style={{ color: isXNext ? "#222222" : "#4caf50" }}>{isXNext ? "X" : "O"}</strong>
      </span>
    );
  }

  return (
    <div className="ttt-main-container">
      <div className="ttt-status" style={{ marginBottom: 24, fontSize: "1.3rem" }}>
        {statusText}
      </div>
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-row" key={row}>
            {[0, 1, 2].map((col) => renderCell(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="ttt-controls" style={{ marginTop: 28 }}>
        {(gameStatus === "win" || gameStatus === "draw") && (
          <div className="ttt-endstatus" style={{ marginBottom: 8 }}>
            {gameStatus === "win"
              ? `Congratulations!`
              : `Want to try again?`}
          </div>
        )}
        <button
          className="btn btn-large"
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;

/* 
  Minimal CSS guidance for TicTacToe -- to be appended in App.css:

  .ttt-main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0;
  }

  .ttt-board {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 2px solid #222222;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 2px 28px rgba(44,44,44,0.04);
    margin-bottom: 24px;
  }

  .ttt-row {
    display: flex;
  }

  .ttt-cell {
    width: 68px;
    height: 68px;
    border: 1.5px solid #222222;
    background: none;
    font-size: 2.5rem;
    font-weight: 700;
    outline: none;
    cursor: pointer;
    transition: background 0.15s;
    background: #fff;
  }

  .ttt-cell:disabled {
    cursor: not-allowed;
    background: #f4f4f4;
    color: #bbbbbb;
  }

  .ttt-status, .ttt-controls {
    text-align: center;
    width: 100%;
  }
*/
