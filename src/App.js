import React, { useState, useEffect } from "react";
import "./App.scss";
import Messages from "./Components/Messages";
import Input from "./Components/Input";
                                       
const scaledroneChannelID = process.env.REACT_APP_SCALEDROne_CHANNEL_ID;
function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16); 
}


const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);

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
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = newDrone.clientId;
      setMember(updatedMember);
    });

    const room = newDrone.subscribe("observable-room");

    room.on("data", (data, member) => {
      setMessages((messages) => [...messages, { member, text: data }]);
    });

    setDrone(newDrone);

    return () => {
      room.unsubscribe();
      newDrone.close();
    };
  }, []);

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
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;