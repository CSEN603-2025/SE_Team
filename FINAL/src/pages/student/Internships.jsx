import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaSearch, FaCalendarAlt, FaFilter, FaCheckCircle, FaSpinner, FaFileAlt, FaTrash, FaEdit, FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import '../../styles/Internships.css';

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showAll, setShowAll] = useState('all');
  const [reportForm, setReportForm] = useState({
    title: '',
    introduction: '',
    body: '',
    conclusion: ''
  });
  const [evaluation, setEvaluation] = useState({
    recommend: false,
    rating: 5,
    comment: ''
  });

  // Dummy data for demonstration
  const internships = [
    {
      id: 1,
      company: 'Acme Corp',
      role: 'Software Engineering Intern',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'Internship Complete',
      report: null,
      evaluation: null
    },
    {
      id: 2,
      company: 'TechSoft',
      role: 'Frontend Intern',
      startDate: '2024-02-01',
      endDate: '',
      status: 'Current Intern',
      report: null,
      evaluation: null
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    // Reset forms when selecting new internship
    setReportForm({
      title: internship.report?.title || '',
      introduction: internship.report?.introduction || '',
      body: internship.report?.body || '',
      conclusion: internship.report?.conclusion || ''
    });
    setEvaluation({
      recommend: internship.evaluation?.recommend || false,
      rating: internship.evaluation?.rating || 5,
      comment: internship.evaluation?.comment || ''
    });
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the report
    const updatedInternship = {
      ...selectedInternship,
      report: reportForm
    };
    // Update in your state/database
    console.log('Submitting report:', reportForm);
    alert('Report submitted successfully!');
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the evaluation
    const updatedInternship = {
      ...selectedInternship,
      evaluation: evaluation
    };
    // Update in your state/database
    console.log('Submitting evaluation:', evaluation);
    alert('Evaluation submitted successfully!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add internship details
    doc.setFontSize(20);
    doc.text('Internship Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Company: ${selectedInternship.company}`, 20, 40);
    doc.text(`Role: ${selectedInternship.role}`, 20, 50);
    doc.text(`Duration: ${selectedInternship.startDate} - ${selectedInternship.endDate || 'Present'}`, 20, 60);
    
    // Add report content
    doc.setFontSize(16);
    doc.text('Report', 20, 80);
    
    doc.setFontSize(12);
    doc.text(`Title: ${reportForm.title}`, 20, 100);
    
    // Split long text into multiple lines
    const splitIntro = doc.splitTextToSize(reportForm.introduction, 170);
    const splitBody = doc.splitTextToSize(reportForm.body, 170);
    const splitConclusion = doc.splitTextToSize(reportForm.conclusion, 170);
    
    doc.text('Introduction:', 20, 120);
    doc.text(splitIntro, 20, 130);
    
    doc.text('Body:', 20, 160);
    doc.text(splitBody, 20, 170);
    
    doc.text('Conclusion:', 20, 200);
    doc.text(splitConclusion, 20, 210);
    
    // Save the PDF
    doc.save(`${selectedInternship.company}-internship-report.pdf`);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = (!dateRange.from || internship.startDate >= dateRange.from) &&
                           (!dateRange.to || internship.endDate <= dateRange.to || !internship.endDate);
    const matchesStatus = showAll === 'all' || 
                         (showAll === 'current' && internship.status === 'Current Intern') ||
                         (showAll === 'completed' && internship.status === 'Internship Complete');
    
    return matchesSearch && matchesDateRange && matchesStatus;
  });

  return (
    <DashboardLayout title="My Internships">
      <div className="modern-search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search company or role..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-bar">
          <div className="date-range">
            <FaCalendarAlt className="filter-icon" />
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
              placeholder="From"
            />
            <span>to</span>
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              placeholder="To"
            />
          </div>
          <div className="status-filter">
            <FaFilter className="filter-icon" />
            <select 
              value={showAll} 
              onChange={(e) => setShowAll(e.target.value)}
            >
              <option value="all">All Internships</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((internship, index) => (
              <tr key={internship.id}>
                <td>{index + 1}</td>
                <td>{internship.company}</td>
                <td>{internship.role}</td>
                <td>{internship.startDate}</td>
                <td>{internship.endDate || 'Present'}</td>
                <td>
                  <span className={`status-badge ${internship.status === 'Current Intern' ? 'current' : 'completed'}`}>
                    {internship.status === 'Current Intern' ? <FaSpinner className="spinner" /> : <FaCheckCircle />}
                    {internship.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view"
                      onClick={() => handleInternshipSelect(internship)}
                    >
                      <FaFileAlt /> View
                    </button>
                    <button className="action-btn edit">
                      <FaEdit /> Edit
                    </button>
                    <button className="action-btn delete">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInternship && (
        <div className="report-section">
          <div className="report-header">
            <h3>Internship Report</h3>
            <button className="download-btn" onClick={handleDownloadPDF}>
              <FaDownload /> Download PDF
            </button>
          </div>
          <form onSubmit={handleReportSubmit} className="report-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={reportForm.title}
                onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Report Title"
              />
            </div>
            <div className="form-group">
              <label>Introduction</label>
              <textarea
                value={reportForm.introduction}
                onChange={(e) => setReportForm(prev => ({ ...prev, introduction: e.target.value }))}
                placeholder="Write your introduction..."
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Body</label>
              <textarea
                value={reportForm.body}
                onChange={(e) => setReportForm(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Write your report body..."
                rows="8"
              />
            </div>
            <div className="form-group">
              <label>Conclusion</label>
              <textarea
                value={reportForm.conclusion}
                onChange={(e) => setReportForm(prev => ({ ...prev, conclusion: e.target.value }))}
                placeholder="Write your conclusion..."
                rows="4"
              />
            </div>
            <button type="submit" className="submit-btn">Submit Report</button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Internships; 