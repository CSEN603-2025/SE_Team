import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoCall.css';

export default function VideoCall() {
  const { appointmentId } = useParams();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // In a real implementation, this would connect to a WebRTC service
    const appointment = JSON.parse(localStorage.getItem('appointments') || '[]')
      .find(app => app.id === appointmentId);
    
    if (appointment) {
      setParticipants([
        { id: 'user', name: localStorage.getItem('userName'), isOnline: true },
        { id: 'scad', name: appointment.scadOfficer, isOnline: true }
      ]);
      setIsConnected(true);
    }

    // Cleanup function
    return () => {
      // Notify other participants that user has left
      const notification = {
        type: 'notification',
        message: `${localStorage.getItem('userName')} has left the call`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, notification]);
      localStorage.setItem('callNotifications', JSON.stringify([...messages, notification]));
    };
  }, [appointmentId]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      type: 'message',
      sender: localStorage.getItem('userName'),
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const endCall = () => {
    // Notify participants and close connection
    const notification = {
      type: 'notification',
      message: `${localStorage.getItem('userName')} has ended the call`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, notification]);
    localStorage.setItem('callNotifications', JSON.stringify([...messages, notification]));
    window.history.back();
  };

  return (
    <div className="video-call-container">
      <div className="video-grid">
        <div className="video-participant main-video">
          {isVideoEnabled ? (
            <video autoPlay muted={isMuted} />
          ) : (
            <div className="video-placeholder">
              <span>Camera Off</span>
            </div>
          )}
          <div className="participant-name">You</div>
        </div>
        {participants.map(participant => (
          participant.id !== 'user' && (
            <div key={participant.id} className="video-participant">
              <video autoPlay />
              <div className="participant-info">
                <span className="participant-name">{participant.name}</span>
                <span className={`status-indicator ${participant.isOnline ? 'online' : 'offline'}`} />
              </div>
            </div>
          )
        ))}
        {isScreenSharing && (
          <div className="screen-share">
            <div className="screen-content">Screen Share Content</div>
          </div>
        )}
      </div>

      <div className="call-controls">
        <button 
          className={`control-button ${isMuted ? 'active' : ''}`}
          onClick={toggleMute}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        <button 
          className={`control-button ${!isVideoEnabled ? 'active' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoEnabled ? '📹' : '🚫'}
        </button>
        <button 
          className={`control-button ${isScreenSharing ? 'active' : ''}`}
          onClick={toggleScreenShare}
        >
          {isScreenSharing ? '🖥️' : '💻'}
        </button>
        <button 
          className="control-button end-call"
          onClick={endCall}
        >
          📞
        </button>
      </div>

      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.type === 'message' ? (
                <>
                  <strong>{message.sender}:</strong> {message.content}
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </>
              ) : (
                <div className="notification">
                  {message.message}
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
} 