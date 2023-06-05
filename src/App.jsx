import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Messages from "./Components/Messages";
import Input from "./Components/Input";
import { randomName, randomColor } from "./Components/Names";

const scaledroneChannelID = process.env.REACT_APP_SCALEDROne_CHANNEL_ID;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const newDrone = new window.Scaledrone(scaledroneChannelID, {
      data: member,
    });

    let currentRoom;
    if (drone) {
      currentRoom = drone.subscribe("observable-room");
      currentRoom.unsubscribe();
    }

    newDrone.on("open", (error) => {
      if (error) {
        console.error(error);
      } else {
        const updatedMember = { ...member };
        updatedMember.id = newDrone.clientId;
        setMember(updatedMember);
      }
    });

    const room = newDrone.subscribe("observable-room");

    room.on("message", (message) => {
      const newMessage = {
        member: message.member,
        data: message.data,
        timestamp: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages((messages) => [...messages, newMessage]);
      scrollToBottom();
    });

    setDrone(newDrone);

    return () => {
      room.unsubscribe();
      newDrone.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = (message) => {
    if (message.trim() !== "") {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chat App</h1>
      </div>
      <div className="Messages-list" ref={messageListRef}>
        <Messages messages={messages} currentMember={member} />
      </div>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;
