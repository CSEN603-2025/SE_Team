import React, { useState, useEffect } from 'react';
import './CourseSelection.css';

const CourseSelection = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [userMajor, setUserMajor] = useState('');

  useEffect(() => {
    // Load user data and courses
    const userData = JSON.parse(localStorage.getItem('user'));
    const majorCourses = JSON.parse(localStorage.getItem('majorCourses') || '[]');
    const userSelectedCourses = JSON.parse(localStorage.getItem('selectedCourses') || '[]');

    setUserMajor(userData?.major || '');
    setAvailableCourses(majorCourses);
    setSelectedCourses(userSelectedCourses);
  }, []);

  const handleCourseSelection = (courseId) => {
    const isSelected = selectedCourses.includes(courseId);
    let updatedSelection;

    if (isSelected) {
      updatedSelection = selectedCourses.filter(id => id !== courseId);
    } else {
      updatedSelection = [...selectedCourses, courseId];
    }

    setSelectedCourses(updatedSelection);
    localStorage.setItem('selectedCourses', JSON.stringify(updatedSelection));
  };

  return (
    <div className="course-selection-container">
      <h1>Course Selection</h1>
      
      <section className="major-courses-section">
        <h2>Available Courses in {userMajor}</h2>
        <div className="courses-grid">
          {availableCourses.map(course => (
            <div 
              key={course.id} 
              className={`course-card ${selectedCourses.includes(course.id) ? 'selected' : ''}`}
              onClick={() => handleCourseSelection(course.id)}
            >
              <h3>{course.code}</h3>
              <h4>{course.name}</h4>
              <p>{course.description}</p>
              <div className="course-details">
                <span>{course.credits} Credits</span>
                <span>{course.semester}</span>
              </div>
              <div className="selection-indicator">
                {selectedCourses.includes(course.id) ? '✓ Helped with Internship' : 'Click to Select'}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="selected-courses-section">
        <h2>Courses That Helped During Internship</h2>
        {selectedCourses.length > 0 ? (
          <div className="selected-courses-list">
            {availableCourses
              .filter(course => selectedCourses.includes(course.id))
              .map(course => (
                <div key={course.id} className="selected-course-item">
                  <div className="course-info">
                    <h3>{course.code} - {course.name}</h3>
                    <p>{course.description}</p>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleCourseSelection(course.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <p className="no-data">No courses selected yet</p>
        )}
      </section>
    </div>
  );
};

export default CourseSelection; 