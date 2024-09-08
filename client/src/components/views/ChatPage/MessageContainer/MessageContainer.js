import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        const shouldShowImage =
          index === 0 ||
          (index > 0 &&
            messageList[index - 1].user.name !== message.user.name) ||
          message.user.name === "system";
        return (
          <Container key={message._id || index} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                {shouldShowImage && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src="/profile.png" className="profile-image" />
                )}
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
