const express = require('express');
const router = express.Router();
const passport = require('passport');
const protect = passport.authenticate('jwt', { session: false });
const keys = require('../../config/keys');
const mailer = require('@sendgrid/mail');
const pdfMakePrinter = require('pdfmake/src/printer');
const path = require('path');
const emailTemplate = require('../../emailTemplates/emailTemplate');
// const redis = require('redis');
// const client = redis.createClient();

//Load models
const Level = require('../../models/Level');
const Employee = require('../../models/Employee');
const Exception = require('../../models/Exception');
const IndividualCost = require('../../models/Individualcost');
const Payslip = require('../../models/Payslip');
const OneOffPayment = require('../../models/Oneoffpayment');

//Montly record validation rules
const monthlyRecord = require('../../validation/monthlyrecord');
const employeeMonthYear = require('../../validation/employeemonthyear');
const monthYear = require('../../validation/monthyear');

const date = new Date();
let presentMonth = date.toLocaleString('en-us', { month: 'long' });
let presentYear = date.getFullYear();

//@route  Get api/payslip/:id
//@desc Get Employee payslip route
//@access Private
router.get('/:id', protect, (req, res) => {
  let salaryDay = date.getDate();

  if (salaryDay >= 21) {
    Employee.findOne({ _id: req.params.id })
      .where('is_delete')
      .equals(0)
      .then((employeeDetails) => {
        const employeeId = employeeDetails._id;
        const tag = employeeDetails.tag;
        const name = employeeDetails.name;
        const department = employeeDetails.department;
        const employeeEmail = employeeDetails.email;
        const designation = employeeDetails.designation;
        const bankName = employeeDetails.bankName;
        const accountNumber = employeeDetails.accountNumber;
        const pfaName = employeeDetails.pfaName;
        const pensionAccountNumber =
          employeeDetails.pensionAccountNumber;
        let oneOffPaymentIncomeSum = 0;
        let oneOffPaymentDeductionSum = 0;
        let oneOffPaymentArray = [];

        OneOffPayment.find({ employee: employeeId })
          .where('is_delete')
          .equals(0)
          .then((oneoffPaymentItems) => {
            oneoffPaymentItems.forEach((oneoffPaymentItem) => {
              if (presentMonth === oneoffPaymentItem.month) {
                let presentDate = date.getTime();
                let paymentDate =
                  oneoffPaymentItem.date_added.getTime();
                let diffMilli = Math.abs(presentDate - paymentDate);
                let daysDiff = Math.round(
                  diffMilli / (1000 * 60 * 60 * 24)
                );

                if (daysDiff < 360) {
                  if (oneoffPaymentItem.costType === 'income') {
                    oneOffPaymentIncomeSum +=
                      oneoffPaymentItem.amount;
                    oneOffPaymentArray.push(oneoffPaymentItem);
                  } else {
                    oneOffPaymentDeductionSum +=
                      oneoffPaymentItem.amount;
                    oneOffPaymentArray.push(oneoffPaymentItem);
                  }
                } else {
                  oneoffPaymentItem
                    .remove()
                    .then(() => {})
                    .catch((err) => console.log(err));
                }
              }
            });

            //Get employee level
            Level.findOne({ _id: employeeDetails.level })
              .where('is_delete')
              .equals(0)
              .then((level) => {
                const bonuses = level.bonuses;
                const deductables = level.deductables;

                //Get Employee bonuses and deduction and sum total
                let levelBonus = level.bonuses;
                let levelDeductable = level.deductables;
                let deductableSum = 0;
                let bonusSum = 0;
                levelBonus.forEach((bonus) => {
                  bonusSum += bonus.amount;
                });
                levelDeductable.forEach((deductable) => {
                  deductableSum += deductable.amount;
                });

                //Check if employee has individual cost
                IndividualCost.find({ employee: employeeDetails._id })
                  .where('is_delete')
                  .equals(0)
                  .then((individualcost) => {
                    let individualIncomeSum = 0;
                    let individualDeductionSum = 0;

                    individualcost.forEach((individualcostItem) => {
                      if (individualcostItem.costType === 'income') {
                        individualIncomeSum +=
                          individualcostItem.amount;
                      } else {
                        individualDeductionSum +=
                          individualcostItem.amount;
                      }
                    });

                    //Check if employee has a salary exception
                    Exception.findOne({
                      employee: employeeDetails._id,
                    })
                      .where('is_delete')
                      .equals(0)
                      .then((employeeException) => {
                        if (employeeException) {
                          let basic = employeeException.amount;
                          let grossEarning =
                            bonusSum +
                            basic +
                            individualIncomeSum +
                            oneOffPaymentIncomeSum;
                          let annualGrossEarning = grossEarning * 12;
                          let annualBonuses =
                            (bonusSum +
                              individualIncomeSum +
                              oneOffPaymentIncomeSum) *
                            12;
                          let annualDeductables =
                            (deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum) *
                            12;

                          if (annualGrossEarning > 300000) {
                            let annualConsolidationRelief =
                              annualGrossEarning * 0.2 + 200000;
                            let annualPension =
                              annualGrossEarning * 0.08;
                            let pension = annualPension / 12;
                            let consolidationRelief =
                              annualConsolidationRelief / 12;
                            let annualTaxableGrossIncome =
                              annualGrossEarning +
                              annualBonuses -
                              annualPension -
                              annualConsolidationRelief -
                              annualDeductables;
                            let taxableIncome =
                              annualTaxableGrossIncome / 12;
                            let annualTax = taxCalculation(
                              annualTaxableGrossIncome
                            );
                            let tax = annualTax / 12;
                            let netPay =
                              grossEarning -
                              tax -
                              pension -
                              deductableSum -
                              individualDeductionSum -
                              oneOffPaymentDeductionSum;
                            let totalDeductable =
                              tax +
                              pension +
                              deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum;

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
                              employeeException,
                              oneOffPaymentArray,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
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
                              department,
                              employee: employeeId,
                              bonuses,
                              deductables,
                              individualcost,
                              oneOffPaymentArray,
                              taxableIncome,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                              presentMonth,
                              presentYear,
                            };

                            //Saves employee payslip details to db
                            Payslip.findOne(
                              { employee: employeeDetails._id },
                              { is_delete: 0 }
                            )
                              .where('presentMonth')
                              .equals(presentMonth)
                              .where('presentYear')
                              .equals(presentYear)
                              .then((payslipFound) => {
                                if (payslipFound) {
                                  Payslip.findOneAndUpdate(
                                    { employee: employeeId },
                                    { $set: payslipDetails },
                                    { new: true }
                                  )
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                } else {
                                  new Payslip(payslipDetails)
                                    .save()
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                }
                              })
                              .catch((err) => console.log(err));
                            return res.status(200).json(salarySlip);
                          } else {
                            let annualConsolidationRelief =
                              annualGrossEarning * 0.01;
                            let annualPension =
                              annualGrossEarning * 0.08;
                            let pension = annualPension / 12;
                            let consolidationRelief =
                              annualConsolidationRelief / 12;
                            let annualTaxableGrossIncome =
                              annualGrossEarning +
                              annualBonuses -
                              annualPension -
                              annualConsolidationRelief -
                              annualDeductables;
                            let taxableIncome =
                              annualTaxableGrossIncome / 12;
                            let annualTax = taxCalculation(
                              annualTaxableGrossIncome
                            );
                            let tax = annualTax / 12;
                            let netPay =
                              grossEarning -
                              tax -
                              pension -
                              deductableSum -
                              individualDeductionSum -
                              oneOffPaymentDeductionSum;
                            let totalDeductable =
                              tax +
                              pension +
                              deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum;

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
                              employeeException,
                              oneOffPaymentArray,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                            };

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
                              department,
                              employee: employeeId,
                              bonuses,
                              deductables,
                              individualcost,
                              oneOffPaymentArray,
                              taxableIncome,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                              presentMonth,
                              presentYear,
                            };

                            Payslip.findOne(
                              { employee: employeeDetails._id },
                              { is_delete: 0 }
                            )
                              .where('presentMonth')
                              .equals(presentMonth)
                              .where('presentYear')
                              .equals(presentYear)
                              .then((payslipFound) => {
                                if (payslipFound) {
                                  Payslip.findOneAndUpdate(
                                    { employee: employeeId },
                                    { $set: payslipDetails },
                                    { new: true }
                                  )
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                } else {
                                  new Payslip(payslipDetails)
                                    .save()
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                }
                              })
                              .catch((err) => console.log(err));

                            return res.status(200).json(salarySlip);
                          }
                        } else {
                          let basic = level.basic;
                          let grossEarning =
                            bonusSum +
                            basic +
                            individualIncomeSum +
                            oneOffPaymentIncomeSum;
                          let annualGrossEarning = grossEarning * 12;
                          let annualBonuses =
                            (bonusSum +
                              individualIncomeSum +
                              oneOffPaymentIncomeSum) *
                            12;
                          let annualDeductables =
                            (deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum) *
                            12;

                          if (annualGrossEarning > 300000) {
                            let annualConsolidationRelief =
                              annualGrossEarning * 0.2 + 200000;
                            let annualPension =
                              annualGrossEarning * 0.08;
                            let pension = annualPension / 12;
                            let consolidationRelief =
                              annualConsolidationRelief / 12;
                            let annualTaxableGrossIncome =
                              annualGrossEarning +
                              annualBonuses -
                              annualPension -
                              annualConsolidationRelief -
                              annualDeductables;
                            let taxableIncome =
                              annualTaxableGrossIncome / 12;
                            let annualTax = taxCalculation(
                              annualTaxableGrossIncome
                            );
                            let tax = annualTax / 12;
                            let netPay =
                              grossEarning -
                              tax -
                              pension -
                              deductableSum -
                              individualDeductionSum -
                              oneOffPaymentDeductionSum;
                            let totalDeductable =
                              tax +
                              pension +
                              deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum;

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
                              oneOffPaymentArray,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                            };

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
                              department,
                              employee: employeeId,
                              bonuses,
                              deductables,
                              individualcost,
                              oneOffPaymentArray,
                              taxableIncome,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                              presentMonth,
                              presentYear,
                            };

                            Payslip.findOne(
                              { employee: employeeDetails._id },
                              { is_delete: 0 }
                            )
                              .where('presentMonth')
                              .equals(presentMonth)
                              .where('presentYear')
                              .equals(presentYear)
                              .then((payslipFound) => {
                                if (payslipFound) {
                                  Payslip.findOneAndUpdate(
                                    { employee: employeeId },
                                    { $set: payslipDetails },
                                    { new: true }
                                  )
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                } else {
                                  new Payslip(payslipDetails)
                                    .save()
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                }
                              })
                              .catch((err) => console.log(err));

                            return res.status(200).json(salarySlip);
                          } else {
                            let annualConsolidationRelief =
                              annualGrossEarning * 0.01;
                            let annualPension =
                              annualGrossEarning * 0.08;
                            let pension = annualPension / 12;
                            let consolidationRelief =
                              annualConsolidationRelief / 12;
                            let annualTaxableGrossIncome =
                              annualGrossEarning +
                              annualBonuses -
                              annualPension -
                              annualConsolidationRelief -
                              annualDeductables;
                            let taxableIncome =
                              annualTaxableGrossIncome / 12;
                            let annualTax = taxCalculation(
                              annualTaxableGrossIncome
                            );
                            let tax = annualTax / 12;
                            let netPay =
                              grossEarning -
                              tax -
                              pension -
                              deductableSum -
                              individualDeductionSum -
                              oneOffPaymentDeductionSum;
                            let totalDeductable =
                              tax +
                              pension +
                              deductableSum +
                              individualDeductionSum +
                              oneOffPaymentDeductionSum;

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
                              oneOffPaymentArray,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                            };

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
                              department,
                              employee: employeeId,
                              bonuses,
                              deductables,
                              individualcost,
                              oneOffPaymentArray,
                              taxableIncome,
                              bankName,
                              accountNumber,
                              pfaName,
                              pensionAccountNumber,
                              presentMonth,
                              presentYear,
                            };

                            Payslip.findOne(
                              { employee: employeeDetails._id },
                              { is_delete: 0 }
                            )
                              .where('presentMonth')
                              .equals(presentMonth)
                              .where('presentYear')
                              .equals(presentYear)
                              .then((payslipFound) => {
                                if (payslipFound) {
                                  Payslip.findOneAndUpdate(
                                    { employee: employeeId },
                                    { $set: payslipDetails },
                                    { new: true }
                                  )
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                } else {
                                  new Payslip(payslipDetails)
                                    .save()
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                                }
                              })
                              .catch((err) => console.log(err));

                            return res.status(200).json(salarySlip);
                          }
                        }
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) =>
                    res
                      .status(404)
                      .json({
                        message: 'Error fetching other exception',
                      })
                  );
              })
              .catch((err) =>
                res
                  .status(404)
                  .json({ message: 'User grade level not found' })
              );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) =>
        res.status(404).json({ message: 'Error fetching user' })
      );
  } else {
    res
      .status(400)
      .json({
        message:
          'Salary report can only be generated after 21 days of a month!',
      });
  }
});

