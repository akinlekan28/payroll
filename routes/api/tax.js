const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });
const keys = require("../../config/keys");
const pdfMakePrinter = require("pdfmake/src/printer");
const path = require("path");
const fs = require("fs");
const emailTemplate = require("../../emailTemplates/emailTemplate");
const nodemailer = require("nodemailer");

//Load models
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");
const Exception = require("../../models/Exception");
const IndividualCost = require("../../models/Individualcost");
const Payslip = require("../../models/Payslip");

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
        const employeeId = employeeDetails._id;
        const tag = employeeDetails.tag;
        const name = employeeDetails.name;
        const department = employeeDetails.department;
        const employeeEmail = employeeDetails.email;
        const designation = employeeDetails.designation;

        //Get employee level
        Level.findOne({ _id: employeeDetails.level })
          .then(level => {
            const bonuses = level.bonuses;
            const deductables = level.deductables;

            //Get Employee bonuses and deduction and sum total
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

            //Check if employee has individual cost
            IndividualCost.find({ employee: employeeDetails._id })
              .then(individualcost => {
                let individualIncomeSum = 0,
                  individualDeductionSum = 0;

                individualcost.forEach(individualcostItem => {
                  if (individualcostItem.costType === "income") {
                    individualIncomeSum += individualcostItem.amount;
                  } else {
                    individualDeductionSum += individualcostItem.amount;
                  }
                });

                //Check if employee has a salary exception
                Exception.findOne({ employee: employeeDetails._id })
                  .then(employeeException => {
                    if (employeeException) {
                      let basic = employeeException.amount,
                        grossEarning = bonusSum + basic + individualIncomeSum,
                        annualGrossEarning = grossEarning * 12,
                        annualBonuses = (bonusSum + individualIncomeSum) * 12,
                        annualDeductables =
                          (deductableSum + individualDeductionSum) * 12;

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
                        let annualTax = taxCalculation(
                          annualTaxableGrossIncome
                        );
                        let tax = annualTax / 12,
                          netPay =
                            grossEarning -
                            tax -
                            pension -
                            deductableSum -
                            individualDeductionSum;
                        let totalDeductable =
                          tax +
                          pension +
                          deductableSum +
                          individualDeductionSum;

                        //Payslip variables for frontend
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

                        //payslip variables for server side further processing

                        const payslipDetails = {
                          tag,
                          name,
                          basic,
                          grossEarning,
                          tax,
                          pension,
                          consolidationRelief,
                          totalDeductions: totalDeductable,
                          netPay,
                          email: employeeEmail,
                          designation,
                          employee: employeeId,
                          bonuses,
                          deductables,
                          individualcost
                        };

                        //Saves employee payslip details to db
                        Payslip.findOne({ employee: employeeDetails._id })
                          .then(payslipFound => {
                            if (payslipFound) {
                              Payslip.findOneAndUpdate(
                                { employee: employeeId },
                                { $set: payslipDetails },
                                { new: true }
                              )
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            } else {
                              new Payslip(payslipDetails)
                                .save()
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            }
                          })
                          .catch(err => console.log(err));
                        return res.status(200).json(salarySlip);
                      } else {
                        let annualConsolidationRelief =
                            annualGrossEarning * 0.01,
                          annualPension = annualGrossEarning * 0.08,
                          pension = annualPension / 12,
                          consolidationRelief = annualConsolidationRelief / 12,
                          annualTaxableGrossIncome =
                            annualGrossEarning +
                            annualBonuses -
                            annualPension -
                            annualConsolidationRelief -
                            annualDeductables;
                        let annualTax = taxCalculation(
                          annualTaxableGrossIncome
                        );
                        let tax = annualTax / 12,
                          netPay =
                            grossEarning -
                            tax -
                            pension -
                            deductableSum -
                            individualDeductionSum;
                        let totalDeductable =
                          tax +
                          pension +
                          deductableSum +
                          individualDeductionSum;

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

                        const payslipDetails = {
                          tag,
                          name,
                          department,
                          basic,
                          grossEarning,
                          tax,
                          pension,
                          consolidationRelief,
                          totalDeductions: totalDeductable,
                          netPay,
                          email: employeeEmail,
                          designation,
                          employee: employeeId,
                          bonuses,
                          deductables,
                          individualcost
                        };

                        Payslip.findOne({ employee: employeeDetails._id })
                          .then(payslipFound => {
                            if (payslipFound) {
                              Payslip.findOneAndUpdate(
                                { employee: employeeId },
                                { $set: payslipDetails },
                                { new: true }
                              )
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            } else {
                              new Payslip(payslipDetails)
                                .save()
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            }
                          })
                          .catch(err => console.log(err));

                        return res.status(200).json(salarySlip);
                      }
                    } else {
                      let basic = level.basic,
                        grossEarning = bonusSum + basic + individualIncomeSum,
                        annualGrossEarning = grossEarning * 12,
                        annualBonuses = (bonusSum + individualIncomeSum) * 12,
                        annualDeductables =
                          (deductableSum + individualDeductionSum) * 12;

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
                        let annualTax = taxCalculation(
                          annualTaxableGrossIncome
                        );
                        let tax = annualTax / 12,
                          netPay =
                            grossEarning -
                            tax -
                            pension -
                            deductableSum -
                            individualDeductionSum;
                        let totalDeductable =
                          tax +
                          pension +
                          deductableSum +
                          individualDeductionSum;

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

                        const payslipDetails = {
                          tag,
                          name,
                          department,
                          basic,
                          grossEarning,
                          tax,
                          pension,
                          consolidationRelief,
                          totalDeductions: totalDeductable,
                          netPay,
                          email: employeeEmail,
                          designation,
                          employee: employeeId,
                          bonuses,
                          deductables,
                          individualcost
                        };

                        Payslip.findOne({ employee: employeeDetails._id })
                          .then(payslipFound => {
                            if (payslipFound) {
                              Payslip.findOneAndUpdate(
                                { employee: employeeId },
                                { $set: payslipDetails },
                                { new: true }
                              )
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            } else {
                              new Payslip(payslipDetails)
                                .save()
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            }
                          })
                          .catch(err => console.log(err));

                        return res.status(200).json(salarySlip);
                      } else {
                        let annualConsolidationRelief =
                            annualGrossEarning * 0.01,
                          annualPension = annualGrossEarning * 0.08,
                          pension = annualPension / 12,
                          consolidationRelief = annualConsolidationRelief / 12,
                          annualTaxableGrossIncome =
                            annualGrossEarning +
                            annualBonuses -
                            annualPension -
                            annualConsolidationRelief -
                            annualDeductables;
                        let annualTax = taxCalculation(
                          annualTaxableGrossIncome
                        );
                        let tax = annualTax / 12,
                          netPay =
                            grossEarning -
                            tax -
                            pension -
                            deductableSum -
                            individualDeductionSum;
                        let totalDeductable =
                          tax +
                          pension +
                          deductableSum +
                          individualDeductionSum;

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

                        const payslipDetails = {
                          tag,
                          name,
                          department,
                          basic,
                          grossEarning,
                          tax,
                          pension,
                          consolidationRelief,
                          totalDeductions: totalDeductable,
                          netPay,
                          email: employeeEmail,
                          designation,
                          employee: employeeId,
                          bonuses,
                          deductables,
                          individualcost
                        };

                        Payslip.findOne({ employee: employeeDetails._id })
                          .then(payslipFound => {
                            if (payslipFound) {
                              Payslip.findOneAndUpdate(
                                { employee: employeeId },
                                { $set: payslipDetails },
                                { new: true }
                              )
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            } else {
                              new Payslip(payslipDetails)
                                .save()
                                .then(newlySavedPayslip =>
                                  console.log("Saved!")
                                )
                                .catch(err => console.log(err));
                            }
                          })
                          .catch(err => console.log(err));

                        return res.status(200).json(salarySlip);
                      }
                    }
                  })
                  .catch(err => console.log(err));
              })
              .catch(err =>
                res
                  .status(404)
                  .json({ message: "Error fetching other exception" })
              );
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

