const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose
    .connect(process.env.mongoURL, {useNewUrlParser: true})
    .then(()=> {
        console.log("mongoDB connected!")
    })
    .catch((err) => console.log(err))

app.listen(8800, () =>{
    console.log("backend server is running!")
})