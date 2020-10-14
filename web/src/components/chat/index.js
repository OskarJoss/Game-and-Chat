import React from "react";
import openSocket from "socket.io-client";

import "./chat.css";

const Chat = () => {
  React.useEffect(() => {
    const socket = openSocket("http://localhost:9000");
    socket.on("message", (data) => {
      if (data.action === "created") {
        appendMessage(data.message);
      }
    });
  }, []);

  const form = React.useRef(null);
  const messagesContainer = React.useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    //backend is not sending a response right now
    fetch("http://localhost:9000/chat", { method: "POST", body: data })
      .then((res) => res.json())
      .then((json) => {});

    form.current.querySelector("input").value = "";
  };

  const appendMessage = (message) => {
    const p = document.createElement("p");
    p.textContent = message;
    messagesContainer.current.appendChild(p);
  };

  return (
    <div className="chatContainer">
      <div ref={messagesContainer} className="messagesContainer"></div>
      <form ref={form} onSubmit={submitForm}>
        <input type="text" name="message" />
        <input type="submit" name="Send" />
      </form>
    </div>
  );
};

export default Chat;
