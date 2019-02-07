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

export const formatMoney = money => {
  let formatedValue = money
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return formatedValue;
};
