export const sampleCompanies = [
  {
    id: 1,
    name: 'Tech Innovators',
    industry: 'Software Development',
    description: 'Leading software development company specializing in AI and machine learning solutions.',
    status: 'approved'
  },
  {
    id: 2,
    name: 'Global Finance Corp',
    industry: 'Finance',
    description: 'International financial services provider with focus on investment banking and asset management.',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Green Energy Solutions',
    industry: 'Renewable Energy',
    description: 'Innovative company developing sustainable energy solutions for residential and commercial use.',
    status: 'approved'
  }
];

export const sampleInternships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Tech Innovators',
    industry: 'Software Development',
    description: 'Join our development team to work on cutting-edge AI projects.',
    duration: '3 months',
    isPaid: true,
    salary: '$2000/month',
    skills: ['Python', 'Machine Learning', 'Git'],
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: 2,
    title: 'Financial Analyst Intern',
    company: 'Global Finance Corp',
    industry: 'Finance',
    description: 'Assist in financial analysis and investment research.',
    duration: '6 months',
    isPaid: true,
    salary: '$2500/month',
    skills: ['Financial Modeling', 'Excel', 'Bloomberg Terminal'],
    startDate: '2024-07-01',
    endDate: '2024-12-31'
  },
  {
    id: 3,
    title: 'Renewable Energy Research Intern',
    company: 'Green Energy Solutions',
    industry: 'Renewable Energy',
    description: 'Research and analyze renewable energy technologies and market trends.',
    duration: '4 months',
    isPaid: false,
    skills: ['Research', 'Data Analysis', 'Technical Writing'],
    startDate: '2024-06-15',
    endDate: '2024-10-15'
  }
];

export const sampleReports = [
  {
    id: 1,
    studentName: 'John Smith',
    studentId: 'ST001',
    major: 'Computer Science',
    company: 'Tech Innovators',
    supervisor: 'Sarah Johnson',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'approved',
    evaluation: {
      'Technical Skills': 4.5,
      'Communication': 4.0,
      'Problem Solving': 4.2,
      'Initiative': 4.8,
      'Teamwork': 4.3
    }
  },
  {
    id: 2,
    studentName: 'Emily Brown',
    studentId: 'ST002',
    major: 'Finance',
    company: 'Global Finance Corp',
    supervisor: 'Michael Chen',
    startDate: '2024-02-01',
    endDate: '2024-07-31',
    status: 'pending'
  },
  {
    id: 3,
    studentName: 'David Wilson',
    studentId: 'ST003',
    major: 'Environmental Engineering',
    company: 'Green Energy Solutions',
    supervisor: 'Lisa Martinez',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'flagged',
    clarification: 'Missing weekly progress reports'
  }
];

export const sampleWorkshops = [
  {
    id: 1,
    name: 'Resume Writing Masterclass',
    description: 'Learn how to create a compelling resume that stands out to employers.',
    startDate: '2024-05-15',
    endDate: '2024-05-15',
    startTime: '10:00',
    endTime: '12:00',
    speaker: {
      name: 'Jennifer Adams',
      title: 'Career Development Specialist',
      bio: '15 years of experience in career counseling and professional development.'
    },
    agenda: [
      'Resume structure and formatting',
      'Writing effective accomplishment statements',
      'Tailoring your resume for different industries',
      'Common mistakes to avoid',
      'Q&A session'
    ],
    registeredStudents: ['ST001', 'ST002']
  },
  {
    id: 2,
    name: 'Interview Skills Workshop',
    description: 'Master the art of interviewing with practical tips and mock interviews.',
    startDate: '2024-05-20',
    endDate: '2024-05-21',
    startTime: '14:00',
    endTime: '16:00',
    speaker: {
      name: 'Robert Thompson',
      title: 'HR Director',
      bio: 'Experienced HR professional with expertise in talent acquisition and development.'
    },
    agenda: [
      'Understanding different interview formats',
      'Preparing for common questions',
      'Body language and communication skills',
      'Mock interview practice',
      'Feedback session'
    ],
    registeredStudents: ['ST003']
  },
  {
    id: 3,
    name: 'Networking in the Digital Age',
    description: 'Learn effective networking strategies for building professional relationships online.',
    startDate: '2024-06-01',
    endDate: '2024-06-01',
    startTime: '15:00',
    endTime: '17:00',
    speaker: {
      name: 'Maria Garcia',
      title: 'Professional Networking Coach',
      bio: 'Digital networking expert and social media strategist.'
    },
    agenda: [
      'Building your LinkedIn profile',
      'Digital networking etiquette',
      'Using social media professionally',
      'Virtual networking events',
      'Following up and maintaining connections'
    ],
    registeredStudents: []
  }
];

export const sampleStudents = [
  {
    id: 'ST001',
    name: 'John Smith',
    major: 'Computer Science',
    internshipStatus: 'active'
  },
  {
    id: 'ST002',
    name: 'Emily Brown',
    major: 'Finance',
    internshipStatus: 'pending'
  },
  {
    id: 'ST003',
    name: 'David Wilson',
    major: 'Environmental Engineering',
    internshipStatus: 'completed'
  }
];

