import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { socket } from "../utils/socket";

export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { text: message, sender: user.email });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={
            `p-2 rounded-lg mb-2 ${msg.sender === user.email ? "bg-green-300 ml-auto" : "bg-gray-300"}`
          }>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-white border-t">
        <input
          className="flex-grow border rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}