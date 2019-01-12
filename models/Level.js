const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const LevelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  basic: {
    type: Number,
    required: true
  },
  bonuses: [
    {
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  deductables: [
    {
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  is_delete: {
    type: Number,
    default: 0
  }
});

module.exports = Level = mongoose.model("level", LevelSchema);
