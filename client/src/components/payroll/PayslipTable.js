import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PayslipTable extends PureComponent {
  render() {
    const { payroll } = this.props;

    let extraEarning = [];
    let extraDeduction = [];

    payroll.individualcost.forEach((individualcostItem) => {
      if (individualcostItem.costType === 'income') {
        extraEarning.push(individualcostItem);
      } else {
        extraDeduction.push(individualcostItem);
      }
    });

    payroll.oneOffPaymentArray.forEach((oneOff) => {
      if (oneOff.costType === 'income') {
        extraEarning.push(oneOff);
      } else {
        extraDeduction.push(oneOff);
      }
    });

    const formatMoney = (money) => {
      let formatedValue = money
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      return formatedValue;
    };

    const date = new Date();

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <table className="table table-striped" border="2">
              <tbody>
                <tr>
                  <td colSpan="2" className="text-center">
                    <strong>PaySlip</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Employee Name:{' '}
                    <strong className="ml-2">
                      {payroll.employeeDetails.name}
                    </strong>
                  </td>
                  <td>
                    Tax Year:{' '}
                    <strong className="ml-5">
                      {date.getFullYear()}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Employee Tag:{' '}
                    <strong className="ml-5">
                      {payroll.employeeDetails.tag}
                    </strong>
                  </td>
                  <td>
                    Pay Period:{' '}
                    <strong className="ml-5">
                      {date.toLocaleString('en-us', {
                        month: 'long',
                      })}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Designation:{' '}
                    <strong className="ml-5">
                      {payroll.employeeDetails.designation}
                    </strong>
                  </td>
                  <td>
                    Department:{' '}
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
                              <span>₦</span>{' '}
                              {formatMoney(payroll.basic)}
                            </strong>
                          </td>
                        </tr>
                        {payroll.level.bonuses.map((bonus) => (
                          <tr key={bonus._id}>
                            <td>
                              <strong>{bonus.name}</strong>
                            </td>
                            <td>
                              <strong>
                                <span>₦</span>{' '}
                                {formatMoney(bonus.amount)}
                              </strong>
                            </td>
                          </tr>
                        ))}
                        {extraEarning.map((extraEarningItem) => (
                          <tr key={extraEarningItem._id}>
                            <td>
                              <strong>{extraEarningItem.name}</strong>
                            </td>
                            <td>
                              <strong>
                                <span>₦</span>{' '}
                                {formatMoney(extraEarningItem.amount)}
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
                              <span>₦</span>{' '}
                              {formatMoney(payroll.tax)}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Pension</strong>
                          </td>
                          <td className="text-danger">
                            <strong>
                              <span>₦</span>{' '}
                              {formatMoney(payroll.pension)}
                            </strong>
                          </td>
                        </tr>
                        {payroll.level.deductables.map(
                          (deductable) => (
                            <tr key={deductable._id}>
                              <td>
                                <strong>{deductable.name}</strong>
                              </td>
                              <td>
                                <strong className="text-danger">
                                  <span>₦</span>{' '}
                                  {formatMoney(deductable.amount)}
                                </strong>
                              </td>
                            </tr>
                          )
                        )}
                        {extraDeduction.map((extraDeductionItem) => (
                          <tr key={extraDeductionItem._id}>
                            <td>
                              <strong>
                                {extraDeductionItem.name}
                              </strong>
                            </td>
                            <td>
                              <strong className="text-danger">
                                <span>₦</span>{' '}
                                {formatMoney(
                                  extraDeductionItem.amount
                                )}
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
                      <thead>
                        <tr>
                          <th colSpan="2" className="text-center">
                            Amount Paid
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Gross Earnings</strong>
                          </td>
                          <td>
                            <strong>
                              <span>₦</span>{' '}
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
                              <span>₦</span>{' '}
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
                              <span>₦</span>{' '}
                              {formatMoney(payroll.netPay)}
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

PayslipTable.propTypes = {
  payroll: PropTypes.object.isRequired,
};

export default PayslipTable;
