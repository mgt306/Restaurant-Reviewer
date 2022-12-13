const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
// const restRoute = require("./routes/rest")
const cors = require("cors");
const { Pin } = require("./models/Pin");
// const restRoute = require("./controllers/Controller")

dotenv.config();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
);

mongoose
    .connect(process.env.mongoURL, {
        useNewUrlParser: true,
    })
    .then(()=> console.log("mongoDB connected!"))
    .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
// app.use("/rest", restRoute);
// app.use("/search", restRoute);  
// const { Pin } = require("../models/Pin");


// fetching all pins
// router.get("/searchRest", async (req, res) => {
//   try {
//     const pins = await Pin.find();
//     res.status(200).json(pins);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// app.get('/rest', async (req, res) => {
//     console.log(req.params.name)
//     const name = req.params.name
//     console.log(name)
//     try {
//       const pin = await Pin.find( {name: name });
//       console.log(pin)
//       res.json({
//         pin: pin,
//         status: 'all good',
//       })
//     } catch (err) {
//       console.error(err)
//       res.status(400).json({
//         error: err,
//         status: 'failed to retrieve pin from the database',
//       })
//     }
// })

// fetching all pins
app.get("/", async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });


app.listen(3001, () =>{
    console.log("backend server is running!");
});