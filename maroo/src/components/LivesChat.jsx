import React, { useState, useEffect } from 'react';
import './LivesChat.css';

export default function LivesChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  // Notification when a new message is added
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (Notification.permission === "granted") {
        new Notification("New Message", { body: lastMessage });
      }
    }
  }, [messages]);

  // Request permission for notifications once
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="liveschat-container">
      <h3>Live Workshop Chat</h3>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <p key={idx}><strong>Attendee:</strong> {msg}</p>
        ))}
      </div>
      <div className="chat-controls">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
