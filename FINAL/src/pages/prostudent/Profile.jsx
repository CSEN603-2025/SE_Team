import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialProfile = {
  name: 'Jane Doe',
  email: 'prostudent@guc.edu.eg',
  major: 'Computer Science',
  semester: '6',
  jobInterests: 'Cloud Computing, AI, Web Development',
  internships: [
    { company: 'Amazon', role: 'Cloud Intern', duration: '3 months' },
    { company: 'Google', role: 'AI Intern', duration: '2 months' }
  ],
  partTimeJobs: [
    { company: 'Freelance', role: 'Web Developer', duration: '1 year' }
  ],
  activities: 'GUC Coding Club, Hackathons'
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (arrName, idx, field, value) => {
    setForm({
      ...form,
      [arrName]: form[arrName].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    });
  };

  const handleSave = () => {
    setProfile(form);
    setEdit(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setEdit(false);
  };

  return (
    <DashboardLayout title="Pro Student Profile">
      <div className="profile-card" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Profile</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label>
            Name:
            <input name="name" value={edit ? form.name : profile.name} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
          <label>
            Email:
            <input name="email" value={edit ? form.email : profile.email} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
          <label>
            Major:
            <input name="major" value={edit ? form.major : profile.major} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
          <label>
            Semester:
            <input name="semester" value={edit ? form.semester : profile.semester} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
          <label>
            Job Interests:
            <input name="jobInterests" value={edit ? form.jobInterests : profile.jobInterests} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
          <div>
            <strong>Previous Internships:</strong>
            {form.internships.map((intern, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <input
                  value={edit ? form.internships[idx].company : profile.internships[idx].company}
                  onChange={e => handleArrayChange('internships', idx, 'company', e.target.value)}
                  disabled={!edit}
                  placeholder="Company"
                  className="modern-input"
                  style={{ width: 120, marginRight: 8 }}
                />
                <input
                  value={edit ? form.internships[idx].role : profile.internships[idx].role}
                  onChange={e => handleArrayChange('internships', idx, 'role', e.target.value)}
                  disabled={!edit}
                  placeholder="Role"
                  className="modern-input"
                  style={{ width: 120, marginRight: 8 }}
                />
                <input
                  value={edit ? form.internships[idx].duration : profile.internships[idx].duration}
                  onChange={e => handleArrayChange('internships', idx, 'duration', e.target.value)}
                  disabled={!edit}
                  placeholder="Duration"
                  className="modern-input"
                  style={{ width: 100 }}
                />
              </div>
            ))}
          </div>
          <div>
            <strong>Part-Time Jobs:</strong>
            {form.partTimeJobs.map((job, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <input
                  value={edit ? form.partTimeJobs[idx].company : profile.partTimeJobs[idx].company}
                  onChange={e => handleArrayChange('partTimeJobs', idx, 'company', e.target.value)}
                  disabled={!edit}
                  placeholder="Company"
                  className="modern-input"
                  style={{ width: 120, marginRight: 8 }}
                />
                <input
                  value={edit ? form.partTimeJobs[idx].role : profile.partTimeJobs[idx].role}
                  onChange={e => handleArrayChange('partTimeJobs', idx, 'role', e.target.value)}
                  disabled={!edit}
                  placeholder="Role"
                  className="modern-input"
                  style={{ width: 120, marginRight: 8 }}
                />
                <input
                  value={edit ? form.partTimeJobs[idx].duration : profile.partTimeJobs[idx].duration}
                  onChange={e => handleArrayChange('partTimeJobs', idx, 'duration', e.target.value)}
                  disabled={!edit}
                  placeholder="Duration"
                  className="modern-input"
                  style={{ width: 100 }}
                />
              </div>
            ))}
          </div>
          <label>
            College Activities:
            <input name="activities" value={edit ? form.activities : profile.activities} onChange={handleChange} disabled={!edit} className="modern-input" />
          </label>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          {edit ? (
            <>
              <button className="action-button" onClick={handleSave}>Save</button>
              <button className="action-button" onClick={handleCancel} style={{ background: '#eee', color: '#333' }}>Cancel</button>
            </>
          ) : (
            <button className="action-button" onClick={() => setEdit(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 