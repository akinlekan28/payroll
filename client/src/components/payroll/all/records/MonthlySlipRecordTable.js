import React from 'react'
import PropTypes from 'prop-types';

const MonthlySlipRecordTable = ({payroll}) => {

    let extraEarning = [];
    let extraDeduction = [];

    payroll.individualcost.forEach(individualcostItem => {
      if(individualcostItem.costType === 'income'){
        extraEarning.push(individualcostItem)
      } else {
        extraDeduction.push(individualcostItem)
      }
    })

    payroll.oneOffPaymentArray.forEach(oneOff => {

      if(oneOff.costType === 'income'){
        extraEarning.push(oneOff)
      } else {
        extraDeduction.push(oneOff)
      }
    })

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
            <tbody>
            <tr>
            <td colSpan="2" className="text-center">
              <strong>PaySlip</strong>
            </td>
          </tr>
          <tr>
            <td>
              Employee Name:{" "}
              <strong className="ml-2">
                {payroll.name}
              </strong>
            </td>
            <td>Tax Year: <strong className="ml-5">{payroll.presentYear}</strong></td>
          </tr>
          <tr>
            <td>
              Employee Tag:{" "}
              <strong className="ml-5">
                {payroll.tag}
              </strong>
            </td>
            <td>Pay Period: <strong className="ml-5">{payroll.presentMonth}</strong></td>
          </tr>
          <tr>
            <td>
              Designation:{" "}
              <strong className="ml-5">
                {payroll.designation}
              </strong>
            </td>
            <td>
              Department:{" "}
              <strong className="ml-5">
                {payroll.department}
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
                  {payroll.bonuses.map(bonus => (
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
                  {extraEarning.map(extraEarningItem => (
                    <tr key={extraEarningItem._id}>
                      <td>
                        <strong>{extraEarningItem.name}</strong>
                      </td>
                      <td>
                        <strong>
                          <span>&#8358;</span> {formatMoney(extraEarningItem.amount)}
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
                  {payroll.deductables.map(deductable => (
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
                  {extraDeduction.map(extraDeductionItem => (
                    <tr key={extraDeductionItem._id}>
                      <td>
                        <strong>{extraDeductionItem.name}</strong>
                      </td>
                      <td>
                        <strong className="text-danger">
                          <span>&#8358;</span> {formatMoney(extraDeductionItem.amount)}
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
                        <th colSpan="2" className="text-center">Amount Paid</th>
                    </tr>
                </thead>
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
                        {formatMoney(payroll.totalDeductions)}
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
            </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

MonthlySlipRecordTable.propTypes = {
    payroll: PropTypes.object.isRequired
}

export default MonthlySlipRecordTable;
