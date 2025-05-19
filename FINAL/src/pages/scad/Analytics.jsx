import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const stats = {
  totalStudents: 150,
  totalCompanies: 25,
  activeInternships: 45,
  placementRate: 87,
  topIndustries: [
    { name: 'Software', count: 18 },
    { name: 'Finance', count: 10 },
    { name: 'Healthcare', count: 7 },
    { name: 'Energy', count: 5 }
  ],
  monthlyPlacements: [
    { month: 'Jan', placements: 10 },
    { month: 'Feb', placements: 12 },
    { month: 'Mar', placements: 15 },
    { month: 'Apr', placements: 8 },
    { month: 'May', placements: 14 },
    { month: 'Jun', placements: 11 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  const [period, setPeriod] = useState('6m');

  // Filtered data for demonstration (could be dynamic)
  const filteredPlacements = stats.monthlyPlacements;
  const filteredIndustries = stats.topIndustries;

  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="scad-info-section">
        <h2>System Analytics</h2>
        <div className="stats-grid" style={{ marginBottom: 32 }}>
          <div className="stat-card"><h3>Total Students</h3><p>{stats.totalStudents}</p></div>
          <div className="stat-card"><h3>Total Companies</h3><p>{stats.totalCompanies}</p></div>
          <div className="stat-card"><h3>Active Internships</h3><p>{stats.activeInternships}</p></div>
          <div className="stat-card"><h3>Placement Rate</h3><p>{stats.placementRate}%</p></div>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Placements Over Time</h3>
              <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: 4 }}>
                <option value="6m">Last 6 Months</option>
                <option value="12m">Last 12 Months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={filteredPlacements}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="placements" fill="#0088FE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
            <h3 style={{ marginBottom: 8 }}>Top Industries</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={filteredIndustries} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {filteredIndustries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ margin: '2rem 0', display: 'flex', gap: 16 }}>
          <button className="approve" style={{ fontWeight: 600, fontSize: 16, padding: '0.75rem 2rem' }} onClick={() => alert('Export PDF coming soon!')}>Export as PDF</button>
          <button className="edit" style={{ fontWeight: 600, fontSize: 16, padding: '0.75rem 2rem' }} onClick={() => alert('Export Excel coming soon!')}>Export as Excel</button>
        </div>
      </div>
    </DashboardLayout>
  );
} 