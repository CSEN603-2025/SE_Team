// FINAL/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const role = localStorage.getItem('role');

  const linksByRole = {
    student: [
      { label: 'Dashboard', path: '/student' },
      { label: 'Internships', path: '/student/internships' },
      { label: 'Applications', path: '/student/applications' },
      { label: 'Reports', path: '/student/reports' },
      { label: 'Courses', path: '/student/courses' },
    ],
    prostudent: [
      { label: 'Dashboard', path: '/prostudent' },
      { label: 'Internships', path: '/prostudent/internships' },
      { label: 'Workshops', path: '/prostudent/workshops' },
      { label: 'Assessment', path: '/prostudent/assessment' },
    ],
    company: [
      { label: 'Dashboard', path: '/company' },
      { label: 'Post Internship', path: '/company/posts' },
      { label: 'Applicants', path: '/company/applicants' },
      { label: 'Evaluations', path: '/company/evaluations' },
    ],
    faculty: [
      { label: 'Dashboard', path: '/faculty' },
      { label: 'Reports', path: '/faculty/reports' },
      { label: 'Students', path: '/faculty/students' },
    ],
    scad: [
      { label: 'Dashboard', path: '/scad' },
      { label: 'Companies', path: '/scad/companies' },
      { label: 'Students', path: '/scad/students' },
      { label: 'Reports', path: '/scad/reports' },
      { label: 'Statistics', path: '/scad/statistics' },
    ]
  };

  const navLinks = linksByRole[role] || [];

  return (
    <div className="sidebar">
      <h3>{role?.toUpperCase()} Panel</h3>
      <ul>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
