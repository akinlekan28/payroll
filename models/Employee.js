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
  levelName: {
    type: String
  },
  date_added: {
    type: Date,
    default: Date.now()
  },
  is_delete: {
    type: Number,
    default: 0
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
