import React, { useState } from 'react';
import LecturerReportForm from './LectureReportForm';

function LecturerModule() {
  const [submittedReports] = useState([
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
      status: 'Submitted',
      attendance: 80,
      feedback: 'Pending Review'
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

  const [viewReport, setViewReport] = useState(null);

  return (
    <div className="container mt-5">
      <h2>Lecturer Module</h2>
      <p className="text-muted">Submit and manage class reports here.</p>

      <LecturerReportForm />

      <div className="card p-4 shadow-sm mt-4">
        <h4>Submitted Lecture Reports</h4>
        <table className="table table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              <th>Attendance</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.course}</td>
                <td>{report.date}</td>
                <td>
                  <span
                    className={`badge bg-${
                      report.status === 'Reviewed' ? 'success' : 'warning'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>{report.attendance}%</td>
                <td>{report.feedback || <em className="text-muted">No feedback</em>}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => setViewReport(report)}
                  >
                    View Full Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Report Modal */}
      {viewReport && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Full Report Details - {viewReport.course}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewReport(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Faculty:</strong> {viewReport.facultyName}</p>
                    <p><strong>Class:</strong> {viewReport.className}</p>
                    <p><strong>Week:</strong> {viewReport.weekOfReporting}</p>
                    <p><strong>Date:</strong> {viewReport.date}</p>
                    <p><strong>Course Code:</strong> {viewReport.courseCode}</p>
                    <p><strong>Lecturer:</strong> {viewReport.lecturer}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Venue:</strong> {viewReport.venue}</p>
                    <p><strong>Scheduled Time:</strong> {viewReport.scheduledLectureTime}</p>
                    <p><strong>Topic Taught:</strong> {viewReport.topicTaught}</p>
                    <p><strong>Learning Outcomes:</strong> {viewReport.learningOutcomes}</p>
                    <p><strong>Attendance:</strong> {viewReport.actualStudentsPresent}/{viewReport.totalRegisteredStudents} ({viewReport.attendance}%)</p>
                    <p><strong>Recommendations:</strong> {viewReport.recommendations}</p>
                  </div>
                </div>
                <p><strong>Feedback:</strong> {viewReport.feedback || 'No feedback yet'}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setViewReport(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-muted">Features now: Submit Reports, Monitor Attendance, Track Report Status, View Full Reports.</p>
    </div>
  );
}

export default LecturerModule;
