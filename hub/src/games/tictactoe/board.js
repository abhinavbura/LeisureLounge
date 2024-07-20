import React, { useState } from "react";
import Tile from "./tile.js";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleTileClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      // Check for winner or tie after each move
      checkWinner(newBoard);
      changeTurn();
    }
  };

  const changeTurn = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (newBoard) => {
    // Implement logic to check for winning combinations
    // Based on the result, display a winner message or tie
  };

  return (
    <div className="board">
      {board.map((value, index) => (
        <Tile
          key={index}
          value={value}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
