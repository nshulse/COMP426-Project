const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db')

// Creates table
//db.run('CREATE TABLE accounts(id INTEGER PRIMARY KEY AUTOINCREMENT, username, password, saved_recipes)')

//db.run('CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, author_id INTEGER, title, summary, description, ingredients, amounts, instructions, times_saved INTEGER, imageURL, FOREIGN KEY(author_id) REFERENCES accounts(id))');


// Resets table
//db.run('DELETE accounts')

// Deletes table
//db.run("DROP TABLE recipes")
