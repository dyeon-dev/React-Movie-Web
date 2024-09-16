import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatPage.module.css";
import socket from "../../../server";
import InputField from "./InputField/InputField";
import MessageContainer from "./MessageContainer/MessageContainer";
import Auth from "../../../hoc/auth";
import { useSelector } from "react-redux";
import bg from "../LandingPage/LandingPage.module.css";
import { io } from "socket.io-client";

function ChatPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const isNameAskedRef = useRef(false); // strict mode이슈로 인한 참조변수 사용
  const userD = useSelector((state) => state.user);

  const socketRef = useRef();

  useEffect(() => {
     // 소켓 초기화
     socketRef.current = io(process.env.REACT_APP_API_URL); // 서버 URL 사용

    // Redux 상태의 생명주기와 소켓 연결 시점의 차이로 useEffect 조건부 실행
    if (userD.userData && !isNameAskedRef.current) {
      const userName = userD.userData.name;
      console.log("Emitting login event with userName:", userName);
      socketRef.current.emit("login", userName, (res) => {
        console.log("Login response:", res);
        if (res?.ok) {
          setUser(res.data);
        }
      });
      isNameAskedRef.current = true; // 한번 렌더링 되면 더이상 안되게끔
    }

    const handleMessage = (message) => {
      console.log(message);
      setMessageList((prevState) => [...prevState, message]);
    };

    // 메시지 수신 처리
    socketRef.current.on("message", handleMessage);

    // 클린업 함수
    return () => {
      // socket.off("message", handleMessage);
      socketRef.current.disconnect(); // 소켓 연결 해제
    };
  }, [userD.userData]);

  const sendMessage = (event) => {
    event.preventDefault();
    socketRef.current.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });
    setMessage(""); // 메시지 전송 후 입력 필드 초기화
  };
  return (
    <div className={`${bg.body} text-white`}>
      <h1 className="text-center text-3xl font-bold py-4">실시간 토크 💬</h1>
      <div className={`${styles.chat} py-4`}>
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Auth(ChatPage, true);
