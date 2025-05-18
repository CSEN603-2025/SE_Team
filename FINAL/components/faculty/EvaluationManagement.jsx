import React, { useState, useEffect } from 'react';
import './EvaluationManagement.css';

const EvaluationManagement = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    major: 'all',
    status: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    // Load evaluations from localStorage
    const loadEvaluations = () => {
      try {
        const storedEvaluations = JSON.parse(localStorage.getItem('evaluations')) || [];
        setEvaluations(storedEvaluations);
      } catch (error) {
        console.error('Error loading evaluations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvaluations();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEvaluationUpdate = (evaluationId, updates) => {
    const updatedEvaluations = evaluations.map(evaluation => {
      if (evaluation.id === evaluationId) {
        return {
          ...evaluation,
          ...updates,
          lastModified: new Date().toISOString()
        };
      }
      return evaluation;
    });
    
    setEvaluations(updatedEvaluations);
    localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = 
      evaluation.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
      evaluation.studentId.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMajor = filters.major === 'all' || evaluation.major === filters.major;
    const matchesStatus = filters.status === 'all' || evaluation.status === filters.status;
    
    return matchesSearch && matchesMajor && matchesStatus;
  });

  const majors = [...new Set(evaluations.map(evaluation => evaluation.major))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="evaluation-management">
      <h2>Evaluation Management</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />

        <select
          value={filters.major}
          onChange={(e) => handleFilterChange('major', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Majors</option>
          {majors.map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </select>
      </div>

      <div className="evaluations-grid">
        {filteredEvaluations.map(evaluation => (
          <div 
            key={evaluation.id} 
            className="evaluation-card"
            onClick={() => setSelectedEvaluation(evaluation)}
          >
            <div className="evaluation-header">
              <h3>{evaluation.studentName}</h3>
              <span className={`status ${evaluation.status}`}>
                {evaluation.status}
              </span>
            </div>

            <div className="evaluation-details">
              <p><strong>Student ID:</strong> {evaluation.studentId}</p>
              <p><strong>Major:</strong> {evaluation.major}</p>
              <p><strong>Company:</strong> {evaluation.company}</p>
              <p><strong>Last Modified:</strong> {new Date(evaluation.lastModified).toLocaleDateString()}</p>
            </div>

            <div className="evaluation-summary">
              <div className="score-item">
                <span>Technical Skills</span>
                <span className="score">{evaluation.scores?.technical || 'N/A'}</span>
              </div>
              <div className="score-item">
                <span>Soft Skills</span>
                <span className="score">{evaluation.scores?.soft || 'N/A'}</span>
              </div>
              <div className="score-item">
                <span>Overall</span>
                <span className="score">{evaluation.scores?.overall || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvaluation && (
        <div className="evaluation-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedEvaluation(null)}>×</button>
            
            <h2>Evaluation Details</h2>
            <div className="evaluation-info">
              <div className="info-section">
                <h3>Student Information</h3>
                <p><strong>Name:</strong> {selectedEvaluation.studentName}</p>
                <p><strong>ID:</strong> {selectedEvaluation.studentId}</p>
                <p><strong>Major:</strong> {selectedEvaluation.major}</p>
              </div>

              <div className="info-section">
                <h3>Internship Details</h3>
                <p><strong>Company:</strong> {selectedEvaluation.company}</p>
                <p><strong>Position:</strong> {selectedEvaluation.position}</p>
                <p><strong>Duration:</strong> {selectedEvaluation.duration}</p>
              </div>

              <div className="info-section">
                <h3>Evaluation Scores</h3>
                <div className="score-grid">
                  <div className="score-category">
                    <h4>Technical Skills</h4>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={selectedEvaluation.scores?.technical || ''}
                      onChange={(e) => handleEvaluationUpdate(selectedEvaluation.id, {
                        scores: {
                          ...selectedEvaluation.scores,
                          technical: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>

                  <div className="score-category">
                    <h4>Soft Skills</h4>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={selectedEvaluation.scores?.soft || ''}
                      onChange={(e) => handleEvaluationUpdate(selectedEvaluation.id, {
                        scores: {
                          ...selectedEvaluation.scores,
                          soft: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>

                  <div className="score-category">
                    <h4>Overall Performance</h4>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={selectedEvaluation.scores?.overall || ''}
                      onChange={(e) => handleEvaluationUpdate(selectedEvaluation.id, {
                        scores: {
                          ...selectedEvaluation.scores,
                          overall: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Comments</h3>
                <textarea
                  value={selectedEvaluation.comments || ''}
                  onChange={(e) => handleEvaluationUpdate(selectedEvaluation.id, {
                    comments: e.target.value
                  })}
                  placeholder="Add evaluation comments..."
                  className="comments-input"
                />
              </div>

              <div className="info-section">
                <h3>Status</h3>
                <select
                  value={selectedEvaluation.status}
                  onChange={(e) => handleEvaluationUpdate(selectedEvaluation.id, {
                    status: e.target.value
                  })}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationManagement; 