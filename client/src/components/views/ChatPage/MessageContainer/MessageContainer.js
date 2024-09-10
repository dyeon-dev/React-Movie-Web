import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id || index} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message-content">
                  <div className="my-message">{message.chat}</div>
                </div>
              </div>
            ) : (
              <div className="your-message-container">
                <img src="/profile.png" className="profile-image your-profile" alt="Your profile" />
                <div className="your-message-content">
                  <div className="your-message">{message.chat}</div>
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;