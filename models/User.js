const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  token: {
    type: String
  },
  expiry: {
    type: Date
  },
  is_admin: {
    type: Number,
    default: 0
  },
  is_delete: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model('users', UserSchema);