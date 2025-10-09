import React, { useState } from 'react';

function PRLModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [reports, setReports] = useState([
    {
      id: 1,
      facultyName: 'Faculty of Computing',
      className: 'Class A',
      weekOfReporting: 'Week 3',
      date: '2025-09-20',
      course: 'DIWA2110',
      courseCode: 'DIWA2110',
      lecturer: 'John Doe',
      actualStudentsPresent: 40,
      totalRegisteredStudents: 50,
      venue: 'Room 101',
      scheduledLectureTime: '10:00 AM',
      topicTaught: 'Introduction to Web Development',
      learningOutcomes: 'Understand basic HTML and CSS',
      recommendations: 'More practical exercises',
      status: 'Pending',
      attendance: 80,
      feedback: ''
    },
    {
      id: 2,
      facultyName: 'Faculty of Computing',
      className: 'Class B',
      weekOfReporting: 'Week 4',
      date: '2025-09-21',
      course: 'DIWA2111',
      courseCode: 'DIWA2111',
      lecturer: 'Jane Smith',
      actualStudentsPresent: 35,
      totalRegisteredStudents: 50,
      venue: 'Room 102',
      scheduledLectureTime: '11:00 AM',
      topicTaught: 'Database Design',
      learningOutcomes: 'Learn normalization principles',
      recommendations: 'Include case studies',
      status: 'Reviewed',
      attendance: 70,
      feedback: 'Good engagement in class.'
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'DIWA2110',
      name: 'Web Development Fundamentals',
      lecturer: 'John Doe',
      totalStudents: 45,
      averageAttendance: 85,
      averageRating: 4.2,
      classesCount: 12
    },
    {
      id: 2,
      code: 'DIWA2111',
      name: 'Database Systems',
      lecturer: 'Jane Smith',
      totalStudents: 38,
      averageAttendance: 78,
      averageRating: 4.0,
      classesCount: 10
    },
    {
      id: 3,
      code: 'DIWA2112',
      name: 'Software Engineering',
      lecturer: 'Mike Johnson',
      totalStudents: 42,
      averageAttendance: 82,
      averageRating: 4.3,
      classesCount: 14
    }
  ]);

  const [classes, setClasses] = useState([
    { id: 1, course: 'DIWA2110', className: 'Class A', lecturer: 'John Doe', schedule: 'Mon 10:00 AM', room: 'Room 101', students: 25 },
    { id: 2, course: 'DIWA2110', className: 'Class B', lecturer: 'John Doe', schedule: 'Wed 2:00 PM', room: 'Room 102', students: 20 },
    { id: 3, course: 'DIWA2111', className: 'Class A', lecturer: 'Jane Smith', schedule: 'Tue 11:00 AM', room: 'Room 201', students: 22 },
    { id: 4, course: 'DIWA2111', className: 'Class B', lecturer: 'Jane Smith', schedule: 'Thu 9:00 AM', room: 'Room 202', students: 16 },
    { id: 5, course: 'DIWA2112', className: 'Class A', lecturer: 'Mike Johnson', schedule: 'Fri 1:00 PM', room: 'Room 301', students: 24 },
    { id: 6, course: 'DIWA2112', className: 'Class B', lecturer: 'Mike Johnson', schedule: 'Mon 3:00 PM', room: 'Room 302', students: 18 }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [viewReport, setViewReport] = useState(null);

  const handleOpenFeedback = (report) => {
    setSelectedReport(report);
    setFeedbackText(report.feedback || '');
  };

  const handleSaveFeedback = () => {
    setReports((prevReports) =>
      prevReports.map((r) =>
        r.id === selectedReport.id ? { ...r, feedback: feedbackText, status: 'Reviewed' } : r
      )
    );
    setSelectedReport(null);
    setFeedbackText('');
  };

  const streamStats = {
    totalCourses: courses.length,
    totalLecturers: [...new Set(courses.map(c => c.lecturer))].length,
    totalClasses: classes.length,
    averageAttendance: Math.round(courses.reduce((sum, c) => sum + c.averageAttendance, 0) / courses.length),
    averageRating: (courses.reduce((sum, c) => sum + c.averageRating, 0) / courses.length).toFixed(1),
    totalStudents: courses.reduce((sum, c) => sum + c.totalStudents, 0)
  };

  const renderOverview = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <i className="fas fa-book fa-2x text-primary mb-2"></i>
            <h4>{streamStats.totalCourses}</h4>
            <p className="text-muted">Total Courses</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <i className="fas fa-chalkboard-teacher fa-2x text-success mb-2"></i>
            <h4>{streamStats.totalLecturers}</h4>
            <p className="text-muted">Lecturers</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <i className="fas fa-users fa-2x text-info mb-2"></i>
            <h4>{streamStats.averageAttendance}%</h4>
            <p className="text-muted">Avg Attendance</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <i className="fas fa-star fa-2x text-warning mb-2"></i>
            <h4>{streamStats.averageRating}</h4>
            <p className="text-muted">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="card p-4 shadow-sm">
      <h4><i className="fas fa-book"></i> Courses in Software Development Stream</h4>
      <div className="table-responsive">
        <table className="table table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th><i className="fas fa-hashtag"></i> Code</th>
              <th><i className="fas fa-graduation-cap"></i> Course Name</th>
              <th><i className="fas fa-chalkboard-teacher"></i> Lecturer</th>
              <th><i className="fas fa-users"></i> Students</th>
              <th><i className="fas fa-chart-line"></i> Avg Attendance</th>
              <th><i className="fas fa-star"></i> Rating</th>
              <th><i className="fas fa-calendar"></i> Classes</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td><strong>{course.code}</strong></td>
                <td>{course.name}</td>
                <td>{course.lecturer}</td>
                <td><i className="fas fa-user-graduate"></i> {course.totalStudents}</td>
                <td><span className="badge bg-info">{course.averageAttendance}%</span></td>
                <td><i className="fas fa-star text-warning"></i> {course.averageRating}</td>
                <td>{course.classesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="card p-4 shadow-sm">
      <h4><i className="fas fa-chalkboard"></i> Classes Overview</h4>
      <div className="table-responsive">
        <table className="table table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th><i className="fas fa-hashtag"></i> ID</th>
              <th><i className="fas fa-book"></i> Course</th>
              <th><i className="fas fa-users"></i> Class</th>
              <th><i className="fas fa-chalkboard-teacher"></i> Lecturer</th>
              <th><i className="fas fa-clock"></i> Schedule</th>
              <th><i className="fas fa-map-marker-alt"></i> Room</th>
              <th><i className="fas fa-user-graduate"></i> Students</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.id}</td>
                <td><strong>{cls.course}</strong></td>
                <td>{cls.className}</td>
                <td>{cls.lecturer}</td>
                <td>{cls.schedule}</td>
                <td>{cls.room}</td>
                <td>{cls.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="card p-4 shadow-sm">
      <h4><i className="fas fa-file-alt"></i> Recent Lecture Reports</h4>
      <table className="table table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th><i className="fas fa-hashtag"></i> ID</th>
            <th><i className="fas fa-book"></i> Course</th>
            <th><i className="fas fa-chalkboard-teacher"></i> Lecturer</th>
            <th><i className="fas fa-calendar"></i> Date</th>
            <th><i className="fas fa-info-circle"></i> Status</th>
            <th><i className="fas fa-users"></i> Attendance</th>
            <th><i className="fas fa-comments"></i> Feedback</th>
            <th><i className="fas fa-cogs"></i> Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.course}</td>
              <td>{report.lecturer}</td>
              <td>{report.date}</td>
              <td>
                <span
                  className={`badge bg-${
                    report.status === 'Reviewed' ? 'success' : 'warning'
                  }`}
                >
                  <i className={`fas ${report.status === 'Reviewed' ? 'fa-check-circle' : 'fa-clock'}`}></i> {report.status}
                </span>
              </td>
              <td><i className="fas fa-users"></i> {report.attendance}%</td>
              <td>{report.feedback ? <><i className="fas fa-comments"></i> {report.feedback}</> : <em className="text-muted"><i className="fas fa-comment-slash"></i> No feedback</em>}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={() => handleOpenFeedback(report)}
                >
                  <i className="fas fa-plus"></i> Add Feedback
                </button>
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={() => setViewReport(report)}
                >
                  <i className="fas fa-eye"></i> View Full Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2><i className="fas fa-user-tie"></i> Principal Lecturer Module</h2>
      <p className="text-muted"><i className="fas fa-info-circle"></i> Manage courses, view lecture reports, monitor progress, and provide feedback for Software Development stream.</p>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <i className="fas fa-tachometer-alt"></i> Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
            <i className="fas fa-book"></i> Courses
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            <i className="fas fa-chalkboard"></i> Classes
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <i className="fas fa-file-alt"></i> Reports
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'classes' && renderClasses()}
      {activeTab === 'reports' && renderReports()}

      {/* Feedback Modal */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title"><i className="fas fa-comments"></i> Feedback for {selectedReport.course}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedReport(null)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter your feedback here..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedReport(null)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveFeedback}>
                  <i className="fas fa-save"></i> Save Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Report Modal */}
      {viewReport && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title"><i className="fas fa-file-alt"></i> Full Report Details - {viewReport.course}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewReport(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><i className="fas fa-university"></i> <strong>Faculty:</strong> {viewReport.facultyName}</p>
                    <p><i className="fas fa-chalkboard"></i> <strong>Class:</strong> {viewReport.className}</p>
                    <p><i className="fas fa-calendar-week"></i> <strong>Week:</strong> {viewReport.weekOfReporting}</p>
                    <p><i className="fas fa-calendar"></i> <strong>Date:</strong> {viewReport.date}</p>
                    <p><i className="fas fa-code"></i> <strong>Course Code:</strong> {viewReport.courseCode}</p>
                    <p><i className="fas fa-chalkboard-teacher"></i> <strong>Lecturer:</strong> {viewReport.lecturer}</p>
                  </div>
                  <div className="col-md-6">
                    <p><i className="fas fa-map-marker-alt"></i> <strong>Venue:</strong> {viewReport.venue}</p>
                    <p><i className="fas fa-clock"></i> <strong>Scheduled Time:</strong> {viewReport.scheduledLectureTime}</p>
                    <p><i className="fas fa-book-open"></i> <strong>Topic Taught:</strong> {viewReport.topicTaught}</p>
                    <p><i className="fas fa-graduation-cap"></i> <strong>Learning Outcomes:</strong> {viewReport.learningOutcomes}</p>
                    <p><i className="fas fa-users"></i> <strong>Attendance:</strong> {viewReport.actualStudentsPresent}/{viewReport.totalRegisteredStudents} ({viewReport.attendance}%)</p>
                    <p><i className="fas fa-lightbulb"></i> <strong>Recommendations:</strong> {viewReport.recommendations}</p>
                  </div>
                </div>
                <p><i className="fas fa-comments"></i> <strong>Feedback:</strong> {viewReport.feedback || 'No feedback yet'}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setViewReport(null)}>
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-muted">
        <i className="fas fa-stream"></i> Software Development Stream |
        <i className="fas fa-users"></i> {streamStats.totalStudents} Students |
        <i className="fas fa-chalkboard"></i> {streamStats.totalClasses} Classes
      </p>
    </div>
  );
}

export default PRLModule;
