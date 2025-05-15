import React, { useState } from 'react';
import './WorkshopChat.css';

const WorkshopChat = ({ messages = [], onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend && onSend(message);  // safe call in case onSend is undefined
      setMessage('');
    }
  };

  return (
    <div className="workshop-chat">
      <h3>Workshop Chat</h3>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isMe ? 'me' : 'other'}`}>
              <div className="sender">{msg.sender}</div>
              <div className="content">{msg.content}</div>
              <div className="time">{msg.time}</div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet. Say hello!</p>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default WorkshopChat;
