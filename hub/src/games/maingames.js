import TicTacToe from "./tictactoe/tictoetoe.js";
import Sudoko from "./sudoko/sudoko.js";
import { useState } from "react";
export default function Games() {
  const [currgame, setcurrgame] = useState("sudoko");
  const changegame = (game) => {
    setcurrgame(game);
  };
  let game;
  if (currgame === "sudoko") {
    game = <Sudoko />;
  } else if (currgame === "tictactoe") {
    game = <TicTacToe />;
  }
  return (
    <div>
      <h1
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "30px",
          color: "white",
        }}
      >
        GAMES
      </h1>
      <div style={{ float: "right" }}>
        <div class="icon-container" onClick={() => changegame("sudoko")}>
          <button class="icon-button">
            <img src="sudoko.png" alt="Icon" />
          </button>
          <p class="icon-title">Sudoko</p>
        </div>
        <div class="icon-container" onClick={() => changegame("tictactoe")}>
          <button class="icon-button">
            <img src="tictactoe.png" alt="Icon" />
          </button>
          <p class="icon-title">TicTacToe</p>
        </div>
      </div>

      {game}
    </div>
  );
}
