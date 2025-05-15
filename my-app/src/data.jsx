// 1) Initial list of companies
export const initialCompanies = [
  { id:  1, name: 'TechCorp',              contact: 'tech@innovators.com',      industry: 'Technology',    description: 'A cutting-edge R&D firm focused on AI and IoT solutions.',            status: 'Pending' },
  { id:  2, name: 'AI Nexus',               contact: 'contact@ainexus.com',       industry: 'Technology',    description: 'Provides machine learning platforms for enterprise.',                  status: 'Pending' },
  { id:  3, name: 'CodeWorks',              contact: 'hello@codeworks.com',       industry: 'Technology',    description: 'Custom software development and consulting services.',                status: 'Pending' },
  { id:  4, name: 'Green Earth Solutions',  contact: 'contact@greenearth.com',    industry: 'Environmental', description: 'Sustainable waste-management and recycling services.',                 status: 'Pending' },
  { id:  5, name: 'EcoGuard Systems',       contact: 'info@ecoguard.com',         industry: 'Environmental', description: 'Air and water quality monitoring technology.',                         status: 'Pending' },
  { id:  6, name: 'Blue Ocean Recycling',   contact: 'support@blueoceanrecycle.com', industry: 'Environmental', description: 'Ocean cleanup and plastics upcycling programs.',                       status: 'Pending' },
  { id:  7, name: 'Smart Robotics Inc.',    contact: 'info@smartrobotics.com',    industry: 'Manufacturing', description: 'Designs and manufactures autonomous industrial robots.',              status: 'Pending' },
  { id:  8, name: 'Precision Automation',   contact: 'sales@precisionauto.com',  industry: 'Manufacturing', description: 'High-precision CNC machining and automation.',                         status: 'Pending' },
  { id:  9, name: 'MetalForge Ltd.',        contact: 'contact@metalforge.com',    industry: 'Manufacturing', description: 'Custom metal fabrication and prototyping services.',                   status: 'Pending' },
  { id: 10, name: 'EduTech Hub',            contact: 'support@edutech.com',      industry: 'Education',    description: 'Creates e-learning platforms and virtual classrooms.',                  status: 'Pending' },
  { id: 11, name: 'Learnify',               contact: 'info@learnify.com',        industry: 'Education',    description: 'Adaptive learning software for K–12 students.',                        status: 'Pending' },
    { id: 12, name: 'CodeCampus',             contact: 'hello@codecampus.com',     industry: 'Education',    description: 'Bootcamp-style coding courses and certifications.',                    status: 'Pending' },
  ];

// 2) Dummy users for fake login
export const USERS = [
  { email: 'student@guc.com',    password: 'pass', role: 'Student'        },
  { email: 'prostudent@guc.com', password: 'pass', role: 'PRO Student'    },
  { email: 'scad@guc.com',       password: 'pass', role: 'SCAD Office'    },
  { email: 'faculty@guc.com',    password: 'pass', role: 'Faculty Member' },
]

// 3) Available internships
export const initialInternships = [
  {
    id: 1,
    company:      'Tech Innovators',
    title:        'Frontend Developer',
    industry:     'Technology',
    duration:     '3 months',
    paid:         true,
    salary:       '$1,200 / month',
    skills:       ['React', 'CSS', 'HTML'],
    description:  'Build and maintain dynamic UIs with React.',
  },
  {
    id: 2,
    company:      'Green Earth',
    title:        'Environmental Analyst',
    industry:     'Environmental',
    duration:     '6 months',
    paid:         false,
    salary:       'N/A',
    skills:       ['Data Analysis', 'GIS', 'Reporting'],
    description:  'Perform data-driven studies on environmental impact.',
  },
  {
    id: 3,
    company:      'Smart Robotics Inc.',
    title:        'Embedded Engineer',
    industry:     'Manufacturing',
    duration:     '4 months',
    paid:         true,
    salary:       '$1,500 / month',
    skills:       ['C/C++', 'Microcontrollers', 'RTOS'],
    description:  'Develop firmware for autonomous industrial robots.',
  },
  {
    id: 4,
    company:      'EduTech Hub',
    title:        'Instructional Designer',
    industry:     'Education',
    duration:     '2 months',
    paid:         true,
    salary:       '$900 / month',
    skills:       ['Storyboarding', 'eLearning', 'UX Writing'],
    description:  'Design and prototype e-learning modules for K–12.',
  },
  {
    id: 5,
    company:      'CodeWorks',
    title:        'Fullstack Developer',
    industry:     'Technology',
    duration:     '3 months',
    paid:         true,
    salary:       '$1,300 / month',
    skills:       ['Node.js', 'React', 'PostgreSQL'],
    description:  'Implement REST APIs and React front-ends.',
  },
  {
    id: 6,
    company:      'EcoGuard Systems',
    title:        'Data Analyst',
    industry:     'Environmental',
    duration:     '4 months',
    paid:         false,
    salary:       'N/A',
    skills:       ['Python', 'Pandas', 'Visualization'],
    description:  'Analyze air & water quality datasets.',
  },
  {
    id: 7,
    company:      'Blue Ocean Recycling',
    title:        'Sustainability Intern',
    industry:     'Environmental',
    duration:     '6 months',
    paid:         true,
    salary:       '$800 / month',
    skills:       ['Waste Management', 'Field Surveys', 'Reporting'],
    description:  'Coordinate plastic upcycling programs.',
  },
];

