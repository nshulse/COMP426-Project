const express = require('express')
const app = express()
const port = 3000
const path = require('path')


app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/index.html')
})



app.post('/sign_in', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    //TODO: Check if account exists in database

    res.sendFile(__dirname + '/public' + '/login.html')
})


app.post('/create_account', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let re_typed_password = req.body.re_typed_password

    if (password !== re_typed_password) {
        //TODO: send error
    }

    console.log(username + password + re_typed_password)

    //TODO: Create account in database

    res.sendFile(__dirname + '/public' + '/new_account.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})