import React from "react";

import "./chat.css";

const Chat = (props) => {
  React.useEffect(() => {
    props.socket.on("chat", (data) => {
      if (data.action === "incoming message") {
        appendMessage(data.message);
      }
    });
  }, [props]);

  const input = React.useRef(null);
  const messagesContainer = React.useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(props.socket.username);
    props.socket.emit("chat", {
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
