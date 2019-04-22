export const months = [
  { name: "January", value: "January", _id: "January" },
  { name: "February", value: "February", _id: "February" },
  { name: "March", value: "March", _id: "March" },
  { name: "April", value: "April", _id: "April" },
  { name: "May", value: "May", _id: "May" },
  { name: "June", value: "June", _id: "June" },
  { name: "July", value: "July", _id: "July" },
  { name: "August", value: "August", _id: "August" },
  { name: "September", value: "September", _id: "September" },
  { name: "October", value: "October", _id: "October" },
  { name: "November", value: "November", _id: "November" },
  { name: "December", value: "December", _id: "December" }
];

export const banks = [
  { name: "Access Bank PLC", value: "Access Bank PLC", _id: "Access Bank PLC" },
  { name: "CitiBank Nigeria Ltd", value: "CitiBank Nigeria Ltd", _id: "CitiBank Nigeria Ltd" },
  { name: "Diamond Bank Plc", value: "Diamond Bank Plc", _id: "Diamond Bank Plc" },
  { name: "EcoBank Nigeria Plc", value: "EcoBank Nigeria Plc", _id: "EcoBank Nigeria Plc" },
  { name: "Fidelity Bank Plc", value: "Fidelity Bank Plc", _id: "Fidelity Bank Plc" },
  { name: "First Bank Nigeria Ltd", value: "First Bank Nigeria Ltd", _id: "First Bank Nigeria Ltd" },
  { name: "First City Monument Bank Plc", value: "First City Monument Bank Plc", _id: "First City Monument Bank Plc" },
  { name: "Guarantee Trust Bank Plc", value: "Guarantee Trust Bank Plc", _id: "Guarantee Trust Bank Plc" },
  { name: "Heritage Banking Company Ltd", value: "Heritage Banking Company Ltd", _id: "Heritage Banking Company Ltd" },
  { name: "Key Stone Bank", value: "Key Stone Bank", _id: "Key Stone Bank" },
  { name: "Polaris Bank", value: "Polaris Bank", _id: "Polaris Bank" },
  { name: "Providus Bank", value: "Providus Bank", _id: "Providus Bank" },
  { name: "Stanbic IBTC Bank Ltd", value: "Stanbic IBTC Bank Ltd", _id: "Stanbic IBTC Bank Ltd" },
  { name: "Standard Chartered Bank Nigeria Ltd", value: "Standard Chartered Bank Nigeria Ltd", _id: "Standard Chartered Bank Nigeria Ltd" },
  { name: "Sterling Bank Plc", value: "Sterling Bank Plc", _id: "Sterling Bank Plc" },
  { name: "SunTrust Bank Nigeria Limited", value: "SunTrust Bank Nigeria Limited", _id: "SunTrust Bank Nigeria Limited" },
  { name: "Union Bank of Nigeria Plc", value: "Union Bank of Nigeria Plc", _id: "Union Bank of Nigeria Plc" },
  { name: "United Bank For Africa Plc", value: "United Bank For Africa Plc", _id: "United Bank For Africa Plc" },
  { name: "Unity Bank Plc", value: "Unity Bank Plc", _id: "Unity Bank Plc" },
  { name: "Wema Bank Plc", value: "Wema Bank Plc", _id: "Wema Bank Plc" },
  { name: "Zenith Bank Plc", value: "Zenith Bank Plc", _id: "Zenith Bank Plc" }
]

export const roles = [
  {name: "Administrator", value: 0, _id: 0},
  {name: "Super Administrator", value: 1, _id: 1}
]

export const formatMoney = money => {
  let formatedValue = money
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return formatedValue;
};
