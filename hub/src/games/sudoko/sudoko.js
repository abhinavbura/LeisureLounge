import React, { useState } from "react";
import "./sudokos.css";

const initialBoard = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
];

function Sudoko() {
  const [board, setBoard] = useState(initialBoard);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value === "" ? "" : parseInt(value);
    setBoard(newBoard);
  };

  const validateSudoku = () => {
    for (let i = 0; i < 9; i++) {
      let rowSet = new Set();
      let colSet = new Set();
      let gridSet = new Set();
      for (let j = 0; j < 9; j++) {
        // Check rows
        if (board[i][j] === 0 || rowSet.has(board[i][j])) {
          return false; // If a cell is empty or a number is repeated, Sudoku is not solved
        }
        rowSet.add(board[i][j]);

        // Check columns
        if (board[j][i] === 0 || colSet.has(board[j][i])) {
          return false; // If a cell is empty or a number is repeated, Sudoku is not solved
        }
        colSet.add(board[j][i]);

        // Check 3x3 subgrids
        let rowIndex = 3 * Math.floor(i / 3);
        let colIndex = 3 * (i % 3);
        let cellValue = board[rowIndex + Math.floor(j / 3)][colIndex + (j % 3)];
        if (cellValue === 0 || gridSet.has(cellValue)) {
          return false; // If a cell is empty or a number is repeated, Sudoku is not solved
        }
        gridSet.add(cellValue);
      }
    }

    // If all checks passed, Sudoku is solved
    return true;
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                className="cell"
                type="number"
                min="1"
                max="9"
                value={cell || ""}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                disabled={
                  cell !== "" && initialBoard[rowIndex][colIndex] !== ""
                }
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleCheck = () => {
    if (validateSudoku()) {
      alert("Congratulations! Sudoku puzzle is solved correctly.");
    } else {
      alert("Oops! Sudoku puzzle is not solved correctly.");
    }
  };

  return (
    <div className="sudoko">
      <h1 style={{ color: "white" }}>Sudoku Game</h1>
      {renderBoard()}
      <button onClick={handleCheck}>Check Solution</button>
    </div>
  );
}

export default Sudoko;
