import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserGraduate, FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Sarah Johnson',
        studentId: '2021001',
        email: 'sarah.johnson@student.guc.edu.eg',
        phone: '+20 123 456 7890',
        department: 'Computer Science',
        internshipStatus: 'active',
        company: 'Tech Solutions Inc.',
        supervisor: 'John Smith',
        startDate: '2024-01-15',
        endDate: '2024-06-15'
      },
      {
        id: 2,
        name: 'Michael Chen',
        studentId: '2021002',
        email: 'michael.chen@student.guc.edu.eg',
        phone: '+20 123 456 7891',
        department: 'Computer Science',
        internshipStatus: 'completed',
        company: 'Digital Innovations',
        supervisor: 'Emily Brown',
        startDate: '2023-07-01',
        endDate: '2023-12-31'
      },
      {
        id: 3,
        name: 'Emma Davis',
        studentId: '2021003',
        email: 'emma.davis@student.guc.edu.eg',
        phone: '+20 123 456 7892',
        department: 'Computer Science',
        internshipStatus: 'pending',
        company: 'Global Systems',
        supervisor: 'David Wilson',
        startDate: '2024-04-01',
        endDate: '2024-09-30'
      }
    ];
    setStudents(mockStudents);
    setLoading(false);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.internshipStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'status-badge active';
      case 'completed': return 'status-badge success';
      case 'pending': return 'status-badge pending';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <DashboardLayout title="Student List">
      <div className="students-container">
        <div className="students-header">
          <div className="search-filter-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <FaFilter className="filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading students...</div>
        ) : (
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Internship Status</th>
                  <th>Company</th>
                  <th>Supervisor</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <FaUserGraduate className="student-icon" />
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td>{student.studentId}</td>
                    <td>{student.department}</td>
                    <td>
                      <div className="contact-info">
                        <a href={`mailto:${student.email}`} title={student.email}>
                          <FaEnvelope />
                        </a>
                        <a href={`tel:${student.phone}`} title={student.phone}>
                          <FaPhone />
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(student.internshipStatus)}>
                        {getStatusText(student.internshipStatus)}
                      </span>
                    </td>
                    <td>
                      <div className="company-info">
                        <FaBuilding className="company-icon" />
                        <span>{student.company}</span>
                      </div>
                    </td>
                    <td>{student.supervisor}</td>
                    <td>
                      {student.startDate} - {student.endDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentList; 