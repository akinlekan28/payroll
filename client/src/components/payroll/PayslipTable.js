import React, { Component } from "react";

class PayslipTable extends Component {
  render() {
    const { payroll } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <table className="table table-striped" border="2">
              <tr>
                <td colspan="2" className="text-center">
                  <strong>PaySlip</strong>
                </td>
              </tr>
              <tr>
                <td>
                  Employee Name:{" "}
                  <strong className="ml-5">
                    {payroll.employeeDetails.name}
                  </strong>
                </td>
                <td>Tax Year: 2018</td>
              </tr>
              <tr>
                <td>
                  Employee Tag:{" "}
                  <strong className="ml-5">
                    {payroll.employeeDetails.tag}
                  </strong>
                </td>
                <td>Pay Period: 27-12-2018</td>
              </tr>
              <tr>
                <td>
                  Designation:{" "}
                  <strong className="ml-5">
                    {payroll.employeeDetails.designation}
                  </strong>
                </td>
                <td>
                  Department:{" "}
                  <strong className="ml-5">
                    {payroll.employeeDetails.department}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th>Earnings</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>
                          <strong>Basic pay</strong>
                        </td>
                        <td>
                          <strong>
                            <span>&#8358;</span> {formatMoney(payroll.basic)}
                          </strong>
                        </td>
                      </tr>
                      {payroll.level.bonuses.map(bonus => (
                        <tr key={bonus._id}>
                          <td>
                            <strong>{bonus.name}</strong>
                          </td>
                          <td>
                            <strong>
                              <span>&#8358;</span> {formatMoney(bonus.amount)}
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="table table-hover">
                    <thead />
                    <tbody>
                      <tr>
                        <th>Deductions</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tax</strong>
                        </td>
                        <td className="text-danger">
                          <strong>
                            <span>&#8358;</span> {formatMoney(payroll.tax)}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Pension</strong>
                        </td>
                        <td className="text-danger">
                          <strong>
                            <span>&#8358;</span> {formatMoney(payroll.pension)}
                          </strong>
                        </td>
                      </tr>
                      {payroll.level.deductables.map(deductable => (
                        <tr key={deductable._id}>
                          <td>
                            <strong>{deductable.name}</strong>
                          </td>
                          <td>
                            <strong className="text-danger">
                              <span>&#8358;</span>{" "}
                              {formatMoney(deductable.amount)}
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table className="table table-hover">
                    <thead>Amount Paid</thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Gross Earnings</strong>
                        </td>
                        <td>
                          <strong>
                            <span>&#8358;</span>{" "}
                            {formatMoney(payroll.grossEarning)}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total Deductions</strong>
                        </td>
                        <td>
                          <strong className="text-danger">
                            <span>&#8358;</span>{" "}
                            {formatMoney(payroll.totalDeductable)}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Net Pay</strong>
                        </td>
                        <td>
                          <strong>
                            <span>&#8358;</span> {formatMoney(payroll.netPay)}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="table table-hover">
                    <tbody>
                      <tr />
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PayslipTable;