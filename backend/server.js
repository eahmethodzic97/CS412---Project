const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'cs412_edis_ahmethodzic_2025';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Initialize SQLite Database
const db = new sqlite3.Database('./soccer_management.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    position TEXT NOT NULL,
    jerseyNumber INTEGER NOT NULL,
    nationality TEXT NOT NULL,
    height REAL,
    weight REAL,
    joinDate TEXT,
    contractEnd TEXT,
    salary REAL,
    medicalHistory TEXT,
    emergencyContact TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    status TEXT DEFAULT 'active',
    image TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating players table:', err);
    } else {
      // Insert default admin user if not exists
      const defaultPassword = bcrypt.hashSync('admin123', 10);
      db.run(`INSERT OR IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
        ['admin', 'admin@ius.edu.ba', defaultPassword, 'admin']);

      // Insert sample players if table is empty
      db.get('SELECT COUNT(*) as count FROM players', (err, row) => {
        if (!err && row.count === 0) {
          insertSamplePlayers();
        }
      });
    }
  });
}

function insertSamplePlayers() {
  const samplePlayers = [
    ['Cristiano Silva', 28, 'Forward', 7, 'Portugal', 187, 83, '2022-01-15', '2026-06-30', 150000, 'No major injuries', '+351 912345678', 'Lisbon, Portugal', '+351 912345678', 'cristiano@example.com', 'active', null],
    ['Marco Rossi', 25, 'Midfielder', 10, 'Italy', 178, 75, '2021-07-01', '2025-12-31', 120000, 'Knee surgery 2020', '+39 3201234567', 'Milan, Italy', '+39 3201234567', 'marco@example.com', 'active', null],
    ['James Wilson', 30, 'Defender', 4, 'England', 185, 82, '2020-08-20', '2024-12-31', 100000, 'Ankle issues', '+44 7700900123', 'London, UK', '+44 7700900123', 'james@example.com', 'active', null]
  ];

  const stmt = db.prepare(`INSERT INTO players (name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  samplePlayers.forEach(player => {
    stmt.run(player);
  });

  stmt.finalize();
}

// Email validation function
function validateEmail(email) {
  const validDomains = ['@student.ius.edu.ba', '@ius.edu.ba'];
  return validDomains.some(domain => email.endsWith(domain));
}

// Password validation function
function validatePassword(password) {
  // At least 8 characters, 1 number, 1 letter, 1 special character
  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasNumber && hasLetter && hasSpecial;
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Auth Routes
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email must end with @student.ius.edu.ba or @ius.edu.ba' });
  }

  // Validate password
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and contain at least 1 number, 1 letter, and 1 special character'
    });
  }

  // Check if username already exists
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (user) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (user) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password and create user
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error encrypting password' });
        }

        db.run(
          'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, 'user'],
          function (err) {
            if (err) {
              return res.status(500).json({ error: 'Error creating user' });
            }

            const token = jwt.sign({ id: this.lastID, username, email }, JWT_SECRET, { expiresIn: '24h' });
            res.status(201).json({
              message: 'User registered successfully',
              token,
              username,
              email
            });
          }
        );
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username, email: user.email });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});

// Player Routes
app.get('/api/players', authenticateToken, (req, res) => {
  db.all('SELECT * FROM players ORDER BY jerseyNumber', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/players/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM players WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(row);
  });
});

app.post('/api/players', authenticateToken, (req, res) => {
  const { name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status, image } = req.body;

  db.run(
    `INSERT INTO players (name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status || 'active', image || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Player created successfully' });
    }
  );
});

app.put('/api/players/:id', authenticateToken, (req, res) => {
  const { name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status, image } = req.body;

  db.run(
    `UPDATE players SET name = ?, age = ?, position = ?, jerseyNumber = ?, nationality = ?, height = ?, weight = ?, joinDate = ?, contractEnd = ?, salary = ?, medicalHistory = ?, emergencyContact = ?, address = ?, phone = ?, email = ?, status = ?, image = ? WHERE id = ?`,
    [name, age, position, jerseyNumber, nationality, height, weight, joinDate, contractEnd, salary, medicalHistory, emergencyContact, address, phone, email, status, image, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Player not found' });
      }
      res.json({ message: 'Player updated successfully' });
    }
  );
});

app.delete('/api/players/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM players WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Default login - Username: admin, Password: admin123');
});