//@route  Post api/singleslip/send/:id
//@desc Send Employee payslip pdf as email route
//@access Private
router.post("/singleslip/send/:id", protect, (req, res) => {
  const errors = {};
  const date = new Date();

  Payslip.findOne({ employee: req.params.id })
    .then(employeePayslip => {
      let moneyFix = money => {
        let fixedMoney = money.toFixed(2);
        return fixedMoney;
      };

      //Begin insertion of earnings
      let payBonus = employeePayslip.bonuses;
      let otherEarnings = employeePayslip.individualcost;

      let bodyData = [
        ["Earnings", "Amount"],
        ["Basic", `${moneyFix(employeePayslip.basic)}`]
      ];

      //Insert payslip bonuses into rows
      payBonus.forEach(bonus => {
        let dataRow = [];

        dataRow.push(bonus.name);
        dataRow.push(bonus.amount);

        bodyData.push(dataRow);

        otherEarnings.forEach(otherEarning => {
          let earningRow = [];
          if (otherEarning.costType === "income") {
            earningRow.push(otherEarning.name);
            earningRow.push(otherEarning.amount);

            bodyData.push(earningRow);
          }
        });
      });

      //End insertion of earnings

      //Begin insertion of earnings
      let payDeduction = employeePayslip.deductables;

      let bodyData1 = [
        ["Deductions", "Amount"],
        ["Tax", `${moneyFix(employeePayslip.tax)}`],
        ["Pension", `${moneyFix(employeePayslip.pension)}`]
      ];

      //Insert payslip deduction into rows
      payDeduction.forEach(deduction => {
        let dataRow = [];

        dataRow.push(deduction.name);
        dataRow.push(deduction.amount);

        bodyData1.push(dataRow);

        otherEarnings.forEach(otherEarning => {
          let earningRow = [];
          if (otherEarning.costType === "deduction") {
            earningRow.push(otherEarning.name);
            earningRow.push(otherEarning.amount);

            bodyData1.push(earningRow);
          }
        });
      });

      //End insertion of deductions

      //Write payslip data to pdf
      const docDefinition = {
        content: [
          { text: " " },
          {
            text: `${employeePayslip.name} payslip`,
            style: "header",
            alignment: "center"
          },
          { text: " " },
          { text: " " },
          { text: " " },
          {
            style: "tableExample",
            table: {
              widths: [268, 250],
              heights: 50,
              alignment: "center",
              body: [
                [
                  `Employee Name:  ${employeePayslip.name}`,
                  `Tax year:    ${date.getFullYear()}`
                ],
                [
                  `Emplyee Tag: 	${employeePayslip.tag}`,
                  `Pay period:   ${date.toLocaleString("en-us", {
                    month: "long"
                  })}`
                ],
                [
                  `Designation:  ${employeePayslip.designation}`,
                  `Department:   ${employeePayslip.department}`
                ],
                [
                  {
                    table: {
                      widths: [133, 117],
                      alignment: "center",
                      body: bodyData
                    },
                    layout: {
                      fillColor: function(rowIndex, node, columnIndex) {
                        return rowIndex % 2 === 0 ? "#CCCCCC" : null;
                      }
                    }
                  },
                  {
                    table: {
                      widths: [125, 106],
                      alignment: "center",
                      body: bodyData1
                    },
                    layout: {
                      fillColor: function(rowIndex, node, columnIndex) {
                        return rowIndex % 2 === 0 ? "#CCCCCC" : null;
                      }
                    }
                  }
                ],
                [
                  `Gross Earnings:            ${moneyFix(
                    employeePayslip.grossEarning
                  )}`,
                  ""
                ],
                [
                  `Total Deduction:            ${moneyFix(
                    employeePayslip.totalDeductions
                  )}`,
                  ""
                ],
                [`Net Pay:            ${moneyFix(employeePayslip.netPay)}`, ""]
              ]
            }
          }
        ]
      };

      generatePdf(docDefinition, response => {
        pdfLocation = path.join(__dirname, "../../", "docs", "/payroll.pdf");

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: keys.username,
            pass: keys.password,
            host: keys.smtp
          }
        });

        const htmlData = emailTemplate(employeePayslip);

        const options = {
          from: "no-reply@payroller.com",
          to: `${employeePayslip.email}`,
          subject: "Monthly Payroll",
          html: htmlData,
          attachments: [
            {
              path: pdfLocation,
              filename: "payroll.pdf"
            }
          ]
        };

        transporter.sendMail(options, (error, info) => {
          if (error) {
            return res
              .status(400)
              .json({ message: "Error sending employee payslip" });
          } else {
            return res.json({ message: "Payslip successfully sent!" });
          }
        });
      });
    })
    .catch(err => res.status(404).json({ message: "Error fetching payslip" }));
});

const generatePdf = (docDefinition, successCallback, errorCallback) => {
  try {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, "../../", "fonts", "/Roboto-Regular.ttf"),
        bold: path.join(__dirname, "../../", "fonts", "/Roboto-Medium.ttf"),
        italics: path.join(__dirname, "../../", "fonts", "/Roboto-Italic.ttf"),
        bolditalics: path.join(
          __dirname,
          "../../",
          "fonts",
          "/Roboto-MediumItalic.ttf"
        )
      }
    };

    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);

    doc.pipe(
      fs.createWriteStream("docs/payroll.pdf").on("error", err => {
        errorCallback(err.message);
      })
    );

    doc.on("end", () => {
      successCallback("PDF successfully created and stored");
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};

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
