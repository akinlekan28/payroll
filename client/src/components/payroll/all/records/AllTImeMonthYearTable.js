import React, { Component } from 'react'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import TextFieldGroup from "../../../common/TextFieldGroup";

export class AllTimeMonthYearTable extends Component {

  constructor() {
    super();

    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase();
      document.querySelectorAll("#search-item").forEach(payslipRow => {
        const item = payslipRow.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1 ) {
          payslipRow.style.display = "table-row";
        } else {
          payslipRow.style.display = "none";
        }
      });
    });
  }

  render() {

    const {payroll} = this.props;

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
  
    payroll.forEach(payslipItem => {
      basicSum += payslipItem.basic;
      grossSum += payslipItem.grossEarning;
      cRSum += payslipItem.consolidationRelief;
      pensionSum += payslipItem.pension;
      taxableIncomeSum += payslipItem.taxableIncome;
      taxPayableSum += payslipItem.tax;
      monthlyNetPaySum += payslipItem.netPay;
    });
  
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="live-search ml-4">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-lg btn-primary mt-4 mb-4"
                    table="table-to-xls"
                    filename={"All_employee_yearly_"+payroll[0].presentYear}
                    sheet="Payroll with pension"
                    buttonText="Download excel"
                  />
                  <TextFieldGroup
                    type="text"
                    name="search"
                    label="Search payslip"
                    placeholder="Employee name"
                    value={this.state.search}
                    onChange={this.onChange}
                    tabindex="1"
                    className="live-search"
                  />
                </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-stripped" id="table-to-xls">
                    <thead>
                      <tr>
                        <th>Name</th>
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
                      {payroll.map(payslip => (
                        <tr key={payslip._id} id="search-item">
                          <td>{payslip.name}</td>
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
      </div>
    );
  }
}

export default AllTimeMonthYearTable
