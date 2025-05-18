export const MAJORS = [
  { id: 1, name: 'Computer Science', code: 'CS' },
  { id: 2, name: 'Computer Engineering', code: 'CE' },
  { id: 3, name: 'Information Systems', code: 'IS' },
  { id: 4, name: 'Software Engineering', code: 'SE' },
  { id: 5, name: 'Artificial Intelligence', code: 'AI' },
  { id: 6, name: 'Data Science', code: 'DS' },
  { id: 7, name: 'Cybersecurity', code: 'CY' },
  { id: 8, name: 'Business Informatics', code: 'BI' }
];

export const COMPANIES = [
  {
    id: 1,
    name: 'Orange Digital Center',
    industry: 'Technology',
    interests: ['Mobile Development', 'Web Development', 'Software Engineering'],
    description: 'Digital innovation and training center focused on technology education.'
  },
  {
    id: 2,
    name: 'Dell Technologies',
    industry: 'Technology',
    interests: ['IT Support', 'Cloud Computing', 'Systems Engineering'],
    description: 'Global leader in digital transformation and technology solutions.'
  },
  {
    id: 3,
    name: 'EG Bank',
    industry: 'Banking',
    interests: ['Financial Analysis', 'FinTech', 'Business Analytics'],
    description: 'Leading Egyptian bank offering innovative financial solutions.'
  },
  {
    id: 4,
    name: 'IBM Egypt',
    industry: 'Technology',
    interests: ['AI', 'Machine Learning', 'Cloud Computing', 'Data Science'],
    description: 'Global technology and innovation company.'
  },
  {
    id: 5,
    name: 'Vodafone Egypt',
    industry: 'Telecommunications',
    interests: ['Network Engineering', 'Mobile Development', 'IoT'],
    description: 'Leading telecommunications provider in Egypt.'
  }
];

export const INDUSTRIES = [
  'Technology',
  'Banking',
  'Telecommunications',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Media',
  'Consulting'
];

export const DURATIONS = [
  '1 month',
  '2 months',
  '3 months',
  '6 months',
  'Summer Internship',
  'Part-time (Ongoing)'
];

export const SEMESTERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Semester ${i + 1}`,
  minCredits: 0,
  maxCredits: 21
})); 