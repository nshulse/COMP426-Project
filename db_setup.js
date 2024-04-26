const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db')

// Creates table
//db.run('CREATE TABLE accounts(id INT PRIMARY KEY,username,password)')

// Resets table
//db.run('DELETE FROM accounts')