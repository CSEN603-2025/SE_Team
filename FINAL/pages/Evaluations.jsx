// FINAL/pages/company/Evaluations.jsx
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaClipboardCheck, FaEye, FaCheck, FaFlag, FaComments } from 'react-icons/fa';
import '../src/styles/Internships.css';

const sampleEvaluations = [
  {
    id: 1,
    title: 'Midterm Evaluation',
    dueDate: '2024-06-01',
    evaluator: 'Jane Doe',
    status: 'pending',
    criteria: [
      { name: 'Technical Skills', description: 'Ability to solve technical problems', score: 4 },
      { name: 'Teamwork', description: 'Works well with others', score: 5 }
    ],
    feedback: 'Good progress so far.',
    feedbackDate: '2024-05-20'
  },
  {
    id: 2,
    title: 'Final Evaluation',
    dueDate: '2024-07-01',
    evaluator: 'Mark Lee',
    status: 'reviewed',
    criteria: [
      { name: 'Communication', description: 'Clear and effective communication', score: 5 },
      { name: 'Punctuality', description: 'On time and reliable', score: 5 }
    ],
    feedback: 'Excellent performance.',
    feedbackDate: '2024-06-28'
  }
];

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [response, setResponse] = useState('');
  const [selfAssessment, setSelfAssessment] = useState({
    strengths: '',
    improvements: '',
    goals: ''
  });
  const [modal, setModal] = useState(null); // {mode: 'view'|'comment', evaluation: {...}}
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Load or initialize evaluations
    let savedEvaluations = JSON.parse(localStorage.getItem('evaluations') || '[]');
    if (!savedEvaluations.length) {
      savedEvaluations = sampleEvaluations;
      localStorage.setItem('evaluations', JSON.stringify(savedEvaluations));
    }
    setEvaluations(savedEvaluations);
    if (selectedEvaluation) {
      const savedAssessment = localStorage.getItem(`assessment_${selectedEvaluation.id}`);
      if (savedAssessment) setSelfAssessment(JSON.parse(savedAssessment));
    }
  }, [selectedEvaluation]);

  const handleSubmitResponse = () => {
    if (selectedEvaluation && response.trim()) {
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === selectedEvaluation.id) {
          return {
            ...evaluation,
            studentResponse: response,
            status: 'responded',
            responseDate: new Date().toISOString()
          };
        }
        return evaluation;
      });
      setEvaluations(updatedEvaluations);
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
      setResponse('');
    }
  };

  const handleSaveSelfAssessment = () => {
    if (selectedEvaluation) {
      localStorage.setItem(
        `assessment_${selectedEvaluation.id}`,
        JSON.stringify(selfAssessment)
      );
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === selectedEvaluation.id) {
          return {
            ...evaluation,
            selfAssessmentCompleted: true,
            selfAssessmentDate: new Date().toISOString()
          };
        }
        return evaluation;
      });
      setEvaluations(updatedEvaluations);
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA000';
      case 'responded': return '#4CAF50';
      case 'reviewed': return '#1976D2';
      default: return '#757575';
    }
  };

  const handleAccept = (id) => {
    alert('Report accepted!');
  };
  const handleFlag = (id) => {
    alert('Report flagged!');
  };
  const handleComment = (id) => {
    setModal({ mode: 'comment', evaluation: evaluations.find(e => e.id === id) });
  };
  const handleSubmitComment = () => {
    alert('Comment submitted: ' + comment);
    setComment('');
    setModal(null);
  };

  return (
    <DashboardLayout title="Performance Evaluations">
      <div className="evaluations-container">
        <div className="evaluations-list">
          <h2>Performance Evaluations</h2>
          {evaluations.map(evaluation => (
            <div
              key={evaluation.id}
              className={`evaluation-card ${selectedEvaluation?.id === evaluation.id ? 'selected' : ''}`}
              onClick={() => setSelectedEvaluation(evaluation)}
              style={{ cursor: 'pointer' }}
            >
              <div className="evaluation-header">
                <h3>{evaluation.title}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(evaluation.status) }}
                >
                  {evaluation.status}
                </span>
              </div>
              <p className="evaluation-date">
                Due: {new Date(evaluation.dueDate).toLocaleDateString()}
              </p>
              <p className="evaluator">By: {evaluation.evaluator}</p>
            </div>
          ))}
        </div>

        {selectedEvaluation && (
          <div className="evaluation-details">
            <h2>{selectedEvaluation.title}</h2>
            <div className="evaluation-section">
              <h3>Evaluation Criteria</h3>
              <div className="criteria-grid">
                {selectedEvaluation.criteria.map(criterion => (
                  <div key={criterion.name} className="criterion-card">
                    <h4>{criterion.name}</h4>
                    <p>{criterion.description}</p>
                    <div className="rating">
                      Score: {criterion.score}/5
                      <div className="rating-bar">
                        <div
                          className="rating-fill"
                          style={{ width: `${(criterion.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="evaluation-section">
              <h3>Evaluator Feedback</h3>
              <div className="feedback-content">
                <p>{selectedEvaluation.feedback}</p>
                <div className="feedback-meta">
                  <span>Provided by: {selectedEvaluation.evaluator}</span>
                  <span>Date: {new Date(selectedEvaluation.feedbackDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="evaluation-section">
              <h3>Self Assessment</h3>
              <div className="self-assessment-form">
                <div className="form-group">
                  <label>Key Strengths</label>
                  <textarea
                    value={selfAssessment.strengths}
                    onChange={(e) => setSelfAssessment(prev => ({
                      ...prev,
                      strengths: e.target.value
                    }))}
                    placeholder="What are your key strengths in this area?"
                  />
                </div>
                <div className="form-group">
                  <label>Areas for Improvement</label>
                  <textarea
                    value={selfAssessment.improvements}
                    onChange={(e) => setSelfAssessment(prev => ({
                      ...prev,
                      improvements: e.target.value
                    }))}
                    placeholder="What areas would you like to improve?"
                  />
                </div>
                <div className="form-group">
                  <label>Future Goals</label>
                  <textarea
                    value={selfAssessment.goals}
                    onChange={(e) => setSelfAssessment(prev => ({
                      ...prev,
                      goals: e.target.value
                    }))}
                    placeholder="What are your goals for the next period?"
                  />
                </div>
                <button onClick={handleSaveSelfAssessment} className="submit-btn">Save Self Assessment</button>
              </div>
            </div>

            {selectedEvaluation.status === 'pending' && (
              <div className="evaluation-section">
                <h3>Your Response</h3>
                <div className="response-form">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Add your response to this evaluation..."
                  />
                  <button onClick={handleSubmitResponse} className="submit-btn">Submit Response</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Review Reports</h2>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Report</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(e => (
              <tr key={e.id}>
                <td>{e.student}</td>
                <td>{e.report}</td>
                <td>{e.status}</td>
                <td>{e.feedback}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className="action-button" title="View" onClick={() => setModal({ mode: 'view', evaluation: e })}><FaEye /></button>
                  <button className="action-button" title="Accept" onClick={() => handleAccept(e.id)}><FaCheck /></button>
                  <button className="action-button" title="Flag" style={{ background: '#eee', color: '#333' }} onClick={() => handleFlag(e.id)}><FaFlag /></button>
                  <button className="action-button" title="Comment" onClick={() => handleComment(e.id)}><FaComments /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && modal.mode === 'view' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.evaluation.report}</h3>
              <div style={{ marginBottom: 12 }}><b>Student:</b> {modal.evaluation.student}</div>
              <div style={{ marginBottom: 12 }}><b>Status:</b> {modal.evaluation.status}</div>
              <div style={{ marginBottom: 12 }}><b>Feedback:</b> {modal.evaluation.feedback}</div>
              <button className="action-button" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        )}
        {modal && modal.mode === 'comment' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Submit Comment for {modal.evaluation.student}</h3>
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter your comment..." className="modern-input" style={{ minHeight: 80, width: '100%' }} />
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleSubmitComment}>Submit</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => setModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
