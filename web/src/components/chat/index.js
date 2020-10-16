import React from "react";
import { socket } from "../../service/socket";

import "./chat.css";

const Chat = () => {
  React.useEffect(() => {
    socket.on("chat", (data) => {
      if (data.action === "incoming message") {
        appendMessage(data.message);
      }
    });
  }, []);

  const input = React.useRef(null);
  const messagesContainer = React.useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      action: "send message",
      message: input.current.value,
    });
    input.current.value = "";
  };

  const appendMessage = (message) => {
    const p = document.createElement("p");
    p.textContent = message;
    messagesContainer.current.appendChild(p);
    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  };

  return (
    <div className="chatContainer">
      <div ref={messagesContainer} className="messagesContainer"></div>
      <form onSubmit={sendMessage}>
        <input ref={input} type="text" name="message" />
        <input type="submit" name="Send" />
      </form>
    </div>
  );
};

export default Chat;
