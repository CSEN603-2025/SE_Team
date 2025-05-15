// WorkshopLive.jsx
import React, { useState } from 'react';
import './WorkshopLive.css';

const WorkshopLive = ({ workshop }) => {
  const safeWorkshop = workshop || { title: 'Untitled Workshop' };

  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleJoin = () => {
    setIsConnected(true);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="workshop-live">
      <h2>{safeWorkshop.title}</h2>
      {!isConnected ? (
        <div className="join-workshop">
          <p>This workshop is currently live. Join now to participate!</p>
          <button onClick={handleJoin}>Join Workshop</button>
        </div>
      ) : (
        <div className="workshop-container">
          <div className="video-container">
            <div className="presenter-video">
              <div className="video-placeholder">
                <span>Presenter's Video Stream</span>
              </div>
            </div>
            <div className="user-video">
              <div className="video-placeholder">
                <span>{isVideoOn ? 'Your Video' : 'Video Off'}</span>
              </div>
            </div>
          </div>
          <div className="workshop-controls">
            <button onClick={toggleVideo}>
              {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button>Share Screen</button>
            <button className="leave-button">Leave Workshop</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopLive;
