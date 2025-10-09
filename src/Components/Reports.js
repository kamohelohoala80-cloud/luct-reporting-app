import { useEffect, useState } from "react";
import './Reports.css';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // API data

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        // Transform API data to match component expectations
        const transformedData = data.map(report => ({
          id: report.id,
          title: `${report.course} Report`,
          description: `Lecture report for ${report.course} by ${report.lecturer}`,
          date: report.date,
          status: "completed",
          type: "lecture",
          author: report.lecturer,
          views: Math.floor(Math.random() * 100) + 10,
          downloads: Math.floor(Math.random() * 50) + 5,
          priority: "medium",
          tags: [report.course, "lecture"],
          fileSize: "1.2 MB",
          format: "PDF"
        }));
        setReports(transformedData);
        setError(null);
      } catch (err) {
        setError("Failed to load reports. Please try again.");
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter || report.type === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return b.views - a.views;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '';
      case 'in-progress': return '';
      case 'pending': return '';
      default: return '';
    }
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { class: 'priority-high', label: 'High' },
      medium: { class: 'priority-medium', label: 'Medium' },
      low: { class: 'priority-low', label: 'Low' }
    };
    return config[priority];
  };

  const getTypeIcon = (type) => {
    const icons = {
      financial: '',
      analytics: '',
      security: '',
      research: '',
      hr: ''
    };
    return icons[type] || '';
  };

  const ReportCard = ({ report }) => (
    <div className="report-card" onClick={() => setSelectedReport(report)}>
      <div className="report-header">
        <div className="report-type-icon">{getTypeIcon(report.type)}</div>
        <div className="report-meta">
          <span className="report-date">{new Date(report.date).toLocaleDateString()}</span>
          <span className={`status-badge ${report.status}`}>
            {getStatusIcon(report.status)} {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </span>
        </div>
      </div>
      
      <h3 className="report-title">{report.title}</h3>
      <p className="report-description">{report.description}</p>
      
      <div className="report-tags">
        {report.tags.map((tag, index) => (
          <span key={index} className="report-tag">#{tag}</span>
        ))}
      </div>
      
      <div className="report-footer">
        <div className="report-stats">
          <span className="stat">{report.views} views</span>
          <span className="stat">{report.downloads} downloads</span>
        </div>
        <div className="report-actions">
          <span className={`priority-badge ${getPriorityBadge(report.priority).class}`}>
            {getPriorityBadge(report.priority).label}
          </span>
          <button className="action-btn preview">Preview</button>
          <button className="action-btn download">Download</button>
        </div>
      </div>
    </div>
  );

  const ReportModal = ({ report, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{report.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-meta">
            <div className="meta-item">
              <strong>Author:</strong> {report.author}
            </div>
            <div className="meta-item">
              <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
            </div>
            <div className="meta-item">
              <strong>Type:</strong> {report.type}
            </div>
            <div className="meta-item">
              <strong>Format:</strong> {report.format}
            </div>
            <div className="meta-item">
              <strong>File Size:</strong> {report.fileSize}
            </div>
          </div>
          <div className="modal-description">
            <h4>Description</h4>
            <p>{report.description}</p>
          </div>
          <div className="modal-stats">
            <div className="stat-card">
              <div className="stat-value">{report.views}</div>
              <div className="stat-label">Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{report.downloads}</div>
              <div className="stat-label">Downloads</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn secondary">Preview</button>
          <button className="btn primary">Download Report</button>
          <button className="btn outline">Share</button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="reports-container">
        <div className="reports-loading">
          <div className="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reports-container">
        <div className="reports-error">
          <div className="error-icon"></div>
          <h3>Unable to Load Reports</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Analytics Reports</h1>
            <p>Comprehensive analysis and performance reports</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-number">{reports.length}</span>
              <span className="stat-label">Total Reports</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">
                {reports.filter(r => r.status === 'completed').length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="reports-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Reports</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="financial">Financial</option>
            <option value="analytics">Analytics</option>
            <option value="security">Security</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="views">Sort by Views</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {sortedReports.length > 0 ? (
          sortedReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))
        ) : (
          <div className="no-reports">
            <div className="no-reports-icon"></div>
            <h3>No reports found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  );
}

export default Reports;