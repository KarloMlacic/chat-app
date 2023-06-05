import React from "react";

const Messages = ({ messages, currentMember }) => {
  const renderMessage = (message, index) => {
    const { member } = message;
    if (!member) {
      console.error("Invalid message: no member object", message);
      return null;
    }
    const messageFromMe = member.id === currentMember.id;

    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li key={index} className={className}>
      
      <div className="Message-content">
        <div className="user-timestamp-wrapper">
          <span className="username" >{message.member.clientData.username}</span>
          <span className="timestamp">{message.timestamp}</span>
        </div>
        <span className="text">{message.data}</span>
      </div>
    </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m, i) => renderMessage(m, i))}
    </ul>
  );
};

export default Messages;