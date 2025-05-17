// redo/src/data.jsx

// Example users (for login, if you want to centralize)
export const USERS = [
  { email: "student@guc.com", password: "pass", role: "student" },
  { email: "prostudent@guc.com", password: "pass", role: "prostudent" },
  { email: "company@guc.com", password: "pass", role: "company" },
  { email: "faculty@guc.com", password: "pass", role: "faculty" },
  { email: "scad@guc.com", password: "pass", role: "scad" }
];

// Example courses
export const COURSE_STATUS = {
  ENROLLED: 'Enrolled',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped'
};

export const COURSES = [
  { id: 1, name: "Software Engineering", instructor: "Dr. Smith", status: COURSE_STATUS.ENROLLED },
  { id: 2, name: "Data Structures", instructor: "Prof. Lee", status: COURSE_STATUS.COMPLETED }
];

// Example workshops
export const WORKSHOPS = [
  { id: 1, title: "React Basics", date: "2024-06-01", registered: true },
  { id: 2, title: "Advanced Node.js", date: "2024-06-10", registered: false }
];

// Example internships
export const INTERNSHIPS = [
  { id: 1, company: "Google", position: "SWE Intern", status: "Applied" },
  { id: 2, company: "Microsoft", position: "Cloud Intern", status: "Interview" }
];

// Add more dummy data as needed! 