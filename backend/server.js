const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./blopr.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS blood_pressure_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        systolic INTEGER NOT NULL,
        diastolic INTEGER NOT NULL,
        heart_rate INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

app.get('/api/entries', (req, res) => {
    db.all('SELECT * FROM blood_pressure_entries ORDER BY date DESC, time DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/entries', (req, res) => {
    const { systolic, diastolic, heart_rate, date, time } = req.body;
    
    if (!systolic || !diastolic || !heart_rate || !date || !time) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    
    db.run(
        'INSERT INTO blood_pressure_entries (systolic, diastolic, heart_rate, date, time) VALUES (?, ?, ?, ?, ?)',
        [systolic, diastolic, heart_rate, date, time],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ 
                id: this.lastID,
                systolic,
                diastolic,
                heart_rate,
                date,
                time
            });
        }
    );
});

app.delete('/api/entries/:id', (req, res) => {
    const id = req.params.id;
    
    db.run('DELETE FROM blood_pressure_entries WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Entry not found' });
            return;
        }
        res.json({ message: 'Entry deleted successfully' });
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Blopr API is running' });
});

app.listen(PORT, () => {
    console.log(`Blopr backend running on port ${PORT}`);
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});