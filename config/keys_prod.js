module.exports = {
  mongoURI: process.env.MONGO_URI, //Mongodb uri link
  secretKey: process.env.SECRET_OR_KEY, //Secret key for passportjs auth
  sendGridKey: process.env.SENDGRID_KEY, //Sendgrid key for password reset email
  name: process.env.NAME, //Full name for super user registration
  email: process.env.EMAIL //Email for super user registration
};
