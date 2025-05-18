import React from 'react';

const Courses = () => {
  const dummyCourses = [
    { id: 1, code: 'CSEN401', name: 'Computer Programming Lab', credits: 2 },
    { id: 2, code: 'CSEN402', name: 'Computer Programming', credits: 3 },
    { id: 3, code: 'CSEN403', name: 'Digital Design', credits: 3 }
  ];

  return (
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">My Courses</div>
      </div>
      
      <div className="window-body">
        <div className="courses-list">
          {dummyCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p><strong>Course Code:</strong> {course.code}</p>
              <p><strong>Credits:</strong> {course.credits}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 