import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('lecturer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIdentifier('');
    setError('');
  }, [role]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', { name, identifier, password, role }); // Debug log

    if (identifier && password && (isLoginMode || name)) {
      setLoading(true);
      setError('');

      try {
        const url = isLoginMode ? '/api/login' : '/api/signup';
        const bodyData = isLoginMode
          ? { identifier, password, role }
          : role === 'student'
          ? { name, password, role, student_number: identifier }
          : role === 'lecturer'
          ? { name, password, role, lecturer_id: identifier }
          : { name, email: identifier, password, role };

        console.log('Sending request:', { url, bodyData });

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
          if (isLoginMode) {
            onLogin(data);
          } else {
            setError('Registration successful. Please log in.');
            setIsLoginMode(true);
          }
        } else {
          setError(data.message || (isLoginMode ? 'Login failed' : 'Registration failed'));
        }
      } catch (error) {
        console.error('Request error:', error);
        setError('Network error - cannot connect to server');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page bg-gradient d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card shadow-lg rounded-4 p-5">
        <h2 className="login-title text-primary mb-3">LUCT Reporting</h2>
        <p className="login-subtitle mb-4">{isLoginMode ? 'Sign in to your account' : 'Create a new account'}</p>

        {error && (
          <div className={`alert ${isLoginMode ? 'alert-danger' : 'alert-success'}`} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLoginMode && (
            <div className="form-group mb-4">
              <label htmlFor="name" className="form-label fw-semibold">
                <i className="fas fa-user me-2"></i> Full Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control form-control-lg shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={!isLoginMode}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group mb-4">
            <label htmlFor="identifier" className="form-label fw-semibold">
              <i className="fas fa-id-card me-2"></i>{' '}
              {role === 'student'
                ? 'Student Number'
                : role === 'lecturer'
                ? 'Lecturer ID'
                : 'Email address'}
            </label>
            <input
              id="identifier"
              type="text"
              className="form-control form-control-lg shadow-sm"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                role === 'student'
                  ? 'Enter your student number'
                  : role === 'lecturer'
                  ? 'Enter your lecturer ID'
                  : 'Enter your email'
              }
              required
              disabled={loading}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              <i className="fas fa-lock me-2"></i> Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control form-control-lg shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group mb-5">
            <label htmlFor="role" className="form-label fw-semibold">
              <i className="fas fa-user-tag me-2"></i> Role
            </label>
            <select
              id="role"
              className="form-select form-select-lg shadow-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="prl">Principal Lecturer</option>
              <option value="pl">Program Leader</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 shadow"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                {isLoginMode ? 'Signing In...' : 'Registering...'}
              </>
            ) : (
              isLoginMode ? 'Sign In' : 'Register'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={toggleMode} disabled={loading}>
            {isLoginMode ? 'Create an account' : 'Back to login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
