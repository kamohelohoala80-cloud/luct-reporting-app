import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentModule.css';

function LecturerModule({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('classes');
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API calls
  const mockClasses = [
    {
      id: 1,
      courseCode: 'DIWA2110',
      courseName: 'Web Development Fundamentals',
      className: 'DIWA2110-A',
      schedule: 'Mon, Wed 10:00-11:30',
      venue: 'Lab 101',
      totalStudents: 45,
      enrolledStudents: 42,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      courseCode: 'DIWA2111',
      courseName: 'Advanced JavaScript',
      className: 'DIWA2111-B',
      schedule: 'Tue, Thu 14:00-15:30',
      venue: 'Lab 102',
      totalStudents: 38,
      enrolledStudents: 35,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ];

  const mockReports = [
    {
      id: 1,
      classId: 1,
      week: 6,
      date: '2024-10-20',
      presentCount: 38,
      totalStudents: 42,
      topic: 'React Components and Props',
      status: 'submitted',
      feedback: 'Good coverage of key concepts',
      attendanceRate: 90
    }
  ];

  const mockRatings = [
    {
      id: 1,
      classId: 1,
      rating: 4.5,
      comment: 'Excellent explanations with practical examples',
      date: '2024-10-20',
      student: 'Anonymous',
      course: 'DIWA2110'
    }
  ];

  useEffect(() => {
    // Load initial data
    setAssignedClasses(mockClasses);
    setReports(mockReports);
    setRatings(mockRatings);
  }, []);

  // Tab Navigation Component
  const TabNavigation = () => (
    <div className="lecturer-tabs">
      {[
        { id: 'classes', label: 'My Classes', icon: <i className="fas fa-book"></i> },
        { id: 'reports', label: 'Reports', icon: <i className="fas fa-chart-bar"></i> },
        { id: 'monitoring', label: 'Monitoring', icon: <i className="fas fa-chart-line"></i> },
        { id: 'ratings', label: 'Ratings', icon: <i className="fas fa-star"></i> }
      ].map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Classes Management Component
  const ClassesManagement = () => (
    <div className="tab-content">
      <div className="section-header">
        <h2>My Assigned Classes</h2>
        <span className="section-badge">{assignedClasses.length} classes</span>
      </div>
      
      <div className="classes-grid">
        {assignedClasses.map(classItem => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
      </div>
    </div>
  );

  // Individual Class Card
  const ClassCard = ({ classItem }) => (
    <div className="class-card" style={{ background: classItem.color }}>
      <div className="class-header">
        <h3 className="course-code">{classItem.courseCode}</h3>
        <span className="enrollment-badge">
          {classItem.enrolledStudents}/{classItem.totalStudents} students
        </span>
      </div>
      
      <h4 className="course-name">{classItem.courseName}</h4>
      <p className="class-details">
        <span className="schedule"><i className="fas fa-calendar"></i> {classItem.schedule}</span>
        <span className="venue"><i className="fas fa-map-marker-alt"></i> {classItem.venue}</span>
      </p>
      
      <div className="class-actions">
        <button className="btn btn-outline-light btn-sm">View Details</button>
        <button className="btn btn-light btn-sm">Submit Report</button>
      </div>
    </div>
  );

  // Reports System Component
  const ReportsSystem = () => (
    <div className="tab-content">
      <div className="section-header">
        <h2>Lecture Reports</h2>
        <button className="btn btn-primary">+ New Report</button>
      </div>

      <div className="reports-overview">
        <div className="report-stats">
          <div className="stat-card">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {reports.filter(r => r.status === 'submitted').length}
            </span>
            <span className="stat-label">Submitted</span>
          </div>
        </div>
      </div>

      <div className="reports-list">
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );

  // Individual Report Card
  const ReportCard = ({ report }) => (
    <div className="report-card">
      <div className="report-header">
        <div className="report-meta">
          <span className="week">Week {report.week}</span>
          <span className="date">{report.date}</span>
        </div>
        <span className={`status-badge ${report.status}`}>
          {report.status}
        </span>
      </div>
      
      <div className="report-content">
        <h5>{report.topic}</h5>
        <div className="attendance-info">
          <span>Present: {report.presentCount}/{report.totalStudents}</span>
          <span>Rate: {report.attendanceRate}%</span>
        </div>
        {report.feedback && (
          <div className="feedback">
            <strong>Feedback:</strong> {report.feedback}
          </div>
        )}
      </div>
      
      <div className="report-actions">
        <button className="btn btn-outline-primary btn-sm">View</button>
        <button className="btn btn-outline-secondary btn-sm">Edit</button>
      </div>
    </div>
  );

  // Monitoring Dashboard Component
  const MonitoringDashboard = () => (
    <div className="tab-content">
      <div className="section-header">
        <h2>Class Performance Monitoring</h2>
      </div>

      <div className="monitoring-stats">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-chart-bar"></i></div>
          <div className="stat-info">
            <h3>85%</h3>
            <p>Average Attendance</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-star"></i></div>
          <div className="stat-info">
            <h3>4.2</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-file-alt"></i></div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Reports Submitted</p>
          </div>
        </div>
      </div>

      <div className="monitoring-charts">
        <div className="chart-section">
          <h4>Attendance Trends</h4>
          <div className="chart-placeholder">
            <i className="fas fa-chart-line"></i> Attendance chart will be displayed here
          </div>
        </div>

        <div className="chart-section">
          <h4>Class Performance</h4>
          <div className="chart-placeholder">
            <i className="fas fa-chart-bar"></i> Performance chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  );

  // Ratings Component
  const RatingsView = () => (
    <div className="tab-content">
      <div className="section-header">
        <h2>Student Ratings & Feedback</h2>
        <div className="rating-summary">
          <span className="average-rating">4.5/5</span>
          <span className="total-ratings">({ratings.length} ratings)</span>
        </div>
      </div>

      <div className="ratings-list">
        {ratings.map(rating => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );

  // Individual Rating Card
  const RatingCard = ({ rating }) => (
    <div className="rating-card">
      <div className="rating-header">
        <span className="course">{rating.course}</span>
        <div className="rating-stars">
          {'★'.repeat(Math.floor(rating.rating))}
          {'☆'.repeat(5 - Math.floor(rating.rating))}
          <span className="rating-value">({rating.rating})</span>
        </div>
      </div>
      
      <p className="rating-comment">{rating.comment}</p>
      
      <div className="rating-footer">
        <span className="student">{rating.student}</span>
        <span className="date">{rating.date}</span>
      </div>
    </div>
  );

  // Report Form Component (Critical - Based on Document Requirements)
  const ReportForm = () => {
    const [formData, setFormData] = useState({
      facultyName: '',
      className: '',
      weekOfReporting: '',
      dateOfLecture: '',
      courseName: '',
      courseCode: '',
      lecturerName: '',
      actualStudentsPresent: '',
      totalRegisteredStudents: '',
      venue: '',
      scheduledTime: '',
      topicTaught: '',
      learningOutcomes: '',
      recommendations: ''
    });

    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit report logic here
      console.log('Report submitted:', formData);
    };

    return (
      <div className="report-form-container">
        <h3><i className="fas fa-edit"></i> New Lecture Report</h3>
        <form onSubmit={handleSubmit} className="report-form">
          {/* Form fields matching the document requirements */}
          <div className="form-row">
            <div className="form-group">
              <label>Faculty Name</label>
              <input
                type="text"
                name="facultyName"
                value={formData.facultyName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Week of Reporting</label>
              <input
                type="number"
                name="weekOfReporting"
                value={formData.weekOfReporting}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Lecture</label>
              <input
                type="date"
                name="dateOfLecture"
                value={formData.dateOfLecture}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          {/* Continue with all 14 fields from document */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Report
            </button>
            <button type="button" className="btn btn-secondary">
              Save Draft
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="lecturer-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1><i className="fas fa-graduation-cap"></i> Lecturer Dashboard</h1>
            <p>Manage your classes, reports, and student feedback</p>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-door-open"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <TabNavigation />
        
        {/* Active Tab Content */}
        {activeTab === 'classes' && <ClassesManagement />}
        {activeTab === 'reports' && <ReportsSystem />}
        {activeTab === 'monitoring' && <MonitoringDashboard />}
        {activeTab === 'ratings' && <RatingsView />}
      </div>
    </div>
  );
}

export default LecturerModule;