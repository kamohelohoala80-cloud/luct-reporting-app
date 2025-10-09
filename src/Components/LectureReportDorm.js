import React, { useState, useEffect } from 'react';
import './LecturerReportForm.css';

function LectureReportDorm() {
  const [formData, setFormData] = useState({
    facultyName: '',
    className: '',
    weekOfReporting: '',
    dateOfLecture: new Date().toISOString().split('T')[0], // Default = today
    courseName: '',
    courseCode: '',
    lecturerName: '',
    actualStudentsPresent: '',
    totalRegisteredStudents: '',
    venue: '',
    scheduledLectureTime: '',
    topicTaught: '',
    learningOutcomes: '',
    recommendations: ''
  });

  const [attendanceRate, setAttendanceRate] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // Calculate attendance %
  useEffect(() => {
    if (formData.actualStudentsPresent && formData.totalRegisteredStudents) {
      const rate = (
        (parseInt(formData.actualStudentsPresent) / parseInt(formData.totalRegisteredStudents)) *
        100
      ).toFixed(1);
      setAttendanceRate(rate);
    } else {
      setAttendanceRate(null);
    }
  }, [formData.actualStudentsPresent, formData.totalRegisteredStudents]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validate
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'facultyName', 'className', 'weekOfReporting', 'dateOfLecture',
      'courseName', 'courseCode', 'lecturerName', 'venue',
      'scheduledLectureTime', 'topicTaught'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) newErrors[field] = 'This field is required';
    });

    if (formData.actualStudentsPresent && formData.totalRegisteredStudents) {
      if (parseInt(formData.actualStudentsPresent) > parseInt(formData.totalRegisteredStudents)) {
        newErrors.actualStudentsPresent = 'Cannot exceed total registered students';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitted Report:', formData);

      setToast({ show: true, type: 'success', message: '✅ Report submitted successfully!' });

      // Reset form
      setFormData({
        facultyName: '',
        className: '',
        weekOfReporting: '',
        dateOfLecture: new Date().toISOString().split('T')[0],
        courseName: '',
        courseCode: '',
        lecturerName: '',
        actualStudentsPresent: '',
        totalRegisteredStudents: '',
        venue: '',
        scheduledLectureTime: '',
        topicTaught: '',
        learningOutcomes: '',
        recommendations: ''
      });
    } catch (err) {
      setToast({ show: true, type: 'danger', message: '❌ Submission failed. Try again.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
    }
  };

  // Reset
  const handleReset = () => {
    setFormData({
      facultyName: '',
      className: '',
      weekOfReporting: '',
      dateOfLecture: new Date().toISOString().split('T')[0],
      courseName: '',
      courseCode: '',
      lecturerName: '',
      actualStudentsPresent: '',
      totalRegisteredStudents: '',
      venue: '',
      scheduledLectureTime: '',
      topicTaught: '',
      learningOutcomes: '',
      recommendations: ''
    });
    setErrors({});
    setAttendanceRate(null);
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Toast */}
      {toast.show && (
        <div className={`alert alert-${toast.type} position-fixed top-0 end-0 m-3 shadow toast-fade`}>
          {toast.message}
        </div>
      )}

      <div className="card shadow-lg rounded-4 bg-gradient p-3">
        <div className="card-header bg-primary text-white rounded-top-4">
          <h2 className="mb-0 d-flex align-items-center">
            <i className="fas fa-chalkboard-teacher me-3"></i>
            Lecturer Reporting Form
          </h2>
          <p className="mb-0 mt-1 small fst-italic">Complete all fields to submit your lecture report</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            {/* Faculty & Class */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="fas fa-university me-2 text-primary"></i> Faculty Name *
                </label>
                <input
                  type="text"
                  name="facultyName"
                  className={`form-control form-control-lg shadow-sm ${errors.facultyName ? 'is-invalid' : ''}`}
                  value={formData.facultyName}
                  onChange={handleChange}
                  placeholder="Enter faculty name"
                />
                {errors.facultyName && <div className="invalid-feedback">{errors.facultyName}</div>}
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <label className="form-label fw-semibold">
                  <i className="fas fa-users-class me-2 text-primary"></i> Class Name *
                </label>
                <input
                  type="text"
                  name="className"
                  className={`form-control form-control-lg shadow-sm ${errors.className ? 'is-invalid' : ''}`}
                  value={formData.className}
                  onChange={handleChange}
                  placeholder="Enter class name"
                />
                {errors.className && <div className="invalid-feedback">{errors.className}</div>}
              </div>
            </div>

            {/* Week + Date */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="fas fa-calendar-week me-2 text-primary"></i> Week of Reporting *
                </label>
                <select
                  name="weekOfReporting"
                  className={`form-select form-select-lg shadow-sm ${errors.weekOfReporting ? 'is-invalid' : ''}`}
                  value={formData.weekOfReporting}
                  onChange={handleChange}
                >
                  <option value="">Select week</option>
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(week => (
                    <option key={week} value={`Week ${week}`}>Week {week}</option>
                  ))}
                </select>
                {errors.weekOfReporting && <div className="invalid-feedback">{errors.weekOfReporting}</div>}
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <label className="form-label fw-semibold">
                  <i className="fas fa-calendar-day me-2 text-primary"></i> Date of Lecture *
                </label>
                <input
                  type="date"
                  name="dateOfLecture"
                  className={`form-control form-control-lg shadow-sm ${errors.dateOfLecture ? 'is-invalid' : ''}`}
                  value={formData.dateOfLecture}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfLecture && <div className="invalid-feedback">{errors.dateOfLecture}</div>}
              </div>
            </div>

            {/* Attendance */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-user-check me-2 text-primary"></i> Students Present
                </label>
                <input
                  type="number"
                  name="actualStudentsPresent"
                  className={`form-control form-control-lg shadow-sm ${errors.actualStudentsPresent ? 'is-invalid' : ''}`}
                  value={formData.actualStudentsPresent}
                  onChange={handleChange}
                  placeholder="Number present"
                />
                {errors.actualStudentsPresent && <div className="invalid-feedback">{errors.actualStudentsPresent}</div>}
              </div>
              <div className="col-md-4 mt-3 mt-md-0">
                <label className="form-label fw-semibold">
                  <i className="fas fa-users me-2 text-primary"></i> Total Registered
                </label>
                <input
                  type="number"
                  name="totalRegisteredStudents"
                  className={`form-control form-control-lg shadow-sm ${errors.totalRegisteredStudents ? 'is-invalid' : ''}`}
                  value={formData.totalRegisteredStudents}
                  onChange={handleChange}
                  placeholder="Total registered"
                />
                {errors.totalRegisteredStudents && <div className="invalid-feedback">{errors.totalRegisteredStudents}</div>}
              </div>
              {attendanceRate && (
                <div className="col-md-4 d-flex align-items-center mt-3 mt-md-0">
                  <div className="alert alert-info w-100 mb-0 text-center shadow-sm">
                    Attendance: <strong>{attendanceRate}%</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining inputs */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-book me-2 text-primary"></i> Course Name *
              </label>
              <input
                type="text"
                name="courseName"
                className={`form-control form-control-lg shadow-sm ${errors.courseName ? 'is-invalid' : ''}`}
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Enter course name"
              />
              {errors.courseName && <div className="invalid-feedback">{errors.courseName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-code me-2 text-primary"></i> Course Code *
              </label>
              <input
                type="text"
                name="courseCode"
                className={`form-control form-control-lg shadow-sm ${errors.courseCode ? 'is-invalid' : ''}`}
                value={formData.courseCode}
                onChange={handleChange}
                placeholder="Enter course code"
              />
              {errors.courseCode && <div className="invalid-feedback">{errors.courseCode}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-user-tie me-2 text-primary"></i> Lecturer Name *
              </label>
              <input
                type="text"
                name="lecturerName"
                className={`form-control form-control-lg shadow-sm ${errors.lecturerName ? 'is-invalid' : ''}`}
                value={formData.lecturerName}
                onChange={handleChange}
                placeholder="Enter lecturer name"
              />
              {errors.lecturerName && <div className="invalid-feedback">{errors.lecturerName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i> Venue *
              </label>
              <input
                type="text"
                name="venue"
                className={`form-control form-control-lg shadow-sm ${errors.venue ? 'is-invalid' : ''}`}
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
              {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-clock me-2 text-primary"></i> Scheduled Lecture Time *
              </label>
              <input
                type="time"
                name="scheduledLectureTime"
                className={`form-control form-control-lg shadow-sm ${errors.scheduledLectureTime ? 'is-invalid' : ''}`}
                value={formData.scheduledLectureTime}
                onChange={handleChange}
              />
              {errors.scheduledLectureTime && <div className="invalid-feedback">{errors.scheduledLectureTime}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-book-open me-2 text-primary"></i> Topic Taught *
              </label>
              <textarea
                name="topicTaught"
                className={`form-control form-control-lg shadow-sm ${errors.topicTaught ? 'is-invalid' : ''}`}
                value={formData.topicTaught}
                onChange={handleChange}
                rows="3"
                placeholder="Describe the topic taught"
              />
              {errors.topicTaught && <div className="invalid-feedback">{errors.topicTaught}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-lightbulb me-2 text-primary"></i> Learning Outcomes
              </label>
              <textarea
                name="learningOutcomes"
                className="form-control form-control-lg shadow-sm"
                value={formData.learningOutcomes}
                onChange={handleChange}
                rows="3"
                placeholder="Describe learning outcomes"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-comments me-2 text-primary"></i> Recommendations
              </label>
              <textarea
                name="recommendations"
                className="form-control form-control-lg shadow-sm"
                value={formData.recommendations}
                onChange={handleChange}
                rows="3"
                placeholder="Provide any recommendations"
              />
            </div>

            {/* Actions */}
            <div className="d-flex gap-3 justify-content-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-lg" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-muted text-center rounded-bottom-4">
          <small>All fields marked with * are required</small>
        </div>
      </div>
    </div>
  );
}

export default LectureReportDorm;
