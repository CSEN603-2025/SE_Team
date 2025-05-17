import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Briefcase, Eye, FileText, Users, UserCheck, Award, Edit3, Trash2, PlusCircle, Search, Filter, LogIn, LogOut, UserPlus,
    Bell, CalendarDays, Users2, BookOpen, CheckCircle, XCircle, Clock, FileUp, Download, MessageSquare, Video, Phone, Mic, MicOff, ScreenShare, UserCog, Star, NotebookText, Tv, Play, Pause, StopCircle, Maximize2, BookUser, LayoutGrid, Building, Settings
} from 'lucide-react';
import './index.css';
import { Link } from 'react-router-dom';

// --- NEW INITIAL DATA ---

// New Initial Companies Data
const newInitialCompaniesData = [
    { 
        id: 'compA', 
        name: 'Innovatech Ltd.', 
        email: 'contact@innovatech.com', 
        password: 'password123', 
        industry: 'AI Solutions', 
        companySize: 'medium', 
        logo: 'https://placehold.co/100x100/FF5733/FFFFFF?text=IL', 
        documents: [], 
        jobPostings: [], // Will be populated programmatically
        applications: [], 
        interns: [] 
    },
    { 
        id: 'compB', 
        name: 'GreenThumb Gardens', 
        email: 'info@greenthumb.com', 
        password: 'password123', 
        industry: 'Sustainable Agriculture', 
        companySize: 'small', 
        logo: 'https://placehold.co/100x100/4CAF50/FFFFFF?text=GG', 
        documents: [], 
        jobPostings: [], // Will be populated programmatically
        applications: [], 
        interns: [] 
    },
    { 
        id: 'compC', 
        name: 'WebWeavers Inc.', 
        email: 'hello@webweavers.com', 
        password: 'password123', 
        industry: 'Web Development', 
        companySize: 'small', 
        logo: 'https://placehold.co/100x100/9B59B6/FFFFFF?text=WW', 
        documents: [], 
        jobPostings: [], // Will be populated programmatically
        applications: [], 
        interns: [] 
    }
];

// New Initial Job Postings Data
const newInitialJobPostingsData = [
    {
        id: 'jobA1',
        companyId: 'compA', // Belongs to Innovatech Ltd.
        title: 'AI Research Intern',
        description: 'Contribute to cutting-edge AI research projects.',
        requirements: ['Python', 'Machine Learning', 'NLP'],
        status: 'open',
        duration: '6 months',
        paid: true,
        salary: '2000 USD/month',
        skills: ['Python', 'TensorFlow', 'PyTorch']
    },
    {
        id: 'jobA2',
        companyId: 'compA', // Belongs to Innovatech Ltd.
        title: 'Software Engineer Intern (AI Platforms)',
        description: 'Develop and maintain platforms for AI model deployment.',
        requirements: ['JavaScript', 'React', 'Node.js', 'Docker'],
        status: 'open',
        duration: '3 months',
        paid: true,
        salary: '1800 USD/month',
        skills: ['React', 'Node.js', 'Docker', 'Kubernetes']
    },
    {
        id: 'jobB1',
        companyId: 'compB', // Belongs to GreenThumb Gardens
        title: 'Horticulture Intern',
        description: 'Gain hands-on experience in plant care and sustainable farming.',
        requirements: ['Biology', 'Gardening interest'],
        status: 'open',
        duration: '4 months',
        paid: false,
        salary: 'N/A',
        skills: ['Plant Science', 'Organic Farming']
    },
    {
        id: 'jobC1',
        companyId: 'compC', // Belongs to WebWeavers Inc.
        title: 'UI/UX Design Intern',
        description: 'Design intuitive and engaging user interfaces for web applications.',
        requirements: ['Figma', 'Adobe XD', 'User Research'],
        status: 'open',
        duration: '3 months',
        paid: true,
        salary: '1600 USD/month',
        skills: ['UI Design', 'UX Research', 'Prototyping']
    },
    {
        id: 'jobA3', // New job for Innovatech Ltd.
        companyId: 'compA', 
        title: 'Data Analyst Intern',
        description: 'Analyze datasets to extract meaningful insights for business decisions.',
        requirements: ['SQL', 'Python', 'Pandas', 'Tableau'],
        status: 'open',
        duration: '4 months',
        paid: true,
        salary: '1700 USD/month',
        skills: ['Data Analysis', 'SQL', 'Python', 'Visualization']
    }
];

// Programmatically link job postings to companies
newInitialJobPostingsData.forEach(job => {
    const company = newInitialCompaniesData.find(c => c.id === job.companyId);
    if (company) {
        company.jobPostings.push(job.id);
    }
});


// New Initial Students Data
const newInitialStudentsData = {
    'studA': {
        id: 'studA',
        name: 'Alice Wonderland',
        email: 'alice@student.com',
        password: 'password123',
        isPro: false,
        registeredWorkshops: [],
        completedAssessments: [],
        profileViewers: [
            { companyId: 'compB', companyName: 'GreenThumb Gardens', logo: newInitialCompaniesData.find(c=>c.id==='compB').logo, date: '2024-03-20T10:00:00Z' },
            { companyId: 'compC', companyName: 'WebWeavers Inc.', logo: newInitialCompaniesData.find(c=>c.id==='compC').logo, date: '2024-03-22T14:30:00Z' }
        ],
        assessmentScores: []
    },
    'studB': {
        id: 'studB',
        name: 'Bob The Builder',
        email: 'bob@student.com',
        password: 'password123',
        isPro: false,
        registeredWorkshops: [],
        completedAssessments: [],
        profileViewers: [
            { companyId: 'compA', companyName: 'Innovatech Ltd.', logo: newInitialCompaniesData.find(c=>c.id==='compA').logo, date: '2024-03-21T11:00:00Z' }
        ],
        assessmentScores: []
    },
    'studC': {
        id: 'studC',
        name: 'Charlie Brown',
        email: 'charlie@student.com',
        password: 'password123',
        isPro: false,
        registeredWorkshops: [],
        completedAssessments: [],
        profileViewers: [
            { companyId: 'compA', companyName: 'Innovatech Ltd.', logo: newInitialCompaniesData.find(c=>c.id==='compA').logo, date: '2024-03-23T09:15:00Z' },
            { companyId: 'compB', companyName: 'GreenThumb Gardens', logo: newInitialCompaniesData.find(c=>c.id==='compB').logo, date: '2024-03-24T16:00:00Z' }
        ],
        assessmentScores: []
    },
    'studD': {
        id: 'studD',
        name: 'David Lee',
        email: 'david@student.com',
        password: 'password123',
        isPro: false,
        registeredWorkshops: [],
        completedAssessments: [],
        profileViewers: [],
        assessmentScores: []
    }
};

// New Initial Applications Data
// Applications are now an object, ensure consistency if using Object.values elsewhere
const newInitialApplicationsData = {
    'appA1': {
        id: 'appA1',
        jobId: 'jobA1', // Alice applies for AI Research Intern
        studentId: 'studA',
        studentName: newInitialStudentsData['studA'].name, // Add studentName
        status: 'pending',
        date: '2024-03-10',
    },
    'appB1': {
        id: 'appB1',
        jobId: 'jobB1', // Bob applies for Horticulture Intern
        studentId: 'studB',
        studentName: newInitialStudentsData['studB'].name, // Add studentName
        status: 'pending',
        date: '2024-03-12',
    },
    'appC1': {
        id: 'appC1',
        jobId: 'jobC1', // Charlie applies for UI/UX Design Intern
        studentId: 'studC',
        studentName: newInitialStudentsData['studC'].name, 
        status: 'pending',
        date: '2024-03-15',
    },
    'appA3': {
        id: 'appA3',
        jobId: 'jobA3', // Alice applies for Data Analyst Intern at Innovatech
        studentId: 'studA',
        studentName: newInitialStudentsData['studA'].name, 
        status: 'pending',
        date: '2024-03-16',
    },
    'appD1': { // David Lee applies to AI Research Intern
        id: 'appD1',
        jobId: 'jobA1',
        studentId: 'studD',
        studentName: newInitialStudentsData['studD'].name, 
        status: 'pending',
        date: '2024-03-17',
    },
    'appD2': { // David Lee applies to Horticulture Intern
        id: 'appD2',
        jobId: 'jobB1',
        studentId: 'studD',
        studentName: newInitialStudentsData['studD'].name, 
        status: 'pending',
        date: '2024-03-18',
    },
    'appA4': { // Alice Wonderland applies to UI/UX Design Intern
        id: 'appA4',
        jobId: 'jobC1',
        studentId: 'studA',
        studentName: newInitialStudentsData['studA'].name, 
        status: 'pending',
        date: '2024-03-19',
    }
};

// New Initial Interns Data
const newInitialInternsData = {}; // Starts empty, interns are created from accepted applications

// New Initial Evaluations Data (starts empty)
const newInitialEvaluationsData = {};


// --- END OF NEW INITIAL DATA ---

// Assign new data to original const names for use in useState initializers
const initialCompaniesData = newInitialCompaniesData;
const initialJobPostingsData = newInitialJobPostingsData;
const initialStudentsData = newInitialStudentsData;
const initialApplicationsData = newInitialApplicationsData;
const initialInternsData = newInitialInternsData;
const initialEvaluationsData = newInitialEvaluationsData;

// Keep original initial data for these, or simplify as needed
const initialWorkshopsDataOriginal = [
    { id: 'ws1', name: 'Resume Building Workshop', description: 'Craft a compelling resume.', startDate: '2024-08-01T10:00:00Z', mode: 'Online Live', speakerName: 'Career Coach', materials: [], registeredStudentIds: [] },
    { id: 'ws2', name: 'Interview Skills Masterclass', description: 'Ace your next interview.', startDate: '2024-08-15T14:00:00Z', mode: 'Pre-recorded', speakerName: 'Hiring Manager', materials: [], registeredStudentIds: [] }
];

const initialAssessmentsDataOriginal = [
    { id: 'assess1', title: 'Basic Aptitude Test', description: 'Test your general aptitude.', questions: [{ q: '2+2=?' }], durationMinutes: 30, completedBy: [] },
    { id: 'assess2', title: 'Coding Challenge (Easy)', description: 'A simple coding problem.', questions: [{ q: 'Reverse a string.' }], durationMinutes: 45, completedBy: [] }
];

// Add animation styles
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-100%);
        opacity: 0;
    }
}

.animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
}

.animate-slide-out {
    animation: slideOut 0.3s ease-in forwards;
}
`;
document.head.appendChild(style);

// Initial Data
const initialWorkshopsData = [
    {
        id: 'ws1',
        name: 'Interview Skills',
        description: 'Learn effective interview techniques',
        date: '2024-04-01',
        registeredStudentIds: [],
        materials: []
    }
];

const initialScadOfficeUsers = [
    { 
        id: 'scad1', 
        name: 'Admin User', 
        email: 'admin@scad.com', 
        password: 'password123', 
        type: 'scadOffice', 
        role: 'Platform Administrator' 
    }
];

const initialFacultyMembers = [
    { 
        id: 'fac1', 
        name: 'Prof. James Wilson', 
        email: 'jwilson@faculty.com', 
        password: 'password123', 
        type: 'faculty', 
        department: 'Computer Science', 
        expertise: ['Software Engineering', 'Data Science'] 
    }
];

const initialAssessmentsData = [
    {
        id: 'assess1',
        name: 'Technical Skills Assessment (MCQ)', // Updated name
        description: 'Evaluate your technical knowledge with these multiple-choice questions.', // Updated description
        durationMinutes: 30, 
        questions: [
            {
                id: 'q1',
                text: 'Which of the following is a primary benefit of using React Hooks?',
                type: 'mcq',
                options: ['Direct DOM manipulation', 'Code reusability and composition', 'Server-side rendering only', 'Replacing HTML entirely'],
                correctAnswer: 'Code reusability and composition'
            },
            {
                id: 'q2',
                text: 'What is the Virtual DOM in the context of React?',
                type: 'mcq',
                options: ['A direct copy of the browser DOM', 'A JavaScript representation of the actual DOM', 'A CSS styling technique', 'A browser extension for debugging'],
                correctAnswer: 'A JavaScript representation of the actual DOM'
            },
            {
                id: 'q3', // New question
                text: 'Which method in a React class component is used to update the state?',
                type: 'mcq',
                options: ['this.updateState()', 'this.changeState()', 'this.setState()', 'this.modifyState()'],
                correctAnswer: 'this.setState()'
            }
        ],
        completedBy: []
    },
    {
        id: 'assess2',
        name: 'Programming Problem Solving',
        description: 'Solve coding challenges to demonstrate your problem-solving skills.',
        durationMinutes: 60,
        questions: [
            { id: 'q1', text: 'Write a function to find duplicates in an array.', type: 'code' },
            { id: 'q2', text: 'Implement a basic cache mechanism.', type: 'code' }
        ],
        completedBy: []
    }
];

// Helper: ShadCN-like UI Components (Simplified for this example)
// In a real ShadCN setup, these would be imported.
const Card = ({ children, className = '', ...props }) => (
    <div className={`bg-white shadow-lg rounded-xl border border-gray-200 ${className}`} {...props}>
        {children}
    </div>
);
const CardHeader = ({ children, className = '' }) => <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardFooter = ({ children, className = '' }) => <div className={`p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl ${className}`}>{children}</div>;
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 hover:bg-gray-100 hover:text-gray-900",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
    };
    const sizes = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
    };
    return <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};

const Input = ({ className = '', type = 'text', ...props }) => (
    <input type={type} className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const Label = ({ children, className = '', ...props }) => <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-100 ${className}`} {...props}>{children}</label>;

