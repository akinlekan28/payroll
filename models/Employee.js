const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  tag: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: "level"
  },
  date_added: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
