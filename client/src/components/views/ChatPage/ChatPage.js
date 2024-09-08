import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatPage.module.css";
import socket from "../../../server";
import InputField from "./InputField/InputField";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const isNameAskedRef = useRef(false);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
    })
    if (!isNameAskedRef.current) {
      askUserName();
      isNameAskedRef.current = true;
    }
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
  };
  return (
    <div className={styles.chat}>
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
