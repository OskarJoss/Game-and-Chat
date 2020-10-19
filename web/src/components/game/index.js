import React from "react";
import { socket } from "../../service/socket";

import "./game.css";

const Game = () => {
  //   React.useEffect(() => {
  //     socket.on("game", (data) => {
  //       console.log(data);
  //     });
  //   }, []);

  return (
    <div className="gameContainer">
      <h2>Game</h2>
    </div>
  );
};

export default Game;
