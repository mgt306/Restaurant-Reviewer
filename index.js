const express = require("express");
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 3001;
const cors = require("cors")
const pinRoute = require("./routes/pins");

require("dotenv").config();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
mongoose
    .set('strictQuery', true)
    .connect('mongodb+srv://admin:restaurantreviewer@cluster0.y0tshry.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    })
    .then(()=> console.log("mongoDB connected!"))
    .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);

const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}
