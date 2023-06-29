const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const register = require("./api/register")
const login = require("./api/login")
const user = require("./api/user")
const flashcard_amount = require("./api/flashcard_amount");
const flashcard_training = require("./api/flashcard_training");
const flashcard = require("./api/flashcard");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 3000; // если в переменной среды указан порт, использовать его.

mongoose.connect('mongodb://127.0.0.1:27017/flacd').then(() => {
    console.log("Connected to DB")
});

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/register",register);
app.use("/api/login",login);
app.use("/api/user",user);
app.use("/api/flashcard_amount",flashcard_amount);
app.use("/api/flashcard",flashcard)
app.use("/api/flashcard_training",flashcard_training)

app.listen(PORT, function(){
    console.log("Server listening on port " + PORT)
})

