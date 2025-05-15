import './App.css';
import React from 'react';

import EvaluationReport from './components/EvaluationReport';
import LivesChat from './components/LivesChat';
import ReportClarification from './components/ReportClarification';
import ReportDetails from './components/ReportDetails';
import ReportFilter from './components/ReportFilter';
import ReportGenerator from './components/ReportGenerator';
import ReportStatusControl from './components/ReportStatusControl';
import StatisticsDashboard from './components/StatisticsDashboard';
import WorkshopCertificate from './components/WorkshopCertificate';
import WorkshopChat from './components/WorkshopChat';
import WorkshopFeedback from './components/WorkshopFeedback';
import WorkshopLive from './components/WorkshopLive';
import WorkshopNotes from './components/WorkshopNotes';
import WorkshopRecording from './components/WorkshopRecording';

export default function App() {
  return (
    <div>
      <h1>Hello Marwan — your full app is loaded! 🎉</h1>

      <EvaluationReport />
      <LivesChat />
      <ReportClarification />
      <ReportDetails />
      <ReportFilter />
      <ReportGenerator />
      <ReportStatusControl />
      <StatisticsDashboard />
      <WorkshopCertificate />
      <WorkshopChat />
      <WorkshopFeedback />
      <WorkshopLive />
      <WorkshopNotes />
      <WorkshopRecording />
    </div>
  );
}
