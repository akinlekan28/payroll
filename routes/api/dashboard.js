const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Employee = require("../../models/Employee");
const Level = require("../../models/Level");
const Exception = require("../../models/Exception");
const User = require("../../models/User");
const Payslip = require("../../models/Payslip");
const OneoffPayment = require("../../models/Oneoffpayment");

let date = new Date();
const presentMonth = date.toLocaleString("en-us", { month: "long" });
const presentYear = date.getFullYear();

router.get("/analytics", protect, (req, res) => {
  Employee.countDocuments()
    .where("is_delete")
    .equals(0)
    .then(employeeCount => {
      Level.countDocuments()
        .where("is_delete")
        .equals(0)
        .then(levelCount => {
          Exception.countDocuments()
            .where("is_delete")
            .equals(0)
            .then(exceptionCount => {
              User.countDocuments()
                .where("is_delete")
                .equals(0)
                .then(adminCount => {
                  Employee.countDocuments()
                    .where("is_delete")
                    .equals(1)
                    .then(deletedEmployees => {
                      Payslip.countDocuments({ is_delete: 0 })
                        .where("presentMonth")
                        .equals(presentMonth)
                        .then(payslipCount => {
                          OneoffPayment.countDocuments()
                            .where("is_delete")
                            .equals(0)
                            .then(oneOff => {
                              Employee.find()
                                .where("is_delete")
                                .equals(0)
                                .limit(5)
                                .sort({$natural:-1})
                                .then(employee => {
                                  const totalCount = {
                                    employee,
                                    adminCount,
                                    employeeCount,
                                    levelCount,
                                    exceptionCount,
                                    deletedEmployees,
                                    payslipCount,
                                    oneOff
                                  };
                                  return res.json(totalCount);
                                })
                                .catch(err =>
                                  res
                                    .status(404)
                                    .json({ message: "Employees not found" })
                                );
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get("/payoverview", protect, (req, res) => {
  Payslip.find({ is_delete: 0 })
    .where("presentYear")
    .equals(presentYear)
    .then(payslips => {
      let jan = 0,
        feb = 0,
        mar = 0,
        apr = 0,
        may = 0,
        jun = 0,
        jul = 0,
        aug = 0,
        sep = 0,
        oct = 0,
        nov = 0,
        dec = 0;

      let net = 0,
        tax = 0,
        pension = 0,
        consolidationRelief = 0,
        bonus1 = 0,
        bonus2 = 0,
        bonus3 = 0,
        totalBonus = 0,
        otherDeduction = 0;

      let grossJan = 0,
        grossFeb = 0,
        grossMar = 0,
        grossApr = 0,
        grossMay = 0,
        grossJun = 0,
        grossJul = 0,
        grossAug = 0,
        grossSep = 0,
        grossOct = 0,
        grossNov = 0,
        grossDec = 0;

      payslips.forEach(payslipItem => {
        switch (payslipItem.presentMonth) {
          case "January":
            jan += payslipItem.netPay;
            grossJan += payslipItem.grossEarning;
            break;
          case "February":
            feb += payslipItem.netPay;
            grossFeb += payslipItem.grossEarning;
            break;
          case "March":
            mac += payslipItem.netPay;
            grossMar += payslipItem.grossEarning;
            break;
          case "April":
            apr += payslipItem.netPay;
            grossApr += payslipItem.grossEarning;
            break;
          case "May":
            may += payslipItem.netPay;
            grossMay += payslipItem.grossEarning;
            break;
          case "June":
            jun += payslipItem.netPay;
            grossJun += payslipItem.grossEarning;
            break;
          case "July":
            jul += payslipItem.netPay;
            grossJul += payslipItem.grossEarning;
            break;
          case "August":
            aug += payslipItem.netPay;
            grossAug += payslipItem.grossEarning;
            break;
          case "September":
            sep += payslipItem.netPay;
            grossSep += payslipItem.grossEarning;
            break;
          case "October":
            oct += payslipItem.netPay;
            grossOct += payslipItem.grossEarning;
            break;
          case "November":
            nov += payslipItem.netPay;
            grossNov += payslipItem.grossEarning;
            break;
          case "December":
            dec += payslipItem.netPay;
            grossDec += payslipItem.grossEarning;
            break;
          default:
            1 + 1;
        }

        let bonusItemSum = 0;
        payslipItem.bonuses.forEach(bonusItem => {
          bonusItemSum += bonusItem.amount;
        });

        let individualcostItemSum = 0;
        payslipItem.individualcost.forEach(individualcostItem => {
          if (individualcostItem.costType === "income") {
            individualcostItemSum += individualcostItem.amount;
          }
        });

        let oneOffItemSum = 0;
        payslipItem.oneOffPaymentArray.forEach(oneOffItem => {
          if (oneOffItem.costType === "income") {
            oneOffItemSum += oneOffItem.amount;
          }
        });

        net += payslipItem.netPay;
        employeeDeduction =
          payslipItem.totalDeductions - payslipItem.tax - payslipItem.pension;

        tax += payslipItem.tax;
        pension += payslipItem.pension;
        consolidationRelief += payslipItem.consolidationRelief;
        bonus1 += bonusItemSum;
        bonus2 += individualcostItemSum;
        bonus3 += oneOffItemSum;
        otherDeduction += employeeDeduction;
      });

      jan = jan.toFixed(2);
      feb = feb.toFixed(2);
      mar = mar.toFixed(2);
      apr = apr.toFixed(2);
      may = may.toFixed(2);
      jun = jun.toFixed(2);
      jul = jul.toFixed(2);
      aug = aug.toFixed(2);
      sep = sep.toFixed(2);
      oct = oct.toFixed(2);
      nov = nov.toFixed(2);
      dec = dec.toFixed(2);
      totalTax = tax.toFixed(2);
      totalPension = pension.toFixed(2);
      totalCra = consolidationRelief.toFixed(2);
      totalBonus = (bonus1 + bonus2 + bonus3).toFixed(2);
      totalDeduction = otherDeduction.toFixed(2);
      netPay = net.toFixed(2);

      const overview = {
        jan,
        feb,
        mar,
        apr,
        may,
        jun,
        jul,
        aug,
        sep,
        oct,
        nov,
        dec,
        netPay,
        totalTax,
        totalPension,
        totalCra,
        totalBonus,
        totalDeduction,
        grossJan,
        grossFeb,
        grossMar,
        grossApr,
        grossMay,
        grossJun,
        grossJul,
        grossAug,
        grossSep,
        grossOct,
        grossNov,
        grossDec
      };
      res.json(overview);
    })
    .catch(err => console.log(err));
});

module.exports = router;
