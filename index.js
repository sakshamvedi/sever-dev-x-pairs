const connectToMongoDB = require('./mongodb.config');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000
const { userModel } = require('./models/user.model');

connectToMongoDB();
app.use(express.json());
app.use(cors());
app.post('/login', async (req, res) => {
    const username = req.body.login;
    const password = req.body.password;
    try {
        const user = await userModel.findOne({ "username": username });
        if (user) {
            if (user.password === password) {
                console.log(user);
                res.status(200).send('User found');
            } else {
                console.log(user);
                res.status(401).send('Invalid password');
            }
        } else {
            console.log(user);
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userCred = new userModel({
        username: username,
        password: password
    })
    const user = await userModel.findOne({ "username": username });
    if (user) {
        res.status(409).send('User already exists');
    } else {
        await userCred.save().then(() => {
            res.status(200).send('User created');
        }).catch((err) => {
            res.status(404).send('Error');
        });
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})