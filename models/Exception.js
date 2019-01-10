const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExceptionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  },
  name: {
    type: String
  },
  is_delete: {
    type: Number,
    default: 0
  },
});

module.exports = Exception = mongoose.model("exception", ExceptionSchema);
