import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AllTimeYearTable = ({ payslips }) => {
  const formatMoney = money => {
    let formatedValue = money
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return formatedValue;
  };

  let basicSum = 0;
  let grossSum = 0;
  let cRSum = 0;
  let pensionSum = 0;
  let taxableIncomeSum = 0;
  let taxPayableSum = 0;
  let monthlyNetPaySum = 0;

  payslips.forEach(payslipItem => {
    basicSum += payslipItem.basic;
    grossSum += payslipItem.grossEarning;
    cRSum += payslipItem.consolidationRelief;
    pensionSum += payslipItem.pension;
    taxableIncomeSum += payslipItem.taxableIncome;
    taxPayableSum += payslipItem.tax;
    monthlyNetPaySum += payslipItem.netPay;
  });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="live-search">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-lg btn-primary mt-4 mb-4"
                table="table-to-xls"
                filename={"All_employee_yearly_" + payslips[0].presentYear}
                sheet="Payroll with pension"
                buttonText="Download excel"
              />
            </div>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-to-xls">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Month</th>
                    <th>Basic Salary</th>
                    <th>Gross</th>
                    <th>Consolidation Relief</th>
                    <th>Pension</th>
                    <th>Taxable income</th>
                    <th>Tax payable</th>
                    <th>Monthly NetPay</th>
                  </tr>
                </thead>
                <tbody>
                  {payslips.map(payslip => (
                    <tr key={payslip._id}>
                      <td>{payslip.name}</td>
                      <td>{payslip.presentMonth}</td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.basic)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.grossEarning)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.consolidationRelief)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.pension)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.taxableIncome)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.tax)}
                      </td>
                      <td>
                        <span>&#8358;</span>
                        {formatMoney(payslip.netPay)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>Total Sum</strong>
                    </td>
                    <td>
                      <strong>--</strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(basicSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(grossSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(cRSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(pensionSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(taxableIncomeSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(taxPayableSum)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        <span>&#8358;</span>
                        {formatMoney(monthlyNetPaySum)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimeYearTable;
