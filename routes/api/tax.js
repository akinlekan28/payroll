const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Load models
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");
const Exception = require("../../models/Exception");
const IndividualCost = require('../../models/Individualcost');

//@route  Get api/singleslip/:id
//@desc Get Employee payslip route
//@access Private
router.get("/singleslip/:id", protect, (req, res) => {
  let date = new Date();
  // let salaryDay = date.getDate();
  let salaryDay = 23;
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

            IndividualCost.find({employee: employeeDetails._id})
            .then(individualcost => {
              let individualIncomeSum = 0,
              individualDeductionSum = 0;

              individualcost.forEach(individualcostItem => {
                if(individualcostItem.costType === 'income'){
                  individualIncomeSum += individualcostItem.amount
                }else {
                  individualDeductionSum += individualcostItem.amount
                }
              })

              Exception.findOne({ employee: employeeDetails._id })
              .then(employeeException => {
                if (employeeException) {
                  let basic = employeeException.amount,
                    grossEarning = bonusSum + basic + individualIncomeSum,
                    annualGrossEarning = grossEarning * 12,
                    annualBonuses = (bonusSum + individualIncomeSum) * 12,
                    annualDeductables = (deductableSum + individualDeductionSum ) * 12;

                  if (annualGrossEarning > 300000) {
                    let annualConsolidationRelief =
                        annualGrossEarning * 0.2 + 200000,
                      annualPension = annualGrossEarning * 0.08,
                      pension = annualPension / 12,
                      consolidationRelief = annualConsolidationRelief / 12,
                      annualTaxableGrossIncome =
                        annualGrossEarning +
                        annualBonuses -
                        annualPension -
                        annualConsolidationRelief -
                        annualDeductables;
                    let annualTax = taxCalculation(annualTaxableGrossIncome);
                    let tax = annualTax / 12,
                      netPay = grossEarning - tax - pension - deductableSum - individualDeductionSum;
                    let totalDeductable = tax + pension + deductableSum + individualDeductionSum;

                    const salarySlip = {
                      basic,
                      grossEarning,
                      tax,
                      pension,
                      consolidationRelief,
                      totalDeductable,
                      netPay,
                      employeeDetails,
                      level,
                      individualcost,
                      employeeException
                    };
                    return res.status(200).json(salarySlip);
                  } else {
                    let annualConsolidationRelief = annualGrossEarning * 0.01,
                      annualPension = annualGrossEarning * 0.08,
                      pension = annualPension / 12,
                      consolidationRelief = annualConsolidationRelief / 12,
                      annualTaxableGrossIncome =
                        annualGrossEarning +
                        annualBonuses -
                        annualPension -
                        annualConsolidationRelief -
                        annualDeductables;
                    let annualTax = taxCalculation(annualTaxableGrossIncome);
                    let tax = annualTax / 12,
                      netPay = grossEarning - tax - pension - deductableSum - individualDeductionSum;
                    let totalDeductable = tax + pension + deductableSum + individualDeductionSum;

                    const salarySlip = {
                      basic,
                      grossEarning,
                      tax,
                      pension,
                      consolidationRelief,
                      totalDeductable,
                      netPay,
                      employeeDetails,
                      individualcost,
                      level,
                      employeeException
                    };
                    return res.status(200).json(salarySlip);
                  }
                } else {
                  let basic = level.basic,
                  grossEarning = bonusSum + basic + individualIncomeSum,
                  annualGrossEarning = grossEarning * 12,
                  annualBonuses = (bonusSum + individualIncomeSum) * 12,
                  annualDeductables = (deductableSum + individualDeductionSum ) * 12;

                  if (annualGrossEarning > 300000) {
                    let annualConsolidationRelief =
                        annualGrossEarning * 0.2 + 200000,
                      annualPension = annualGrossEarning * 0.08,
                      pension = annualPension / 12,
                      consolidationRelief = annualConsolidationRelief / 12,
                      annualTaxableGrossIncome =
                        annualGrossEarning +
                        annualBonuses -
                        annualPension -
                        annualConsolidationRelief -
                        annualDeductables;
                    let annualTax = taxCalculation(annualTaxableGrossIncome);
                    let tax = annualTax / 12,
                      netPay = grossEarning - tax - pension - deductableSum - individualDeductionSum;
                    let totalDeductable = tax + pension + deductableSum + individualDeductionSum;

                    const salarySlip = {
                      basic,
                      grossEarning,
                      tax,
                      pension,
                      consolidationRelief,
                      totalDeductable,
                      netPay,
                      employeeDetails,
                      individualcost,
                      level
                    };
                    return res.status(200).json(salarySlip);
                  } else {
                    let annualConsolidationRelief = annualGrossEarning * 0.01,
                      annualPension = annualGrossEarning * 0.08,
                      pension = annualPension / 12,
                      consolidationRelief = annualConsolidationRelief / 12,
                      annualTaxableGrossIncome =
                        annualGrossEarning +
                        annualBonuses -
                        annualPension -
                        annualConsolidationRelief -
                        annualDeductables;
                    let annualTax = taxCalculation(annualTaxableGrossIncome);
                    let tax = annualTax / 12,
                      netPay = grossEarning - tax - pension - deductableSum - individualDeductionSum;
                    let totalDeductable = tax + pension + deductableSum + individualDeductionSum;

                    const salarySlip = {
                      basic,
                      grossEarning,
                      tax,
                      pension,
                      consolidationRelief,
                      totalDeductable,
                      netPay,
                      employeeDetails,
                      individualcost,
                      level
                    };
                    return res.status(200).json(salarySlip);
                  }
                }
              })
              .catch(err => console.log(err));


            })
            .catch(err => res.status(404).json({message: "Error fetching other exception"}))
          })
          .catch(err =>
            res.status(404).json({ message: "User grade level not found" })
          );
      })
      .catch(err => res.status(404).json({ message: "Error fetching user" }));
  } else {
    res
      .status(400)
      .json({ message: "Salary report can only be generated after 21 days" });
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
