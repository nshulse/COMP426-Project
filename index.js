const express = require('express')

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './db',
    },
  });


const app = express()
const port = 3000
const path = require('path')
let savedRecipes = []

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/index.html')
})

app.get('/featured.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/featured.html'));
});

app.get('/saved.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/saved.html'));
  });

  app.post('/save_recipe', (req, res) => {
    const recipe = req.body.recipe;
    savedRecipes.push(recipe);
    res.sendStatus(200);
  });

app.get('/saved_recipes', (req, res) => {
    res.json({ recipes: savedRecipes });
});

app.post('/sign_in', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    knex("accounts").where("username", username)
        .then((data) => {
            if (data[0]) {
                if (data[0]["password"] === password) {
                    // TODO: Log user in
                    console.log("log in")
                    res.redirect('/user_home.html');
                }
                else {
                    //TODO: Incorrect password
                    console.log("incorrect password")
                }
            }

            else {
                //Account doesn't exist
                // TODO: Raise error
                console.log("error account doesnt exist")
                    }
                })


    

    //res.sendFile(__dirname + '/public' + '/login.html')
    //res.redirect("/login.html")
})


app.post('/create_account', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let re_typed_password = req.body.re_typed_password

    if (password !== re_typed_password) {
        //TODO: send error
        console.log("passwords do not match")
    }
    else {

    knex("accounts").where("username", username)
        .then((data) => {
            if (data[0]) {
                //TODO: Raise error
                console.log("username already exists error")
                
            }
            else {
                knex("accounts").insert({username: username, password: password})
                    .then((data) => {
                        console.log('Account creation success');
                        res.redirect('/login.html');
                        //res.status(201).json(data)
                    });
                }
        })
    }

    //res.sendFile(__dirname + '/public' + '/new_account.html')
})

// test function which returns all the accounts in database
app.get('/test', (req, res) => {
    knex.select().from("accounts")
        .then((data) => {
            res.status(201).json(data)
        })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})