//@route  Post api/payslip/send/:id
//@desc Send Employee payslip pdf as email route
//@access Private
router.post('/send/:id', protect, (req, res) => {
  const errors = {};
  mailer.setApiKey(keys.sendGridKey);

  Payslip.findOne({ employee: req.params.id }, { is_delete: 0 })
    .where('presentMonth')
    .equals(presentMonth)
    .where('presentYear')
    .equals(presentYear)
    .then((employeePayslip) => {
      let t = JSON.stringify(employeePayslip);
      // console.log(t)
      // client.set(mee, t)

      let moneyFix = (money) => {
        let fixedMoney = money.toFixed(2);
        return fixedMoney;
      };
      const formatMoney = (money) => {
        let formatedValue = money
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        return formatedValue;
      };
      const basic = moneyFix(employeePayslip.basic);
      const gross = moneyFix(employeePayslip.grossEarning);
      const net = moneyFix(employeePayslip.netPay);
      const deductions = moneyFix(employeePayslip.totalDeductions);
      const pension = moneyFix(employeePayslip.pension);
      const tax = moneyFix(employeePayslip.tax);

      //Begin insertion of earnings
      let payBonus = employeePayslip.bonuses;
      let otherEarnings = employeePayslip.individualcost;
      let oneOffPayment = employeePayslip.oneOffPaymentArray;

      let bodyData = [
        ['Earnings', 'Amount'],
        ['Basic', `${formatMoney(basic)}`],
      ];

      //Insert payslip bonuses into rows
      payBonus.forEach((bonus) => {
        let dataRow = [];

        dataRow.push(bonus.name);
        dataRow.push(formatMoney(bonus.amount));

        bodyData.push(dataRow);

        otherEarnings.forEach((otherEarning) => {
          let earningRow = [];
          if (otherEarning.costType === 'income') {
            earningRow.push(otherEarning.name);
            earningRow.push(formatMoney(otherEarning.amount));

            bodyData.push(earningRow);
          }
        });

        oneOffPayment.forEach((otherEarning) => {
          let earningRow = [];
          if (otherEarning.costType === 'income') {
            earningRow.push(otherEarning.name);
            earningRow.push(formatMoney(otherEarning.amount));

            bodyData.push(earningRow);
          }
        });
      });

      //End insertion of earnings

      //Begin insertion of earnings
      let payDeduction = employeePayslip.deductables;

      let bodyData1 = [
        ['Deductions', 'Amount'],
        ['Tax', `${formatMoney(tax)}`],
        ['Pension', `${formatMoney(pension)}`],
      ];

      //Insert payslip deduction into rows
      payDeduction.forEach((deduction) => {
        let dataRow = [];

        dataRow.push(deduction.name);
        dataRow.push(formatMoney(deduction.amount));

        bodyData1.push(dataRow);

        otherEarnings.forEach((otherEarning) => {
          let earningRow = [];
          if (otherEarning.costType === 'deduction') {
            earningRow.push(otherEarning.name);
            earningRow.push(formatMoney(otherEarning.amount));

            bodyData1.push(earningRow);
          }
        });

        oneOffPayment.forEach((otherEarning) => {
          let earningRow = [];
          if (otherEarning.costType === 'deduction') {
            earningRow.push(otherEarning.name);
            earningRow.push(formatMoney(otherEarning.amount));

            bodyData1.push(earningRow);
          }
        });
      });

      //End insertion of deductions

      //Write payslip data to pdf
      const docDefinition = {
        content: [
          { text: ' ' },
          {
            text: `${employeePayslip.name} payslip`,
            style: 'header',
            alignment: 'center',
          },
          { text: ' ' },
          { text: ' ' },
          { text: ' ' },
          {
            style: 'tableExample',
            table: {
              widths: [268, 250],
              heights: 50,
              alignment: 'center',
              body: [
                [
                  `Employee Name:  ${employeePayslip.name}`,
                  `Tax year:    ${date.getFullYear()}`,
                ],
                [
                  `Emplyee Tag: 	${employeePayslip.tag}`,
                  `Pay period:   ${date.toLocaleString('en-us', {
                    month: 'long',
                  })}`,
                ],
                [
                  `Designation:  ${employeePayslip.designation}`,
                  `Department:   ${employeePayslip.department}`,
                ],
                [
                  {
                    table: {
                      widths: [133, 117],
                      alignment: 'center',
                      body: bodyData,
                    },
                    layout: {
                      fillColor: function (
                        rowIndex,
                        node,
                        columnIndex
                      ) {
                        return rowIndex % 2 === 0 ? '#CCCCCC' : null;
                      },
                    },
                  },
                  {
                    table: {
                      widths: [125, 106],
                      alignment: 'center',
                      body: bodyData1,
                    },
                    layout: {
                      fillColor: function (
                        rowIndex,
                        node,
                        columnIndex
                      ) {
                        return rowIndex % 2 === 0 ? '#CCCCCC' : null;
                      },
                    },
                  },
                ],
                [
                  `Gross Earnings:            ${formatMoney(gross)}`,
                  '',
                ],
                [
                  `Total Deduction:            ${formatMoney(
                    deductions
                  )}`,
                  '',
                ],
                [`Net Pay:            ${formatMoney(net)}`, ''],
              ],
            },
          },
        ],
      };

      generatePdf(docDefinition, (response) => {
        const htmlData = emailTemplate(employeePayslip);

        const mailData = {
          from: 'Monthlypayslip@payeroll.app',
          to: `${employeePayslip.email}`,
          subject: 'Monthly Payslip',
          html: htmlData,
          attachments: [
            {
              content: response,
              filename: 'payslip.pdf',
              type: 'application/pdf',
            },
          ],
        };

        mailer
          .send(mailData)
          .then(() =>
            res.json({ message: 'Payslip successfully sent!' })
          )
          .catch((err) =>
            res
              .status(400)
              .json({ message: 'Error sending employee payslip' })
          );
      });
    })
    .catch((err) =>
      res.status(404).json({ message: 'Error fetching payslip' })
    );
});

