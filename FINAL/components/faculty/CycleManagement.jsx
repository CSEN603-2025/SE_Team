import React, { useState, useEffect } from 'react';
import './CycleManagement.css';

const CycleManagement = () => {
  const [cycles, setCycles] = useState([]);
  const [newCycle, setNewCycle] = useState({
    startDate: '',
    endDate: '',
    description: '',
    notifications: []
  });

  useEffect(() => {
    // Load cycles from localStorage
    const loadCycles = () => {
      try {
        const storedCycles = JSON.parse(localStorage.getItem('internshipCycles')) || [];
        setCycles(storedCycles);
      } catch (error) {
        console.error('Error loading cycles:', error);
      }
    };

    loadCycles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCycle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(newCycle.startDate) >= new Date(newCycle.endDate)) {
      alert('End date must be after start date');
      return;
    }

    const cycle = {
      id: Date.now().toString(),
      ...newCycle,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    const updatedCycles = [...cycles, cycle];
    setCycles(updatedCycles);
    localStorage.setItem('internshipCycles', JSON.stringify(updatedCycles));

    // Create notification for all students
    const notification = {
      id: Date.now().toString(),
      type: 'new_cycle',
      title: 'New Internship Cycle',
      message: `A new internship cycle has been created from ${new Date(newCycle.startDate).toLocaleDateString()} to ${new Date(newCycle.endDate).toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      read: false
    };

    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    localStorage.setItem('notifications', JSON.stringify([...storedNotifications, notification]));

    // Reset form
    setNewCycle({
      startDate: '',
      endDate: '',
      description: '',
      notifications: []
    });
  };

  return (
    <div className="cycle-management">
      <h2>Internship Cycle Management</h2>

      <div className="cycle-form">
        <h3>Create New Cycle</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newCycle.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newCycle.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newCycle.description}
              onChange={handleInputChange}
              placeholder="Enter cycle description..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Cycle
          </button>
        </form>
      </div>

      <div className="cycles-list">
        <h3>Active Cycles</h3>
        {cycles.map(cycle => (
          <div key={cycle.id} className="cycle-card">
            <div className="cycle-header">
              <h4>Cycle #{cycle.id.slice(-4)}</h4>
              <span className={`status ${cycle.status}`}>
                {cycle.status}
              </span>
            </div>
            <div className="cycle-details">
              <p><strong>Start Date:</strong> {new Date(cycle.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(cycle.endDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {cycle.description}</p>
              <p><strong>Created:</strong> {new Date(cycle.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleManagement; 