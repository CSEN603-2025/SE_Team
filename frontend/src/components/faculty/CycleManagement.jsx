import React, { useState, useEffect } from 'react';
import './CycleManagement.css';

export default function CycleManagement() {
  const [cycles, setCycles] = useState(() => {
    const saved = localStorage.getItem('internshipCycles');
    return saved ? JSON.parse(saved) : [];
  });

  const [newCycle, setNewCycle] = useState({
    startDate: '',
    endDate: '',
    name: '',
    description: '',
    notificationSent: false
  });

  useEffect(() => {
    localStorage.setItem('internshipCycles', JSON.stringify(cycles));
  }, [cycles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCycle.startDate || !newCycle.endDate || !newCycle.name) {
      alert('Please fill in all required fields');
      return;
    }

    const cycle = {
      ...newCycle,
      id: Date.now(),
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    setCycles(prev => [...prev, cycle]);
    setNewCycle({
      startDate: '',
      endDate: '',
      name: '',
      description: '',
      notificationSent: false
    });

    // Send notification
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New Internship Cycle Created', {
            body: `${cycle.name} starts on ${cycle.startDate}`
          });
        }
      });
    }
  };

  const handleDelete = (cycleId) => {
    if (window.confirm('Are you sure you want to delete this cycle?')) {
      setCycles(prev => prev.filter(c => c.id !== cycleId));
    }
  };

  const handleStatusChange = (cycleId, newStatus) => {
    setCycles(prev => prev.map(c => 
      c.id === cycleId ? { ...c, status: newStatus } : c
    ));
  };

  return (
    <div className="cycle-management">
      <section className="new-cycle-form">
        <h2>Create New Internship Cycle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cycle Name *</label>
            <input
              type="text"
              value={newCycle.name}
              onChange={e => setNewCycle(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Summer 2025 Internship"
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              value={newCycle.startDate}
              onChange={e => setNewCycle(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              value={newCycle.endDate}
              onChange={e => setNewCycle(prev => ({ ...prev, endDate: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newCycle.description}
              onChange={e => setNewCycle(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter cycle details..."
              rows={4}
            />
          </div>

          <button type="submit" className="btn-primary">Create Cycle</button>
        </form>
      </section>

      <section className="cycles-list">
        <h2>Internship Cycles</h2>
        <div className="cycles-grid">
          {cycles.map(cycle => (
            <div key={cycle.id} className={`cycle-card ${cycle.status}`}>
              <h3>{cycle.name}</h3>
              <p><strong>Start:</strong> {cycle.startDate}</p>
              <p><strong>End:</strong> {cycle.endDate}</p>
              <p><strong>Status:</strong> {cycle.status}</p>
              {cycle.description && <p>{cycle.description}</p>}
              
              <div className="card-actions">
                <select
                  value={cycle.status}
                  onChange={e => handleStatusChange(cycle.id, e.target.value)}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <button 
                  onClick={() => handleDelete(cycle.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 