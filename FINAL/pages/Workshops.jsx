// FINAL/pages/prostudent/Workshops.jsx
import React, { useState, useEffect } from 'react';
import './Workshops.css';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Load workshops from localStorage
    const savedWorkshops = JSON.parse(localStorage.getItem('workshops') || '[]');
    setWorkshops(savedWorkshops);

    // Load notes if workshop is selected
    if (selectedWorkshop) {
      const savedNotes = localStorage.getItem(`workshop_notes_${selectedWorkshop.id}`);
      if (savedNotes) setNotes(savedNotes);
    }

    // Load chat messages if workshop is live
    if (isLive && selectedWorkshop) {
      const savedMessages = JSON.parse(localStorage.getItem(`workshop_chat_${selectedWorkshop.id}`) || '[]');
      setChatMessages(savedMessages);
    }
  }, [selectedWorkshop, isLive]);

  const handleRegister = (workshop) => {
    const updatedWorkshops = workshops.map(w => {
      if (w.id === workshop.id) {
        return { ...w, isRegistered: true };
      }
      return w;
    });
    setWorkshops(updatedWorkshops);
    localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));

    // Send notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'workshop_registration',
      message: `You have successfully registered for "${workshop.title}"`,
      date: new Date().toISOString()
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  const handleJoinWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsLive(true);
  };

  const handleSaveNotes = () => {
    if (selectedWorkshop) {
      localStorage.setItem(`workshop_notes_${selectedWorkshop.id}`, notes);
    }
  };

  const handleSubmitFeedback = () => {
    if (selectedWorkshop) {
      const updatedWorkshops = workshops.map(w => {
        if (w.id === selectedWorkshop.id) {
          return {
            ...w,
            feedback: [...(w.feedback || []), { ...feedback, date: new Date().toISOString() }]
          };
        }
        return w;
      });
      setWorkshops(updatedWorkshops);
      localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));

      // Generate certificate
      const certificate = {
        id: Date.now(),
        workshopId: selectedWorkshop.id,
        workshopTitle: selectedWorkshop.title,
        studentName: localStorage.getItem('userName'),
        date: new Date().toISOString()
      };
      const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      certificates.push(certificate);
      localStorage.setItem('certificates', JSON.stringify(certificates));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedWorkshop) return;

    const message = {
      id: Date.now(),
      sender: localStorage.getItem('userName'),
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, message]);
    localStorage.setItem(`workshop_chat_${selectedWorkshop.id}`, JSON.stringify([...chatMessages, message]));
    setNewMessage('');
  };

  return (
    <div className="workshops-container">
      {!selectedWorkshop ? (
        <>
          <h2>Available Workshops</h2>
          <div className="workshops-grid">
            {workshops.map(workshop => (
              <div key={workshop.id} className="workshop-card">
                <h3>{workshop.title}</h3>
                <p className="workshop-info">
                  <span>Date: {new Date(workshop.date).toLocaleDateString()}</span>
                  <span>Duration: {workshop.duration}</span>
                </p>
                <p className="workshop-description">{workshop.description}</p>
                <div className="workshop-speakers">
                  <h4>Speakers:</h4>
                  {workshop.speakers.map(speaker => (
                    <div key={speaker.name} className="speaker-info">
                      <img src={speaker.avatar} alt={speaker.name} />
                      <div>
                        <p className="speaker-name">{speaker.name}</p>
                        <p className="speaker-bio">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {workshop.isRegistered ? (
                  <button 
                    onClick={() => handleJoinWorkshop(workshop)}
                    className="join-button"
                  >
                    Join Workshop
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRegister(workshop)}
                    className="register-button"
                  >
                    Register
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="workshop-session">
          <div className="workshop-content">
            <h2>{selectedWorkshop.title}</h2>
            {isLive ? (
              <>
                <div className="video-container">
                  <video controls>
                    <source src={selectedWorkshop.streamUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="workshop-controls">
                  <button onClick={() => setIsLive(false)}>Leave Workshop</button>
                </div>
              </>
            ) : (
              <div className="workshop-recording">
                <video controls>
                  <source src={selectedWorkshop.recordingUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>

          <div className="workshop-sidebar">
            <div className="notes-section">
              <h3>My Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during the workshop..."
              />
              <button onClick={handleSaveNotes}>Save Notes</button>
            </div>

            {isLive && (
              <div className="chat-section">
                <h3>Live Chat</h3>
                <div className="chat-messages">
                  {chatMessages.map(message => (
                    <div key={message.id} className="chat-message">
                      <strong>{message.sender}:</strong>
                      <p>{message.content}</p>
                      <span className="timestamp">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="chat-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}

            {!isLive && (
              <div className="feedback-section">
                <h3>Workshop Feedback</h3>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                      className={`star ${star <= feedback.rating ? 'active' : ''}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about the workshop..."
                />
                <button onClick={handleSubmitFeedback}>Submit Feedback & Get Certificate</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