const Textarea = ({ className = '', ...props }) => (
    <textarea className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const Select = ({ children, className = '', ...props }) => (
    <select className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`} {...props}>
        {children}
    </select>
);

const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
const DialogTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;
const DialogContent = ({ children, title }) => (
    <>
        {children}
    </>
);
const DialogHeader = ({ children, className = '' }) => <div className={`mb-6 text-center bg-slate-950/80 p-6 rounded-t-lg border-b border-slate-800 ${className}`}>{children}</div>;
const DialogTitle = ({ children }) => <h2 className="text-2xl font-bold text-cyan-600 mb-2">{children}</h2>;
const DialogDescription = ({ children }) => <p className="text-gray-400 text-sm">{children}</p>;
const DialogFooter = ({ children }) => <div className="mt-6 flex justify-end space-x-2">{children}</div>;

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, title = "Confirm Delete", message = "Are you sure you want to delete this item?" }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-gray-300">{message}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-500 text-gray-300 hover:bg-slate-600">Cancel</Button>
                    <Button variant="destructive" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Load data from localStorage or use initial data
const getInitialData = (key, initialData) => {
    try {
        const storedData = localStorage.getItem(key);
        if (!storedData) {
            // If no data in localStorage, save initial data and return it
            localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
        
        // Try to parse the stored data
        const parsedData = JSON.parse(storedData);
        
        // Basic validation of the parsed data
        if (!parsedData) {
            console.error('Invalid data format in localStorage for key:', key);
            localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
        
        // For arrays, ensure we have an array
        if (Array.isArray(initialData) && !Array.isArray(parsedData)) {
            console.error('Expected array in localStorage for key:', key);
            localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
        
        // For objects, ensure we have an object
        if (!Array.isArray(initialData) && typeof initialData === 'object' && typeof parsedData !== 'object') {
            console.error('Expected object in localStorage for key:', key);
            localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
        
        return parsedData;
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // On error, reset to initial data
        localStorage.setItem(key, JSON.stringify(initialData));
        return initialData;
    }
};

// Helper function to clear localStorage data
const clearLocalStorage = () => {
    try {
        localStorage.clear();
        console.log('localStorage cleared successfully');
        window.location.reload();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

// Main App Component
export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('login');
    const [internFilter, setInternFilter] = useState('all'); // Kept from previous state

    // Notifications state - ROLLED BACK TO FLAT ARRAY
    const [notifications, setNotifications] = useState([]); 
    const [activeToastNotifications, setActiveToastNotifications] = useState([]);

    // --- RESTORED STATE DEFINITIONS ---
    const [companies, setCompanies] = useState(() => {
        const savedCompanies = localStorage.getItem('companies');
        return savedCompanies ? JSON.parse(savedCompanies) : initialCompaniesData;
    });

    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem('students');
        return savedStudents ? JSON.parse(savedStudents) : initialStudentsData;
    });

    const [workshops, setWorkshops] = useState(() => {
        const savedWorkshops = localStorage.getItem('workshops');
        return savedWorkshops ? JSON.parse(savedWorkshops) : initialWorkshopsDataOriginal;
    });

    const [assessments, setAssessments] = useState(() => {
        const savedAssessments = localStorage.getItem('assessments');
        return savedAssessments ? JSON.parse(savedAssessments) : initialAssessmentsData; // Changed to initialAssessmentsData
    });

    const [jobPostings, setJobPostings] = useState(() => {
        const savedJobPostings = localStorage.getItem('jobPostings');
        let jobsToLoad = savedJobPostings ? JSON.parse(savedJobPostings) : initialJobPostingsData; // initialJobPostingsData is an array

        // Convert to object if it's an array (from initial data or old localStorage format)
        if (Array.isArray(jobsToLoad)) {
            return jobsToLoad.reduce((acc, job) => {
                acc[job.id] = job;
                return acc;
            }, {});
        }
        return jobsToLoad; // Already an object
    });

    const [applications, setApplications] = useState(() => {
        const savedApplications = localStorage.getItem('applications');
        return savedApplications ? JSON.parse(savedApplications) : initialApplicationsData; // initialApplicationsData is an object
    });

    const [interns, setInterns] = useState(() => {
        const savedInterns = localStorage.getItem('interns');
        return savedInterns ? JSON.parse(savedInterns) : initialInternsData; // initialInternsData is an object
    });

    const [evaluations, setEvaluations] = useState(() => {
        const savedEvaluations = localStorage.getItem('evaluations');
        return savedEvaluations ? JSON.parse(savedEvaluations) : initialEvaluationsData; // initialEvaluationsData is an object
    });

    // State for Global Internship Search and Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({});

    // --- RESTORED STATIC ARRAYS ---
    const scadOfficeUsers = [
        { 
            id: 'scad1', 
            name: 'Admin User', 
            email: 'admin@scad.com', 
            password: 'password123', 
            type: 'scadOffice', 
            role: 'Platform Administrator' 
        }
    ];

    const facultyMembers = [
        { 
            id: 'fac1', 
            name: 'Prof. James Wilson', 
            email: 'jwilson@faculty.com', 
            password: 'password123', 
            type: 'faculty', 
            department: 'Computer Science', 
            expertise: ['Software Engineering', 'Data Science'] 
        }
    ];
    // --- END OF RESTORED DEFINITIONS ---

    // useEffect for localStorage (notifications part is rolled back)
    useEffect(() => {
        // localStorage.setItem('globalNotifications', JSON.stringify(notifications)); 
        // Persist other states
        localStorage.setItem('companies', JSON.stringify(companies));
        localStorage.setItem('students', JSON.stringify(students));
        localStorage.setItem('workshops', JSON.stringify(workshops));
        localStorage.setItem('assessments', JSON.stringify(assessments));
        localStorage.setItem('jobPostings', JSON.stringify(jobPostings));
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('interns', JSON.stringify(interns));
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
    }, [notifications, companies, students, workshops, assessments, jobPostings, applications, interns, evaluations]);
    
    // Effect to listen for localStorage changes from other tabs
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.storageArea !== localStorage) return; // Only listen to localStorage changes

            console.log('[App.js] Storage event detected:', event.key);

            try {
                if (event.key === 'companies' && event.newValue) {
                    setCompanies(JSON.parse(event.newValue));
                } else if (event.key === 'students' && event.newValue) {
                    setStudents(JSON.parse(event.newValue));
                } else if (event.key === 'workshops' && event.newValue) {
                    setWorkshops(JSON.parse(event.newValue));
                } else if (event.key === 'assessments' && event.newValue) {
                    setAssessments(JSON.parse(event.newValue));
                } else if (event.key === 'jobPostings' && event.newValue) {
                    const jobs = JSON.parse(event.newValue);
                    if (Array.isArray(jobs)) {
                        setJobPostings(jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, {}));
                    } else {
                        setJobPostings(jobs);
                    }
                } else if (event.key === 'applications' && event.newValue) {
                    setApplications(JSON.parse(event.newValue));
                } else if (event.key === 'interns' && event.newValue) {
                    setInterns(JSON.parse(event.newValue));
                } else if (event.key === 'evaluations' && event.newValue) {
                    setEvaluations(JSON.parse(event.newValue));
                } else if (event.key === 'notifications' && event.newValue) { 
                    setNotifications(JSON.parse(event.newValue));
                }
            } catch (error) {
                console.error('[App.js] Error processing storage event:', error);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array: runs once on mount, cleans up on unmount

    const addNotification = useCallback((message, type = 'info') => {
        console.log('[App.js - Toast Improve] addNotification called. Message:', message, 'Type:', type);
        const newNotif = { 
            id: Date.now(), 
            message, 
            type, 
            read: false, 
            date: new Date().toISOString() 
        };

        // Add to the main flat notifications array (for dropdown)
        setNotifications(prev => {
            const updated = [newNotif, ...prev.slice(0, 19)];
            return updated;
        }); 

        // Add to active toasts with isFadingOut state
        const toastWithKey = { ...newNotif, toastId: `toast-${newNotif.id}-${Date.now()}`, isFadingOut: false };
        setActiveToastNotifications(prevToasts => {
            const updatedToasts = [toastWithKey, ...prevToasts.slice(0, 2)]; 
            return updatedToasts;
        }); 

        // Timeout to start fade out
        setTimeout(() => {
            setActiveToastNotifications(prevToasts =>
                prevToasts.map(n => (n.toastId === toastWithKey.toastId ? { ...n, isFadingOut: true } : n))
            );
            // Timeout to remove after animation (duration: 300ms)
            setTimeout(() => {
                setActiveToastNotifications(prevToasts => prevToasts.filter(n => n.toastId !== toastWithKey.toastId));
            }, 300); 
        }, 3500); // Initial delay before fade out starts
        
    }, []); // No currentUser dependency if notifications were global

    // Authentication
    const handleLogin = (email, password) => {
        let userToSet = null;
        const company = companies.find(c => c.email === email && c.password === password);

        if (company) {
            userToSet = { 
                id: company.id, 
                type: 'company', 
                name: company.name, 
                logo: company.logo || getPlaceholderLogo(company.name) 
            };
            setCurrentPage('companyDashboard');
        } else {
            const student = Object.values(students).find(s => s.email === email && s.password === password);
            if (student) {
                const studentType = student.isPro ? 'proStudent' : 'student';
                userToSet = { 
                    id: student.id, 
                    type: studentType, 
                    name: student.name, 
                    logo: getPlaceholderLogo(student.name) // Student logo
                };
                setCurrentPage(studentType === 'proStudent' ? 'proStudentDashboard' : 'studentDashboard');
            } else {
                const scadUser = scadOfficeUsers.find(u => u.email === email && u.password === password);
                if (scadUser) {
                    userToSet = { 
                        id: scadUser.id, 
                        type: 'scadOffice', 
                        name: scadUser.name, 
                        role: scadUser.role, 
                        logo: getPlaceholderLogo(scadUser.name) // SCAD Office logo
                    };
                    setCurrentPage('scadOfficeDashboard');
                } else {
                    const faculty = facultyMembers.find(f => f.email === email && f.password === password);
                    if (faculty) {
                        userToSet = { 
                            id: faculty.id, 
                            type: 'faculty', 
                            name: faculty.name, 
                            department: faculty.department, 
                            logo: getPlaceholderLogo(faculty.name) // Faculty logo
                        };
                        setCurrentPage('facultyDashboard');
                    }
                }
            }
        }

        if (userToSet) {
            setCurrentUser(userToSet);
            // Using a slight delay to ensure currentUser is set before addNotification uses it.
            setTimeout(() => addNotification(`Welcome back, ${userToSet.name}!`, 'success'), 0);
        } else {
            addNotification('Invalid credentials.', 'error');
        }
    };

    // Handle logout
    const handleLogout = useCallback(() => {
        if (currentUser) {
            // Add notification before clearing currentUser so it's associated with the user
            addNotification(`Goodbye, ${currentUser.name}.`, 'info'); 
        }
        setCurrentUser(null);
        setCurrentPage('login');
    }, [currentUser, addNotification]);

    // Handle company registration
    const handleCompanyRegister = useCallback((companyData) => {
        const newCompany = {
            id: `comp${Date.now()}`,
            name: companyData.name,
            email: companyData.email,
            password: companyData.password,
            industry: companyData.industry,
            companySize: companyData.companySize,
            logo: companyData.logo || getPlaceholderLogo(companyData.name),
            documents: [],
            jobPostings: [],
            applications: [],
            interns: []
        };
        
        // Update companies state
        setCompanies(prev => [...prev, newCompany]);
        
        // Show success message and redirect
        addNotification(`Company ${newCompany.name} registered successfully!`, 'success');
        setCurrentPage('login');
    }, [setCompanies, addNotification, setCurrentPage]);

    // Debug logging for render
    console.log('App render:', {
        currentUser,
        notifications,
        activeToastNotifications,
        searchTerm, // Added for debugging
        filterOptions // Added for debugging
    });

    // Navigation
    const navigate = (page) => {
        if (page === 'allInternships') {
            setSearchTerm('');
            setFilterOptions({});
        }
        setCurrentPage(page);
    };

    // Global Search and Filter for Internships - ensure companies and jobPostings state are available
    const allInternshipsList = Object.values(jobPostings).map(job => {
        const company = companies.find(c => c.id === job.companyId);
        // --- DEBUG LOG --- 
        console.log(`[App.js] Mapping job to internship: Job ID: ${job.id}, Job Title: ${job.title}, Company ID: ${job.companyId}, Found Company:`, company);
        // --- END DEBUG LOG ---
        return {
            ...job,
            companyName: company?.name || 'Unknown Company',
            industry: company?.industry || 'N/A',
            duration: job.duration || 'N/A',
            paid: job.paid === undefined ? false : job.paid,
            salary: job.salary || 'N/A',
            skills: job.skills || [], // Ensure skills is an array
            description: job.description || 'No description available.'
        };
    });
    
    const filteredGlobalInternships = allInternshipsList.filter(internship => {
        const matchesSearch = searchTerm === '' ||
            internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry = !filterOptions.industry || filterOptions.industry === '' || internship.industry === filterOptions.industry;
        const matchesDuration = !filterOptions.duration || filterOptions.duration === '' || internship.duration === filterOptions.duration;
        const matchesPaid = filterOptions.paid === undefined || filterOptions.paid === '' || internship.paid === (filterOptions.paid === 'true');
        return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
    });

    const renderPage = () => {
        const portalProps = {
            currentUser, setCurrentUser, navigate, currentPage, setCurrentPage, addNotification,
            companies, setCompanies, students, setStudents, workshops, setWorkshops,
            assessments, setAssessments, jobPostings, setJobPostings, applications, setApplications,
            interns, setInterns, evaluations, setEvaluations, filteredGlobalInternships,
            searchTerm, setSearchTerm, filterOptions, setFilterOptions // Pass search and filter state
        };
        if (!currentUser) {
            if (currentPage === 'registerCompany') {
                return <CompanyRegistrationPage onRegister={handleCompanyRegister} navigate={navigate} addNotification={addNotification} />;
            }
            return <LoginPage onLogin={handleLogin} navigate={navigate} addNotification={addNotification} />;
        }
    
        switch (currentUser.type) {
            case 'company': return <CompanyPortal {...portalProps} />;
            case 'proStudent': return <ProStudentPortal {...portalProps} />;
            case 'student': return <StudentDashboard {...portalProps} />;
            case 'scadOffice': return <ScadOfficePortal {...portalProps} />;
            case 'faculty': return <FacultyPortal {...portalProps} />;
            default: return <div className="text-center p-8 text-red-400">Invalid user type. Please log out.</div>;
        }
    };
        
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-gray-100 font-sans">
            <AppHeader 
                currentUser={currentUser} 
                onLogout={handleLogout} 
                navigate={navigate} 
                notifications={notifications} 
                setNotifications={setNotifications} 
            />
            <main className="container mx-auto px-4 py-8 relative">
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-sm pointer-events-none space-y-2">
                    {activeToastNotifications.length > 0 && console.log('[App.js] Rendering toasts. Active toasts count:', activeToastNotifications.length, 'First toast:', activeToastNotifications[0])}
                    {activeToastNotifications.map(notif => (
                        <div 
                            key={notif.toastId}
                            className={`p-3 rounded-md shadow-xl text-sm pointer-events-auto 
                                ${notif.isFadingOut ? 'animate-slide-out' : 'animate-slide-in'}
                                ${notif.type === 'error' ? 'bg-red-600' : notif.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}
                                text-white flex justify-between items-center`}
                        >
                            <span>{notif.message}</span>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                    setActiveToastNotifications(prevToasts =>
                                        prevToasts.map(n => (n.toastId === notif.toastId ? { ...n, isFadingOut: true } : n))
                                    );
                                    setTimeout(() => {
                                        setActiveToastNotifications(prevToasts => prevToasts.filter(n => n.toastId !== notif.toastId));
                                    }, 300); // Match animation duration (0.3s)
                                }}
                                className="text-white hover:bg-white/20 p-1 -mr-1 -my-1"
                            >
                                <XCircle className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
                {/* Global Search and Filter for Internships (visible on certain pages) */}
                 {(currentPage === 'allInternships' || (currentUser && (currentPage === 'companyDashboard' || currentPage === 'proStudentDashboard' || currentPage === 'studentDashboard' || currentPage === 'facultyDashboard' || currentPage === 'scadOfficeDashboard'))) && (currentUser?.type === 'company' || currentUser?.type === 'proStudent' || currentUser?.type === 'student' || currentUser?.type === 'faculty' || currentUser?.type === 'scadOffice') && (
                     <GlobalInternshipSearchFilter
                     searchTerm={searchTerm}
                     onSearch={setSearchTerm}
                     filterOptions={filterOptions}
                     onFilterChange={setFilterOptions}
                     onViewAll={() => navigate('allInternships')}
                     showViewAllButton={currentPage !== 'allInternships'}
                     />
                    )}

                {renderPage()}
            </main>
            <AppFooter />
        </div>
    );
}

// --- Sub-Components (Login, Portals, etc.) ---

const StudentDashboard = ({ currentUser, navigate, currentPage, setCurrentPage, students, setStudents, addNotification, initialJobPostingsData, filteredGlobalInternships, searchTerm, setSearchTerm, filterOptions, setFilterOptions }) => (
    <Card>
       <CardHeader>
           <h2 className="text-2xl font-semibold text-sky-400">Student Dashboard: {currentUser.name}</h2>
       </CardHeader>
       <CardContent>
           <p className="text-gray-300">Welcome to your dashboard. Current Page: {currentPage}</p>
           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Button onClick={() => setCurrentPage('studentDashboard')} variant={currentPage === 'studentDashboard' ? 'default' : 'secondary'} icon={LayoutGrid}>Dashboard</Button>
               <Button onClick={() => setCurrentPage('browseInternships')} variant={currentPage === 'browseInternships' ? 'default' : 'secondary'} icon={Search}>Browse Internships</Button>
               <Button onClick={() => setCurrentPage('myApplicationsStudent')} variant={currentPage === 'myApplicationsStudent' ? 'default' : 'secondary'} icon={FileText}>My Applications</Button>
                <Button onClick={() => setCurrentPage('studentProfile')} variant={currentPage === 'studentProfile' ? 'default' : 'secondary'} icon={UserCog}>My Profile</Button>
           </div>
           {/* TODO: Add content for each sub-page of StudentDashboard */}
       </CardContent>
   </Card>
);
const CompanyProfileEditForm = ({ company, onSubmit, onClose, addNotification }) => {
    const [formData, setFormData] = useState({
        name: company.name,
        email: company.email,
        industry: company.industry,
        companySize: company.companySize,
        id: company.id,
        logo: company.logo
    });
    const [logoFile, setLogoFile] = useState(null);
    const [currentLogoUrl, setCurrentLogoUrl] = useState(company.logo);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: company.name,
            email: company.email,
            industry: company.industry,
            companySize: company.companySize,
            id: company.id,
            logo: company.logo
        }));
        setCurrentLogoUrl(company.logo);
    }, [company]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setCurrentLogoUrl(base64String);
                setFormData(prev => ({
                    ...prev,
                    logo: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, logoFile);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                    <DialogTitle>Edit Company Profile</DialogTitle>
                    <DialogDescription>Update your company's information</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="profileName" className="text-gray-100 font-medium">Company Name</Label>
                        <Input 
                            id="profileName" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="bg-slate-800 border-slate-500 text-white focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="profileEmail" className="text-gray-100 font-medium">Company Email</Label>
                        <Input 
                            id="profileEmail" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="bg-slate-800 border-slate-500 text-white focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="profileIndustry" className="text-gray-100 font-medium">Industry</Label>
                        <Input 
                            id="profileIndustry" 
                            name="industry" 
                            value={formData.industry} 
                            onChange={handleChange} 
                            required 
                            className="bg-slate-800 border-slate-500 text-white focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="profileCompanySize" className="text-gray-100 font-medium">Company Size</Label>
                        <Select 
                            id="profileCompanySize" 
                            name="companySize" 
                            value={formData.companySize} 
                            onChange={handleChange}
                            className="bg-slate-800 border-slate-500 text-white focus:ring-blue-400 focus:border-blue-400"
                        >
                            <option value="small" className="bg-slate-900 text-white">Small (50 employees or less)</option>
                            <option value="medium" className="bg-slate-900 text-white">Medium (51-100 employees)</option>
                            <option value="large" className="bg-slate-900 text-white">Large (101-500 employees)</option>
                            <option value="corporate" className="bg-slate-900 text-white">Corporate (more than 500 employees)</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="profileLogo" className="text-gray-100 font-medium">Company Logo</Label>
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-500">
                                <img 
                                    src={currentLogoUrl || getPlaceholderLogo(formData.name)} 
                                    alt="Company logo" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getPlaceholderLogo(formData.name);
                                    }}
                                />
                            </div>
                            <Input 
                                id="profileLogo" 
                                type="file" 
                                onChange={handleLogoChange} 
                                accept="image/*"
                                className="bg-slate-800 border-slate-500 text-white file:mr-4 file:py-0.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600" 
                            />
                        </div>
                        {logoFile && <p className="text-xs text-gray-300 mt-1">New logo selected: {logoFile.name}</p>}
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-600">
                        <Button type="button" variant="outline" onClick={onClose} className="border-gray-400 text-gray-200 hover:bg-gray-700 hover:text-white">Cancel</Button>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};



const ScadOfficePortal = ({ currentUser, navigate, currentPage, setCurrentPage, companies, setCompanies, students, setStudents, workshops, setWorkshops, assessments, setAssessments, addNotification }) => (
    <Card>
        <CardHeader>
            <h2 className="text-2xl font-semibold text-sky-400">SCAD Office Portal: {currentUser.name} ({currentUser.role})</h2>
        </CardHeader>
        <CardContent>
            <p className="text-gray-300">Welcome to the SCAD Office dashboard. Current Page: {currentPage}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button onClick={() => setCurrentPage('scadOfficeDashboard')} variant={currentPage === 'scadOfficeDashboard' ? 'default' : 'secondary'} icon={LayoutGrid}>Dashboard</Button>
                <Button onClick={() => setCurrentPage('manageCompanies')} variant={currentPage === 'manageCompanies' ? 'default' : 'secondary'} icon={Building}>Manage Companies</Button>
                <Button onClick={() => setCurrentPage('manageStudentsScad')} variant={currentPage === 'manageStudentsScad' ? 'default' : 'secondary'} icon={Users}>Manage Students</Button>
                <Button onClick={() => setCurrentPage('manageWorkshopsScad')} variant={currentPage === 'manageWorkshopsScad' ? 'default' : 'secondary'} icon={BookOpen}>Manage Workshops</Button>
                <Button onClick={() => setCurrentPage('manageAssessmentsScad')} variant={currentPage === 'manageAssessmentsScad' ? 'default' : 'secondary'} icon={Award}>Manage Assessments</Button>
                <Button onClick={() => setCurrentPage('platformSettings')} variant={currentPage === 'platformSettings' ? 'default' : 'secondary'} icon={Settings}>Platform Settings</Button>
            </div>
            {/* TODO: Add content for each sub-page of ScadOfficePortal */}
        </CardContent>
    </Card>
);

const FacultyPortal = ({ currentUser, navigate, currentPage, setCurrentPage, students, setStudents, addNotification }) => (
    <Card>
        <CardHeader>
            <h2 className="text-2xl font-semibold text-sky-400">Faculty Portal: {currentUser.name} ({currentUser.department})</h2>
        </CardHeader>
        <CardContent>
            <p className="text-gray-300">Welcome to your portal. Current Page: {currentPage}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button onClick={() => setCurrentPage('facultyDashboard')} variant={currentPage === 'facultyDashboard' ? 'default' : 'secondary'} icon={LayoutGrid}>Dashboard</Button>
                <Button onClick={() => setCurrentPage('viewStudentProgress')} variant={currentPage === 'viewStudentProgress' ? 'default' : 'secondary'} icon={BookUser}>Student Progress</Button>
                <Button onClick={() => setCurrentPage('facultyEndorsements')} variant={currentPage === 'facultyEndorsements' ? 'default' : 'secondary'} icon={Star}>Endorsements</Button>
                 <Button onClick={() => setCurrentPage('facultyProfile')} variant={currentPage === 'facultyProfile' ? 'default' : 'secondary'} icon={UserCog}>My Profile</Button>
            </div>
             {/* TODO: Add content for each sub-page of FacultyPortal */}
        </CardContent>
    </Card>
);

const AppHeader = ({ currentUser, onLogout, navigate, notifications = [], setNotifications }) => {
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Removed the useEffect that was logging userNotifications as it's less relevant for the flat array model now

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
                !event.target.closest('button[aria-label="Toggle Notifications"]')) {
                setShowNotificationsDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAllRead = () => {
        // Directly modifies the 'notifications' array passed from App.js
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated); 
    };

    const handleMarkOneRead = (notifId) => {
        const updated = notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
        setNotifications(updated);
    };

    // This assumes 'notifications' is a flat array of all notifications
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="bg-slate-800 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => currentUser ? navigate(`${currentUser.type}Dashboard`) : navigate('login')}>
                    <Briefcase className="h-8 w-8 text-blue-400" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">SCAD Internship System</h1>
                </div>
                <nav className="flex items-center space-x-4">
                    {currentUser && ( // Only show notifications if a user is logged in
                        <>
                           <div className="relative" ref={dropdownRef}>
                                <Button 
                                    aria-label="Toggle Notifications"
                                    variant="ghost" 
                                    onClick={() => setShowNotificationsDropdown(prev => !prev)} 
                                    className="relative text-gray-300 hover:text-blue-400 p-2"
                                >
                                    <Bell className="h-6 w-6" />
                                    {unreadCount > 0 && <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-800 bg-red-500" />}
                                </Button>
                                {showNotificationsDropdown && (
                                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-700 border border-slate-600 rounded-md shadow-lg z-50 flex flex-col">
                                        <div className="px-3 py-2 text-sm font-semibold text-white border-b border-slate-600 flex justify-between items-center">
                                            <span>Notifications</span>
                                            {notifications.length > 0 && unreadCount > 0 && (
                                                <Button variant="link" size="sm" className="text-blue-400 p-0 h-auto text-xs hover:text-blue-300" onClick={handleMarkAllRead}>Mark all as read</Button>
                                            )}
                                        </div>
                                        <div className="overflow-y-auto max-h-72 notification-scroll">
                                            {notifications.length === 0 ? (
                                                <div className="px-3 py-4 text-sm text-gray-400 text-center">No notifications.</div> // Generic message now
                                            ) : (
                                                notifications.map(notif => ( // Maps the flat array
                                                    <div key={notif.id} className={`px-3 py-2 border-b border-slate-600 last:border-b-0 hover:bg-slate-600/50 cursor-pointer ${!notif.read ? 'font-semibold text-white bg-slate-700/50' : 'text-gray-300'}`}
                                                        onClick={() => {if (!notif.read) handleMarkOneRead(notif.id); }}>
                                                        <p className="text-sm">{notif.message}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">{new Date(notif.date).toLocaleString()}</p>
                                                        {!notif.read && (<Button size="sm" variant="link" className="text-blue-400 p-0 h-auto text-xs mt-1 hover:text-blue-300" onClick={(e) => { e.stopPropagation(); handleMarkOneRead(notif.id); }}>Mark as read</Button>)}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {notifications.length > 10 && (<div className="px-3 py-2 text-xs text-center text-gray-500 border-t border-slate-600">Showing latest {notifications.slice(0,10).length} of {notifications.length}.</div>)}
                                    </div>
                                )}
                            </div>
                            {/* User Info and Logout Button */} 
                            <div className="flex items-center space-x-2">
                                {currentUser.logo && <img src={currentUser.logo} alt="Logo" onError={(e) => e.target.src = getPlaceholderLogo(currentUser.name)} className="h-8 w-8 rounded-full object-cover border-2 border-slate-600"/>}
                                <span className="text-gray-300 hidden md:inline">{currentUser.name}</span>
                            </div>
                            <Button onClick={onLogout} variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                               <LogOut className="h-5 w-5" /> 
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

const AppFooter = () => (
    <footer className="bg-slate-800/50 border-t border-slate-700 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SCAD Internship System. GUC Project. All Rights Reserved.
        </div>
    </footer>
);

const LoginPage = ({ onLogin, navigate, addNotification }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            addNotification("Please enter email and password.", "error");
            return;
        }
        onLogin(email, password);
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-xl bg-slate-800 border-slate-700 shadow-2xl">
                <CardHeader>
                    <div className="flex items-center space-x-2 justify-center">
                        <LogIn className="h-8 w-8 text-blue-400" />
                        <h2 className="text-3xl font-bold text-center text-white">Login to SCAD Internship System</h2>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3">
                            <LogIn className="mr-2 h-5 w-5" /> Secure Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center bg-slate-800/50 border-slate-700">
                    <p className="text-sm text-gray-400">
                        New Company? <Button variant="link" onClick={() => navigate('registerCompany')} className="text-blue-400 hover:text-blue-300 p-0">Register Here</Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

const CompanyRegistrationPage = ({ onRegister, navigate }) => {
    const [formData, setFormData] = useState({
        name: '', industry: '', companySize: 'small', email: '', password: '', confirmPassword: ''
    });
    const [documentFile, setDocumentFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDocumentFileChange = (e) => {
        setDocumentFile(e.target.files[0]);
    };
    
    const handleLogoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setLogoPreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!documentFile) {
            setError("Please upload a proof document.");
            return;
        }
        if (!logoFile) {
            setError("Please upload a company logo.");
            return;
        }

        // Use the base64 string for the logo
        onRegister({
            ...formData,
            logo: logoPreview // Pass the full base64 string
        });
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-xl bg-slate-800 border-slate-700 shadow-2xl">
                <CardHeader>
                     <div className="flex items-center space-x-2 justify-center">
                        <UserPlus className="h-8 w-8 text-blue-400" />
                        <h2 className="text-3xl font-bold text-center text-white">Register Your Company</h2>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="nameReg">Company Name</Label>
                                <Input id="nameReg" name="name" value={formData.name} onChange={handleChange} required className="bg-slate-700 border-slate-600" />
                            </div>
                            <div>
                                <Label htmlFor="emailReg">Official Company Email</Label>
                                <Input id="emailReg" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-slate-700 border-slate-600" />
                            </div>
                        </div>
                         <div>
                            <Label htmlFor="industryReg">Industry</Label>
                            <Input id="industryReg" name="industry" value={formData.industry} onChange={handleChange} required className="bg-slate-700 border-slate-600" />
                        </div>
                        <div>
                            <Label htmlFor="companySizeReg">Company Size</Label>
                            <Select id="companySizeReg" name="companySize" value={formData.companySize} onChange={handleChange} className="bg-slate-700 border-slate-600">
                                <option value="small">Small (50 employees or less)</option>
                                <option value="medium">Medium (51-100 employees)</option>
                                <option value="large">Large (101-500 employees)</option>
                                <option value="corporate">Corporate (more than 500 employees)</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="logoUpload">Company Logo</Label>
                            <div className="flex items-center space-x-4">
                                {logoPreview && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
                                        <img 
                                            src={logoPreview} 
                                            alt="Company logo preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="logoUpload"
                                    type="file"
                                    onChange={handleLogoFileChange}
                                    accept="image/*"
                                    required
                                    className="bg-slate-700 border-slate-600 file:mr-4 file:py-25 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            </div>
                            {logoFile && <p className="text-xs text-gray-400 mt-1">Selected: {logoFile.name}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="passwordReg">Password</Label>
                                <Input id="passwordReg" name="password" type="password" value={formData.password} onChange={handleChange} required className="bg-slate-700 border-slate-600" />
                            </div>
                            <div>
                                <Label htmlFor="confirmPasswordReg">Confirm Password</Label>
                                <Input id="confirmPasswordReg" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="bg-slate-700 border-slate-600" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="documentUpload">Proof Document (e.g., Tax Document)</Label>
                            <Input
                                id="documentUpload"
                                type="file"
                                onChange={handleDocumentFileChange}
                                required
                                className="bg-slate-700 border-slate-600 file:mr-4 file:py-25 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                            {documentFile && <p className="text-xs text-gray-400 mt-1">Selected: {documentFile.name}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-gray-300 text-base py-3 mt-2">
                           <UserPlus className="mr-2 h-5 w-5" /> Register Company
                        </Button>
                    </form>
                </CardContent>
                 <CardFooter className="text-center bg-slate-800/50 border-slate-700">
                    <p className="text-sm text-gray-400">
                        Already have an account? <Button variant="link" onClick={() => navigate('login')} className="text-blue-400 hover:text-blue-300 p-0">Login Here</Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

const GlobalInternshipSearchFilter = ({ searchTerm, onSearch, filterOptions, onFilterChange, onViewAll, showViewAllButton }) => {
    const industries = ['Software Development', 'Renewable Energy', 'Healthcare', 'Finance', 'Marketing']; // Example industries
    const durations = ['1 month', '2 months', '3 months', '6 months', '1 year'];
    
    return (
        <Card className="mb-6 bg-slate-800 border-slate-800 shadow-lg">
            <CardContent className="p-4 space-y-3 md:space-y-0 md:flex md:items-end md:space-x-3">
                <div className="flex-grow">
                    <Label htmlFor="globalSearch" className="text-gray-400">Search Internships</Label>
                    <Input 
                        id="globalSearch"
                        type="text" 
                        placeholder="e.g., Software Engineer" 
                        value={searchTerm} 
                        onChange={(e) => onSearch(e.target.value)} 
                        className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500"
                        />
                </div>
                <div>
                    <Label htmlFor="filterIndustry" className="text-color">Industry</Label>
                    <Select id="filterIndustry" value={filterOptions.industry || ''} onChange={e => onFilterChange({...filterOptions, industry: e.target.value})} className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500">
                        <option value="">All Industries</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="filterDuration" className="text-color">Duration</Label>
                    <Select id="filterDuration" value={filterOptions.duration || ''} onChange={e => onFilterChange({...filterOptions, duration: e.target.value})} className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500">
                        <option value="">All Durations</option>
                        {durations.map(dur => <option key={dur} value={dur}>{dur}</option>)}
                    </Select>
                </div>
                <div>
                    <Label htmlFor="filterPaid" className="text-color">Payment</Label>
                    <Select id="filterPaid" value={filterOptions.paid === undefined ? '' : String(filterOptions.paid)} onChange={e => onFilterChange({...filterOptions, paid: e.target.value === '' ? undefined : e.target.value === 'true'})} className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500">
                        <option value="">Any</option>
                        <option value="true">Paid</option>
                        <option value="false">Unpaid</option>
                    </Select>
                </div>
                {showViewAllButton && (
                    <Button onClick={onViewAll} className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap mt-3 md:mt-0">
                        <Search className="mr-2 h-4 w-4" /> View All
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

const AllInternshipsView = ({ internships, navigate, currentUser }) => {
    console.log("AllInternshipsView Props: internships:", internships);
    console.log("AllInternshipsView Props: navigate:", typeof navigate);
    const [selectedInternship, setSelectedInternship] = useState(null);
    
    // All users see all internships passed to this component
    const displayInternships = internships;
    
    if (displayInternships.length === 0) {
        return <div className="text-center py-10 text-gray-400">
            <BookOpen className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold">No Internships Found</h3>
            <p>Try adjusting your search or filter criteria.</p>
        </div>;
    }
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-blue-400" />
                All Available Internships
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayInternships.map(internship => (
                    <Card key={internship.id} className="bg-slate-800 border-slate-700 hover:shadow-blue-500/30 hover:border-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 flex flex-col h-full">
                        <CardHeader className="h-32"> {/* Fixed height for header, remove line-clamp from title */}
                            <h3 className="text-xl font-semibold text-blue-400">{internship.title}</h3>
                            <p className="text-sm text-gray-300">{internship.companyName}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-gray-400"><Clock className="inline mr-1 h-4 w-4" /> Duration: {internship.duration}</p>
                            <p className="text-sm text-gray-400">{internship.paid ? `💰 Salary: ${internship.salary}` : ' Unpaid'}</p>
                            <p className="text-sm text-gray-400">Industry: {internship.industry}</p>
                        </CardContent>
                        <CardFooter className="bg-slate-800/50 border-slate-700">
                            <Button onClick={() => setSelectedInternship(internship)} variant="link" className="text-color hover:text-blue-300 p-0">
                                View Details <Eye className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {selectedInternship && (
                <InternshipDetailsModal internship={selectedInternship} onClose={() => setSelectedInternship(null)} />
            )}
        </div>
    );
};

const InternshipDetailsModal = ({ internship, onClose }) => {
    if (!internship) return null;
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{internship.title} at {internship.companyName}</DialogTitle>
                    <DialogDescription>Industry: {internship.industry}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-gray-300 pretty-prose">
                    <p><strong>Duration:</strong> {internship.duration}</p>
                    <p><strong>Paid:</strong> {internship.paid ? 'Yes' : 'No'}</p>
                    {internship.paid && <p><strong>Salary:</strong> {internship.salary}</p>}
                    <p><strong>Skills Required:</strong> {internship.skills.join(', ')}</p>
                    <p><strong>Job Description:</strong></p>
                    <p className="whitespace-pre-wrap bg-slate-700 p-3 rounded-md">{internship.description}</p>
                </div>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline" className="border-slate-500 text-gray-300 hover:bg-slate-600">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


// --- Company Portal ---
const CompanyPortal = ({ 
    currentUser, 
    setCurrentUser, 
    setCurrentPage, 
    companies, 
    setCompanies, 
    jobPostings, 
    setJobPostings, 
    applications, 
    setApplications, 
    interns, 
    setInterns, 
    evaluations, 
    setEvaluations, 
    students,
    setStudents, // Ensure this is properly destructured
    addNotification, 
    filteredGlobalInternships, 
    navigate, 
    currentPage,
    searchTerm, // Pass down searchTerm
    setSearchTerm, // Pass down setSearchTerm
    filterOptions, // Pass down filterOptions
    setFilterOptions // Pass down setFilterOptions
}) => {
    const [selectedJobFilter, setSelectedJobFilter] = useState('all');
    const [internSearchTerm, setInternSearchTerm] = useState('');
    console.log("CompanyPortal Props: filteredGlobalInternships:", filteredGlobalInternships);
    console.log("CompanyPortal Props: navigate:", typeof navigate);
    console.log("CompanyPortal Props: currentPage:", currentPage);
    const myCompany = companies.find(c => c.id === currentUser.id);
    const [editingJob, setEditingJob] = useState(null);
    const [viewingApplication, setViewingApplication] = useState(null);
    const [editingEvaluation, setEditingEvaluation] = useState(null);
    const [showJobForm, setShowJobForm] = useState(false);
    const [showEvaluationForm, setShowEvaluationForm] = useState(false);
    const [myJobSearchTerm, setMyJobSearchTerm] = useState('');
    const [myJobFilterOptions, setMyJobFilterOptions] = useState({});
    const [deletingJobId, setDeletingJobId] = useState(null);
    const [internFilter, setInternFilter] = useState('all');
    
    const myCompanyJobPostings = Object.values(jobPostings).filter(jp => jp.companyId === currentUser.id)
        .filter(job => {
            const matchesSearch = myJobSearchTerm === '' || job.title.toLowerCase().includes(myJobSearchTerm.toLowerCase());
            return matchesSearch;
        });
        
    const myCompanyApplications = Object.values(applications).filter(app => myCompanyJobPostings.some(job => job.id === app.jobId));
    
    // Filter applications based on selected job
    const filteredApplications = selectedJobFilter === 'all' 
        ? myCompanyApplications 
        : myCompanyApplications.filter(app => app.jobId === selectedJobFilter);
    
    const myCompanyInterns = Object.values(interns).filter(intern => intern.companyId === currentUser.id);
    
    // Calculate counts
    const currentInternsCount = myCompanyInterns.filter(intern => intern.status === 'current intern').length;
    const completedInternsCount = myCompanyInterns.filter(intern => intern.status === 'Internship complete').length;
    
    // Filter interns based on selected filter and search term
    const filteredInterns = Object.values(interns)
        .filter(intern => intern.companyId === currentUser.id)
        .filter(intern => {
            if (internFilter !== 'all') {
                if (internFilter === 'completed') return intern.status === 'Internship complete';
                if (internFilter === 'current') return intern.status === 'current intern';
            }
            return true;
        })
        .filter(intern => {
            if (!internSearchTerm) return true;
            const searchLower = internSearchTerm.toLowerCase();
            return (
                intern.studentName.toLowerCase().includes(searchLower) ||
                (jobPostings[intern.jobId]?.title || '').toLowerCase().includes(searchLower)
            );
        });

    const handleInternStatusChange = (internId, newStatus) => {
        const intern = interns[internId];
        
        // Validate status transition
        const validTransitions = {
            'pending': ['current intern'],
            'current intern': ['Internship complete'],
            'Internship complete': []
        };

        if (!validTransitions[intern.status]?.includes(newStatus)) {
            addNotification(`Invalid status transition from ${intern.status} to ${newStatus}.`, 'error');
            return;
        }

        // Check if there's already an active internship for this student at any company
        const hasActiveInternship = Object.values(interns).some(
            i => i.studentId === intern.studentId && 
                 i.id !== internId && 
                 i.status === 'current intern'
        );

        if (newStatus === 'current intern' && hasActiveInternship) {
            addNotification(`${intern.studentName} already has an active internship.`, 'error');
            return;
        }

        // Update intern status in state
        const updatedInterns = {
            ...interns,
            [internId]: { 
                ...interns[internId], 
                status: newStatus,
                ...(newStatus === 'current intern' ? { startDate: new Date().toISOString() } : {}),
                ...(newStatus === 'Internship complete' ? { endDate: new Date().toISOString() } : {})
            }
        };

        // If status is changed to complete, only clean up other intern entries for this student at THIS company
        if (newStatus === 'Internship complete') {
            Object.entries(updatedInterns).forEach(([id, i]) => {
                if (id !== internId && 
                    i.studentId === intern.studentId && 
                    i.companyId === intern.companyId && // Only clean up entries for the same company
                    i.status !== 'Internship complete') {
                    delete updatedInterns[id];
                }
            });

            // Update the corresponding application status to "Internship complete"
            const updatedApplications = { ...applications };
            Object.entries(updatedApplications).forEach(([id, app]) => {
                if (app.studentId === intern.studentId && app.jobId === intern.jobId) {
                    updatedApplications[id] = { ...app, status: 'Internship complete' };
                }
            });
            setApplications(updatedApplications);
            // localStorage.setItem('applications', JSON.stringify(updatedApplications)); // Rely on App.js useEffect

            // Update student's pro status if they've completed at least one internship
            const student = students[intern.studentId];
            if (student && !student.isPro) {
                const updatedStudents = {
                    ...students,
                    [intern.studentId]: {
                        ...student,
                        isPro: true,
                        proBadgeDate: new Date().toISOString()
                    }
                };
                setStudents(updatedStudents); // Use setStudents from props
                localStorage.setItem('students', JSON.stringify(updatedStudents));
                addNotification(`${intern.studentName} has earned Pro Student status!`, 'success');
            }
        }

        setInterns(updatedInterns);
        // localStorage.setItem('interns', JSON.stringify(updatedInterns)); // Rely on App.js useEffect

        addNotification(`Intern status updated to ${newStatus}.`, 'success');

        if (newStatus === 'Internship complete') {
            addNotification(`Don't forget to submit an evaluation for ${intern.studentName}.`, 'info');
        }
    };

    const handleCreateOrUpdateEvaluation = (evalData) => {
        const intern = interns[evalData.internId];
        if (!intern || intern.status !== 'Internship complete') {
            addNotification("Evaluation can only be done for interns who completed their internship.", "error");
            return;
        }
        
        if (editingEvaluation) {
            setEvaluations(prev => ({ ...prev, [editingEvaluation.id]: { ...prev[editingEvaluation.id], ...evalData, studentName: intern.studentName, companyName: currentUser.name, visibleToScad: true } }));
            addNotification(`Evaluation for ${intern.studentName} updated.`, 'success');
        } else {
            const newEvalId = `eval${Object.keys(evaluations).length + 1}`;
            const newEval = { ...evalData, id: newEvalId, studentName: intern.studentName, companyName: currentUser.name, date: new Date().toISOString().split('T')[0], visibleToScad: true };
            setEvaluations(prev => ({ ...prev, [newEvalId]: newEval }));
            setInterns(prev => ({...prev, [intern.id]: {...intern, evaluation: newEvalId}}));
            addNotification(`Evaluation for ${intern.studentName} created.`, 'success');
        }
        setEditingEvaluation(null);
        setShowEvaluationForm(false);
    };
    
    const handleCreateOrUpdateJob = (jobData) => {
        if (editingJob) {
            // Update existing job
            const updatedJob = {
                ...jobPostings[editingJob.id],
                ...jobData,
                companyId: currentUser.id,
                companyName: currentUser.name
            };
            const updatedJobPostings = {
                ...jobPostings,
                [editingJob.id]: updatedJob
            };
            setJobPostings(updatedJobPostings);
            localStorage.setItem('jobPostings', JSON.stringify(updatedJobPostings));
            
            // Update company's jobPostings array if needed
            const company = companies.find(c => c.id === currentUser.id);
            if (company && !company.jobPostings.includes(editingJob.id)) {
                const updatedCompany = {
                    ...company,
                    jobPostings: [...company.jobPostings, editingJob.id]
                };
                const updatedCompanies = companies.map(c => 
                    c.id === currentUser.id ? updatedCompany : c
                );
                setCompanies(updatedCompanies);
                localStorage.setItem('companies', JSON.stringify(updatedCompanies));
            }
            
            addNotification(`Job posting "${jobData.title}" updated successfully.`, 'success');
        } else {
            // Create new job
            const newJobId = `job${Date.now()}`;
            const newJob = {
                ...jobData,
                id: newJobId,
                companyId: currentUser.id,
                companyName: currentUser.name,
                applications: [],
                status: 'open'
            };
            
            // Update jobPostings
            const updatedJobPostings = {
                ...jobPostings,
                [newJobId]: newJob
            };
            setJobPostings(updatedJobPostings);
            localStorage.setItem('jobPostings', JSON.stringify(updatedJobPostings));
            
            // Update company's jobPostings array
            const company = companies.find(c => c.id === currentUser.id);
            if (company) {
                const updatedCompany = {
                    ...company,
                    jobPostings: [...company.jobPostings, newJobId]
                };
                const updatedCompanies = companies.map(c => 
                    c.id === currentUser.id ? updatedCompany : c
                );
                setCompanies(updatedCompanies);
                localStorage.setItem('companies', JSON.stringify(updatedCompanies));
            }
            
            addNotification(`New job posting "${jobData.title}" created.`, 'success');
        }
        setEditingJob(null);
        setShowJobForm(false);
    };
    
    const handleDeleteJob = (jobId) => {
        setDeletingJobId(jobId);
    };

    const confirmDeleteJob = () => {
        if (deletingJobId) {
            // Remove job from jobPostings state (which is an object)
            const updatedJobPostings = { ...jobPostings };
            delete updatedJobPostings[deletingJobId];
            setJobPostings(updatedJobPostings);
            
            // Remove job reference from company's jobPostings array
            setCompanies(prevCompanies => 
                prevCompanies.map(company => {
                    if (company.jobPostings.includes(deletingJobId)) {
                        return {
                            ...company,
                            jobPostings: company.jobPostings.filter(id => id !== deletingJobId)
                        };
                    }
                    return company;
                })
            );
            
            // Remove related applications (applications is an object)
            const updatedApplications = { ...applications };
            Object.keys(updatedApplications).forEach(appId => {
                if (updatedApplications[appId].jobId === deletingJobId) {
                    delete updatedApplications[appId];
                }
            });
            setApplications(updatedApplications);

            // NEW: Remove related interns (interns is an object)
            const updatedInterns = { ...interns };
            Object.keys(updatedInterns).forEach(internId => {
                if (updatedInterns[internId].jobId === deletingJobId) {
                    // Before deleting intern, also delete its evaluation if it exists
                    const internToDelete = updatedInterns[internId];
                    if (internToDelete.evaluation) {
                        setEvaluations(prevEvals => {
                            const newEvals = {...prevEvals};
                            delete newEvals[internToDelete.evaluation];
                            return newEvals;
                        });
                    }
                    delete updatedInterns[internId];
                }
            });
            setInterns(updatedInterns);
            
            addNotification("Job posting and all related data (applications, internships, evaluations) deleted successfully.", 'success');
            setDeletingJobId(null);
        }
    };
    
    const handleApplicationStatusChange = (appId, newStatus) => {
        const app = applications[appId];
        
        // Handle rejected applications - remove any existing intern entries
        if (newStatus === 'rejected') {
            const updatedInterns = { ...interns };
            Object.entries(updatedInterns).forEach(([id, intern]) => {
                if (intern.studentId === app.studentId && 
                    intern.companyId === currentUser.id && 
                    intern.status !== 'Internship complete') { // Don't remove completed internships
                    delete updatedInterns[id];
                }
            });
            setInterns(updatedInterns);
            localStorage.setItem('interns', JSON.stringify(updatedInterns));

            // Update application status for rejected applications
            const updatedApplications = {
                ...applications,
                [appId]: {...applications[appId], status: 'rejected'}
            };
            setApplications(updatedApplications);
            localStorage.setItem('applications', JSON.stringify(updatedApplications));
            addNotification(`Application has been rejected.`, 'info');
            return;
        }
        
        // Create intern entry when application is accepted
        if (newStatus === 'accepted') {
            // First clean up any non-completed intern entries for this student at this company
            const newInternState = { ...interns };
            Object.entries(newInternState).forEach(([id, intern]) => {
                if (intern.studentId === app.studentId && 
                    intern.companyId === currentUser.id && 
                    intern.status !== 'Internship complete') { // Preserve completed internships
                    delete newInternState[id];
                }
            });

            // --- DIAGNOSTIC LOGGING START ---
            console.log('[CompanyPortal] Attempting to accept application:', {
                studentId: app.studentId,
                studentName: app.studentName,
                jobId: app.jobId,
                currentCompanyId: currentUser.id,
                allInternsState: JSON.parse(JSON.stringify(interns)) // Deep copy for clean logging
            });
            // --- DIAGNOSTIC LOGGING END ---

            // Check if student has active internship at any company
            const studentHasActiveInternship = Object.values(interns).some(
                intern => intern.studentId === app.studentId && 
                         intern.status === 'current intern'
            );

            // --- DIAGNOSTIC LOGGING START ---
            console.log('[CompanyPortal] studentHasActiveInternship check result:', studentHasActiveInternship);
            // --- DIAGNOSTIC LOGGING END ---

            if (studentHasActiveInternship) {
                addNotification(`${app.studentName} already has an active internship and cannot be accepted for another at this time.`, 'error');
                // Optionally, revert application status or handle as needed if UI changes optimistically
                // For now, just prevent new intern creation and state update for this app
                 // --- DIAGNOSTIC LOGGING START ---
                console.log('[CompanyPortal] Acceptance BLOCKED for student:', app.studentName);
                // --- DIAGNOSTIC LOGGING END ---
                return; 
            }
            
            // Create new intern entry
            const internId = `intern${Date.now()}`;
            const job = jobPostings[app.jobId];
            const newIntern = {
                id: internId,
                studentId: app.studentId,
                studentName: app.studentName,
                companyId: currentUser.id,
                companyName: currentUser.name,
                jobId: app.jobId,
                jobTitle: job?.title || 'Unknown Position',
                status: 'current intern',
                evaluation: null,
                startDate: new Date().toISOString()
            };
            
            // Update interns state and localStorage
            newInternState[internId] = newIntern;
            setInterns(newInternState);
            // localStorage.setItem('interns', JSON.stringify(newInternState)); // Rely on App.js useEffect
            
            // Remove the accepted application. Other pending applications from this student will remain pending.
            const updatedApplications = { ...applications };
            delete updatedApplications[appId]; // Remove the accepted application

            // Formerly: Reject other pending applications from this student
            // Object.entries(updatedApplications).forEach(([id, application]) => {
            //     if (application.studentId === app.studentId && 
            //         application.status === 'pending') {
            //         updatedApplications[id] = {...application, status: 'rejected'};
            //     }
            // });
            
            setApplications(updatedApplications);
            // localStorage.setItem('applications', JSON.stringify(updatedApplications)); // Rely on App.js useEffect
            
            addNotification(`${app.studentName} has been accepted as an intern.`, 'success');
            // Notification updated: We no longer auto-reject other pending applications.
            // addNotification(`All other pending applications from ${app.studentName} have been automatically rejected.`, 'info');
        }
    };
    
    const handleDeleteEvaluation = (evalId) => {
        if (window.confirm("Are you sure you want to delete this evaluation?")) {
            const updatedEvaluations = { ...evaluations };
            const evalToDelete = updatedEvaluations[evalId];
            delete updatedEvaluations[evalId];
            setEvaluations(updatedEvaluations);
            // Remove link from intern object
            const internToUpdate = Object.values(interns).find(i => i.evaluation === evalId);
            if (internToUpdate) {
                setInterns(prev => ({...prev, [internToUpdate.id]: {...internToUpdate, evaluation: null}}));
            }
            addNotification(`Evaluation for ${evalToDelete.studentName} deleted.`, 'info');
        }
    };
    
    const handleProfileUpdate = (updatedCompanyData, newLogoFile) => {
        let newLogoUrlForDisplay = myCompany?.logo;

        setCompanies(prevCompanies =>
            prevCompanies.map(company => {
                if (company.id === updatedCompanyData.id) {
                    let finalLogoUrl = company.logo;
                    
                    if (newLogoFile) {
                        // Revoke previous blob URL if it exists
                        if (company.logo && company.logo.startsWith('blob:')) {
                            URL.revokeObjectURL(company.logo);
                        }
                        finalLogoUrl = URL.createObjectURL(newLogoFile);
                        newLogoUrlForDisplay = finalLogoUrl;
                    } else if (updatedCompanyData.logo) {
                        finalLogoUrl = updatedCompanyData.logo;
                        newLogoUrlForDisplay = finalLogoUrl;
                    }
                    
                    return {
                        ...company,
                        ...updatedCompanyData,
                        logo: finalLogoUrl || getPlaceholderLogo(updatedCompanyData.name)
                    };
                }
                return company;
            })
        );
        
        // Update currentUser state in App.js to ensure AppHeader reflects changes immediately
        if (currentUser.id === updatedCompanyData.id) {
            setCurrentUser(prev => ({
                ...prev,
                name: updatedCompanyData.name,
                logo: newLogoUrlForDisplay || getPlaceholderLogo(updatedCompanyData.name)
            }));
        }
        
        addNotification("Company profile updated successfully!", "success");
        setShowProfileEditForm(false);
    };

    const renderCompanyPageContent = () => {
        switch (currentPage) {
            case 'companyDashboard':
                return (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <DashboardStatCard title="My Job Postings" value={myCompanyJobPostings.length} icon={<Briefcase />} color="blue" onClick={() => setCurrentPage('myJobPostings')} />
                            <DashboardStatCard title="Total Applications" value={myCompanyApplications.length} icon={<FileText />} color="green" onClick={() => setCurrentPage('viewApplications')} />
                            <DashboardStatCard title="Current Interns" value={currentInternsCount} icon={<Users />} color="yellow" onClick={() => { setCurrentPage('manageInterns'); setInternFilter('current'); }} />
                            <DashboardStatCard title="Completed Internships" value={completedInternsCount} icon={<UserCheck />} color="purple" onClick={() => { setCurrentPage('manageInterns'); setInternFilter('completed'); }} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Quick Actions</h3>
                            <div className="flex space-x-4">
                                <Button onClick={() => { setEditingJob(null); setShowJobForm(true); }} className="bg-green-600 hover:bg-green-700"><PlusCircle className="mr-2 h-5 w-5"/>Create New Job Post</Button>
                                <Button onClick={() => setCurrentPage('allInternships')} variant="secondary" className="bg-slate-600 hover:bg-slate-500 text-white"><Search className="mr-2 h-5 w-5"/>View All Internships</Button>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-2xl font-semibold mb-4 mt-8 text-gray-200">Recent Applications</h3>
                            <div className="space-y-2">
                                {myCompanyApplications.slice(0,3).map(app => (
                                    <ApplicationCard key={app.id} application={app} jobPostings={jobPostings} onSelect={() => setViewingApplication(app)} />
                                ))}
                                {myCompanyApplications.length === 0 && <p className="text-gray-400">No recent applications.</p>}
                            </div>
                        </div>
                    </div>
                );
            case 'myJobPostings':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white flex items-center"><Briefcase className="mr-3 h-8 w-8 text-blue-400" />My Job Postings</h2>
                            <Button onClick={() => { setEditingJob(null); setShowJobForm(true); }} className="bg-green-600 hover:bg-green-700"><PlusCircle className="mr-2 h-5 w-5"/>Create New Job</Button>
                        </div>
                        {/* Add search/filter for company's own jobs here if needed */}
                        <div className="space-y-4">
                            {myCompanyJobPostings.map(job => (
                                <JobPostingCardCompanyView 
                                    key={job.id} 
                                    job={job} 
                                    applications={applications}
                                    onEdit={() => { setEditingJob(job); setShowJobForm(true); }} 
                                    onDelete={() => handleDeleteJob(job.id)} 
                                    onViewApps={() => { /* TODO: Navigate to apps for this job */ setCurrentPage('viewApplications'); /* set filter for this job */}}
                                />
                            ))}
                            {myCompanyJobPostings.length === 0 && <p className="text-gray-400 text-center py-6">You have not posted any jobs yet.</p>}
                        </div>
                    </div>
                );
                case 'viewApplications':
                    return (
                        <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white flex items-center">
                                <FileText className="mr-3 h-8 w-8 text-green-400" />Received Applications
                            </h2>
                            <div className="w-72">
                                <Label htmlFor="jobFilter" className="text-sm text-gray-400">Filter by Job Posting</Label>
                                <Select 
                                    id="jobFilter"
                                    value={selectedJobFilter}
                                    onChange={(e) => setSelectedJobFilter(e.target.value)}
                                    className="bg-slate-700 border-slate-600 mt-1"
                                >
                                    <option value="all">All Job Postings</option>
                                    {myCompanyJobPostings.map(job => (
                                        <option key={job.id} value={job.id}>
                                            {job.title}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {filteredApplications.map(app => (
                                <ApplicationCard 
                                    key={app.id} 
                                    application={app} 
                                    jobPostings={jobPostings} 
                                    onSelect={() => setViewingApplication(app)} 
                                />
                            ))}
                            {filteredApplications.length === 0 && (
                                <p className="text-gray-400 text-center py-6">
                                    {selectedJobFilter === 'all' 
                                        ? 'No applications received yet.'
                                        : `No applications received for this job posting.`}
                                </p>
                            )}
                        </div>
                    </div>
                );
                case 'manageInterns':
                    return (
                        <div>
                            <div className="flex flex-col gap-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl font-bold text-white flex items-center">
                                        <Users className="mr-3 h-8 w-8 text-yellow-400" />
                                        {internFilter === 'completed' ? 'Completed Internships' : 
                                         internFilter === 'current' ? 'Current Interns' : 
                                         'All Interns'}
                                    </h2>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant={internFilter === 'all' ? "default" : "outline"} 
                                            onClick={() => setInternFilter('all')}
                                            className={internFilter === 'all' ? "bg-blue-600" : "border-blue-500 text-blue-400"}
                                        >
                                            All
                                        </Button>
                                        <Button 
                                            variant={internFilter === 'current' ? "default" : "outline"} 
                                            onClick={() => setInternFilter('current')}
                                            className={internFilter === 'current' ? "bg-yellow-600" : "border-yellow-500 text-yellow-400"}
                                        >
                                            Current
                                        </Button>
                                        <Button 
                                            variant={internFilter === 'completed' ? "default" : "outline"} 
                                            onClick={() => setInternFilter('completed')}
                                            className={internFilter === 'completed' ? "bg-purple-600" : "border-purple-500 text-purple-400"}
                                        >
                                            Completed
                                        </Button>
                                    </div>
                                </div>
                                <div className="relative w-full max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by intern name or job title..."
                                        value={internSearchTerm}
                                        onChange={(e) => setInternSearchTerm(e.target.value)}
                                        className="w-full h-10 pl-10 pr-4 rounded-md border border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {filteredInterns.map(intern => (
                                    <InternCard 
                                        key={intern.id} 
                                        intern={intern} 
                                        jobPostings={jobPostings} 
                                        evaluations={evaluations}
                                        onStatusChange={handleInternStatusChange}
                                        onEvaluate={() => { 
                                            if (intern.status !== 'Internship complete') {
                                                addNotification("Can only evaluate interns who completed their internship.", "warn");
                                                return;
                                            }
                                            const existingEval = intern.evaluation ? evaluations[intern.evaluation] : null;
                                            setEditingEvaluation(existingEval || { internId: intern.id });
                                            setShowEvaluationForm(true);
                                        }}
                                        onViewEvaluation={(evalId) => {
                                            setEditingEvaluation(evaluations[evalId]);
                                            setShowEvaluationForm(true);
                                        }}
                                    />
                                ))}
                                {filteredInterns.length === 0 && (
                                    <p className="text-gray-400 text-center py-6">
                                        {internSearchTerm 
                                            ? 'No interns found matching your search.'
                                            : internFilter === 'completed' 
                                                ? 'No completed internships found.' 
                                                : internFilter === 'current' 
                                                    ? 'No current interns found.'
                                                    : 'No interns found.'}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                case 'allInternships':
                    console.log("CompanyPortal rendering AllInternshipsView with:", filteredGlobalInternships);
                    return <AllInternshipsView internships={filteredGlobalInternships} navigate={navigate} currentUser={currentUser} />;
                default:
                    if (currentPage !== 'allInternships')
                        setCurrentPage('companyDashboard'); // Fallback to dashboard
                        return null;
                    }
                };
                
                // Create a file input ref outside the render function
                const fileInputRef = useRef(null);
                
                // Handle file selection
                const handleFileUpload = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        // Create a URL for the uploaded file
                        const fileURL = URL.createObjectURL(file);
                        // Simulate adding a document with actual URL
                        const newDoc = {
                            name: file.name, 
                            url: fileURL,
                            type: file.type,
                            size: file.size
                        };
                        setCompanies(prevCompanies => prevCompanies.map(c => 
                            c.id === myCompany.id 
                                ? {...c, documents: [...c.documents, newDoc]} 
                                : c
                        ));
                        addNotification(`Document ${file.name} uploaded for ${myCompany.name}.`, "success");
                    }
                };
                
                // Handle document download
                const handleDocumentDownload = (doc) => {
                    // Create an anchor element and trigger download
                    const a = document.createElement('a');
                    a.href = doc.url;
                    a.download = doc.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    addNotification(`Downloading ${doc.name}`, 'info');
                };
                
                // Handle edit profile
                const handleEditProfile = () => {
                    // You would typically show a modal or navigate to a profile edit page
                    // Moving the state declaration outside of this function to follow React rules
                    setShowProfileEditForm(true);
                };
                
                // Define state outside of the handler function to follow React rules
                const [showProfileEditForm, setShowProfileEditForm] = useState(false);
                
                return (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
                <CompanySidebar navigate={setCurrentPage} currentPage={currentPage} />
                 <Card className="mt-6 bg-slate-800 border-slate-700">
                    <CardHeader><h3 className="font-semibold text-lg text-white">Company Profile</h3></CardHeader>
                    <CardContent className="text-sm">
                        <div className="relative w-20 h-20 mx-auto mb-3">
                            <img 
                                src={myCompany.logo || getPlaceholderLogo(myCompany.name)} 
                                alt={myCompany.name} 
                                className="w-full h-full rounded-full object-cover border-2 border-blue-500"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getPlaceholderLogo(myCompany.name);
                                }}
                            />
                        </div>
                        <p className="text-gray-300"><strong>Name:</strong> {myCompany.name}</p>
                        <p className="text-gray-300"><strong>Industry:</strong> {myCompany.industry}</p>
                        <p className="text-gray-300"><strong>Email:</strong> {myCompany.email}</p>
                        <p className="text-gray-300"><strong>Size:</strong> {myCompany.companySize}</p>
                        <Button variant="outline" size="sm" className="w-full mt-3 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-color" onClick={handleEditProfile}>
                            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                        {/* Hidden file input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileUpload} 
                            accept=".pdf,.doc,.docx,.txt"
                        />
                        <Button variant="outline" size="sm" className="w-full mt-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white" onClick={() => fileInputRef.current.click()}>
                            <FileUp className="mr-2 h-4 w-4" /> Upload Documents
                        </Button>
                         {myCompany.documents && myCompany.documents.length > 0 && (
                             <div className="mt-3">
                                <p className="text-gray-300 font-semibold">Uploaded Documents:</p>
                                <ul className="list-disc list-inside text-gray-400">
                                    {myCompany.documents.map((doc, idx) => (
                                        <li key={idx} className="truncate">
                                            <a 
                                                href={doc.url} 
                                                className="hover:text-blue-400 cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDocumentDownload(doc);
                                                }}
                                            >
                                                {doc.name} <Download className="inline h-3 w-3" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-9">
                {renderCompanyPageContent()}
            </div>

            {/* Modals for Company */}
            {showProfileEditForm && (
                <CompanyProfileEditForm
                    company={myCompany}
                    onSubmit={handleProfileUpdate}
                    onClose={() => setShowProfileEditForm(false)}
                    addNotification={addNotification}
                />
            )}
            {(showJobForm || editingJob) && (
                <JobPostingForm
                initialData={editingJob}
                onSubmit={handleCreateOrUpdateJob}
                onClose={() => { setShowJobForm(false); setEditingJob(null); }}
                />
            )}
            {viewingApplication && (
                <ApplicationDetailsModal
                application={viewingApplication}
                    jobPostings={jobPostings}
                    students={students}
                    onClose={() => setViewingApplication(null)}
                    onStatusChange={handleApplicationStatusChange}
                    />
                )}
            {(showEvaluationForm || editingEvaluation) && editingEvaluation?.internId && ( // Ensure internId is present for new evals
                 <EvaluationForm
                    initialData={evaluations[interns[editingEvaluation.internId]?.evaluation] || editingEvaluation} // If editing existing or new
                    intern={interns[editingEvaluation.internId]}
                    onSubmit={handleCreateOrUpdateEvaluation}
                    onClose={() => { setShowEvaluationForm(false); setEditingEvaluation(null); }}
                    onDelete={editingEvaluation && evaluations[editingEvaluation.id] ? () => handleDeleteEvaluation(editingEvaluation.id) : null} // Only allow delete for existing
                    />
                )}
            {(showEvaluationForm || editingEvaluation) && editingEvaluation && !editingEvaluation.internId && evaluations[editingEvaluation.id] && ( // For viewing/editing existing eval directly
                 <EvaluationForm
                    initialData={editingEvaluation} 
                    intern={Object.values(interns).find(i => i.evaluation === editingEvaluation.id)}
                    onSubmit={handleCreateOrUpdateEvaluation}
                    onClose={() => { setShowEvaluationForm(false); setEditingEvaluation(null); }}
                    onDelete={() => handleDeleteEvaluation(editingEvaluation.id)}
                    />
            )}

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                isOpen={deletingJobId !== null}
                onClose={() => setDeletingJobId(null)}
                onConfirm={confirmDeleteJob}
                title="Delete Job Posting"
                message="Are you sure you want to delete this job posting? This action cannot be undone."
            />
        </div>
    );
    
};

