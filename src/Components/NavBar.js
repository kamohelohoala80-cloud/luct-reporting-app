import { NavLink } from "react-router-dom";

function NavBar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">LUCT Reporting App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" activeclassname="active">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/reports" activeclassname="active">Reports</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/lecture-report-form" activeclassname="active">Lecture Report Form</NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Welcome, {user.name} ({user.email})
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeclassname="active">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
