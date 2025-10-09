const db = require('./database.js');

// Wait a bit for tables to be created, then test
setTimeout(() => {
  console.log('Testing database...');
  
  // Use get instead of all for simplicity
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
    if (err) {
      console.error('Error:', err);
    } else if (row) {
      console.log('Users table exists:', row);
      
      // Test inserting a user
      db.run('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)', 
        ['Test User', 'test@example.com'], function(err) {
        if (err) {
          console.error('Error inserting user:', err);
        } else {
          console.log('User inserted successfully, ID:', this.lastID);
        }
        db.close();
      });
    } else {
      console.log('Users table not found');
      db.close();
    }
  });
}, 2000);