// 4) Documents (for PDF downloads)
export const documents = [
  { id: 1, name: 'Internship_Report_TechCorp.pdf',  url: '/docs/sample.pdf' },
  { id: 2, name: 'Evaluation_HealthPlus.pdf',      url: '/docs/sample.pdf' },
  { id: 3, name: 'Final_Report_SmartRobotics.pdf', url: '/docs/sample.pdf' },
]

// 5) Students
export const initialStudents = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@guc.com',  major: 'Computer Science',       internshipStatus: 'Pending'   },
  { id: 2, name: 'Bob Smith',      email: 'bob@guc.com',    major: 'Software Engineering',   internshipStatus: 'Accepted'  },
  { id: 3, name: 'Carol Martinez', email: 'carol@guc.com',  major: 'Information Systems',    internshipStatus: 'Rejected'  },
  { id: 4, name: 'David Lee',      email: 'david@guc.com',  major: 'Industrial Engineering', internshipStatus: 'Completed' },
  { id: 5, name: 'Fatima Hassan',  email: 'fatima@guc.com', major: 'Computer Science',       internshipStatus: 'Accepted'  },
  { id: 6, name: 'Omar Khaled',    email: 'omar@guc.com',   major: 'Mechanical Engineering', internshipStatus: 'Pending'   },
  { id: 7, name: 'Sara Kim',       email: 'sara@guc.com',   major: 'Business Informatics',   internshipStatus: 'Completed' },
];

// 6) Internship & evaluation reports
// src/data.js

export const initialReports = [
  {
    id: 1,
    student: "Alice Johnson",
    company: "TechCorp",
    major: "Computer Science",
    status: "Pending",
    title: "Alice's TechCorp Internship Report",
    pdfUrl: "/pdfs/alice-techcorp.pdf",
    fileUrl: "/reports/alice-techcorp-report.pdf",
    details: {
      supervisor: "John Smith",
      start: "2025-01-01",
      end:   "2025-03-31",
      description: "Worked on frontend features..."
    },
    clarification: ""
  },
  {
    id: 2,
    student: "Bob Smith",
    company: "HealthPlus",
    major: "Software Engineering",
    status: "Flagged",
    title: "Bob's HealthPlus Evaluation",
    pdfUrl: "/pdfs/bob-healthplus.pdf",
    fileUrl: "/reports/bob-healthplus-eval.pdf",
    details: {
      supervisor: "Mary Jones",
      start: "2025-02-15",
      end:   "2025-05-15",
      description: "Implemented data pipelines..."
    },
    clarification: ""
  },
  {
    id: 3,
    student: "Carol Martinez",
    company: "EduTech Hub",
    major: "Information Systems",
    status: "Rejected",
    title: "Carol's EduTech Hub Report",
    pdfUrl: "/pdfs/carol-edutech.pdf",
    fileUrl: "/reports/carol-edutech-report.pdf",
    details: {
      supervisor: "Dr. Ahmed Said",
      start: "2024-08-01",
      end:   "2024-09-30",
      description: "Developed e-learning modules."
    },
    clarification: "Needs more detail."
  },
  {
    id: 4,
    student: "Fatima Hassan",
    company: "CodeWorks",
    major: "Computer Science",
    status: "Accepted",
    title: "Fatima's CodeWorks Internship Report",
    pdfUrl: "/pdfs/fatima-codeworks.pdf",
    fileUrl: "/reports/fatima-codeworks-report.pdf",
    details: {
      supervisor: "Lina Mostafa",
      start: "2024-06-01",
      end:   "2024-08-31",
      description: "Built REST APIs and React apps."
    },
    clarification: ""
  },
  {
    id: 5,
    student: "Sara Kim",
    company: "Blue Ocean Recycling",
    major: "Business Informatics",
    status: "Completed",
    title: "Sara's Blue Ocean Recycling Report",
    pdfUrl: "/pdfs/sara-blueocean.pdf",
    fileUrl: "/reports/sara-blueocean-report.pdf",
    details: {
      supervisor: "Mohamed El-Sayed",
      start: "2023-07-01",
      end:   "2023-09-30",
      description: "Coordinated recycling programs."
    },
    clarification: ""
  }
];

// Documents you can "download"
export const initialDocuments = [
  {
    id:    1,
    name:  "SCAD Internship Policy",
    url:   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id:    2,
    name:  "Submission Guidelines",
    url:   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id:    3,
    name:  "Evaluation Rubric",
    url:   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];
