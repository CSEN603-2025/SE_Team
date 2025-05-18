// FINAL/data/sampleData.js

export const sampleInternships = [
  {
    id: 1,
    company: "Orange Digital Center",
    title: "Mobile App Developer Intern",
    duration: "2 months",
    paid: true,
    salary: "6000 EGP",
    description: "Join our mobile development team to work on cutting-edge Flutter applications. You'll be involved in the full development lifecycle, from design to deployment. This is a great opportunity to gain hands-on experience with modern mobile development practices.",
    industry: "Technology",
    skills: ["Flutter", "Dart", "Mobile Development", "Git", "UI/UX"],
    location: "Cairo",
    deadline: "2024-05-01"
  },
  {
    id: 2,
    company: "Dell Technologies",
    title: "IT Support Intern",
    duration: "1 month",
    paid: false,
    description: "Work with our IT support team to provide technical assistance to internal teams. You'll gain experience in hardware troubleshooting, software support, and customer service. This internship offers exposure to enterprise-level IT operations.",
    industry: "Technology",
    skills: ["IT Support", "Hardware", "Software", "Customer Service", "Networking"],
    location: "Alexandria",
    deadline: "2024-04-15"
  },
  {
    id: 3,
    company: "EG Bank",
    title: "Financial Analyst Intern",
    duration: "3 months",
    paid: true,
    salary: "5000 EGP",
    description: "Join our financial analysis team to assist in market research, financial modeling, and report preparation. You'll work with senior analysts and gain practical experience in financial analysis tools and methodologies.",
    industry: "Banking",
    skills: ["Financial Analysis", "Excel", "PowerPoint", "Research", "Data Analysis"],
    location: "Cairo",
    deadline: "2024-04-30"
  },
  {
    id: 4,
    company: "IBM Egypt",
    title: "Software Developer Intern",
    duration: "3 months",
    paid: true,
    salary: "7000 EGP",
    description: "Work on real-world projects using cutting-edge technologies. You'll be part of an agile team developing enterprise solutions. This internship offers mentorship from experienced developers and exposure to IBM's development practices.",
    industry: "Technology",
    skills: ["Java", "Spring Boot", "React", "Cloud Computing", "Agile"],
    location: "Cairo",
    deadline: "2024-05-15"
  },
  {
    id: 5,
    company: "Vodafone Egypt",
    title: "Network Engineering Intern",
    duration: "2 months",
    paid: true,
    salary: "5500 EGP",
    description: "Join our network operations team to learn about telecommunications infrastructure, network monitoring, and optimization. You'll work with the latest networking technologies and gain hands-on experience in network management.",
    industry: "Telecommunications",
    skills: ["Networking", "CCNA", "Network Security", "Troubleshooting"],
    location: "Giza",
    deadline: "2024-05-10"
  },
  {
    id: 6,
    company: "IBM Egypt",
    title: "Data Science Intern",
    duration: "3 months",
    paid: true,
    salary: "6500 EGP",
    description: "Work on machine learning projects and data analysis tasks. You'll be involved in data preprocessing, model development, and result interpretation. This internship provides hands-on experience with real-world data science applications.",
    industry: "Technology",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics"],
    location: "Cairo",
    deadline: "2024-05-20"
  },
  {
    id: 7,
    company: "Orange Digital Center",
    title: "Web Developer Intern",
    duration: "2 months",
    paid: true,
    salary: "5500 EGP",
    description: "Join our web development team to work on modern web applications. You'll gain experience with React, Node.js, and other modern web technologies while working on real projects.",
    industry: "Technology",
    skills: ["React", "Node.js", "JavaScript", "HTML", "CSS"],
    location: "Cairo",
    deadline: "2024-05-05"
  },
  {
    id: 8,
    company: "EG Bank",
    title: "Business Analyst Intern",
    duration: "3 months",
    paid: true,
    salary: "4500 EGP",
    description: "Work with our business analysis team to gather requirements, analyze processes, and propose solutions. You'll gain experience in business process modeling and requirements documentation.",
    industry: "Banking",
    skills: ["Business Analysis", "Requirements Gathering", "Process Modeling", "Documentation"],
    location: "Alexandria",
    deadline: "2024-04-25"
  },
  {
    id: 9,
    company: "Dell Technologies",
    title: "Cloud Engineering Intern",
    duration: "3 months",
    paid: true,
    salary: "7000 EGP",
    description: "Work with our cloud team on AWS and Azure platforms. You'll gain hands-on experience with cloud infrastructure, deployment automation, and DevOps practices.",
    industry: "Technology",
    skills: ["AWS", "Azure", "DevOps", "Docker", "Kubernetes"],
    location: "Cairo",
    deadline: "2024-05-30"
  },
  {
    id: 10,
    company: "Vodafone Egypt",
    title: "IoT Developer Intern",
    duration: "2 months",
    paid: true,
    salary: "6000 EGP",
    description: "Join our IoT team to work on innovative connected device solutions. You'll gain experience with IoT protocols, embedded systems, and cloud integration.",
    industry: "Telecommunications",
    skills: ["IoT", "Embedded Systems", "MQTT", "Python", "Cloud Integration"],
    location: "Giza",
    deadline: "2024-05-25"
  }
];

// Initialize the internships in localStorage
if (typeof window !== 'undefined') {
  const existingInternships = localStorage.getItem('internships');
  if (!existingInternships) {
    localStorage.setItem('internships', JSON.stringify(sampleInternships));
  }
} 