//@route  GET api/payslip/record/allmothlyslip
//@desc Get all Employees monthly payslip route
//@access Private
router.get('/record/allmonthlyslip', protect, (req, res) => {
  let basicSum = 0,
    grossSum = 0,
    consolidationReliefSum = 0,
    pensionSum = 0,
    taxableIncomeSum = 0,
    taxSum = 0,
    netSum = 0;

  Payslip.find({ is_delete: 0 })
    .where('presentMonth')
    .equals(presentMonth)
    .where('presentYear')
    .equals(presentYear)
    .then((payslip) => {
      payslip.forEach((payslipItem) => {
        basicSum += payslipItem.basic;
        grossSum += payslipItem.grossEarning;
        consolidationReliefSum += payslipItem.consolidationRelief;
        pensionSum += payslipItem.pension;
        taxableIncomeSum += payslipItem.taxableIncome;
        taxSum += payslipItem.tax;
        netSum += payslipItem.netPay;
      });

      const payrollDetails = {
        basicSum,
        grossSum,
        consolidationReliefSum,
        pensionSum,
        taxableIncomeSum,
        taxSum,
        netSum,
        payslip,
      };

      res.json(payrollDetails);
    })
    .catch((err) => console.log(err));
});

//@route  GET api/payslip/record/employeeallslip/:id
//@desc Get single Employee all yearly payslip route
//@access Private
router.get('/record/employeeallslip/:id', protect, (req, res) => {
  const errors = {};

  Payslip.find({ employee: req.params.id }, { is_delete: 0 })
    .where('presentYear')
    .equals(presentYear)
    .then((payslip) => {
      if (!payslip) {
        errors.employee = 'Please select an employee';
        return res.status(400).json(errors);
      }
      res.json(payslip);
    })
    .catch((err) => console.log(error));
});

