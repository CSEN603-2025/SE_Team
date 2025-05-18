import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    description: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    logo: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  useEffect(() => {
    // Load company profile from localStorage (in real app, this would be an API call)
    const savedProfile = JSON.parse(localStorage.getItem('companyProfile'));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (in real app, this would be an API call)
    localStorage.setItem('companyProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="company-profile">
      <div className="profile-header">
        <h2>Company Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={isEditing ? 'editing' : ''}>
        <div className="profile-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>Company Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Industry:</label>
            {isEditing ? (
              <input
                type="text"
                name="industry"
                value={profile.industry}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.industry}</p>
            )}
          </div>

          <div className="form-group">
            <label>Company Size:</label>
            {isEditing ? (
              <select
                name="size"
                value={profile.size}
                onChange={handleInputChange}
                required
              >
                <option value="">Select size</option>
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            ) : (
              <p>{profile.size}</p>
            )}
          </div>

          <div className="form-group">
            <label>Location:</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.location}</p>
            )}
          </div>

          <div className="form-group">
            <label>Website:</label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            ) : (
              <p>{profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h3>Company Description</h3>
          <div className="form-group">
            {isEditing ? (
              <textarea
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                rows="5"
                required
              />
            ) : (
              <p>{profile.description}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Contact Person:</label>
            {isEditing ? (
              <input
                type="text"
                name="contactPerson"
                value={profile.contactPerson}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.contactPerson}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contact Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="contactEmail"
                value={profile.contactEmail}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.contactEmail}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contact Phone:</label>
            {isEditing ? (
              <input
                type="tel"
                name="contactPhone"
                value={profile.contactPhone}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p>{profile.contactPhone}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h3>Social Media</h3>
          <div className="form-group">
            <label>LinkedIn:</label>
            {isEditing ? (
              <input
                type="url"
                name="socialMedia.linkedin"
                value={profile.socialMedia.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/..."
              />
            ) : (
              <p>{profile.socialMedia.linkedin && <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{profile.socialMedia.linkedin}</a>}</p>
            )}
          </div>

          <div className="form-group">
            <label>Twitter:</label>
            {isEditing ? (
              <input
                type="url"
                name="socialMedia.twitter"
                value={profile.socialMedia.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/..."
              />
            ) : (
              <p>{profile.socialMedia.twitter && <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer">{profile.socialMedia.twitter}</a>}</p>
            )}
          </div>

          <div className="form-group">
            <label>Facebook:</label>
            {isEditing ? (
              <input
                type="url"
                name="socialMedia.facebook"
                value={profile.socialMedia.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/..."
              />
            ) : (
              <p>{profile.socialMedia.facebook && <a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer">{profile.socialMedia.facebook}</a>}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
          </div>
        )}
      </form>
    </div>
  );
} 