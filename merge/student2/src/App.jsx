import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginPage from './components/LoginPage';
import Submissions from './components/Submissions';
import FilterableApplications from './components/FilterableApplications';
import SortableApplications from './components/SortableApplications';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Navigation />
              <div className="main-content">
                <Routes>
                  <Route path="/submissions" element={<Submissions />} />
                  <Route path="/filter" element={<FilterableApplications />} />
                  <Route path="/sort" element={<SortableApplications />} />
                  <Route path="*" element={<Navigate to="/submissions" replace />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
