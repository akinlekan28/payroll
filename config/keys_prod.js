module.exports = {
  mongoURI: process.env.MONGO_URI, //Mongodb uri link
  secretKey: process.env.SECRET_KEY, //Secret key for passportjs auth
  sendGridKey: process.env.SENDGRID_KEY, //Sendgrid key for password reset email
  service: process.env.SERVICE, //email service to send payslip as email
  username: process.env.USER_EMAIL, //email username to send payslip as email
  password: process.env.USER_PASS, //email password to send payslip as email
  smtp: process.env.EMAIL_SMTP //email smtp server to send payslip as email
};
