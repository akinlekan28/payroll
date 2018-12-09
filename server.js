const express = require("express");
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const level = require('./routes/api/levels');

const app = express();

//Body parser middleware
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

//Db
const db = require("./config/keys").mongoURI;

//MongoDB connection
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);


//Use routes
app.use('/api/users', users);
app.use('/api/level', level);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
