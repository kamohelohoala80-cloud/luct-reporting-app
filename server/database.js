const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection
const dbPath = path.join(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeTables();
  }
});

// Initialize tables
function initializeTables() {
  // Drop table to recreate with new schema
  db.run('DROP TABLE IF EXISTS users', (err) => {
    if (err) {
      console.error('Error dropping users table:', err);
    } else {
      createUsersTable();
    }
  });
}

function createUsersTable() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    student_number TEXT UNIQUE,
    lecturer_id TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
      // Add columns if not exist (for migration)
      // Removed ALTER TABLE statements as columns are created in schema
      // Seed test users
      seedUsers();
    }
  });
}

const bcrypt = require('bcrypt');

// Seed test users
async function seedUsers() {
  const users = [
    { name: 'Student User', email: 'student@luct.edu', password: '123', role: 'student', student_number: 'STU001', lecturer_id: null },
    { name: 'Lecturer User', email: 'lecturer@luct.edu', password: '123', role: 'lecturer', student_number: null, lecturer_id: 'LEC001' },
    { name: 'Principal Lecturer', email: 'prl@luct.edu', password: '123', role: 'prl', student_number: null, lecturer_id: null },
    { name: 'Program Leader', email: 'pl@luct.edu', password: '123', role: 'pl', student_number: null, lecturer_id: null }
  ];

  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await new Promise((resolve, reject) => {
        db.run('INSERT OR IGNORE INTO users (name, email, password, role, student_number, lecturer_id) VALUES (?, ?, ?, ?, ?, ?)',
          [user.name, user.email, hashedPassword, user.role, user.student_number, user.lecturer_id], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error hashing password for user:', user.email, error);
    }
  }

  // Update existing users if they don't have the new fields
  db.run('UPDATE users SET student_number = ? WHERE role = ? AND student_number IS NULL', ['STU001', 'student'], (err) => {
    if (err) console.error('Error updating student_number:', err);
  });
  db.run('UPDATE users SET lecturer_id = ? WHERE role = ? AND lecturer_id IS NULL', ['LEC001', 'lecturer'], (err) => {
    if (err) console.error('Error updating lecturer_id:', err);
  });

  console.log('Seeded users successfully');
}

module.exports = db;