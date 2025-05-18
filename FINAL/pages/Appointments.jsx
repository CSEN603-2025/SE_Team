import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Appointments.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    type: 'career_counseling',
    date: '',
    time: '',
    notes: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(savedAppointments);

    // Generate available slots for selected date
    generateAvailableSlots(selectedDate);
  }, [selectedDate]);

  const generateAvailableSlots = (date) => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const interval = 30; // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = appointments.some(apt => {
          const aptDate = new Date(apt.date);
          return (
            aptDate.getDate() === date.getDate() &&
            aptDate.getMonth() === date.getMonth() &&
            aptDate.getFullYear() === date.getFullYear() &&
            apt.time === time
          );
        });

        if (!isBooked) {
          slots.push(time);
        }
      }
    }
    setAvailableSlots(slots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      id: Date.now(),
      ...newAppointment,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Add notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'appointment_scheduled',
      message: `New appointment scheduled: ${appointment.title}`,
      date: new Date().toISOString()
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Reset form
    setNewAppointment({
      title: '',
      type: 'career_counseling',
      date: '',
      time: '',
      notes: ''
    });

    // Refresh available slots
    generateAvailableSlots(selectedDate);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, status: 'cancelled' };
      }
      return apt;
    });
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Add notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'appointment_cancelled',
      message: `Appointment cancelled: ${appointments.find(apt => apt.id === appointmentId).title}`,
      date: new Date().toISOString()
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    setNewAppointment({
      title: appointment.title,
      type: appointment.type,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes
    });
    handleCancel(appointmentId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#4CAF50';
      case 'cancelled': return '#f44336';
      case 'completed': return '#1976D2';
      default: return '#757575';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2>My Appointments</h2>
        <div className="filter-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Appointments</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="appointments-content">
        <div className="appointments-list">
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <h3>{appointment.title}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
              </div>
              <div className="appointment-details">
                <p>
                  <strong>Type:</strong> {appointment.type.replace('_', ' ')}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                {appointment.notes && (
                  <p className="appointment-notes">
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                )}
              </div>
              <div className="appointment-actions">
                {appointment.status === 'scheduled' && (
                  <>
                    <Link
                      to={`/video-call/${appointment.id}`}
                      className="join-button"
                    >
                      Join Meeting
                    </Link>
                    <button
                      onClick={() => handleReschedule(appointment.id)}
                      className="reschedule-button"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-form">
          <h3>Schedule New Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={newAppointment.type}
                onChange={(e) => setNewAppointment(prev => ({
                  ...prev,
                  type: e.target.value
                }))}
                required
              >
                <option value="career_counseling">Career Counseling</option>
                <option value="resume_review">Resume Review</option>
                <option value="mock_interview">Mock Interview</option>
                <option value="technical_mentoring">Technical Mentoring</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) => {
                  setNewAppointment(prev => ({
                    ...prev,
                    date: e.target.value
                  }));
                  setSelectedDate(new Date(e.target.value));
                }}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <select
                value={newAppointment.time}
                onChange={(e) => setNewAppointment(prev => ({
                  ...prev,
                  time: e.target.value
                }))}
                required
              >
                <option value="">Select a time</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                placeholder="Add any specific topics or questions you'd like to discuss..."
              />
            </div>

            <button type="submit" className="schedule-button">
              Schedule Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 