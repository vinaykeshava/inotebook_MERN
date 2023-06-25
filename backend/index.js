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
    const token = req.header['authorization']
    if(!token){
        return res.status(401).send({message:"No Token Provided!"});
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({message:"Unauthorized!"});
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
                        const token = jwt.sign({username}, secretKey, {expiresIn: '1h'})
                        res.status(200).json({token: token, message: "Login Success"})
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
                res.status(409).end( "User already exists")
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


app.listen(3000)