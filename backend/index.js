var express = require("express")
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const secretKey = 'This_is_something_secret'

var connectToMongo = require("./db");
const User = require("./model/UserSchema")
const Content = require("./model/ContentSchema")
const mongoose = require("mongoose");

const app = express();


app.use(cors());
app.use(bodyParser.json());

connectToMongo()
const db = mongoose.connection;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: "No Token Provided!" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next();
    })
}

app.get("/app", function (req, res) {
    var responseText = "Hi Familly!<br>"
    responseText += "<small>Requested at: " + req.requestTime + "</small>"
    res.send(responseText)
})

app.post("/app/login", function (req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' })
                        res.status(200).json({ token: token, message: "Login Success" })
                    } else {
                        res.status(403).send("Wrong Password!")
                    }
                })
        })
        .catch(error => {
            res.status(500).send("Bad Luck")
        })
})

app.post("/app/signup", function (req, res) {
    const { name, age, phone, username, password } = req.body;

    User.findOne({ username: username })
        .then(userExists => {
            if (userExists) {
                res.status(409).end("User already exists")
            }
            else {
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const newUser = new User({
                            name,
                            age,
                            phone,
                            username,
                            password: hashedPassword
                        });


                        newUser.save()
                            .then(() => {
                                res.status(200).json({ message: "Data stored successfully" });
                            })
                    })
                    .catch(error => {
                        res.status(500).json({ message: "Internal Server Error" });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Internal Server Error1" });
        });
})

app.post('/app/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: "Access success" })
})

app.post('/app/content/submitpost', (req, res) => {
    const { username, id, note } = req.body;
    const newContent = new Content({
        username,
        id,
        note,
    })
    Content.findOne({ id: id })
        .then(foundMatch => {
            if (foundMatch) {
                res.status(400).json({ message: "connot submit same post twice" })
            }
            else {
                newContent.save()
                    .then(stored => {
                        res.status(200).json({ message: "Saved data" })
                    })
                    .catch(error => {
                        res.status(400).json({ message: "Internal Server Error" })
                    })
            }
        })
})

app.get('/app/content/deletepost', (req, res) => {
    const { username, id } = req.query;

    Content.findOne({ id: id })
        .then(foundMatch => {
            if(foundMatch){
                Content.deleteOne({ username: username, id: id })
                    .then(
                        res.status(200).json({ message: "Data deleted" })
                    )
                    .catch(error => {
                        res.status(400).json({ message: "Internal Server Error" })
                    })
            }
            else{
                res.status(400).json({ message: "connot find the post" })
            }
        })
})

app.get('/app/content/getallpost', (req, res) => {
    const username  = req.query.username;
    Content.find({ username: username }, {_id:0, id:1, note:1})
        .then((data) => {
            res.status(200).json({ message: "Data fetched", data: data })
        })
        .catch(error => {
            res.status(400).json({ message: "Internal Server Error" })
        })
})



app.listen(3000)