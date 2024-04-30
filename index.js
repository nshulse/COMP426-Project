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

let logged_in_user_id
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


app.post('/sign_in', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    knex("accounts").where("username", username)
        .then((data) => {
            if (data[0]) {
                if (data[0]["password"] === password) {
                    // TODO: Log user in
                    console.log("log in")
                    logged_in_user_id = data[0]["id"]
                    res.redirect('/user_home.html');
                }
                else {
                    //TODO: Incorrect password
                    console.log("Incorrect password");
                    res.redirect('/login.html?error=incorrect');
                }
            }

            else {
                //Account doesn't exist
                // TODO: Raise error
                console.log("error account doesnt exist")
                res.redirect('/login.html?error=not_found');
                    }
                })


    

    //res.sendFile(__dirname + '/public' + '/login.html')
    //res.redirect("/login.html")
})


app.delete('/account', (req, res) => {
    knex("accounts").where("id", logged_in_user_id).del()
        .then((data) => {
            res.status(201).json(data)
        })
})


app.put('/account_username', (req, res) => {
    let username = req.body.username
    knex("accounts").where({"id": logged_in_user_id}).update({"username": username})
        .then((data) => {
            res.status(201).json(data)
        })
})

app.put('/account_password', (req, res) => {
    let password = req.body.password
    knex("accounts").where({"id": logged_in_user_id}).update({"password": password})
    .then((data) => {
        res.status(201).json(data)
    })
})



app.post('/add_saved_recipe', (req, res) => {
    let recipe_id = req.body.rec_id;

    let already_saved
    
    knex("saved_recipes").where("user_id", logged_in_user_id).where("recipe_id", recipe_id)
        .then((data) => {
            if (data[0]) {
                console.log("already saved")
                res.redirect('/user_home.html?error=already_saved')
            }
            else {
                knex("saved_recipes").insert({user_id: logged_in_user_id, recipe_id: recipe_id}).then(() => {
                    res.status(201);
            })
        }
    })
})


app.get('/saved_recipes', (req, res) => {
    knex('saved_recipes').join('recipes', 'saved_recipes.recipe_id', '=', 'recipes.id')
        .select()  //"recipes.*"
        .where("user_id", logged_in_user_id)
        .then((recipes) => {
            console.log(recipes)
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving saved recipes");
        });
});

app.get('/unsaved_recipes', (req, res) => {

});

//This API is used to get a list of all recipes that users have added
app.get('/user_recipes', (req, res) => {
    knex.select().from("recipes")
        .then((data) => {
            res.status(201).json(data)
        })
});
//This API is used to get a list of all recipes the currntly logged in user has added. I using a stub implementiaton for now since the backend is not ready yet - Niyaz.
app.get('/my_recipes', (req, res) => {
    //let myRecipes = UserDataStuff.filter(recipe => recipe.userId === req.session.userId);

    knex.select().from("recipes").where("author_id", logged_in_user_id)
        .then((data) => {
            res.status(201).json(data)
        })
});
    

app.post('/create_account', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let re_typed_password = req.body.re_typed_password

    if (password !== re_typed_password) {
        //TODO: send error
        console.log("passwords do not match")
        res.redirect('/new_account.html?error=password_mismatch');
    }
    else {

    knex("accounts").where("username", username)
        .then((data) => {
            if (data[0]) {
                //TODO: Raise error
                console.log("username already exists error")
                res.redirect('/new_account.html?error=username_exists');
                
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
    const { title, summary, description, instructions, imageUrl } = req.body;
    let ingredients = [];

    if (!Array.isArray(req.body.ingredientName)) {
        req.body.ingredientName = [req.body.ingredientName];
        req.body.ingredientPortion = [req.body.ingredientPortion];
        req.body.ingredientUnit = [req.body.ingredientUnit];
      }
    
      for (let i = 0; i < req.body.ingredientName.length; i++) {
        let ingredient = {
          name: req.body.ingredientName[i],
          portion: req.body.ingredientPortion[i],
          unit: req.body.ingredientUnit[i]
        };
        ingredients.push(ingredient);
      }

      ingredients = JSON.stringify(ingredients)
    const newRecipe = {
        title,
        summary,
        description,
        ingredients,
        instructions,
        imageUrl
    };

    let author_id
    
    if(logged_in_user_id) {
        author_id = logged_in_user_id
    }
    else {
        author_id = null
    }

    knex("recipes").insert({author_id: author_id, 
        title:title, summary: summary, description: description, ingredients: ingredients, 
        instructions: instructions, imageUrl: imageUrl})
        .then((data) => {
            res.sendStatus(201)
        })
});


// test function which returns saved recipes for account id 1
app.get('/test_saved_recipes', (req, res) => {
    knex.select().from("saved_recipes").where("user_id", 1)
        .then((data) => {
            res.status(201).json(data)
        })
})

// test function which returns all the accounts in database
app.get('/test', (req, res) => {
    knex.select().from("accounts")
        .then((data) => {
            res.status(201).json(data)
        })
})


// test 
app.get('/test_a', (req, res) => {
    knex("accounts").where("username", "a")
        .then((data) => {
            console.log(JSON.stringify(data[0]["saved_recipes"]))
            res.json(data[0]["saved_recipes"])
        })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})