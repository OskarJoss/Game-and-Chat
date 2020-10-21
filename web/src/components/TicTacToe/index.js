import React from "react";
import { socket } from "../../service/socket";

import "./ticTacToe.css";

const TicTacToe = () => {
  const [gameState, setGameState] = React.useState(null);
  React.useEffect(() => {
    socket.emit("tic-tac-toe", {
      action: "start game",
    });

    socket.on("tic-tac-toe", (data) => {
      if (data.action === "initial state") {
        setGameState(data.gameState);
      }
    });
  }, []);

  return (
    <div className="ticTacToeWrapper">
      {(() => {
        if (gameState)
          return (
            <div className="ticTacToeContainer">
              <h2>
                {gameState.turn === socket.id ? "Your turn" : "Opponents turn"}
              </h2>

              <div className="board">
                {gameState.board.map((row, i) => (
                  <div className="row" key={i}>
                    {row.map((square, i) => {
                      let symbol = "";
                      if (square === 1) {
                        symbol = "X";
                      }
                      if (square === 2) {
                        symbol = "O";
                      }
                      return (
                        <div className="square" key={i}>
                          {symbol}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        return <h2>No game data</h2>;
      })()}
    </div>
  );
};

export default TicTacToe;
