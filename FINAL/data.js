// FINAL/data.js
import { sampleInternships } from './data/sampleData';

const initializeData = () => {
  // Initialize internships if not exists
  const existingInternships = localStorage.getItem('internships');
  if (!existingInternships) {
    localStorage.setItem('internships', JSON.stringify(sampleInternships));
  }

  // Initialize sample user data if not exists
  const existingUser = localStorage.getItem('user');
  if (!existingUser) {
    const sampleUser = {
      id: 'student123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'student',
      major: 'Computer Science',
      semester: '6',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      interests: ['Web Development', 'Mobile Apps', 'Machine Learning'],
      internships: [],
      partTimeJobs: [],
      collegeActivities: [],
      documents: []
    };
    localStorage.setItem('user', JSON.stringify(sampleUser));
  }

  // Initialize applications if not exists
  const existingApplications = localStorage.getItem('applications');
  if (!existingApplications) {
    localStorage.setItem('applications', JSON.stringify([]));
  }

  // Initialize saved internships if not exists
  const existingSavedInternships = localStorage.getItem('savedInternships');
  if (!existingSavedInternships) {
    localStorage.setItem('savedInternships', JSON.stringify([]));
  }

  // Initialize notifications if not exists
  const existingNotifications = localStorage.getItem('notifications');
  if (!existingNotifications) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }

  // Initialize user type if not exists
  const existingUserType = localStorage.getItem('userType');
  if (!existingUserType) {
    localStorage.setItem('userType', 'student');
  }

  // Initialize PRO status if not exists
  const existingProStatus = localStorage.getItem('isProUser');
  if (!existingProStatus) {
    localStorage.setItem('isProUser', 'false');
  }
};

export default initializeData;
