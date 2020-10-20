import React from "react";
import { socket } from "../../service/socket";

import "./game.css";

const Game = () => {
  const [gameState, setGameState] = React.useState(null);
  React.useEffect(() => {
    socket.on("game", (data) => {
      if (data.action === "initial state") {
        setGameState(data.gameObject);
      }
    });
  }, []);

  return (
    <div className="gameContainer">
      {(() => {
        if (gameState) return <h2>{gameState.title}</h2>;
      })()}
    </div>
  );
};

export default Game;
