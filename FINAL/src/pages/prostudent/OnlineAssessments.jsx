import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialAssessments = [
  { id: 1, title: 'React Basics', status: 'Completed', score: 85 },
  { id: 2, title: 'Python Fundamentals', status: 'Not Started', score: null },
  { id: 3, title: 'Data Structures', status: 'In Progress', score: null }
];

const dummyQuestions = [
  { q: 'What is JSX?', a: ['A JavaScript extension', 'A CSS framework', 'A database', 'A testing tool'], correct: 0 },
  { q: 'Which hook is used for state?', a: ['useState', 'useEffect', 'useRef', 'useContext'], correct: 0 }
];

export default function OnlineAssessments() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [modal, setModal] = useState(null); // {mode: 'take', assessment: {...}}
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const openTake = (assessment) => {
    setModal({ mode: 'take', assessment });
    setAnswers(Array(dummyQuestions.length).fill(null));
    setScore(null);
  };
  const closeModal = () => setModal(null);

  const handleAnswer = (idx, val) => {
    setAnswers(ans => ans.map((a, i) => (i === idx ? val : a)));
  };

  const handleSubmit = () => {
    // Dummy scoring
    let s = 0;
    answers.forEach((a, i) => {
      if (a === dummyQuestions[i].correct) s += 1;
    });
    const percent = Math.round((s / dummyQuestions.length) * 100);
    setScore(percent);
    setAssessments(assessments.map(a =>
      a.id === modal.assessment.id ? { ...a, status: 'Completed', score: percent } : a
    ));
  };

  const handleDelete = id => {
    setAssessments(assessments.filter(a => a.id !== id));
  };

  return (
    <DashboardLayout title="Online Assessments">
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Online Assessments</h2>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No assessments yet.</td></tr>
            ) : assessments.map(a => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.status}</td>
                <td>{a.score !== null ? a.score + '%' : '-'}</td>
                <td>
                  {a.status !== 'Completed' && (
                    <button className="action-button" onClick={() => openTake(a)}>Take</button>
                  )}
                  <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Take Assessment: {modal.assessment.title}</h3>
              {score === null ? (
                <>
                  {dummyQuestions.map((q, idx) => (
                    <div key={idx} style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 600 }}>{q.q}</div>
                      {q.a.map((ans, i) => (
                        <label key={i} style={{ display: 'block', marginLeft: 12 }}>
                          <input
                            type="radio"
                            name={`q${idx}`}
                            checked={answers[idx] === i}
                            onChange={() => handleAnswer(idx, i)}
                          />{' '}{ans}
                        </label>
                      ))}
                    </div>
                  ))}
                  <button className="action-button" onClick={handleSubmit}>Submit</button>
                  <button className="action-button" style={{ background: '#eee', color: '#333', marginLeft: 8 }} onClick={closeModal}>Cancel</button>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h4>Your Score: {score}%</h4>
                  <button className="action-button" onClick={closeModal}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 