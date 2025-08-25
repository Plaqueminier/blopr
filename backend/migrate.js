const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'blopr.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error('Error opening database:', err.message);
    }
    console.log('Connected to SQLite database for migration.');
});

db.serialize(() => {
    // Create the table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS blood_pressure_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        systolic INTEGER NOT NULL,
        diastolic INTEGER NOT NULL,
        heart_rate INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            return console.error('Error creating table:', err.message);
        }
        console.log('Table "blood_pressure_entries" is ready.');

        // Add the new 'username' column
        db.run(`ALTER TABLE blood_pressure_entries ADD COLUMN username TEXT`, (err) => {
            if (err) {
                if (err.message.includes('duplicate column name')) {
                    console.log('Column "username" already exists.');
                } else {
                    return console.error('Error adding column:', err.message);
                }
            } else {
                console.log('Column "username" added successfully.');
            }

            // Update existing rows to set the username to 'ant0ine'
            db.run(`UPDATE blood_pressure_entries SET username = 'ant0ine' WHERE username IS NULL`, function(err) {
                if (err) {
                    return console.error('Error updating existing entries:', err.message);
                }
                console.log(`Updated ${this.changes} rows to set username to 'ant0ine'.`);

                // Close the database connection
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Migration complete. Database connection closed.');
                });
            });
        });
    });
});
