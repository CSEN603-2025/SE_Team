// src/components/CoursesList.jsx

import React from 'react';
import courses from '../data/courses.json';

export default function CoursesList() {
  return (
    <div style={{ padding: 20, marginTop: 40 }}>
      <h1>Courses in My Major</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            {['#','Code','Name'].map(col => (
              <th
                key={col}
                style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{course.id}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{course.code}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{course.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
