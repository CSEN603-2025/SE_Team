// FINAL/pages/company/Evaluations.jsx
import React, { useState } from "react";

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [form, setForm] = useState({ student: "", feedback: "" });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvaluations(prev => [...prev, form]);
    setForm({ student: "", feedback: "" });
  };

  return (
    <div>
      <h2>Submit Evaluation</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="student"
          placeholder="Student Name"
          value={form.student}
          onChange={handleChange}
          required
        />
        <textarea
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Evaluations</h3>
      <ul>
        {evaluations.map((ev, i) => (
          <li key={i}>
            <strong>{ev.student}</strong>: {ev.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}
