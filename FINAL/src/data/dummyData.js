export const users = {
  student: {
    id: 'student123',
    email: 'student@guc.edu.eg',
    password: 'student123',
    type: 'student',
    name: 'John Student',
    major: 'Computer Science',
    semester: '6',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    interests: ['Web Development', 'Mobile Apps', 'Machine Learning'],
    completedInternshipMonths: 0,
    isProStudent: false,
    benefits: {
      applicationLimit: 3,
      hasDirectCommunication: false,
      hasWorkshopAccess: false,
      hasMentorship: false,
      applicationPriority: 'normal'
    }
  },
  proStudent: {
    id: 'prostudent123',
    email: 'prostudent@guc.edu.eg',
    password: 'pro123',
    type: 'pro-student',
    name: 'Sarah Pro',
    major: 'Computer Science',
    semester: '8',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    interests: ['Cloud Computing', 'DevOps', 'AI'],
    completedInternshipMonths: 3,
    isProStudent: true,
    benefits: {
      applicationLimit: 10,
      hasDirectCommunication: true,
      hasWorkshopAccess: true,
      hasMentorship: true,
      applicationPriority: 'high'
    }
  },
  company: {
    id: 'company123',
    email: 'company@guc.edu.eg',
    password: 'company123',
    type: 'company',
    name: 'Tech Corp',
    industry: 'Software Development'
  },
  faculty: {
    id: 'faculty123',
    email: 'faculty@guc.edu.eg',
    password: 'faculty123',
    type: 'faculty',
    name: 'Dr. Faculty',
    department: 'Computer Science'
  },
  scad: {
    id: 'scad123',
    email: 'scad@guc.edu.eg',
    password: 'scad123',
    type: 'scad',
    name: 'SCAD Admin'
  }
};

export const internships = [
  {
    id: 1,
    company: 'Tech Corp',
    position: 'Software Developer Intern',
    description: 'Join our team to work on exciting projects',
    requirements: ['JavaScript', 'React', 'Node.js'],
    duration: '3 months',
    status: 'Open',
    isProOnly: false
  },
  {
    id: 2,
    company: 'Data Systems',
    position: 'Data Science Intern',
    description: 'Work with big data and machine learning',
    requirements: ['Python', 'Machine Learning', 'SQL'],
    duration: '3 months',
    status: 'Open',
    isProOnly: false
  },
  {
    id: 3,
    company: 'Google',
    position: 'Cloud Engineering Intern',
    description: 'Work with cutting-edge cloud technologies',
    requirements: ['Cloud Computing', 'DevOps', 'AWS/GCP'],
    duration: '3 months',
    status: 'Open',
    isProOnly: true,
    proBenefits: ['Direct mentorship', 'Project ownership', 'Fast-track to full-time']
  },
  {
    id: 4,
    company: 'Microsoft',
    position: 'Advanced Software Engineering Intern',
    description: 'Work on core Microsoft products',
    requirements: ['C++', 'System Design', 'Algorithms'],
    duration: '3 months',
    status: 'Open',
    isProOnly: true,
    proBenefits: ['One-on-one mentoring', 'Team leadership opportunities', 'Priority project selection']
  }
];

export const workshops = [
  {
    id: 1,
    title: 'Basic Git Workshop',
    type: 'regular',
    date: '2024-04-01'
  },
  {
    id: 2,
    title: 'Advanced System Design',
    type: 'pro-only',
    date: '2024-04-15'
  },
  {
    id: 3,
    title: 'Cloud Architecture Masterclass',
    type: 'pro-only',
    date: '2024-04-20'
  }
];

export const applications = [
  {
    id: 1,
    studentId: 'student123',
    internshipId: 1,
    status: 'Pending',
    appliedDate: '2024-03-15',
    priority: 'normal'
  },
  {
    id: 2,
    studentId: 'prostudent123',
    internshipId: 2,
    status: 'Accepted',
    appliedDate: '2024-03-10',
    priority: 'high'
  }
];

export const reports = [
  {
    id: 1,
    studentId: 'student123',
    internshipId: 1,
    title: 'First Month Progress',
    content: 'Learned new technologies and completed assigned tasks',
    submissionDate: '2024-03-20'
  },
  {
    id: 2,
    studentId: 'prostudent123',
    internshipId: 2,
    title: 'Final Report',
    content: 'Successfully completed all project objectives',
    submissionDate: '2024-03-25'
  }
]; 