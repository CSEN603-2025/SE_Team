import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const initialSkills = [
  { id: 1, name: 'React', level: 80 },
  { id: 2, name: 'Python', level: 70 },
  { id: 3, name: 'Machine Learning', level: 60 }
];

function ProgressCircle({ value }) {
  const radius = 32;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#E8F6EF"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#4F8A8B"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text x="50%" y="54%" textAnchor="middle" fontSize="1.1em" fontWeight="bold" fill="#333">{value}%</text>
    </svg>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(initialSkills);
  const [modal, setModal] = useState(null); // {mode: 'add'|'edit', skill: {...}}
  const [form, setForm] = useState({ name: '', level: 50 });

  const openAdd = () => {
    setForm({ name: '', level: 50 });
    setModal({ mode: 'add' });
  };
  const openEdit = (skill) => {
    setForm(skill);
    setModal({ mode: 'edit', skill });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'level' ? Number(value) : value }));
  };

  const handleSave = () => {
    if (modal.mode === 'add') {
      setSkills([...skills, { ...form, id: Date.now() }]);
    } else if (modal.mode === 'edit') {
      setSkills(skills.map(s => s.id === form.id ? form : s));
    }
    closeModal();
  };

  const handleDelete = id => {
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <DashboardLayout title="Skills Development">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Skills Development</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
          {skills.map(skill => (
            <div key={skill.id} style={{ background: '#F8FAFB', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, flex: '1 1 220px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'box-shadow 0.2s' }}>
              <ProgressCircle value={skill.level} />
              <div style={{ fontWeight: 600, fontSize: 18, margin: '16px 0 8px' }}>{skill.name}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button title="Edit" className="action-button" style={{ padding: 8, borderRadius: '50%' }} onClick={() => openEdit(skill)}><FaEdit /></button>
                <button title="Delete" className="action-button" style={{ background: '#eee', color: '#333', padding: 8, borderRadius: '50%' }} onClick={() => handleDelete(skill.id)}><FaTrash /></button>
              </div>
            </div>
          ))}
          <button title="Add Skill" className="action-button" onClick={openAdd} style={{ minWidth: 220, minHeight: 180, borderRadius: 16, fontSize: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <FaPlus size={32} />
            Add Skill
          </button>
        </div>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.mode === 'add' ? 'Add Skill' : 'Edit Skill'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Skill Name" className="modern-input" />
                <label>Proficiency: {form.level}%
                  <input name="level" type="range" min={0} max={100} value={form.level} onChange={handleChange} className="modern-input" />
                </label>
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleSave}>Save</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 