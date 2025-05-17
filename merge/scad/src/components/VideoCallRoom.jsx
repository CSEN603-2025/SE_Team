import React, { useRef, useState } from 'react';
import './VideoCallRoom.css';

export default function VideoCallRoom({ onLeave, remoteUser = 'Other User' }) {
  const [inCall, setInCall] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [notification, setNotification] = useState(null);
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Start local video/audio on mount
  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(localStream => {
        setStream(localStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line
  }, []);

  // Toggle video
  const handleToggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
    }
    setVideoEnabled(v => !v);
    setNotification(videoEnabled ? 'Video disabled' : 'Video enabled');
    setTimeout(() => setNotification(null), 1200);
  };

  // Toggle audio
  const handleToggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
    }
    setAudioEnabled(a => !a);
    setNotification(audioEnabled ? 'Microphone muted' : 'Microphone unmuted');
    setTimeout(() => setNotification(null), 1200);
  };

  // Simulate screen sharing
  const handleShareScreen = async () => {
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        setScreenSharing(true);
        setNotification('You are sharing your screen');
        screenStream.getVideoTracks()[0].onended = () => {
          if (stream && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          setScreenSharing(false);
          setNotification('Screen sharing stopped');
          setTimeout(() => setNotification(null), 2000);
        };
      } catch (e) {
        setNotification('Screen sharing cancelled');
        setTimeout(() => setNotification(null), 2000);
      }
    }
  };

  // Leave call
  const handleLeave = () => {
    setInCall(false);
    setNotification('You left the call');
    setTimeout(() => {
      setNotification(null);
      if (onLeave) onLeave();
    }, 1500);
  };

  // Simulate remote user leaving
  const handleRemoteLeave = () => {
    setNotification(`${remoteUser} left the call`);
    setTimeout(() => setNotification(null), 2000);
  };

  if (!inCall) return null;

  return (
    <div className="video-call-room-card">
      <h2>Video Call Room</h2>
      <div className="helper-text">Start a video call for career guidance or report clarifications. Use the controls below to manage your call.</div>
      <div className="video-section">
        <div className="video-container">
          <video ref={localVideoRef} autoPlay muted playsInline className="video-feed" aria-label="Your video" />
          <div className="video-label">You</div>
          <div className="video-status">
            <span className={`status-badge ${videoEnabled ? 'on' : 'off'}`}>{videoEnabled ? 'Video On' : 'Video Off'}</span>
            <span className={`status-badge ${audioEnabled ? 'on' : 'off'}`}>{audioEnabled ? 'Mic On' : 'Mic Off'}</span>
            {screenSharing && <span className="status-badge sharing">Screen Sharing</span>}
          </div>
        </div>
        <div className="video-container">
          {/* Simulated remote video: can use a placeholder or duplicate local video */}
          <div className="remote-video-placeholder" aria-label="Remote user video">
            <span role="img" aria-label="Remote user">👤</span>
            <div className="remote-label">{remoteUser} (Simulated)</div>
          </div>
          <div className="video-label">{remoteUser}</div>
        </div>
      </div>
      <div className="call-controls" role="group" aria-label="Call controls">
        <button className="control-btn" onClick={handleToggleVideo} aria-label={videoEnabled ? 'Disable video' : 'Enable video'}>
          {videoEnabled ? 'Disable Video' : 'Enable Video'}
        </button>
        <button className="control-btn" onClick={handleToggleAudio} aria-label={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}>
          {audioEnabled ? 'Mute Mic' : 'Unmute Mic'}
        </button>
        <button className="control-btn" onClick={handleShareScreen} disabled={screenSharing} aria-label="Share screen">
          Share Screen
        </button>
        <button className="control-btn leave-btn" onClick={handleLeave} aria-label="Leave call">
          Leave Call
        </button>
        <button className="control-btn simulate-btn" onClick={handleRemoteLeave} aria-label="Simulate remote user leaving">
          Simulate Other Leaving
        </button>
      </div>
      {notification && <div className="notification" role="status">{notification}</div>}
    </div>
  );
} 