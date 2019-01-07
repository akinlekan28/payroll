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
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  }
});

module.exports = Oneoff = mongoose.model("oneoff", OneoffSchema);
