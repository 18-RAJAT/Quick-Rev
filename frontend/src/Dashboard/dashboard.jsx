import React, { useState } from 'react';
import './dashboard.css';

// Mock data [Replace with API]
const mockExams = [
  { id: 1, title: 'Mathematics Final', date: '2025-05-15', duration: '180 mins', status: 'Upcoming' },
  { id: 2, title: 'Physics Mid-term', date: '2025-05-10', duration: '120 mins', status: 'Upcoming' },
  { id: 3, title: 'Chemistry Quiz', date: '2025-05-01', duration: '60 mins', status: 'Completed' },
];

const mockProgress = [
  { subject: 'Mathematics', progress: 75 },
  { subject: 'Physics', progress: 60 },
  { subject: 'Chemistry', progress: 85 },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  //AUTH
  const studentName = "Rajat Joshi";

  const ProgressBar = ({ progress }) => (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}>
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <h2>ExamPortal</h2>
        </div>
        <div className="nav-links">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'exams' ? 'active' : ''} 
            onClick={() => setActiveTab('exams')}
          >
            My Exams
          </button>
          <button 
            className={activeTab === 'progress' ? 'active' : ''} 
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
        </div>
        <div className="user-profile">
          <span className="user-name">{studentName}</span>
          <div className="avatar">
            <img src="data:image/png;base64,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" alt="User Avatar" />
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1>Welcome back, {studentName}!</h1>
          <p>Your next exam is scheduled in 3 days</p>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="quick-stats">
                <div className="stat-card">
                  <h3>Upcoming Exams</h3>
                  <p className="stat-number">2</p>
                </div>
                <div className="stat-card">
                  <h3>Completed Exams</h3>
                  <p className="stat-number">1</p>
                </div>
                <div className="stat-card">
                  <h3>Average Score</h3>
                  <p className="stat-number">85%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="exams-section">
              <h2>My Exams</h2>
              <div className="exam-list">
                {mockExams.map(exam => (
                  <div key={exam.id} className="exam-card">
                    <h3>{exam.title}</h3>
                    <div className="exam-details">
                      <p><strong>Date:</strong> {exam.date}</p>
                      <p><strong>Duration:</strong> {exam.duration}</p>
                      <span className={`status ${exam.status.toLowerCase()}`}>
                        {exam.status}
                      </span>
                    </div>
                    {exam.status === 'Upcoming' && (
                      <button className="start-exam-btn">Enter Exam</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-section">
              <h2>Your Progress</h2>
              <div className="progress-list">
                {mockProgress.map(item => (
                  <div key={item.subject} className="progress-item">
                    <h3>{item.subject}</h3>
                    <ProgressBar progress={item.progress} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;