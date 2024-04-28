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


app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/index.html')
})

app.get('/featured.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/featured.html'));
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
    res.redirect("/login.html")
})


app.post('/create_account', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let re_typed_password = req.body.re_typed_password

    if (password !== re_typed_password) {
        //TODO: send error
        console.log("passwords do not match")
        return res.redirect("/new_account.html")
    }
    else {

    knex("accounts").where("username", username)
        .then((data) => {
            if (data[0]) {
                //TODO: Raise error
                console.log("username already exists error")
                return res.redirect("/new_account.html")
            }
            else {
                knex("accounts").insert({username: username, password: password})
                    .then((data) => {
                        console.log('Account creation success');
                        return res.redirect("/login.html")
                        //res.status(201).json(data)
                    })
                    .catch((err) => {
                        console.error("Error creating account:", err);
                        // Redirect back to the new_account page
                        return res.redirect("/new_account.html");
                    });
            }
        })
        .catch((err) => {
            
            console.error("Database error:", err);
            // Redirect back to the new_account page
            return res.redirect("/new_account.html");
        });
}
});
    //res.sendFile(__dirname + '/public' + '/new_account.html')



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