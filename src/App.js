import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import LecturerModule from "./Components/LecturerModule";
import StudentModule from "./Components/StudentModule";
import Dashboard from "./Components/Dashboard";
import PLModule from "./Components/PLModule";
import PRLModule from "./Components/PRLModule";
import Reports from "./Components/Reports";
import LectureReportForm from "./Components/LectureReportForm";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('studentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setError(null);

    // userData comes from successful login/signup response
    const user = {
      email: userData.user.email,
      role: userData.role,
      name: userData.user.name,
      id: userData.user.id
    };
    setUser(user);
    localStorage.setItem('studentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('studentUser');
    // Clear all user-related storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Component to render based on user role
  const renderUserDashboard = () => {
    if (!user) return <Login onLogin={handleLogin} loading={loading} />;

    switch (user.role) {
      case 'student':
        return <StudentModule user={user} onLogout={handleLogout} />;
      case 'lecturer':
        return <LecturerModule user={user} onLogout={handleLogout} />;
      case 'pl':
        return <PLModule user={user} onLogout={handleLogout} />;
      case 'prl':
        return <PRLModule user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <Routes>
          <Route path="/" element={renderUserDashboard()} />
          <Route path="/login" element={<Login onLogin={handleLogin} loading={loading} />} />
          <Route path="/student" element={renderUserDashboard()} />
          <Route path="/lecturer" element={renderUserDashboard()} />
          <Route path="/pl" element={renderUserDashboard()} />
          <Route path="/prl" element={renderUserDashboard()} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/lecture-report-form" element={<LectureReportForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
