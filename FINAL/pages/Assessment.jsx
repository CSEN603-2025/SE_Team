// FINAL/pages/prostudent/Assessment.jsx
import React, { useState } from "react";

export default function Assessment() {
  const [score, setScore] = useState(null);
  const [taken, setTaken] = useState(false);

  const handleSubmit = () => {
    setScore(Math.floor(Math.random() * 100));
    setTaken(true);
  };

  return (
    <div>
      <h2>Online Assessment</h2>
      {taken ? (
        <div>
          <p>Your score: <strong>{score}</strong> / 100</p>
          <button onClick={() => alert("Score posted to profile (dummy)")}>
            Post to Profile
          </button>
        </div>
      ) : (
        <div>
          <p>This test will evaluate your tech knowledge.</p>
          <button onClick={handleSubmit}>Start Assessment</button>
        </div>
      )}
    </div>
  );
}
