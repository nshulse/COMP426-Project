const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db')

// Creates table
//db.run('CREATE TABLE accounts(id INT PRIMARY KEY, username, password, saved_recipes)')

//db.run('CREATE TABLE recipes (id INT PRIMARY KEY, FOREIGN KEY (author_id) REFERENCES accounts(id), sumamry, description, ingredients, amounts, instructions, times_saved INT, imageURL)');


// Resets table
//db.run('DELETE FROM accounts')