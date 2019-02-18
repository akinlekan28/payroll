const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayslipSchema = new Schema({
  name: {
    type: String
  },
  tag: {
    type: String
  },
  department: {
    type: String
  },
  basic: {
    type: Number
  },
  grossEarning: {
    type: Number
  },
  tax: {
    type: Number
  },
  pension: {
    type: Number
  },
  consolidationRelief: {
    type: Number
  },
  totalDeductions: {
    type: Number
  },
  netPay: {
    type: Number
  },
  email: {
    type: String
  },
  designation: {
    type: String
  },
  bonuses: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      }
    }
  ],
  deductables: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      }
    }
  ],
  individualcost: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      },
      costType: {
        type: String
      }
    }
  ],
  oneOffPaymentArray: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      },
      costType: {
        type: String
      }
    }
  ],
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  },
  taxableIncome: {
    type: Number
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  pfaName: {
    type: String,
    required: true
  },
  pensionAccountNumber: {
    type: String,
    required: true
  },
  presentMonth: {
    type: String
  },
  presentYear: {
    type: Number
  },
  is_delete: {
    type: Number,
    default: 0
  }
});

module.exports = Payslip = mongoose.model("payslip", PayslipSchema);
