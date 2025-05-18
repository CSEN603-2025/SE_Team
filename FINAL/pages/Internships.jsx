// FINAL/pages/Internships.jsx
import React, { useState, useEffect } from "react";
import { COMPANIES, INDUSTRIES, DURATIONS } from "../data/constants";
import { sampleInternships } from "../data/sampleData";
import "./Internships.css";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [savedInternships, setSavedInternships] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Initialize internships data if not exists
    const existingInternships = localStorage.getItem('internships');
    if (!existingInternships) {
      localStorage.setItem('internships', JSON.stringify(sampleInternships));
    }

    // Get internships from localStorage
    const storedInternships = JSON.parse(localStorage.getItem('internships') || '[]');
    console.log('Loaded internships:', storedInternships);
    setInternships(storedInternships);
    setLoading(false);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Loaded user:', user);
    setUserProfile(user);

    // Load saved internships
    const storedSavedInternships = JSON.parse(localStorage.getItem('savedInternships') || '[]');
    console.log('Loaded saved internships:', storedSavedInternships);
    setSavedInternships(storedSavedInternships);
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

  const handleApply = (e, internship) => {
    e.stopPropagation(); // Prevent opening the modal when clicking apply
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Please log in to apply for internships');
      return;
    }

    // Check if already applied
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const hasApplied = applications.some(app => 
      app.internshipId === internship.id && app.userId === user.id
    );

    if (hasApplied) {
      alert('You have already applied for this internship');
      return;
    }

    // Create application object
    const application = {
      id: Date.now(),
      userId: user.id,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      documents: []
    };

    // Save application
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Add notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'application_submitted',
      message: `Application submitted for ${internship.title} at ${internship.company}`,
      date: new Date().toISOString(),
      userId: user.id
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    alert('Application submitted successfully!');
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

  const handleSaveInternship = (e, internship) => {
    e.stopPropagation(); // Prevent opening the modal when clicking save
    
    const isAlreadySaved = savedInternships.some(saved => saved.id === internship.id);
    let updatedSavedInternships;
    
    if (isAlreadySaved) {
      updatedSavedInternships = savedInternships.filter(saved => saved.id !== internship.id);
    } else {
      updatedSavedInternships = [...savedInternships, internship];
    }
    
    setSavedInternships(updatedSavedInternships);
    localStorage.setItem('savedInternships', JSON.stringify(updatedSavedInternships));
  };

  const filteredInternships = getFilteredInternships();
  const locations = [...new Set(internships.map(i => i.location))];

  return (
    <div className="internships-container">
      <div className="internships-header">
        <h1>Available Internships</h1>
        <div className="search-filters">
          <input 
            type="text" 
            placeholder="Search internships..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fas fa-filter"></i> Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-modal">
          <div className="filters-content">
            <h3>Filter Internships</h3>
            
            <div className="filter-group">
              <label>Industry:</label>
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
            </div>

            <div className="filter-group">
              <label>Duration:</label>
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
            </div>

            <div className="filter-group">
              <label>Payment Type:</label>
              <select
                name="paid"
                value={filters.paid}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location:</label>
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
            </div>

            <div className="filter-actions">
              <button 
                className="reset-btn"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
              <button 
                className="apply-filters-btn"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading internships...</div>
      ) : (
        <div className="internships-grid">
          {filteredInternships.map(internship => (
            <div 
              key={internship.id} 
              className="internship-card"
              onClick={() => setSelectedInternship(internship)}
            >
              <div className="internship-header">
                <h3>{internship.title}</h3>
                <span className="company-name">{internship.company}</span>
              </div>
              
              <div className="internship-details">
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{internship.location}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="skills-section">
                <h4>Required Skills:</h4>
                <div className="skills-list">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="apply-btn"
                  onClick={(e) => handleApply(e, internship)}
                >
                  Apply Now
                </button>
                <button 
                  className="save-btn"
                  onClick={(e) => handleSaveInternship(e, internship)}
                >
                  <i className={`${savedInternships.some(saved => saved.id === internship.id) ? 'fas' : 'far'} fa-bookmark`}></i>
                </button>
              </div>
            </div>
          ))}
          {filteredInternships.length === 0 && (
            <div className="no-results">
              <p>No internships found matching your criteria</p>
            </div>
          )}
        </div>
      )}

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
                onClick={(e) => handleApply(e, selectedInternship)}
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
};

export default Internships;
