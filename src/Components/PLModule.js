import React, { useState } from 'react';
import './PLModule.css';

function PLModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [courseData, setCourseData] = useState({ courseName: '', lecturer: '' });
  const [courses, setCourses] = useState([]);
  const [reports, setReports] = useState([
    {
      id: 1,
      course: 'Web Development',
      lecturer: 'Dr. Smith',
      week: 'Week 3',
      date: '2025-09-20',
      topic: 'Introduction to HTML',
      attendance: 84,
      venue: 'Room 101',
      status: 'Submitted',
      feedback: 'Well structured'
    },
    {
      id: 2,
      course: 'Database Systems',
      lecturer: 'Prof. Lee',
      week: 'Week 4',
      date: '2025-09-21',
      topic: 'Normalization',
      attendance: 75,
      venue: 'Room 102',
      status: 'Pending',
      feedback: '-'
    }
  ]);
  const [monitoring, setMonitoring] = useState([
    { id: 1, course: 'Web Development', total: 50, present: 42 },
    { id: 2, course: 'Database Systems', total: 40, present: 30 }
  ]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [viewReport, setViewReport] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseData.courseName && courseData.lecturer) {
      const newCourse = { ...courseData, id: Date.now() };
      setCourses((prev) => [...prev, newCourse]);
      setMessage({ text: `Course "${courseData.courseName}" assigned to ${courseData.lecturer}.`, type: 'success' });
      setCourseData({ courseName: '', lecturer: '' });
    } else {
      setMessage({ text: 'Please fill in both fields.', type: 'danger' });
    }
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setMessage({ text: 'Course removed successfully.', type: 'warning' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleViewReport = (report) => {
    setViewReport(report);
  };

  const handleOpenFeedback = (report) => {
    setSelectedReport(report);
    setFeedbackText(report.feedback === '-' ? '' : report.feedback);
  };

  const handleSaveFeedback = () => {
    setReports((prevReports) =>
      prevReports.map((r) =>
        r.id === selectedReport.id ? { ...r, feedback: feedbackText, status: 'Submitted' } : r
      )
    );
    setSelectedReport(null);
    setFeedbackText('');
  };

  // Calculate attendance %
  const getAttendanceRate = (present, total) => {
    if (!total || total === 0) return '0%';
    return `${((present / total) * 100).toFixed(1)}%`;
  };

  const renderOverview = () => {
    const totalCourses = courses.length;
    const totalLecturers = [...new Set(courses.map(c => c.lecturer))].length;
    const totalStudents = monitoring.reduce((sum, cls) => sum + cls.total, 0);
    const totalPresent = monitoring.reduce((sum, cls) => sum + cls.present, 0);
    const averageAttendance = getAttendanceRate(totalPresent, totalStudents);

    return (
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="fas fa-book fa-2x text-primary mb-2"></i>
              <h4>{totalCourses}</h4>
              <p className="text-muted">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="fas fa-chalkboard-teacher fa-2x text-success mb-2"></i>
              <h4>{totalLecturers}</h4>
              <p className="text-muted">Lecturers</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="fas fa-users fa-2x text-info mb-2"></i>
              <h4>{averageAttendance}</h4>
              <p className="text-muted">Avg Attendance</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="fas fa-user-graduate fa-2x text-warning mb-2"></i>
              <h4>{totalStudents}</h4>
              <p className="text-muted">Total Students</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourses = () => (
    <>
      {/* Add Course Form */}
      <div className="card p-4 shadow-sm mb-4">
        <h4><i className="fas fa-plus"></i> Add New Course</h4>
        <form onSubmit={handleAddCourse}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Course Name</label>
              <input
                type="text"
                className="form-control"
                name="courseName"
                value={courseData.courseName}
                onChange={handleChange}
                placeholder="e.g., Web Development"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Lecturer</label>
              <input
                type="text"
                className="form-control"
                name="lecturer"
                value={courseData.lecturer}
                onChange={handleChange}
                placeholder="e.g., Dr. Smith"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100"><i className="fas fa-plus"></i> Add Course</button>
        </form>
      </div>

      {/* Assigned Courses */}
      {courses.length > 0 && (
        <div className="card shadow-sm p-4 mb-4">
          <h5><i className="fas fa-book"></i> Assigned Courses</h5>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Course</th>
                <th>Lecturer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.lecturer}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const renderReports = () => (
    <div className="card shadow-sm p-4 mb-4">
      <h5><i className="fas fa-file-alt"></i> View Reports</h5>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Course</th>
            <th>Lecturer</th>
            <th>Date</th>
            <th>Topic</th>
            <th>Attendance</th>
            <th>Week</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.course}</td>
              <td>{report.lecturer}</td>
              <td>{report.date}</td>
              <td>{report.topic}</td>
              <td>{report.attendance}%</td>
              <td>{report.week}</td>
              <td>
                <span className={`badge bg-${report.status === 'Submitted' ? 'success' : 'warning'}`}>
                  {report.status}
                </span>
              </td>
              <td>{report.feedback === '-' ? <em className="text-muted">No feedback</em> : report.feedback}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewReport(report)}
                >
                  <i className="fas fa-eye"></i> View Full Report
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary ms-1"
                  onClick={() => handleOpenFeedback(report)}
                >
                  <i className="fas fa-comments"></i> Add Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMonitoring = () => (
    <div className="card shadow-sm p-4">
      <h5><i className="fas fa-chart-bar"></i> Class Monitoring</h5>
      <div className="mb-3">
        <p><strong>Overall Average Attendance:</strong> {getAttendanceRate(monitoring.reduce((sum, cls) => sum + cls.present, 0), monitoring.reduce((sum, cls) => sum + cls.total, 0))}</p>
      </div>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Course</th>
            <th>Total Students</th>
            <th>Present</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {monitoring.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.course}</td>
              <td>{cls.total}</td>
              <td>{cls.present}</td>
              <td>{getAttendanceRate(cls.present, cls.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="pl-module-container container mt-5">
      <h2 className="pl-module-header"><i className="fas fa-user-tie"></i> Program Leader Module</h2>
      <p className="text-muted">Manage courses, assign lecturers, view reports, and monitor classes.</p>

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
          <button className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <i className="fas fa-file-alt"></i> Reports
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'monitoring' ? 'active' : ''}`} onClick={() => setActiveTab('monitoring')}>
            <i className="fas fa-chart-bar"></i> Monitoring
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'reports' && renderReports()}
      {activeTab === 'monitoring' && renderMonitoring()}

      {/* Feedback Modal */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title"><i className="fas fa-comments"></i> Feedback for {selectedReport.course}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedReport(null)}></button>
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

      {/* View Full Report Modal */}
      {viewReport && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Full Report Details</h5>
                <button type="button" className="btn-close" onClick={() => setViewReport(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Course:</strong> {viewReport.course}</p>
                    <p><strong>Lecturer:</strong> {viewReport.lecturer}</p>
                    <p><strong>Week:</strong> {viewReport.week}</p>
                    <p><strong>Date:</strong> {viewReport.date}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Topic:</strong> {viewReport.topic}</p>
                    <p><strong>Attendance:</strong> {viewReport.attendance}%</p>
                    <p><strong>Venue:</strong> {viewReport.venue}</p>
                    <p><strong>Status:</strong> {viewReport.status}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p><strong>Feedback:</strong> {viewReport.feedback}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setViewReport(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PLModule;
