import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatPage.module.css";
import socket from "../../../server";
import InputField from "./InputField/InputField";
import MessageContainer from "./MessageContainer/MessageContainer";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessageList((prevState)=> prevState.concat(message));
    })
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt("이름 입력");
    console.log(userName);
    socket.emit("login", userName, (res) => {
      console.log(res);
      if (res?.ok) {
          setUser(res.data)
      }
    });
  };
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });
    setMessage(""); // 메시지 전송 후 입력 필드 초기화
  };
  return (
    <div className={styles.chat}>
      <MessageContainer messageList={messageList} user={user} />
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
