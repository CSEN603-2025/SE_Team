// FINAL/pages/student/Courses.jsx
import React, { useState } from "react";

const allCourses = [
  { id: 1, code: "CSEN 102", name: "Data Structures" },
  { id: 2, code: "CSEN 303", name: "Web Development" },
  { id: 3, code: "CSEN 404", name: "Machine Learning" }
];

export default function Courses() {
  const [selected, setSelected] = useState([]);

  const toggleCourse = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2>Select Courses that Helped</h2>
      {allCourses.map(c => (
        <div key={c.id}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => toggleCourse(c.id)}
            />
            {c.code} - {c.name}
          </label>
        </div>
      ))}
      <button onClick={() => alert("Courses saved (not actually saved)")}>
        Save
      </button>
    </div>
  );
}
