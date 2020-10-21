import React from "react";
import { socket } from "../../service/socket";

import "./ticTacToe.css";

const Game = () => {
  const [gameState, setGameState] = React.useState(null);
  React.useEffect(() => {
    socket.emit("tic-tac-toe", {
      action: "start",
    });
    socket.on("tic-tac-toe", (data) => {
      if (data.action === "initial state") {
        console.log(data);
        setGameState(data.gameObject);
      }
    });
  }, []);

  return (
    <div className="ticTacToeContainer">
      <h2>hej</h2>
      {(() => {
        if (gameState) return <h2>{gameState.title}</h2>;
      })()}
    </div>
  );
};

export default Game;
