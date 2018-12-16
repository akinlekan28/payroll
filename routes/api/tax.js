const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Load models
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");
const Exception = require("../../models/Exception");

router.get("/:id", protect, (req, res) => {
  let date = new Date();
  // let salaryDay = date.getDate();
  let salaryDay = 22; //test parameter
  if (salaryDay > 21) {
    Employee.findOne({ _id: req.params.id })
      .then(employeeDetails => {
        Level.findOne({ _id: employeeDetails.level })
          .then(level => {
            let netPay,
              pension,
              cra,
              tax,
              taxableIncome,
              totalPension,
              grossEarnings,
              levelBonus = level.bonuses,
              levelDeductable = level.deductables,
              deductableSum = 0,
              bonusSum = 0;
            levelBonus.forEach(bonus => {
              bonusSum += bonus.amount;
            });
            levelDeductable.forEach(deductable => {
              deductableSum += deductable.amount;
            });

            Exception.findOne({ employee: employeeDetails._id })
              .then(employeeException => {
                if (employeeException) {
                  payable = bonusSum + employeeException.amount - deductableSum;
                  if (payable * 12 > 300000) {
                    annualPay = payable * 12;
                    totalCra = annualPay * 0.2 + 200000;
                    totalPension = annualPay * 0.08;
                    taxableIncome = payable - totalCra - totalPension;
                    console.log(taxableIncome);
                    let test = taxCalculation(1986538.35);
                    console.log("test is " + test);
                    const taxReport = {
                      payable,
                      monthlyCra,
                      bonusSum,
                      deductableSum,
                      annualPay,
                      employeeDetails,
                      level,
                      employeeException
                    };
                    return res.status(200).json(taxReport);
                  } else {
                    cra = payable * (1 / 100);
                    annualPay = payable * 12;
                    const taxReport = {
                      payable,
                      cra,
                      bonusSum,
                      deductableSum,
                      annualPay,
                      employeeDetails,
                      level,
                      employeeException
                    };
                    return res.status(200).json(taxReport);
                  }
                } else {
                  payable = bonusSum + level.basic - deductableSum;
                  if (payable * 12 > 300000) {
                    cra = payable * (20 / 100) + payable * (1 / 100);
                    const taxReport = {
                      payable,
                      cra,
                      bonusSum,
                      deductableSum,
                      employeeDetails,
                      level
                    };
                    return res.status(200).json(taxReport);
                  } else {
                    cra = payable * (1 / 100);
                    const taxReport = {
                      payable,
                      cra,
                      bonusSum,
                      deductableSum,
                      employeeDetails,
                      level
                    };
                    return res.status(200).json(taxReport);
                  }
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err =>
            res.status(404).json({ message: "User grade level not found" })
          );
      })
      .catch(err => res.status(404).json({ message: "Error fetching user" }));
  } else {
    res
      .status(400)
      .json({ message: "Tax report can only be generated after 21 days" });
  }
});

router.get("/singleslip/:id", (req, res) => {
  let date = new Date();
  // let salaryDay = date.getDate();
  let salaryDay = 22; //test parameter
  if (salaryDay > 21) {
    Employee.findOne({ _id: req.params.id })
      .then(employeeDetails => {
        Level.findOne({ _id: employeeDetails.level })
          .then(level => {
            let levelBonus = level.bonuses,
              levelDeductable = level.deductables,
              deductableSum = 0,
              bonusSum = 0;
            levelBonus.forEach(bonus => {
              bonusSum += bonus.amount;
            });
            levelDeductable.forEach(deductable => {
              deductableSum += deductable.amount;
            });

            Exception.findOne({ employee: employeeDetails._id })
              .then(employeeException => {
                if (employeeException){

                  let basic = employeeException.amount, 
                  grossEarning = bonusSum + basic,
                  annualGrossEarning = grossEarning * 12,
                  annualBonuses = bonusSum * 12,
                  annualDeductables = deductableSum * 12;
                  
                  if(annualGrossEarning > 300000){
                    annualConsolidationRelief = annualGrossEarning * 0.2 + 200000,
                    annualPension = annualGrossEarning * 0.08,
                    pension = annualPension / 12,
                    consolidationRelief = annualConsolidationRelief / 12,
                    annualTaxableGrossIncome = annualGrossEarning - annualPension - annualConsolidationRelief - annualBonuses - annualDeductables;
                    let annualTax = taxCalculation(annualTaxableIncome);
                    tax = annualTax / 12;
                    netPay = grossEarning - tax - pension;
                  }
                  const salarySlip = {
                    basic,
                    grossEarning,
                    tax,
                    pension,
                    consolidationRelief,
                    netPay,
                    employeeDetails,
                    level
                  }
                } else {

                }
              })
              .catch(err => console.log(err));
          })
          .catch(err =>
            res.status(404).json({ message: "User grade level not found" })
          );
      })
      .catch(err => res.status(404).json({ message: "Error fetching user" }));
  } else {
    res
      .status(400)
      .json({ message: "Tax report can only be generated after 21 days" });
  }
});

const taxCalculation = annualTaxableIncome => {
  let annualTaxMap = new Map([
    [1, 300000], //@7%
    [2, 300000], //@11%
    [3, 500000], //@15%
    [4, 500000], //@19%
    [5, 1600000], //@21%
    [6, 3200000] //@24%
  ]);

  let taxRateMap = new Map([
    [1, 0.07], //@7%
    [2, 0.11], //@11%
    [3, 0.15], //@15%
    [4, 0.19], //@19%
    [5, 0.21], //@21%
    [6, 0.24] //@24%
  ]);

  let totalTax = 0.0,
    annualTaxValue;

  if (annualTaxableIncome <= 300000) {
    annualTaxValue = annualTaxableIncome * taxRateMap.get(1).toFixed(2);
    return;
  } else {
    let lastAnnualIndex = 0,
      i;
    for (i = 1; i <= 6; i++) {
      if (annualTaxableIncome > annualTaxMap.get(i)) {
        let tax = annualTaxMap.get(i) * taxRateMap.get(i).toFixed(2);
        totalTax += parseFloat(tax);
        annualTaxableIncome -= annualTaxMap.get(i);
        lastAnnualIndex = i;
      } else break;
    }
    ++lastAnnualIndex;
    let tax = taxRateMap.get(lastAnnualIndex) * annualTaxableIncome;
    totalTax += tax;

    return totalTax;
  }
};

module.exports = router;
