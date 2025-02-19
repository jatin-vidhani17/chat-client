import React, { useState, useEffect } from "react";

const App = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setInput("");
    }
  };

  // return (
  //   <div className="container" style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
  //     <h2>WebSocket Chat</h2>
  //     {isConnected ? <p style={{ color: "green" }}>Connected</p> : <p style={{ color: "red" }}>Disconnected</p>}
  //     <div
  //       style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px", marginBottom: "10px" }}
  //     >
  // {messages.map((msg, index) => (
  //   <div key={index}>{msg}</div>
  // ))}
  //     </div>
  //     <input
  //       type="text"
  //       value={input}
  //       onChange={(e) => setInput(e.target.value)}
  //       placeholder="Type a message..."
  //       style={{ width: "80%", padding: "8px" }}
  //     />
  //     <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px" }}>
  //       Send
  //     </button>
  //   </div>
  // );
  return (
    <main className="bg-black">
      {isConnected || <h1 className="bg-red">Disconnected</h1>}
      <div className="flex gap-2 flex-row">
        <div className="flex flex-col gap-2 w-1/2 min-h-screen">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "80%", padding: "8px" }}
          />
          <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px" }}>
            Send
          </button>
        </div>
        <div className="flex gap-2 flex-col w-1/2 h-screen">
          {messages.map((msg, index) => (
            <div key={index} className="border">
              {msg}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
