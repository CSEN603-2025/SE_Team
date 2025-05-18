// FINAL/pages/prostudent/Assessment.jsx
import React, { useState, useEffect } from 'react';
import './Assessment.css';

export default function Assessment() {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Load assessments from localStorage
    const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    setAssessments(savedAssessments);
  }, []);

  useEffect(() => {
    let timer;
    if (currentAssessment && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentAssessment && !isSubmitted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [currentAssessment, timeLeft, isSubmitted]);

  const startAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setTimeLeft(assessment.timeLimit * 60); // Convert minutes to seconds
    setCurrentQuestion(0);
    setAnswers({});
    setIsSubmitted(false);
    setResults(null);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (!currentAssessment) return;

    // Calculate results
    const totalQuestions = currentAssessment.questions.length;
    let correctAnswers = 0;

    currentAssessment.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / totalQuestions) * 100;
    const result = {
      assessmentId: currentAssessment.id,
      assessmentTitle: currentAssessment.title,
      score,
      timeSpent: currentAssessment.timeLimit * 60 - timeLeft,
      date: new Date().toISOString(),
      answers
    };

    // Save result
    const savedResults = JSON.parse(localStorage.getItem('assessment_results') || '[]');
    savedResults.push(result);
    localStorage.setItem('assessment_results', JSON.stringify(savedResults));

    setResults(result);
    setIsSubmitted(true);

    // Update user's skill level if score is good
    if (score >= 70) {
      const skills = JSON.parse(localStorage.getItem('user_skills') || '[]');
      const updatedSkills = [...skills];
      const skillIndex = updatedSkills.findIndex(s => s.name === currentAssessment.skill);
      
      if (skillIndex >= 0) {
        updatedSkills[skillIndex].level = Math.min(5, updatedSkills[skillIndex].level + 1);
      } else {
        updatedSkills.push({
          name: currentAssessment.skill,
          level: 1,
          verifiedDate: new Date().toISOString()
        });
      }
      
      localStorage.setItem('user_skills', JSON.stringify(updatedSkills));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="assessment-container">
      {!currentAssessment ? (
        <div className="assessment-list">
          <h2>Available Assessments</h2>
          <div className="assessment-grid">
            {assessments.map(assessment => (
              <div key={assessment.id} className="assessment-card">
                <div className="assessment-header">
                  <h3>{assessment.title}</h3>
                  <span className="skill-badge">{assessment.skill}</span>
                </div>
                <p className="assessment-description">{assessment.description}</p>
                <div className="assessment-meta">
                  <span>Questions: {assessment.questions.length}</span>
                  <span>Time: {assessment.timeLimit} minutes</span>
                  <span>Level: {assessment.level}</span>
                </div>
                <button onClick={() => startAssessment(assessment)}>
                  Start Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="assessment-content">
          {!isSubmitted ? (
            <>
              <div className="assessment-header">
                <h2>{currentAssessment.title}</h2>
                <div className="timer">Time Left: {formatTime(timeLeft)}</div>
              </div>
              <div className="question-section">
                <div className="question-navigation">
                  {currentAssessment.questions.map((_, index) => (
                    <button
                      key={index}
                      className={`question-number ${currentQuestion === index ? 'active' : ''} ${
                        answers[currentAssessment.questions[index].id] ? 'answered' : ''
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="question-content">
                  <h3>Question {currentQuestion + 1}</h3>
                  <p>{currentAssessment.questions[currentQuestion].text}</p>
                  <div className="options">
                    {currentAssessment.questions[currentQuestion].options.map((option, index) => (
                      <label key={index} className="option">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          checked={answers[currentAssessment.questions[currentQuestion].id] === option}
                          onChange={() => handleAnswer(currentAssessment.questions[currentQuestion].id, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="question-controls">
                  <button
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  {currentQuestion === currentAssessment.questions.length - 1 ? (
                    <button onClick={handleSubmit}>Submit</button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestion(prev => Math.min(currentAssessment.questions.length - 1, prev + 1))}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="results-section">
              <h2>Assessment Results</h2>
              <div className="results-summary">
                <div className="score-circle">
                  <div className="score">{Math.round(results.score)}%</div>
                  <div className="score-label">Score</div>
                </div>
                <div className="results-meta">
                  <p>Time Spent: {formatTime(results.timeSpent)}</p>
                  <p>Date: {new Date(results.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="results-details">
                {currentAssessment.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`question-result ${
                      answers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'
                    }`}
                  >
                    <h4>Question {index + 1}</h4>
                    <p>{question.text}</p>
                    <div className="answer-comparison">
                      <div>Your Answer: {answers[question.id]}</div>
                      <div>Correct Answer: {question.correctAnswer}</div>
                    </div>
                    {question.explanation && (
                      <div className="explanation">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="results-actions">
                <button onClick={() => setCurrentAssessment(null)}>Back to Assessments</button>
                {results.score < 70 && (
                  <button onClick={() => startAssessment(currentAssessment)}>Retry Assessment</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
