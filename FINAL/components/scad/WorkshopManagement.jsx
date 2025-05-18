import React, { useState, useEffect } from 'react';
import './WorkshopManagement.css';

const WorkshopManagement = ({ userRole = 'scad' }) => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyWorkshop = {
    id: Date.now(),
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    speaker: {
      name: '',
      bio: '',
      title: ''
    },
    agenda: [],
    registeredStudents: []
  };

  useEffect(() => {
    // Load workshops from localStorage
    const loadWorkshops = () => {
      try {
        const storedWorkshops = JSON.parse(localStorage.getItem('workshops')) || [];
        setWorkshops(storedWorkshops);
      } catch (error) {
        console.error('Error loading workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const handleWorkshopChange = (field, value) => {
    setSelectedWorkshop(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpeakerChange = (field, value) => {
    setSelectedWorkshop(prev => ({
      ...prev,
      speaker: {
        ...prev.speaker,
        [field]: value
      }
    }));
  };

  const handleAgendaChange = (index, value) => {
    setSelectedWorkshop(prev => {
      const newAgenda = [...prev.agenda];
      newAgenda[index] = value;
      return {
        ...prev,
        agenda: newAgenda
      };
    });
  };

  const addAgendaItem = () => {
    setSelectedWorkshop(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
  };

  const removeAgendaItem = (index) => {
    setSelectedWorkshop(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };

  const saveWorkshop = () => {
    if (editMode) {
      const updatedWorkshops = workshops.map(workshop =>
        workshop.id === selectedWorkshop.id ? selectedWorkshop : workshop
      );
      setWorkshops(updatedWorkshops);
      localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));
    } else {
      const newWorkshops = [...workshops, selectedWorkshop];
      setWorkshops(newWorkshops);
      localStorage.setItem('workshops', JSON.stringify(newWorkshops));
    }
    setSelectedWorkshop(null);
    setEditMode(false);
  };

  const deleteWorkshop = (id) => {
    const updatedWorkshops = workshops.filter(workshop => workshop.id !== id);
    setWorkshops(updatedWorkshops);
    localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));
    setSelectedWorkshop(null);
    setEditMode(false);
  };

  const registerForWorkshop = (workshopId) => {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
    if (!userId) return;

    const updatedWorkshops = workshops.map(workshop => {
      if (workshop.id === workshopId) {
        return {
          ...workshop,
          registeredStudents: [...new Set([...workshop.registeredStudents, userId])]
        };
      }
      return workshop;
    });

    setWorkshops(updatedWorkshops);
    localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="workshop-management">
      {userRole === 'scad' && (
        <div className="controls">
          <button
            className="add-workshop"
            onClick={() => {
              setSelectedWorkshop(emptyWorkshop);
              setEditMode(false);
            }}
          >
            Add New Workshop
          </button>
        </div>
      )}

      <div className="workshops-grid">
        {workshops.map(workshop => (
          <div key={workshop.id} className="workshop-card">
            <h3>{workshop.name}</h3>
            <p className="description">{workshop.description}</p>
            
            <div className="workshop-details">
              <div className="detail">
                <span className="label">Date:</span>
                <span>{new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}</span>
              </div>
              <div className="detail">
                <span className="label">Time:</span>
                <span>{workshop.startTime} - {workshop.endTime}</span>
              </div>
              <div className="detail">
                <span className="label">Speaker:</span>
                <span>{workshop.speaker.name}</span>
              </div>
            </div>

            <div className="card-actions">
              {userRole === 'scad' ? (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedWorkshop(workshop);
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteWorkshop(workshop.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="register-btn"
                  onClick={() => registerForWorkshop(workshop.id)}
                  disabled={workshop.registeredStudents.includes(JSON.parse(localStorage.getItem('currentUser'))?.id)}
                >
                  {workshop.registeredStudents.includes(JSON.parse(localStorage.getItem('currentUser'))?.id)
                    ? 'Registered'
                    : 'Register'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedWorkshop && (
        <div className="workshop-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => {
              setSelectedWorkshop(null);
              setEditMode(false);
            }}>×</button>

            <h2>{editMode ? 'Edit Workshop' : 'New Workshop'}</h2>

            <div className="form-group">
              <label>Workshop Name</label>
              <input
                type="text"
                value={selectedWorkshop.name}
                onChange={(e) => handleWorkshopChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={selectedWorkshop.description}
                onChange={(e) => handleWorkshopChange('description', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={selectedWorkshop.startDate}
                  onChange={(e) => handleWorkshopChange('startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={selectedWorkshop.endDate}
                  onChange={(e) => handleWorkshopChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={selectedWorkshop.startTime}
                  onChange={(e) => handleWorkshopChange('startTime', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={selectedWorkshop.endTime}
                  onChange={(e) => handleWorkshopChange('endTime', e.target.value)}
                />
              </div>
            </div>

            <div className="speaker-section">
              <h3>Speaker Information</h3>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedWorkshop.speaker.name}
                  onChange={(e) => handleSpeakerChange('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={selectedWorkshop.speaker.title}
                  onChange={(e) => handleSpeakerChange('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={selectedWorkshop.speaker.bio}
                  onChange={(e) => handleSpeakerChange('bio', e.target.value)}
                />
              </div>
            </div>

            <div className="agenda-section">
              <h3>Workshop Agenda</h3>
              {selectedWorkshop.agenda.map((item, index) => (
                <div key={index} className="agenda-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleAgendaChange(index, e.target.value)}
                    placeholder="Agenda item..."
                  />
                  <button
                    className="remove-item"
                    onClick={() => removeAgendaItem(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button className="add-item" onClick={addAgendaItem}>
                Add Agenda Item
              </button>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={saveWorkshop}>
                {editMode ? 'Save Changes' : 'Create Workshop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopManagement; 