const CompanySidebar = ({ navigate, currentPage }) => {
    const linkClass = (page) => `flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`;
    return (
        <Card className="bg-slate-800 border-slate-700 p-0"> {/* Remove Card padding, apply to nav */}
            <nav className="space-y-1 p-4">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('companyDashboard'); }} className={linkClass('companyDashboard')}>
                    <Maximize2 className="h-5 w-5" /><span>Dashboard</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('myJobPostings'); }} className={linkClass('myJobPostings')}>
                    <Briefcase className="h-5 w-5" /><span>My Job Postings</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('viewApplications'); }} className={linkClass('viewApplications')}>
                    <FileText className="h-5 w-5" /><span>Applications</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('manageInterns'); }} className={linkClass('manageInterns')}>
                    <Users className="h-5 w-5" /><span>Manage Interns</span>
                </a>
                 <a href="#" onClick={(e) => { e.preventDefault(); navigate('allInternships'); }} className={linkClass('allInternships')}>
                    <Search className="h-5 w-5" /><span>All Internships</span>
                </a>
            </nav>
        </Card>
    );
};

const DashboardStatCard = ({ title, value, icon, color, onClick }) => {
    const colors = {
        blue: 'border-blue-500 text-blue-400',
        green: 'border-green-500 text-green-400',
        yellow: 'border-yellow-500 text-yellow-400',
        purple: 'border-purple-500 text-purple-400',
    };
    return (
        <Card onClick={onClick} className={`bg-slate-800 border-l-4 ${colors[color]} hover:bg-slate-700/70 cursor-pointer transition-all`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
                        <p className="text-3xl font-bold text-white">{value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${color}-500/20`}>
                        {React.cloneElement(icon, { className: `h-7 w-7 ${colors[color].split(' ')[1]}` })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const JobPostingForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        duration: initialData?.duration || '3 months',
        paid: initialData?.paid === undefined ? true : initialData.paid,
        salary: initialData?.salary || '',
        skills: initialData?.skills?.join(', ') || '',
        description: initialData?.description || '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, skills: formData.skills.split(',').map(s => s.trim()).filter(s => s) });
    };
    
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Job Posting' : 'Create New Job Posting'}</DialogTitle>
                    <DialogDescription>Fill in the details for your internship position</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="bg-slate-700 border-slate-600"/>
                    </div>
                    <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select id="duration" name="duration" value={formData.duration} onChange={handleChange} className="bg-slate-700 border-slate-600">
                            <option value="1 month">1 month</option>
                            <option value="2 months">2 months</option>
                            <option value="3 months">3 months</option>
                            <option value="6 months">6 months</option>
                            <option value="1 year">1 year</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="paid">Paid Internship?</Label>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="paid" value="true" checked={formData.paid === true} onChange={() => setFormData(f => ({...f, paid: true}))} className="form-radio h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"/>
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="paid" value="false" checked={formData.paid === false} onChange={() => setFormData(f => ({...f, paid: false}))} className="form-radio h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"/>
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                    {formData.paid && (
                        <div>
                            <Label htmlFor="salary">Expected Salary (if paid)</Label>
                            <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g., 1000 USD/month" className="bg-slate-700 border-slate-600"/>
                        </div>
                    )}
                    <div>
                        <Label htmlFor="skills">Skills Required (comma-separated)</Label>
                        <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., React, Node.js, Figma" className="bg-slate-700 border-slate-600"/>
                    </div>
                    <div>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="bg-slate-700 border-slate-600"/>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} className="border-slate-500 text-gray-300 hover:bg-slate-600">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{initialData ? 'Save Changes' : 'Create Job'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const JobPostingCardCompanyView = ({ job, applications, onEdit, onDelete, onViewApps }) => {
    const numApplications = Object.values(applications).filter(app => app.jobId === job.id).length;
    return (
        <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-400">{job.title}</h3>
                        <p className="text-sm text-gray-400">Duration: {job.duration} - {job.paid ? `Paid (${job.salary})` : 'Unpaid'}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'open' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}`}>
                        {job.status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-300 mb-1"><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p className="text-sm text-gray-300 line-clamp-2"><strong>Description:</strong> {job.description}</p>
                 <p className="text-sm text-blue-300 font-medium cursor-pointer hover:underline mt-2" onClick={onViewApps}>
                    {numApplications} Application(s) Received
                </p>
                <div className="flex justify-end space-x-2 border-t border-slate-700">
                    <Button variant="outline" size="sm" onClick={onEdit} className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"><Edit3 className="mr-1 h-4 w-4"/>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={onDelete}><Trash2 className="mr-1 h-4 w-4"/>Delete</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const ApplicationCard = ({ application, jobPostings, onSelect }) => {
    const job = jobPostings[application.jobId];

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'bg-green-600 text-green-100';
            case 'rejected':
                return 'bg-red-600 text-red-100';
            case 'finalized':
                return 'bg-blue-600 text-blue-100';
            case 'current intern':
                return 'bg-teal-600 text-teal-100';
            case 'internship complete':
                return 'bg-purple-600 text-purple-100';
            case 'pending':
                return 'bg-yellow-600 text-yellow-100';
            default:
                return 'bg-gray-600 text-gray-100';
        }
    };

    return (
        <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer" onClick={onSelect}>
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-lg text-blue-300">{application.studentName}</h4>
                        <p className="text-sm text-gray-400">Applied for: {job?.title || 'N/A'}</p>
                        <p className="text-xs text-gray-500">Date: {new Date(application.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusStyle(application.status)}`}>
                        {application.status}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

const ApplicationDetailsModal = ({ application, jobPostings, students, onClose, onStatusChange, addNotification }) => {
    // Use local state to track current status - moved before null check
    const [currentStatus, setCurrentStatus] = useState(application?.status || 'pending');
    
    // Update local state when application prop changes - moved before null check
    useEffect(() => {
        if (application) {
            setCurrentStatus(application.status);
        }
    }, [application?.status]);

    if (!application) return null;
    
    const job = jobPostings[application.jobId];
    const student = students[application.studentId];
    
    // Define application status options (in ApplicationDetailsModal)
    const availableStatuses = [
        { value: "finalized", label: "Finalized" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" }
    ];

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'text-green-400';
            case 'rejected':
                return 'text-red-400';
            case 'finalized':
                return 'text-purple-400';
            case 'current intern':
                return 'text-teal-400';
            case 'internship complete':
                return 'text-purple-400';
            case 'pending':
                return 'text-yellow-400';
            default:
                return 'text-gray-400';
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
        onStatusChange(application.id, newStatus);
    };
    
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                     <DialogTitle>Application Details: {student?.name || 'N/A'}</DialogTitle>
                     <DialogDescription>For: {job?.title || 'N/A'}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Applicant:</strong> {student?.name || 'N/A'} ({student?.email || 'N/A'})</p>
                    <p><strong>Applied for:</strong> {job?.title || 'N/A'}</p>
                    <p><strong>Application Date:</strong> {new Date(application.date).toLocaleDateString()}</p>
                    <p><strong>Current Status:</strong> <span className={`font-semibold capitalize ${getStatusStyle(currentStatus)}`}>{currentStatus}</span></p>
                    {/* <p><a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" onClick={(e) => {e.preventDefault(); addNotification("Simulating resume download/view.")}}>View Resume (Simulated) <Download className="inline h-4 w-4"/></a></p> */}
                    
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <Label htmlFor="appStatusChange" className="mb-1 block">Change Status:</Label>
                        <div className="flex space-x-2">
                            <Select 
                                id="appStatusChange" 
                                value={currentStatus}
                                onChange={handleStatusChange}
                                className="bg-slate-700 border-slate-600 flex-grow"
                            >
                                {availableStatuses.map(status => (
                                    <option key={status.value} value={status.value} className="capitalize">
                                        {status.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-500 text-gray-300 hover:bg-slate-600">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const InternCard = ({ intern, jobPostings, evaluations, onStatusChange, onEvaluate, onViewEvaluation }) => {
    const job = jobPostings[intern.jobId];
    const evaluation = intern.evaluation ? evaluations[intern.evaluation] : null;

    return (
        <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-lg text-blue-300">{intern.studentName}</h4>
                        <p className="text-sm text-gray-400">Interning as: {job?.title || 'N/A'}</p>
                    </div>
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                         intern.status === 'current intern' ? 'bg-teal-600 text-teal-100' :
                         intern.status === 'Internship complete' ? 'bg-purple-600 text-purple-100' :
                         intern.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                         'bg-gray-600 text-gray-100'
                    }`}>
                        {intern.status}
                    </span>
                </div>
                <div className="mt-3 space-y-2">
                    <div>
                        <Label htmlFor={`internStatus-${intern.id}`} className="text-xs text-gray-500">Update Status:</Label>
                        <Select 
                            id={`internStatus-${intern.id}`}
                            value={intern.status}
                            onChange={(e) => onStatusChange(intern.id, e.target.value)}
                            className="bg-slate-700 border-slate-600 text-sm h-9"
                        >
                            <option value="current intern">Current Intern</option>
                            <option value="Internship complete">Internship Complete</option>
                        </Select>
                    </div>
                    {intern.status === 'Internship complete' && (
                        evaluation ? (
                             <Button variant="outline" size="sm" onClick={() => onViewEvaluation(evaluation.id)} className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white w-full">
                                <FileText className="mr-2 h-4 w-4" /> View/Edit Evaluation
                            </Button>
                        ) : (
                            <Button variant="secondary" size="sm" onClick={onEvaluate} className="bg-green-600 hover:bg-green-700 text-white w-full">
                                <PlusCircle className="mr-2 h-4 w-4" /> Create Evaluation
                            </Button>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const EvaluationForm = ({ initialData, intern, onSubmit, onClose, onDelete }) => {
    const [formData, setFormData] = useState({
        rating: initialData?.rating || 3, // Default to neutral
        comments: initialData?.comments || '',
        internId: initialData?.internId || intern?.id, // Ensure internId is set
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e, addNotification) => {
        e.preventDefault();
        if (!formData.internId) {
            addNotification("Error: Intern ID is missing for this evaluation.");
            return;
        }
        onSubmit({ ...formData, rating: parseInt(formData.rating) });
    };

    if (!intern && !initialData?.studentName) { // If intern object is not passed (e.g. direct edit) and no name in initialData
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent title="Error">
                    <p className="text-red-400">Cannot load evaluation form. Intern details missing.</p>
                    <DialogFooter><Button onClick={onClose}>Close</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
    
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                    <DialogTitle>{initialData?.id ? `Edit Evaluation for ${initialData.studentName}` : `Evaluate ${intern?.studentName || initialData?.studentName}`}</DialogTitle>
                    <DialogDescription>Provide feedback and rating for the intern's performance</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="rating">Overall Rating (1-5)</Label>
                        <Select id="rating" name="rating" value={formData.rating} onChange={handleChange} className="bg-slate-700 border-slate-600">
                            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r>1?'s':''}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="comments">Comments</Label>
                        <Textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={5} required className="bg-slate-700 border-slate-600"/>
                    </div>
                    <DialogFooter>
                        {initialData?.id && onDelete && <Button type="button" variant="destructive" onClick={() => {onDelete(initialData.id); onClose();}}>Delete</Button>}
                        <Button type="button" variant="outline" onClick={onClose} className="border-slate-500 text-gray-300 hover:bg-slate-600">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{initialData?.id ? 'Save Changes' : 'Submit Evaluation'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


// --- PRO Student Portal ---
const ProStudentPortal = ({ currentUser, navigate, currentPage, setCurrentPage, students, setStudents, companies, assessments, setAssessments, workshops, setWorkshops, addNotification, initialJobPostingsData, searchTerm, setSearchTerm, filterOptions, setFilterOptions, filteredGlobalInternships }) => {
    const currentStudent = students[currentUser.id];
    const [viewingWorkshop, setViewingWorkshop] = useState(null);
    const [takingAssessment, setTakingAssessment] = useState(null);
    const [viewingAssessmentScore, setViewingAssessmentScore] = useState(null);
    const [workshopNotes, setWorkshopNotes] = useState({}); // { workshopId: "notes content" }
    
    const handleRegisterWorkshop = (workshopId) => {
        const workshopToRegister = workshops.find(ws => ws.id === workshopId); // Get workshop object
        if (!workshopToRegister) return;

        setStudents(prev => ({
            ...prev,
            [currentUser.id]: {
                ...prev[currentUser.id],
                registeredWorkshops: [...(prev[currentUser.id].registeredWorkshops || []), workshopId]
            }
        }));
        // Assuming registeredStudentIds is the correct field in your workshop data
        setWorkshops(prev => prev.map(ws => ws.id === workshopId ? {...ws, registeredStudentIds: [...(ws.registeredStudentIds || []), currentUser.id]} : ws));
        addNotification(`Successfully registered for workshop: ${workshopToRegister.name}. You will receive a notification for upcoming workshop.`, 'success'); // Use .name
        // Simulate upcoming workshop notification
        setTimeout(() => addNotification(`Reminder: Your workshop "${workshopToRegister.name}" is starting soon!`, 'info'), 5000); // Use .name
    };
    
    const handleCompleteAssessment = (assessmentId, score) => {
        setStudents(prev => ({
            ...prev,
            [currentUser.id]: {
                ...prev[currentUser.id],
                assessmentScores: [...(prev[currentUser.id].assessmentScores || []).filter(s => s.assessmentId !== assessmentId), { assessmentId, score, posted: false }]
            }
        }));
        addNotification(`Assessment "${assessments.find(a => a.id === assessmentId)?.title}" completed! Score: ${score}.`, 'success');
        setTakingAssessment(null);
        setViewingAssessmentScore({ assessmentId, score, posted: false });
    };
    
    const handlePostScore = (assessmentId, post) => {
        setStudents(prev => ({
            ...prev,
            [currentUser.id]: {
                ...prev[currentUser.id],
                assessmentScores: prev[currentUser.id].assessmentScores.map(s => s.assessmentId === assessmentId ? { ...s, posted: post } : s)
            }
        }));
        addNotification(`Score for assessment "${assessments.find(a => a.id === assessmentId)?.title}" has been ${post ? 'posted' : 'hidden from'} your profile.`, 'info');
        if (viewingAssessmentScore?.assessmentId === assessmentId) {
            setViewingAssessmentScore(prev => ({...prev, posted: post}));
        }
    };

    const handleWorkshopNoteChange = (workshopId, notes) => {
        setWorkshopNotes(prev => ({...prev, [workshopId]: notes}));
    };
    
    const renderProStudentPageContent = () => {
        switch (currentPage) {
            case 'proStudentDashboard':
                return (
                    <div className="space-y-8">
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardStatCard title="Profile Views" value={currentStudent.profileViewers.length} icon={<Eye />} color="blue" onClick={() => setCurrentPage('profileViewers')} />
                            <DashboardStatCard title="Assessments Taken" value={currentStudent.assessmentScores.length} icon={<CheckCircle />} color="green" onClick={() => setCurrentPage('myAssessments')} />
                            <DashboardStatCard title="Registered Workshops" value={currentStudent.registeredWorkshops.length} icon={<CalendarDays />} color="yellow" onClick={() => setCurrentPage('myWorkshops')} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Quick Links</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button onClick={() => setCurrentPage('viewAssessments')} className="bg-indigo-600 hover:bg-indigo-700"><BookOpen className="mr-2 h-5 w-5"/>Take an Assessment</Button>
                                <Button onClick={() => setCurrentPage('viewWorkshops')} className="bg-purple-600 hover:bg-purple-700"><Tv className="mr-2 h-5 w-5"/>Browse Workshops</Button>
                                <Button onClick={() => setCurrentPage('allInternships')} variant="secondary" className="bg-slate-600 hover:bg-slate-500 text-white"><Search className="mr-2 h-5 w-5"/>View All Internships</Button>
                            </div>
                        </div>
                        {currentStudent.isPro && !currentStudent.proBadgeDate && (
                            <div className="p-4 bg-green-700 rounded-md shadow-lg text-white flex items-center space-x-3">
                                <Award className="h-8 w-8"/>
                                <div>
                                    <h4 className="font-semibold">PRO Badge Earned!</h4>
                                    <p className="text-sm">Congratulations on completing your internship and earning the PRO badge.</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
                case 'profileViewers': // Req 78
                return (
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><Eye className="mr-3 h-8 w-8 text-blue-400" />Companies Who Viewed Your Profile</h2>
                            {currentStudent.profileViewers.length > 0 ? (
                                <div className="space-y-3">
                                    {currentStudent.profileViewers.map(viewInfo => { // Changed compId to viewInfo
                                        // const company = companies.find(c => c.id === viewInfo.companyId); // Use if you need more data from main companies list
                                        return ( // Removed ternary as viewInfo itself guarantees item
                                            <Card key={viewInfo.companyId} className="bg-slate-800 border-slate-700">
                                                <CardContent className="p-4 flex items-center space-x-4">
                                                    <img src={viewInfo.logo} alt={viewInfo.companyName} className="h-12 w-12 rounded-full object-cover"/>
                                                    <div>
                                                        <h4 className="font-semibold text-lg text-blue-300">{viewInfo.companyName}</h4>
                                                        {/* If you stored industry in viewInfo or get it from 'companies' list */}
                                                        {/* {company && <p className="text-sm text-gray-400">{company.industry}</p>} */}
                                                        <p className="text-sm text-gray-400">{companies.find(c => c.id === viewInfo.companyId)?.industry || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500">Viewed on: {new Date(viewInfo.date).toLocaleDateString()}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : <p className="text-gray-400 text-center py-6">No companies have viewed your profile yet.</p>}
                        </div>
                    );
                case 'viewAssessments': // Req 79
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><BookOpen className="mr-3 h-8 w-8 text-indigo-400" />Available Online Assessments</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {assessments.map(assessment => (
                                <AssessmentCard key={assessment.id} assessment={assessment} onTake={() => setTakingAssessment(assessment)} />
                            ))}
                        </div>
                    </div>
                );
                case 'myAssessments': // Req 81, 82 (view score, choose to post)
                 return (
                     <div>
                        <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><Star className="mr-3 h-8 w-8 text-yellow-400" />My Assessment Scores</h2>
                        {currentStudent.assessmentScores.length > 0 ? (
                            <div className="space-y-4">
                            {currentStudent.assessmentScores.map(scoreEntry => {
                                const assessment = assessments.find(a => a.id === scoreEntry.assessmentId);
                                return (
                                    <Card key={scoreEntry.assessmentId} className="bg-slate-800 border-slate-700">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-semibold text-lg text-indigo-300">{assessment?.title || 'Unknown Assessment'}</h4>
                                                    <p className="text-2xl font-bold text-white">Score: {scoreEntry.score}%</p>
                                                </div>
                                                <Button variant={scoreEntry.posted ? "destructive" : "default"} size="sm" onClick={() => handlePostScore(scoreEntry.assessmentId, !scoreEntry.posted)}>
                                                    {scoreEntry.posted ? "Hide from Profile" : "Post to Profile"}
                                                </Button>
                                            </div>
                                            {scoreEntry.posted && <p className="text-xs text-green-400 mt-1">Visible on your profile.</p>}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                            </div>
                        ) : <p className="text-gray-400 text-center py-6">You have not completed any assessments yet. <Button variant="link" onClick={() => setCurrentPage('viewAssessments')} className="text-blue-400 p-0">Take one now!</Button></p>}
                    </div>
                );
                case 'viewWorkshops': // Req 84
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><Tv className="mr-3 h-8 w-8 text-purple-400" />Upcoming Online Career Workshops</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {workshops.map(workshop => (
                                <WorkshopCard 
                                key={workshop.id} 
                                workshop={workshop} 
                                onViewDetails={() => { setViewingWorkshop(workshop); setCurrentPage('workshopDetails');}}
                                isRegistered={currentStudent.registeredWorkshops.includes(workshop.id)}
                                />
                            ))}
                             {workshops.length === 0 && <p className="text-gray-400 text-center py-6">No upcoming workshops at the moment.</p>}
                        </div>
                    </div>
                );
                case 'workshopDetails': // Req 85, 86, (87 covered by notification), 88, 89, 90
                if (!viewingWorkshop) {
                    setCurrentPage('viewWorkshops'); // Go back if no workshop selected
                    return null;
                }
                const isRegistered = currentStudent.registeredWorkshops.includes(viewingWorkshop.id);
                return <WorkshopDetailsView 
                            workshop={viewingWorkshop} 
                            onRegister={handleRegisterWorkshop} 
                            isRegistered={isRegistered} 
                            notes={workshopNotes[viewingWorkshop.id] || ''}
                            onNoteChange={(notes) => handleWorkshopNoteChange(viewingWorkshop.id, notes)}
                            addNotification={addNotification}
                            onBack={() => setCurrentPage('viewWorkshops')}
                            />;
                            case 'myWorkshops': // List registered workshops
                            return (
                                <div>
                        <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><CalendarDays className="mr-3 h-8 w-8 text-yellow-400" />My Registered Workshops</h2>
                        {currentStudent.registeredWorkshops.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                            {currentStudent.registeredWorkshops.map(wsId => {
                                const workshop = workshops.find(w => w.id === wsId);
                                return workshop ? <WorkshopCard key={wsId} workshop={workshop} onViewDetails={() => { setViewingWorkshop(workshop); setCurrentPage('workshopDetails');}} isRegistered={true} /> : null;
                            })}
                            </div>
                        ) : <p className="text-gray-400 text-center py-6">You are not registered for any workshops. <Button variant="link" onClick={() => setCurrentPage('viewWorkshops')} className="text-blue-400 p-0">Browse workshops</Button></p>}
                    </div>
                );
            case 'allInternships':
                 return <AllInternshipsView internships={filteredGlobalInternships} navigate={navigate} currentUser={currentUser} />;
            default:
                setCurrentPage('proStudentDashboard');
                return null;
            }
        };
        
        return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
                <ProStudentSidebar navigate={setCurrentPage} currentPage={currentPage} />
                 <Card className="mt-6 bg-slate-800 border-slate-700">
                    <CardHeader><h3 className="font-semibold text-lg text-white">My Profile</h3></CardHeader>
                    <CardContent className="text-sm">
                        <div className="flex items-center space-x-3 mb-3">
                            <img src={`https://placehold.co/80x80/7F00FF/ffffff?text=${currentUser.name.substring(0,1)}`} alt={currentUser.name} className="w-16 h-16 rounded-full border-2 border-purple-500"/>
                            <div>
                                <p className="text-lg font-semibold text-white">{currentUser.name}</p>
                                <p className="text-gray-400">{currentStudent.email}</p>
                            </div>
                        </div>
                        {currentStudent.isPro && (
                            <div className="my-2 p-2 bg-yellow-500/20 border border-yellow-600 rounded-md text-center">
                                <Award className="inline h-5 w-5 text-yellow-400 mr-1"/> <span className="font-semibold text-yellow-300">PRO Student</span>
                                {currentStudent.proBadgeDate && <p className="text-xs text-yellow-400">Badge since: {new Date(currentStudent.proBadgeDate).toLocaleDateString()}</p>}
                            </div>
                        )}
                        <Button variant="outline" size="sm" className="w-full mt-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white" onClick={() => addNotification("Edit Profile clicked (not implemented)", "info")}>
                            <UserCog className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-9">
                {renderProStudentPageContent()}
            </div>

            {/* Modals for PRO Student */}
            {takingAssessment && ( // Req 80
                <AssessmentTakingModal 
                assessment={takingAssessment} 
                    onClose={() => setTakingAssessment(null)} 
                    onSubmitScore={(score) => handleCompleteAssessment(takingAssessment.id, score)}
                    />
                )}
            {viewingAssessmentScore && ( // Req 81
                <AssessmentScoreModal
                    scoreData={viewingAssessmentScore}
                    assessment={assessments.find(a => a.id === viewingAssessmentScore.assessmentId)}
                    onClose={() => setViewingAssessmentScore(null)}
                    onPostToggle={handlePostScore}
                    />
                )}
        </div>
    );
};

const ProStudentSidebar = ({ navigate, currentPage }) => {
    const linkClass = (page) => `flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`;
    return (
        <Card className="bg-slate-800 border-slate-700 p-0">
            <nav className="space-y-1 p-4">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('proStudentDashboard'); }} className={linkClass('proStudentDashboard')}>
                    <Maximize2 className="h-5 w-5" /><span>Dashboard</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('profileViewers'); }} className={linkClass('profileViewers')}>
                    <Eye className="h-5 w-5" /><span>Profile Viewers</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('viewAssessments'); }} className={linkClass('viewAssessments')}>
                    <BookOpen className="h-5 w-5" /><span>Online Assessments</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('myAssessments'); }} className={linkClass('myAssessments')}>
                    <Star className="h-5 w-5" /><span>My Scores</span>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('viewWorkshops'); }} className={linkClass('viewWorkshops')}>
                    <Tv className="h-5 w-5" /><span>Career Workshops</span>
                </a>
                 <a href="#" onClick={(e) => { e.preventDefault(); navigate('myWorkshops'); }} className={linkClass('myWorkshops')}>
                    <CalendarDays className="h-5 w-5" /><span>My Workshops</span>
                </a>
                 <a href="#" onClick={(e) => { e.preventDefault(); navigate('allInternships'); }} className={linkClass('allInternships')}>
                    <Search className="h-5 w-5" /><span>All Internships</span>
                </a>
            </nav>
        </Card>
    );
};

const AssessmentCard = ({ assessment, onTake }) => (
    <Card className="bg-slate-800 border-slate-700 hover:border-indigo-500 transition-colors flex flex-col h-full">
        <CardHeader className="h-28"> {/* Added fixed height */}
            <h3 className="text-xl font-semibold text-indigo-400 line-clamp-2">{assessment.name}</h3> {/* Added line-clamp */} 
        </CardHeader>
        <CardContent className="flex-grow"> {/* Added flex-grow to allow content to take available space */}
            <p className="text-sm text-gray-300 line-clamp-3">{assessment.description}</p> {/* Also line-clamp description */}
        </CardContent>
        <CardFooter className="bg-slate-800/50 border-slate-700">
            <Button onClick={onTake} className="bg-indigo-600 hover:bg-indigo-700 w-full">
                <Play className="mr-2 h-4 w-4" /> Start Assessment
            </Button>
        </CardFooter>
    </Card>
);

const AssessmentTakingModal = ({ assessment, onClose, onSubmitScore }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleOptionChange = (questionId, optionValue) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionValue
        }));
    };

    // Simulate taking an assessment
    const handleSubmit = () => {
        let correctMcqAnswers = 0;
        let totalMcqQuestions = 0;

        assessment.questions.forEach(question => {
            if (question.type === 'mcq') {
                totalMcqQuestions++;
                const studentAnswer = selectedAnswers[question.id || question.text]; // Use question.id or fall back to text if id is missing for some reason
                if (studentAnswer === question.correctAnswer) {
                    correctMcqAnswers++;
                }
            }
            // Note: Auto-grading for 'text' or 'code' types is not implemented here.
        });

        const scorePercentage = totalMcqQuestions > 0 
            ? Math.round((correctMcqAnswers / totalMcqQuestions) * 100) 
            : 0; // Default to 0 if no MCQ questions
        
        // console.log("Selected Answers:", selectedAnswers, "Correct:", correctMcqAnswers, "Total MCQ:", totalMcqQuestions, "Score:", scorePercentage);
        onSubmitScore(scorePercentage);
    };
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl max-w-lg">
                <DialogHeader>
                    <DialogTitle>{assessment.title}</DialogTitle>
                    <DialogDescription>Answer the questions to the best of your ability. Your score will be calculated upon submission.</DialogDescription>
                </DialogHeader>
                <div className="my-6 text-gray-300 space-y-6 max-h-[60vh] overflow-y-auto p-1 pr-3 pretty-scrollbar">
                    {assessment.questions && assessment.questions.length > 0 ? (
                        assessment.questions.map((q, index) => (
                            <div key={q.id || index} className="p-4 bg-slate-800 rounded-md border border-slate-700">
                                <p className="font-semibold text-gray-100 mb-2">Question {index + 1}: {q.text}</p>
                                {q.type === 'text' && (
                                    <Textarea 
                                        placeholder="Type your answer here..." 
                                        rows={3}
                                        className="bg-slate-700 border-slate-600 text-white w-full"
                                    />
                                )}
                                {q.type === 'code' && (
                                    <Textarea 
                                        placeholder="Write your code here..." 
                                        rows={5} 
                                        className="bg-slate-900 border-slate-600 text-mono text-sm text-green-400 w-full font-mono"
                                    />
                                )}
                                {q.type === 'mcq' && q.options && (
                                    <div className="space-y-2 mt-2">
                                        {q.options.map((opt, optIndex) => (
                                            <label key={optIndex} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-700 cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={`question-${q.id || index}`} 
                                                    value={opt} 
                                                    checked={selectedAnswers[q.id || index] === opt}
                                                    onChange={() => handleOptionChange(q.id || index, opt)}
                                                    className="form-radio h-4 w-4 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" 
                                                />
                                                <span className="text-gray-200">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">This assessment currently has no questions.</p>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Submit Assessment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const AssessmentScoreModal = ({ scoreData, assessment, onClose, onPostToggle }) => {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-600 shadow-xl">
                <DialogHeader>
                    <DialogTitle>Assessment Score: {assessment?.title}</DialogTitle>
                    <DialogDescription>Review your assessment results</DialogDescription>
                </DialogHeader>
                <div className="my-6 text-center">
                    <p className="text-5xl font-bold text-green-400">{scoreData.score}%</p>
                    <p className="text-gray-400 mt-2">{scoreData.posted ? "This score is visible on your profile." : "This score is hidden from your profile."}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-500 text-gray-300 hover:bg-slate-600">Close</Button>
                    <Button onClick={() => onPostToggle(scoreData.assessmentId, !scoreData.posted)} className={scoreData.posted ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}>
                        {scoreData.posted ? "Hide from Profile" : "Post to Profile"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const WorkshopCard = ({ workshop, onViewDetails, isRegistered }) => {
    const workshopStartDate = new Date(workshop.startDate);
    const workshopDateStr = workshopStartDate.toLocaleDateString();
    const workshopTimeStr = workshopStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-purple-400">{workshop.name /* Was workshop.title */}</h3>
                    {isRegistered && <span className="px-2 py-0.5 text-xs bg-green-600 text-green-100 rounded-full">Registered</span>}
                </div>
                <p className="text-sm text-gray-400">{workshopDateStr} at {workshopTimeStr} - {workshop.mode}</p>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-300 line-clamp-2">{workshop.description}</p>
            </CardContent>
            <CardFooter className="bg-slate-800/50 border-slate-700">
                <Button onClick={onViewDetails} variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                    View Details {isRegistered && "& Join"} <Eye className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

const WorkshopDetailsView = ({ workshop, onRegister, isRegistered, notes, onNoteChange, addNotification, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false); // For pre-recorded
    
    const workshopStartDate = new Date(workshop.startDate);
    const workshopDateStr = workshopStartDate.toLocaleDateString();
    const workshopTimeStr = workshopStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleJoinLive = () => {
        addNotification(`Joining live workshop: ${workshop.name} (Simulated). Chat enabled.`, 'success');
    };
    
    const togglePlay = () => setIsPlaying(!isPlaying);
    
    return (
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-purple-300">{workshop.name}</h2>
                    <Button onClick={onBack} variant="ghost" size="sm"><XCircle className="h-5 w-5"/> </Button>
                </div>
                <p className="text-sm text-gray-400">{workshopDateStr} at {workshopTimeStr} by {workshop.speakerName}</p>
                <p className="text-sm text-gray-500">Mode: {workshop.mode}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-300">{workshop.description}</p>
                
                {workshop.mode === 'Online Live' && isRegistered && (
                    <div className="p-4 bg-slate-700 rounded-md">
                        <h4 className="font-semibold text-lg text-white mb-2">Live Workshop Controls</h4>
                        <div className="flex space-x-2">
                            <Button onClick={handleJoinLive} className="bg-green-600 hover:bg-green-700">
                                <Video className="mr-2 h-4 w-4" /> Join Live Session
                            </Button>
                        </div>
                    </div>
                )}

                {workshop.mode === 'Pre-recorded' && (
                    <div className="p-4 bg-slate-700 rounded-md">
                        <h4 className="font-semibold text-lg text-white mb-2">Pre-recorded Video Player (Simulated)</h4>
                        <div className="bg-black h-48 flex items-center justify-center rounded text-gray-400 mb-2">
                            {isPlaying ? `Playing: ${workshop.name}` : 'Video Paused / Stopped'}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="bg-slate-800/50 border-slate-700">
                {!isRegistered ? (
                    <Button onClick={() => onRegister(workshop.id)} className="bg-green-600 hover:bg-green-700 w-full">
                        <UserPlus className="mr-2 h-4 w-4" /> Register for Workshop
                    </Button>
                ) : workshop.mode === 'Online Live' ? (
                    <Button onClick={handleJoinLive} className="bg-blue-600 hover:bg-blue-700 w-full" disabled={!isRegistered}>
                        <Video className="mr-2 h-4 w-4" /> Join Live Session
                    </Button>
                ) : workshop.mode === 'Pre-recorded' && isRegistered ? (
                     <Button onClick={togglePlay} className="bg-blue-600 hover:bg-blue-700 w-full">
                        {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                        {isPlaying ? 'Pause Video' : 'Play Video'}
                    </Button>
                ) : (
                    <p className="text-sm text-green-400">You are registered for this workshop.</p>
                )}
            </CardFooter>
        </Card>
    );
};

// Helper function for generating placeholder logo URL
const getPlaceholderLogo = (companyName) => {
    const initials = companyName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    return `https://placehold.co/100x100/7B68EE/FFFFFF?text=${initials}`;
};

// End of file