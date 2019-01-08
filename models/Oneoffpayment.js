const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OneoffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  costType: {
    type: String,
    required: true
  },
  employeeName: {
    type: String
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  },
  is_delete: {
    type: Number,
    default: 0
  },
  date_added: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Oneoffpayment = mongoose.model("oneoff", OneoffSchema);
