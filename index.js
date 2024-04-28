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
const multer = require('multer');
let savedRecipes = []
let userRecipes = []
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
//This API is used to get a list of all recipes that users have added
app.get('/user_recipes', (req, res) => {
    res.json({ recipes: userRecipes });
});
//This API is used to get a list of all recipes the currntly logged in user has added. I using a stub implementiaton for now since the backend is not ready yet - Niyaz.
app.get('/my_recipes', (req, res) => {
    //let myRecipes = UserDataStuff.filter(recipe => recipe.userId === req.session.userId);
    let myRecipes = userRecipes;
    res.json({ recipes: myRecipes });
});

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

const upload = multer({ dest: path.join(__dirname, 'public', 'uploads') });
app.use(express.static('public'));
app.post('/add_recipe', upload.single('image'), (req, res) => {
    console.log(req.body);
    const { title, summary, description, instructions } = req.body;
    const ingredients = [];

    if (!Array.isArray(req.body.ingredientName)) {
        req.body.ingredientName = [req.body.ingredientName];
        req.body.ingredientPortion = [req.body.ingredientPortion];
        req.body.ingredientUnit = [req.body.ingredientUnit];
      }
    
      for (let i = 0; i < req.body.ingredientName.length; i++) {
        const ingredient = {
          name: req.body.ingredientName[i],
          portion: req.body.ingredientPortion[i],
          unit: req.body.ingredientUnit[i]
        };
        ingredients.push(ingredient);
      }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newRecipe = {
        title,
        summary,
        description,
        ingredients,
        instructions,
        imageUrl
    };
    userRecipes.push(newRecipe);
    console.log('New recipe added:', newRecipe);
    res.sendStatus(200);
});

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