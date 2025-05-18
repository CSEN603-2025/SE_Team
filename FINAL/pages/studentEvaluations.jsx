// FINAL/pages/student/Evaluations.jsx
import React, { useState } from "react";

export default function Evaluations() {
  const [recommend, setRecommend] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Evaluation submitted (not saved)");
  };

  return (
    <div>
      <h2>Evaluate Your Internship</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recommend the company:
          <input
            type="checkbox"
            checked={recommend}
            onChange={() => setRecommend(!recommend)}
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
}
