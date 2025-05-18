import React, { useState, useEffect } from 'react';
import './InternshipPost.css';

export default function InternshipPost() {
  const [internships, setInternships] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    duration: '',
    startDate: '',
    deadline: '',
    paid: false,
    salary: '',
    location: '',
    workType: 'onsite', // onsite, remote, hybrid
    skills: [],
    positions: 1
  });

  useEffect(() => {
    // Load internships from localStorage (in real app, this would be an API call)
    const savedInternships = JSON.parse(localStorage.getItem('companyInternships') || '[]');
    setInternships(savedInternships);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInternship = {
      ...formData,
      id: editingId || Date.now(),
      createdAt: new Date().toISOString(),
      company: JSON.parse(localStorage.getItem('companyProfile') || '{}').name
    };

    if (editingId) {
      setInternships(prev => prev.map(internship => 
        internship.id === editingId ? newInternship : internship
      ));
    } else {
      setInternships(prev => [...prev, newInternship]);
    }

    // Save to localStorage (in real app, this would be an API call)
    localStorage.setItem('companyInternships', JSON.stringify(internships));
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      requirements: '',
      duration: '',
      startDate: '',
      deadline: '',
      paid: false,
      salary: '',
      location: '',
      workType: 'onsite',
      skills: [],
      positions: 1
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (internship) => {
    setFormData(internship);
    setEditingId(internship.id);
    setIsCreating(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this internship posting?')) {
      setInternships(prev => prev.filter(internship => internship.id !== id));
      localStorage.setItem('companyInternships', JSON.stringify(
        internships.filter(internship => internship.id !== id)
      ));
    }
  };

  return (
    <div className="internship-post">
      <div className="post-header">
        <h2>Internship Postings</h2>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className={`create-button ${isCreating ? 'cancel' : ''}`}
        >
          {isCreating ? 'Cancel' : 'Create New Posting'}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-section">
            <h3>{editingId ? 'Edit Internship' : 'New Internship'}</h3>
            
            <div className="form-group">
              <label>Position Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Requirements:</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration:</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 months"
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Positions:</label>
                <input
                  type="number"
                  name="positions"
                  value={formData.positions}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Application Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Work Type:</label>
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="paid"
                    checked={formData.paid}
                    onChange={handleInputChange}
                  />
                  Paid Internship
                </label>
              </div>

              {formData.paid && (
                <div className="form-group">
                  <label>Monthly Salary (EGP):</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Required Skills (comma-separated):</label>
              <input
                type="text"
                value={formData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="e.g., React, JavaScript, Node.js"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                {editingId ? 'Update Posting' : 'Create Posting'}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="internships-list">
        {internships.map(internship => (
          <div key={internship.id} className="internship-card">
            <div className="card-header">
              <h3>{internship.title}</h3>
              <div className="card-actions">
                <button 
                  onClick={() => handleEdit(internship)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(internship.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="card-details">
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Location:</strong> {internship.location}</p>
              <p><strong>Work Type:</strong> {internship.workType}</p>
              <p><strong>Positions:</strong> {internship.positions}</p>
              <p><strong>Start Date:</strong> {internship.startDate}</p>
              <p><strong>Deadline:</strong> {internship.deadline}</p>
              <p><strong>Compensation:</strong> {internship.paid ? `Paid - ${internship.salary} EGP/month` : 'Unpaid'}</p>
            </div>

            <div className="card-skills">
              <h4>Required Skills:</h4>
              <div className="skills-list">
                {internship.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="card-description">
              <h4>Description:</h4>
              <p>{internship.description}</p>
              <h4>Requirements:</h4>
              <p>{internship.requirements}</p>
            </div>
          </div>
        ))}

        {internships.length === 0 && !isCreating && (
          <div className="no-internships">
            <p>No internship postings yet. Click "Create New Posting" to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
} 