import React from "react";
import openSocket from "socket.io-client";

import "./chat.css";

const Chat = () => {
  React.useEffect(() => {
    const socket = openSocket("http://localhost:9000");
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  const form = React.useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    fetch("http://localhost:9000/chat", { method: "POST", body: data })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <div className="chatContainer">
      <div className="messagesContainer"></div>
      <form ref={form} onSubmit={submit}>
        <input type="text" name="message" />
        <input type="submit" name="Send" />
      </form>
    </div>
  );
};

export default Chat;
