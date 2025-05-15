import React, { useState, useRef } from 'react';
import './WorkshopRecording.css';

const WorkshopRecording = ({ workshop }) => {
  // Provide fallback defaults
  const safeWorkshop = workshop || {
    title: 'Untitled Workshop',
    videoUrl: ''
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div className="workshop-recording">
      <h2>{safeWorkshop.title}</h2>
      <div className="video-player">
        <div className="video-container">
          <video
            ref={videoRef}
            src={safeWorkshop.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            controls={false} // if you want custom controls only
          />
          <div className="video-controls">
            <button onClick={togglePlay}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="time">
              {formatTime(videoRef.current?.currentTime || 0)} / 
              {formatTime(videoRef.current?.duration || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default WorkshopRecording;
