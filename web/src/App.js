import React from "react";
import Chat from "./components/chat";
// import openSocket from "socket.io-client";

import "./App.css";

const App = () => {
  // let socket = null;
  // React.useEffect(() => {
  //   socket = openSocket(process.env.REACT_APP_API);
  //   socket.on("joinedRoom", (data) => {
  //     console.log(socket);
  //   });
  // }, []);

  // const joinRoom = (e) => {
  //
  // };

  return (
    <div className="App">
      <h1>Home Page</h1>
      {/* <button onClick={joinRoom}>Join Room</button> */}
      <Chat />
    </div>
  );
};

export default App;
