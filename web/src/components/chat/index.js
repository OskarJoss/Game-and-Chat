import React, { Component } from "react";
import openSocket from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    //denna låg under fetch i lektionen, men den aktiverades aldrig annars i detta fallet

    //   fetch("http://localhost:9000/game")
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ data }));

    const socket = openSocket("http://localhost:9000");
    socket.on("message", (data) => {
      // console.log(data.json());
      console.log(data);
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const form = document.querySelector(".chatContainer form");
    const formData = new FormData(form);
    fetch("http://localhost:9000/chat", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="messagesContainer"></div>
        <form>
          <input name="message"></input>
          <button
            onClick={(e) => {
              this.sendMessage(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;
