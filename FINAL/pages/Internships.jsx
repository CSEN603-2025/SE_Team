// FINAL/pages/Internships.jsx
import React, { useState, useEffect } from "react";
import { COMPANIES, INDUSTRIES, DURATIONS } from "../data/constants";
import "./Internships.css";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    duration: "",
    paid: "",
    location: "",
    skills: []
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showSuggested, setShowSuggested] = useState(false);
  const [applicationDocuments, setApplicationDocuments] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // Load user profile and internships on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserProfile(user);

    // In a real app, this would be an API call
    const savedInternships = JSON.parse(localStorage.getItem('internships') || '[]');
    setInternships(savedInternships);
  }, []);

  // Get suggested companies based on user interests and skills
  const getSuggestedInternships = () => {
    if (!userProfile) return [];

    const userInterests = userProfile.interests || [];
    const userSkills = userProfile.skills || [];

    return internships.filter(internship => {
      // Match by company interests
      const company = COMPANIES.find(c => c.name === internship.company);
      if (!company) return false;

      const hasMatchingInterests = company.interests.some(interest =>
        userInterests.some(userInterest =>
          userInterest.toLowerCase().includes(interest.toLowerCase())
        )
      );

      // Match by required skills
      const hasMatchingSkills = internship.skills.some(skill =>
        userSkills.some(userSkill =>
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );

      return hasMatchingInterests || hasMatchingSkills;
    });
  };

  // Filter and search internships
  const getFilteredInternships = () => {
    let filtered = showSuggested ? getSuggestedInternships() : internships;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(i => 
        i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.industry) {
      filtered = filtered.filter(i => i.industry === filters.industry);
    }
    if (filters.duration) {
      filtered = filtered.filter(i => i.duration === filters.duration);
    }
    if (filters.paid !== "") {
      filtered = filtered.filter(i => i.paid === (filters.paid === "true"));
    }
    if (filters.location) {
      filtered = filtered.filter(i => i.location === filters.location);
    }
    if (filters.skills.length > 0) {
      filtered = filtered.filter(i => 
        filters.skills.every(skill =>
          i.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    return filtered;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file)
    }));

    setApplicationDocuments(prev => [...prev, ...newDocuments]);
  };

  const removeDocument = (index) => {
    setApplicationDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleApply = () => {
    if (!selectedInternship) return;

    // Create application object
    const application = {
      id: Date.now(),
      internshipId: selectedInternship.id,
      internshipTitle: selectedInternship.title,
      company: selectedInternship.company,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      documents: applicationDocuments
    };

    // Save application
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Add notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'application_submitted',
      message: `Application submitted for ${selectedInternship.title} at ${selectedInternship.company}`,
      date: new Date().toISOString()
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Reset state
    setSelectedInternship(null);
    setApplicationDocuments([]);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      industry: "",
      duration: "",
      paid: "",
      location: "",
      skills: []
    });
  };

  const filteredInternships = getFilteredInternships();
  const locations = [...new Set(internships.map(i => i.location))];

  return (
    <div className="internships-page">
      <div className="internships-header">
        <h2>Available Internships</h2>
        <button 
          className={`suggested-button ${showSuggested ? 'active' : ''}`}
          onClick={() => setShowSuggested(!showSuggested)}
        >
          {showSuggested ? 'Show All' : 'Show Suggested'}
        </button>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select 
            name="industry" 
            value={filters.industry}
            onChange={handleFilterChange}
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select 
            name="duration" 
            value={filters.duration}
            onChange={handleFilterChange}
          >
            <option value="">All Durations</option>
            {DURATIONS.map(duration => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>

          <select 
            name="paid" 
            value={filters.paid}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>

          <select 
            name="location" 
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <button onClick={resetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>

        <div className="skills-filter">
          <input
            type="text"
            placeholder="Add skill to filter..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.target.value.trim();
                if (value) {
                  handleSkillAdd(value);
                  e.target.value = '';
                }
              }
            }}
          />
          <div className="selected-skills">
            {filters.skills.map(skill => (
              <span key={skill} className="skill-tag">
                {skill}
                <button onClick={() => handleSkillRemove(skill)}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="internships-grid">
        {filteredInternships.map(internship => (
          <div 
            key={internship.id} 
            className="internship-card"
            onClick={() => setSelectedInternship(internship)}
          >
            <h3>{internship.title}</h3>
            <h4>{internship.company}</h4>
            <div className="internship-details">
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Location:</strong> {internship.location}</p>
              <p><strong>Type:</strong> {internship.paid ? `Paid (${internship.salary || 'TBD'})` : 'Unpaid'}</p>
            </div>
            <div className="skills-list">
              {internship.skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
            <p className="deadline">Application Deadline: {internship.deadline}</p>
          </div>
        ))}
        {filteredInternships.length === 0 && (
          <div className="no-results">
            <p>No internships found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedInternship && (
        <div className="internship-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedInternship(null)}
            >
              ×
            </button>
            <h2>{selectedInternship.title}</h2>
            <h3>{selectedInternship.company}</h3>
            <div className="modal-details">
              <p><strong>Location:</strong> {selectedInternship.location}</p>
              <p><strong>Duration:</strong> {selectedInternship.duration}</p>
              <p><strong>Industry:</strong> {selectedInternship.industry}</p>
              <p><strong>Type:</strong> {selectedInternship.paid ? 
                `Paid (${selectedInternship.salary || 'TBD'})` : 'Unpaid'}</p>
              <p><strong>Application Deadline:</strong> {selectedInternship.deadline}</p>
            </div>
            <div className="modal-description">
              <h4>Description</h4>
              <p>{selectedInternship.description}</p>
            </div>
            <div className="modal-skills">
              <h4>Required Skills</h4>
              <div className="skills-list">
                {selectedInternship.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="application-section">
              <h4>Application Documents</h4>
              <div className="documents-upload">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <p className="upload-hint">
                  Upload your CV, cover letter, and any other relevant documents
                </p>
              </div>
              <div className="documents-list">
                {applicationDocuments.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span>{doc.name}</span>
                    <button
                      onClick={() => removeDocument(index)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="apply-button"
                onClick={handleApply}
                disabled={applicationDocuments.length === 0}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
