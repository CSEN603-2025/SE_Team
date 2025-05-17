// Internship Applications Data
export const applications = [
  {
    id: 1,
    studentId: 1,
    internshipId: 1,
    status: "Submitted",
    submissionDate: "2024-02-15",
    advisorApproval: {
      approved: true,
      comments: "Good fit for the position."
    },
    employerFeedback: null
  },
  {
    id: 2,
    studentId: 2,
    internshipId: 2,
    status: "In Review",
    submissionDate: "2024-02-16",
    advisorApproval: {
      approved: false,
      comments: "Need to complete prerequisites first."
    },
    employerFeedback: null
  },
  {
    id: 3,
    studentId: 3,
    internshipId: 3,
    status: "Approved",
    submissionDate: "2024-02-10",
    advisorApproval: {
      approved: true,
      comments: "Excellent candidate."
    },
    employerFeedback: {
      comments: "Looking forward to having you on the team."
    }
  },
  {
    id: 4,
    studentId: 4,
    internshipId: 4,
    status: "Rejected",
    submissionDate: "2024-02-12",
    advisorApproval: {
      approved: true,
      comments: "Good application."
    },
    employerFeedback: {
      comments: "Position has been filled."
    }
  }
];

// Users Data (Students)
export const users = [
  {
    id: 1,
    name: "Sarah Mostafa",
    email: "sarah.m@example.com",
    role: "student",
    major: "Computer Science",
    gpa: 3.8
  },
  {
    id: 2,
    name: "Ali Khaled",
    email: "ali.k@example.com",
    role: "student",
    major: "Engineering",
    gpa: 3.6
  },
  {
    id: 3,
    name: "Lina Ayman",
    email: "lina.a@example.com",
    role: "student",
    major: "Computer Science",
    gpa: 3.9
  },
  {
    id: 4,
    name: "Youssef Hamdy",
    email: "youssef.h@example.com",
    role: "student",
    major: "Engineering",
    gpa: 3.7
  }
];

// Available Internships Data
export const internships = [
  {
    id: 1,
    company: "Vodafone",
    position: "Software Developer Intern",
    description: "Join our dynamic development team for a summer internship.",
    requirements: ["Computer Science major", "Min GPA 3.0", "JavaScript knowledge"],
    duration: "3 months",
    paid: true,
    location: "Cairo",
    deadline: "2024-03-30"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Cloud Engineering Intern",
    description: "Work with Azure cloud services and learn from industry experts.",
    requirements: ["Engineering/CS major", "Min GPA 3.2", "Cloud interest"],
    duration: "6 months",
    paid: true,
    location: "Cairo",
    deadline: "2024-03-25"
  },
  {
    id: 3,
    company: "IBM",
    position: "Data Science Intern",
    description: "Apply ML and AI concepts to real-world problems.",
    requirements: ["CS/Statistics major", "Min GPA 3.5", "Python skills"],
    duration: "4 months",
    paid: true,
    location: "Alexandria",
    deadline: "2024-04-15"
  },
  {
    id: 4,
    company: "Orange",
    position: "Network Engineering Intern",
    description: "Learn about telecommunications and network infrastructure.",
    requirements: ["Engineering major", "Min GPA 3.0", "Networking basics"],
    duration: "3 months",
    paid: false,
    location: "Giza",
    deadline: "2024-04-01"
  }
];

// Companies Data
export const companies = [
  {
    id: 1,
    name: "Vodafone",
    industry: "Telecommunications",
    location: "Cairo",
    availablePositions: 5,
    status: "Approved"
  },
  {
    id: 2,
    name: "Microsoft",
    industry: "Technology",
    location: "Cairo",
    availablePositions: 3,
    status: "Approved"
  },
  {
    id: 3,
    name: "IBM",
    industry: "Technology",
    location: "Alexandria",
    availablePositions: 4,
    status: "Pending"
  },
  {
    id: 4,
    name: "Orange",
    industry: "Telecommunications",
    location: "Giza",
    availablePositions: 2,
    status: "Approved"
  }
];

// Application Status Types
export const statusTypes = {
  SUBMITTED: "Submitted",
  IN_REVIEW: "In Review",
  APPROVED: "Approved",
  REJECTED: "Rejected"
};

// Industries
export const industries = [
  "Technology",
  "Telecommunications",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Education"
];

// Locations
export const locations = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Port Said",
  "Suez"
]; 