//@route  GET api/payslip/record/allyear
//@desc Get all Employees yearly payslips route
//@access Private
router.get('/record/allyear', protect, (req, res) => {
  const errors = {};

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(presentYear)
    .sort({ name: 1 })
    .then((payslips) => {
      if (!payslips) {
        errors.payslips = 'Payslips not found';
        return res.status(404).json(errors);
      }
      res.json(payslips);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/singlemonthlyslip
//@desc Get Employee payslip monthly record route
//@access Private
router.post('/record/singlemonthlyslip', protect, (req, res) => {
  const { errors, isValid } = monthlyRecord(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.findOne({ employee: req.body.employee }, { is_delete: 0 })
    .where('presentMonth')
    .equals(req.body.month)
    .then((monthlySlip) => {
      if (!monthlySlip) {
        errors.monthlyslip =
          "Payslip not found or hasn't been generated";
        return res.status(404).json(errors);
      }
      res.json(monthlySlip);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/byemployeemonthyear
//@desc Get an employee payslip record by month and year route
//@access Private
router.post('/record/byemployeemonthyear', protect, (req, res) => {
  const { errors, isValid } = employeeMonthYear(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.findOne({ employee: req.body.employee }, { is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .where('presentMonth')
    .equals(req.body.month)
    .then((payslipItem) => {
      if (!payslipItem) {
        errors.payslip = "Payslip not found or hasn't been generated";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/bymonthyear
//@desc Get all employee payslip record by month and year route
//@access Private
router.post('/record/bymonthyear', protect, (req, res) => {
  const { errors, isValid } = monthYear(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .where('presentMonth')
    .equals(req.body.month)
    .then((payslipItem) => {
      if (!payslipItem) {
        errors.payslips =
          "Payslips not found or hasn't been generated";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/bymonthyear
//@desc Get all employee payslip record by year route
//@access Private
router.post('/record/byyear', protect, (req, res) => {
  const errors = {};

  if (
    req.body.year === undefined ||
    req.body.year === null ||
    req.body.year === ''
  ) {
    errors.year = 'Year field is required';
    return res.status(400).json(errors);
  }

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .then((payslipItem) => {
      if (!payslipItem || Object.keys(payslipItem).length === 0) {
        errors.payslips =
          "Payslips not found or hasn't been generated";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

const generatePdf = (
  docDefinition,
  successCallback,
  errorCallback
) => {
  try {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Regular.ttf'
        ),
        bold: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Medium.ttf'
        ),
        italics: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Italic.ttf'
        ),
        bolditalics: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-MediumItalic.ttf'
        ),
      },
    };

    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];
    let result;

    doc.on('data', function (chunk) {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      result = Buffer.concat(chunks);
      successCallback(result.toString('base64'));
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};

const taxCalculation = (annualTaxableIncome) => {
  let annualTaxMap = new Map([
    [1, 300000], //@7%
    [2, 300000], //@11%
    [3, 500000], //@15%
    [4, 500000], //@19%
    [5, 1600000], //@21%
    [6, 3200000], //@24%
  ]);

  let taxRateMap = new Map([
    [1, 0.07], //@7%
    [2, 0.11], //@11%
    [3, 0.15], //@15%
    [4, 0.19], //@19%
    [5, 0.21], //@21%
    [6, 0.24], //@24%
  ]);

  let totalTax = 0.0,
    annualTaxValue;

  if (annualTaxableIncome <= 300000) {
    annualTaxValue =
      annualTaxableIncome * taxRateMap.get(1).toFixed(2);
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
    if (lastAnnualIndex !== 6) {
      ++lastAnnualIndex;
    }
    let tax = taxRateMap.get(lastAnnualIndex) * annualTaxableIncome;

    totalTax += tax;

    return totalTax;
  }
};

module.exports = router;
