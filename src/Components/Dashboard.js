import React from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  const getRoleDisplay = (role) => {
    const roles = {
      student: 'Student',
      lecturer: 'Lecturer',
      pl: 'Program Leader',
      prl: 'Principal Lecturer'
    };
    return roles[role] || role;
  };

  const quickActions = [
    { title: 'View Reports', icon: <i className="fas fa-file-alt"></i>, path: '/reports', description: 'Access all reports and analytics' },
    { title: 'My Profile', icon: <i className="fas fa-user"></i>, path: '/profile', description: 'Update your personal information' },
    { title: 'Announcements', icon: <i className="fas fa-bullhorn"></i>, path: '/announcements', description: 'Latest university news' },
    { title: 'Help & Support', icon: <i className="fas fa-life-ring"></i>, path: '/support', description: 'Get help and contact support' }
  ];

  const recentActivities = [
    { action: 'Report submitted', course: 'DIWA2110', time: '2 hours ago' },
    { action: 'Attendance updated', course: 'DIWA2111', time: '1 day ago' },
    { action: 'Grade posted', course: 'DIWA2112', time: '3 days ago' }
  ];

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.email || 'User'}!</h1>
          <p className="role-badge">{getRoleDisplay(user?.role)}</p>
          <p className="welcome-message">Here's your overview for today</p>
        </div>
        <div className="date-section">
          <p className="current-date">{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-book"></i></div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Active Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-file-alt"></i></div>
          <div className="stat-content">
            <h3>8</h3>
            <p>Reports Submitted</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-chart-line"></i></div>
          <div className="stat-content">
            <h3>95%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-star"></i></div>
          <div className="stat-content">
            <h3>4.2</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="action-card" onClick={() => window.location.href = action.path}>
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-section">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon"><i className="fas fa-history"></i></div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{activity.action}</strong> for {activity.course}
                  </p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="dashboard-section">
          <h2><i className="fas fa-calendar-alt"></i> Upcoming Events</h2>
          <div className="events-list">
            <div className="event-item">
              <div className="event-date">
                <span className="day">15</span>
                <span className="month">Oct</span>
              </div>
              <div className="event-content">
                <h4><i className="fas fa-users"></i> Faculty Meeting</h4>
                <p>Discussion on curriculum updates</p>
                <p className="event-time"><i className="fas fa-clock"></i> 2:00 PM - 4:00 PM</p>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <span className="day">18</span>
                <span className="month">Oct</span>
              </div>
              <div className="event-content">
                <h4><i className="fas fa-user-friends"></i> Parent-Teacher Conference</h4>
                <p>Meet with parents to discuss student progress</p>
                <p className="event-time"><i className="fas fa-clock"></i> 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
