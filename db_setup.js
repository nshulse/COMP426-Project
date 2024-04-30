const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db')

// Creates tables
db.run('CREATE TABLE accounts(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')

db.run('CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, author_id INTEGER, title TEXT summary TEXT, description TEXT, ingredients TEXT, amounts TEXT, instructions TEXT, times_saved INTEGER, imageURL TEXT, FOREIGN KEY (author_id) REFERENCES accounts(id))');

db.run('CREATE TABLE saved_recipes(id INTEGER PRIMARY KEY, user_id INTEGER, recipe_id INTEGER, FOREIGN KEY (user_id) REFERENCES accounts(id), FOREIGN KEY (recipe_id) REFERENCES recipes(id))');


// Resets table
//db.run('DELETE accounts')

// Deletes table
//db.run("DROP TABLE recipes")
