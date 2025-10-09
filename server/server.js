const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Middleware to log request headers and body for debugging
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.send('✅ LUCT Reporting Backend is running');
});

/* ======================
   Database Users API
====================== */

// GET all users from database
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST a new user to database (signup)
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role, student_number, lecturer_id } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Name, password, and role are required"
    });
  }

  // Validate required fields based on role
  if (role === 'student' && !student_number) {
    return res.status(400).json({
      success: false,
      message: "Student number is required for students"
    });
  }
  if (role === 'lecturer' && !lecturer_id) {
    return res.status(400).json({
      success: false,
      message: "Lecturer ID is required for lecturers"
    });
  }
  if (role !== 'student' && role !== 'lecturer' && !email) {
    return res.status(400).json({
      success: false,
      message: "Email is required for this role"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let query = 'INSERT INTO users (name, email, password, role, student_number, lecturer_id) VALUES (?, ?, ?, ?, ?, ?)';
    let params = [
      name,
      email || null,
      hashedPassword,
      role,
      student_number || null,
      lecturer_id || null
    ];

    db.run(query, params, function(err) {
      if (err) {
        console.error('Database error during signup:', err);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({
            success: false,
            message: "User with provided identifier already exists"
          });
        }
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId: this.lastID
      });
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

/* ======================
   Login API
====================== */
app.post('/api/login', (req, res) => {
  const { identifier, password, role } = req.body;

  console.log('Login attempt received:', { identifier, password, role });

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: "Identifier and password are required"
    });
  }

  let query = '';
  let params = [];

  if (role === 'student') {
    query = 'SELECT * FROM users WHERE student_number = ?';
    params = [identifier];
  } else if (role === 'lecturer') {
    query = 'SELECT * FROM users WHERE lecturer_id = ?';
    params = [identifier];
  } else {
    query = 'SELECT * FROM users WHERE email = ?';
    params = [identifier];
  }

  db.get(query, params, async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
    } catch (error) {
      console.error('Password comparison error:', error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }

    // Check if role matches (optional, but for now allow any role for the user)
    res.json({
      success: true,
      message: "Login successful",
      role: user.role,
      user: { email: user.email, name: user.name, id: user.id }
    });
  });
});

/* ======================
   Reports API
====================== */

// GET all reports
app.get('/api/reports', (req, res) => {
  // Mock data for now
  const mockReports = [
    {
      id: 1,
      course: 'Computer Science 101',
      lecturer: 'Dr. Smith',
      date: '2023-10-01',
      status: 'completed'
    },
    {
      id: 2,
      course: 'Mathematics 201',
      lecturer: 'Prof. Johnson',
      date: '2023-10-02',
      status: 'in-progress'
    },
    {
      id: 3,
      course: 'Physics 301',
      lecturer: 'Dr. Brown',
      date: '2023-10-03',
      status: 'pending'
    }
  ];

  res.json(mockReports);
});

/* ======================
   Start Server
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
