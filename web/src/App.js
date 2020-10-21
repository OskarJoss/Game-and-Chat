import React from "react";
import Chat from "./components/Chat";
import TicTacToe from "./components/TicTacToe";
import { socket } from "./service/socket";
import "./App.css";

const App = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pickedGame, setPickedGame] = React.useState(null);

  React.useEffect(() => {
    socket.on("room", (data) => {
      if (data.action === "joined room") {
        setIsConnected(true);
      }

      if (data.action === "picked game") {
        setPickedGame(data.game);
      }

      if (data.action === "opponent disconnected") {
        // setIsConnected(false);
        console.log("opponent disconnected");
      }
    });
  }, []);

  const joinRoom = () => {
    setIsLoading(true);
    socket.emit("room", {
      action: "join room",
    });
  };

  return (
    <div className="App">
      {(() => {
        if (isConnected)
          return (
            <div className="wrapper">
              {pickedGame === "tic-tac-toe" && <TicTacToe />}
              <Chat />
            </div>
          );
        if (isLoading) return <h2>Loading...</h2>;
        return <button onClick={joinRoom}>Play</button>;
      })()}
    </div>
  );
};

export default App;
