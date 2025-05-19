import React from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaChartLine } from 'react-icons/fa';
import '../src/styles/Internships.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const stats = [
  { label: 'Total Internships', value: 12 },
  { label: 'Applications', value: 45 },
  { label: 'Current Interns', value: 8 },
  { label: 'Completed', value: 24 }
];

const barData = [
  { name: 'Jan', Applications: 10, Interns: 3, Completed: 2 },
  { name: 'Feb', Applications: 12, Interns: 4, Completed: 3 },
  { name: 'Mar', Applications: 8, Interns: 2, Completed: 4 },
  { name: 'Apr', Applications: 15, Interns: 5, Completed: 6 },
  { name: 'May', Applications: 7, Interns: 3, Completed: 2 },
  { name: 'Jun', Applications: 10, Interns: 4, Completed: 3 }
];

const pieData = [
  { name: 'Current Interns', value: 8 },
  { name: 'Completed', value: 24 }
];
const COLORS = ['#4F8A8B', '#F9B208'];

export default function Performance() {
  return (
    <DashboardLayout title="Performance Analytics">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaChartLine size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Performance Analytics</h2>
      </div>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 32 }}>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Applications & Interns Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Applications" fill="#4F8A8B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Interns" fill="#F9B208" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Completed" fill="#F76E11" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Interns Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
} 