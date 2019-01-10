const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndividualcostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  costType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  },
  employeeName: {
    type: String
  },
  is_delete: {
    type: Number,
    default: 0
  }
});

module.exports = Individualcost = mongoose.model(
  "individualcost",
  IndividualcostSchema
);
