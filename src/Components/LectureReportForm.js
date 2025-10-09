import React, { useState, useEffect } from 'react';
import './LecturerReportForm.css';

function LecturerReportForm() {
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

      setToast({ show: true, type: 'success', message: 'Report submitted successfully!' });

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
      setToast({ show: true, type: 'danger', message: 'Submission failed. Try again.' });
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
    <div className="container mt-4">
      {/* Toast */}
      {toast.show && (
        <div className={`alert alert-${toast.type} position-fixed top-0 end-0 m-3 shadow`}>
          {toast.message}
        </div>
      )}

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">
            <i className="fas fa-chalkboard-teacher me-2"></i>
            Lecturer Reporting Form
          </h2>
          <p className="mb-0 mt-1 small">Complete all fields to submit your lecture report</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Faculty & Class */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Faculty Name *</label>
                <input
                  type="text"
                  name="facultyName"
                  className={`form-control ${errors.facultyName ? 'is-invalid' : ''}`}
                  value={formData.facultyName}
                  onChange={handleChange}
                />
                {errors.facultyName && <div className="invalid-feedback">{errors.facultyName}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Class Name *</label>
                <input
                  type="text"
                  name="className"
                  className={`form-control ${errors.className ? 'is-invalid' : ''}`}
                  value={formData.className}
                  onChange={handleChange}
                />
                {errors.className && <div className="invalid-feedback">{errors.className}</div>}
              </div>
            </div>

            {/* Week + Date */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Week of Reporting *</label>
                <select
                  name="weekOfReporting"
                  className={`form-control ${errors.weekOfReporting ? 'is-invalid' : ''}`}
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
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Lecture *</label>
                <input
                  type="date"
                  name="dateOfLecture"
                  className={`form-control ${errors.dateOfLecture ? 'is-invalid' : ''}`}
                  value={formData.dateOfLecture}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfLecture && <div className="invalid-feedback">{errors.dateOfLecture}</div>}
              </div>
            </div>

            {/* Attendance */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Students Present</label>
                <input
                  type="number"
                  name="actualStudentsPresent"
                  className={`form-control ${errors.actualStudentsPresent ? 'is-invalid' : ''}`}
                  value={formData.actualStudentsPresent}
                  onChange={handleChange}
                />
                {errors.actualStudentsPresent && <div className="invalid-feedback">{errors.actualStudentsPresent}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Total Registered</label>
                <input
                  type="number"
                  name="totalRegisteredStudents"
                  className={`form-control ${errors.totalRegisteredStudents ? 'is-invalid' : ''}`}
                  value={formData.totalRegisteredStudents}
                  onChange={handleChange}
                />
                {errors.totalRegisteredStudents && <div className="invalid-feedback">{errors.totalRegisteredStudents}</div>}
              </div>
              {attendanceRate && (
                <div className="col-md-4 mb-3 d-flex align-items-center">
                  <div className="alert alert-info w-100 mb-0 text-center">
                    Attendance: <strong>{attendanceRate}%</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining inputs same as before... */}

            {/* Actions */}
            <div className="d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-muted">
          <small>All fields marked with * are required</small>
        </div>
      </div>
    </div>
  );
}

export default LecturerReportForm;