// Initialize localStorage with sample data if it doesn't exist
export const initializeSampleData = () => {
  // Initialize companies data if not exists
  if (!localStorage.getItem('companies')) {
    const companies = [
      {
        id: 'COMP001',
        name: 'Tech Innovators',
        industry: 'Technology',
        location: 'Silicon Valley',
        status: 'approved',
        contactPerson: 'John Smith',
        email: 'john@techinnovators.com',
        phone: '123-456-7890',
        description: 'Leading technology company specializing in AI and ML solutions.',
        submittedAt: '2024-01-15T10:30:00Z'
      },
      // ... more companies
    ];
    localStorage.setItem('companies', JSON.stringify(companies));
  }

  // Initialize internships data if not exists
  if (!localStorage.getItem('internships')) {
    const internships = [
      {
        id: 'INT001',
        companyId: 'COMP001',
        title: 'Software Engineering Intern',
        description: 'Join our team to work on cutting-edge technology projects.',
        requirements: 'Strong programming skills in Java/Python, GPA 3.0+',
        duration: '3 months',
        type: 'paid',
        location: 'Silicon Valley',
        status: 'active',
        postedAt: '2024-01-20T09:00:00Z'
      },
      // ... more internships
    ];
    localStorage.setItem('internships', JSON.stringify(internships));
  }

  // Initialize reports data if not exists
  if (!localStorage.getItem('reports')) {
    const reports = [
      {
        id: 'REP001',
        studentId: 'STU001',
        studentName: 'Alice Johnson',
        major: 'Computer Science',
        company: 'Tech Innovators',
        supervisor: 'Jane Doe',
        content: 'Detailed report of my internship experience...',
        status: 'pending',
        submittedAt: '2024-02-01T14:20:00Z',
        feedback: ''
      },
      // ... more reports
    ];
    localStorage.setItem('reports', JSON.stringify(reports));
  }

  // Initialize workshops data if not exists
  if (!localStorage.getItem('workshops')) {
    const workshops = [
      {
        id: 'WS001',
        title: 'Resume Writing Workshop',
        description: 'Learn how to create an effective resume that stands out.',
        speaker: 'Sarah Wilson',
        date: '2024-03-15T15:00:00Z',
        location: 'Room 101',
        capacity: 50,
        registeredStudents: [],
        status: 'upcoming'
      },
      // ... more workshops
    ];
    localStorage.setItem('workshops', JSON.stringify(workshops));
  }

  // Initialize students data if not exists
  if (!localStorage.getItem('students')) {
    const students = [
      {
        id: 'STU001',
        name: 'Alice Johnson',
        email: 'alice@university.edu',
        major: 'Computer Science',
        year: 3,
        internshipStatus: 'active',
        company: 'Tech Innovators',
        position: 'Software Engineering Intern',
        supervisor: 'Jane Doe',
        reportsSubmitted: 2,
        evaluationsCompleted: 1,
        averageRating: 4.5,
        notes: 'Excellent performance in technical tasks.'
      },
      {
        id: 'STU002',
        name: 'Bob Smith',
        email: 'bob@university.edu',
        major: 'Electrical Engineering',
        year: 4,
        internshipStatus: 'searching',
        reportsSubmitted: 0,
        evaluationsCompleted: 0
      },
      {
        id: 'STU003',
        name: 'Carol White',
        email: 'carol@university.edu',
        major: 'Computer Science',
        year: 3,
        internshipStatus: 'completed',
        company: 'Data Systems Inc.',
        position: 'Data Science Intern',
        supervisor: 'Mike Brown',
        reportsSubmitted: 3,
        evaluationsCompleted: 3,
        averageRating: 4.8,
        notes: 'Outstanding contribution to the team.'
      }
      // ... more students
    ];
    localStorage.setItem('students', JSON.stringify(students));
  }

  // Initialize evaluations data if not exists
  if (!localStorage.getItem('evaluations')) {
    const evaluations = [
      {
        id: 'EVAL001',
        studentId: 'STU001',
        studentName: 'Alice Johnson',
        major: 'Computer Science',
        company: 'Tech Innovators',
        position: 'Software Engineering Intern',
        supervisor: 'Jane Doe',
        duration: '3 months',
        status: 'completed',
        scores: {
          technical: 4.5,
          soft: 4.0,
          overall: 4.3
        },
        comments: 'Alice demonstrated strong technical skills and great teamwork.',
        submittedAt: '2024-02-15T10:00:00Z',
        lastModified: '2024-02-15T10:00:00Z'
      },
      {
        id: 'EVAL002',
        studentId: 'STU003',
        studentName: 'Carol White',
        major: 'Computer Science',
        company: 'Data Systems Inc.',
        position: 'Data Science Intern',
        supervisor: 'Mike Brown',
        duration: '6 months',
        status: 'completed',
        scores: {
          technical: 4.8,
          soft: 4.7,
          overall: 4.8
        },
        comments: 'Carol exceeded expectations in all areas.',
        submittedAt: '2024-02-10T14:30:00Z',
        lastModified: '2024-02-10T14:30:00Z'
      }
      // ... more evaluations
    ];
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
  }
};

// Call initializeSampleData when the module is imported
initializeSampleData(); 