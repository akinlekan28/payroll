const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
// const redis = require('redis');

const users = require('./routes/api/users');
const level = require('./routes/api/levels');
const employee = require('./routes/api/employees');
const exception = require('./routes/api/exception');
const payslip = require('./routes/api/payslip');
const dashboard = require('./routes/api/dashboard');
const individualcost = require('./routes/api/individualcost');
const oneoffpayment = require('./routes/api/oneoffpayment');
const record = require('./routes/api/record');
const { createSuperAdmin } = require('./utils/createSuperAdmin');

const app = express();

//Body parser middleware
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());
app.use(cors());

//Db
const db = require('./config/keys').mongoURI;

//MongoDB connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/level', level);
app.use('/api/employee', employee);
app.use('/api/exception', exception);
app.use('/api/payslip', payslip);
app.use('/api/dashboard', dashboard);
app.use('/api/individualcost', individualcost);
app.use('/api/oneoffpayment', oneoffpayment);
app.use('/api/record', record);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 6000;
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// const client = redis.createClient(REDIS_PORT);

// client.on('connect', () => {
//   console.log(`Redis coonected on port ${REDIS_PORT}`);
// });

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  setTimeout(() => {
    createSuperAdmin();
  }, 20000);
});
