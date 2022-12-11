const cors = require("cors");
const express = require("express");
const session = require("express-session")
const passport = require("passport")
require ('./Passport');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3001;
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const reviewRoute = require("./routes/reviews");
const authRoute = require("./routes/auth");
const path = require("path");
const CONNECTIONURI = process.env.mongoURI;
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("dotenv").config();

app.use(express.static(path.join(__dirname, "front-end", "build")));

app.use(express.json());
/*
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
*/
const corsOptions = {
  origin:'*', 
   credentials:true,            
   optionSuccessStatus:200
};
app.use(cors(corsOptions));      
  
app.use("/auth", authRoute);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

//FOR PASSPORT.JS
function isSignedIn(req, res, next) {
    req.user ? next() : res.status(401).json({ message: "Unauthorized" })
  }
  
  app.get('/auth', (req, res) => {
    res.send('<a href="/auth/google">Sign in with Google</a>');
  });
  
  app.get('/protected', isSignedIn, (req, res) => {
    res.send('Welcome to the protected route, ' + req.user.displayName + '!');
  });
  
  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Logged out');
  });
  
  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('auth/google/callback', 
    passport.authenticate('google', { 
      successRedirect: '/protected',
      failureRedirect: '/auth/failuire',
     }),
  );
  
  app.get('/auth/failure', (req, res) => {
    res.send('You failed to authenticate!');
  });
  
  //END for PASSPORT.JS

mongoose
    .connect("mongodb+srv://newuser:restaurantreviewer@cluster0.y0tshry.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
    })
    .then(()=> console.log("mongoDB connected!"))
    .catch((err) => console.log(err));

/*
mongoose.connect(process.env.mongoURI)
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));
*/
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
app.use("/api/reviews", reviewRoute);

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
});
app.listen();