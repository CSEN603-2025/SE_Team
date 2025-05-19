import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

export default function SystemSettings() {
  const [cycleStart, setCycleStart] = useState('2024-06-01');
  const [cycleEnd, setCycleEnd] = useState('2024-09-01');
  const [maintenance, setMaintenance] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved! (Functionality coming soon)');
  };

  return (
    <DashboardLayout title="System Settings">
      <div className="scad-info-section">
        <h2>System Settings</h2>
        <form onSubmit={handleSave} style={{ maxWidth: 400 }}>
          <div className="form-group">
            <label>Internship Cycle Start Date:</label>
            <input type="date" value={cycleStart} onChange={e => setCycleStart(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Internship Cycle End Date:</label>
            <input type="date" value={cycleEnd} onChange={e => setCycleEnd(e.target.value)} />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={maintenance} onChange={e => setMaintenance(e.target.checked)} id="maintenance" />
            <label htmlFor="maintenance">Enable Maintenance Mode</label>
          </div>
          <button className="approve" type="submit">Save Settings</button>
        </form>
      </div>
    </DashboardLayout>
  );
} 