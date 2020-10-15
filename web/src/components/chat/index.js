import React from "react";
// import openSocket from "socket.io-client";

import "./chat.css";

const Chat = (props) => {
  React.useEffect(() => {
    // const socket = openSocket(process.env.REACT_APP_API);
    props.socket.on("message", (data) => {
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
    //had to send http response from backend or it failed eventually
    fetch(`${process.env.REACT_APP_API}/chat`, { method: "POST", body: data })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });

    form.current.querySelector("input").value = "";
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
      <form ref={form} onSubmit={submitForm}>
        <input type="text" name="message" />
        <input type="submit" name="Send" />
      </form>
    </div>
  );
};

export default Chat;
