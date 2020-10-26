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
      if (data.action === "update gameState") {
        setGameState(data.gameState);
      }
    });
  }, []);

  const placeSymbol = (e) => {
    if (gameState.turn === socket.id) {
      const row = e.target.dataset.row;
      const square = e.target.dataset.square;

      socket.emit("tic-tac-toe", {
        action: "place symbol",
        position: {
          row: row,
          square: square,
        },
      });
    }
  };

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
                {gameState.board.map((row, i) => {
                  let rowNumber = i;
                  return (
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
                          <div
                            onClick={placeSymbol}
                            className="square"
                            key={i}
                            data-row={rowNumber}
                            data-square={i}
                          >
                            {symbol}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {(() => {
                if (gameState.winner) {
                  if (gameState.winner === socket.id) {
                    return <h2>You win</h2>;
                  } else if (gameState.winner === "draw") {
                    return <h2>Draw!</h2>;
                  } else {
                    return <h2>You lose</h2>;
                  }
                }
              })()}
            </div>
          );

        return <h2>No game data</h2>;
      })()}
    </div>
  );
};

export default TicTacToe;
