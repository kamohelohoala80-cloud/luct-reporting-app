import React, { useState } from 'react';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const password = formData.get('password');
    const selectedRole = formData.get('role');

    let email = null;
    let student_number = null;
    let lecturer_id = null;

    if (selectedRole === 'student') {
      student_number = formData.get('studentNumber');
      if (!student_number) {
        setError('Student number is required for student role');
        setLoading(false);
        return;
      }
    } else if (selectedRole === 'lecturer') {
      lecturer_id = formData.get('lecturerId');
      if (!lecturer_id) {
        setError('Lecturer ID is required for lecturer role');
        setLoading(false);
        return;
      }
    } else {
      email = formData.get('lecturerId'); // for pl and prl, use the input as email
      if (!email) {
        setError('Email is required for this role');
        setLoading(false);
        return;
      }
    }

    if (!fullName || !password || !selectedRole) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const data = {
      name: fullName,
      password,
      role: selectedRole,
      email,
      student_number,
      lecturer_id
    };

    try {
      console.log('Sending data:', data);
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Account created successfully!');
      e.target.reset();
      setRole('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Network error - cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { display: 'Lecturer', value: 'lecturer' },
    { display: 'Student', value: 'student' },
    { display: 'Program Leader', value: 'pl' },
    { display: 'Principal Lecturer', value: 'prl' }
  ];

  return (
    <div className="register-container">
      <h3>Create a new account</h3>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="fullName">👤 Full Name</label>
          <input 
            id="fullName"
            name="fullName" 
            type="text" 
            placeholder="Enter your full name"
            required
          />
        </div>

        {role === 'student' && (
          <div className="input-group">
            <label htmlFor="studentNumber">🎓 Student Number</label>
            <input 
              id="studentNumber"
              name="studentNumber" 
              type="text" 
              placeholder="Enter your student number"
              required={role === 'student'}
            />
          </div>
        )}

        {(role !== 'student' && role !== '') && (
          <div className="input-group">
            <label htmlFor="lecturerId">📧 Lecturer ID / Email</label>
            <input 
              id="lecturerId"
              name="lecturerId" 
              type="text" 
              placeholder="Enter your lecturer ID or email"
              required
            />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="password">🔒 Password</label>
          <input 
            id="password"
            name="password" 
            type="password" 
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">👨‍🏫 Role</label>
          <select 
            id="role" 
            name="role" 
            required 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select your role</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.display}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
