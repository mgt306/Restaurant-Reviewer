const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors")
const pinRoute = require("./routes/pins");
const path = require("path");

require("dotenv").config();

app.use(express.json());


const corsOptions = {
  origin:'*', 
   credentials:true,            
   optionSuccessStatus:200
};
app.use(cors(corsOptions));
  
mongoose
    .set('strictQuery', true)
    .connect('mongodb+srv://admin:restaurantreviewer@cluster0.y0tshry.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    })
    .then(()=> console.log("mongoDB connected!"))
    .catch((err) => console.log(err));

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
app.use("/api/pins", pinRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "front-end", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
  });
}
app.listen();