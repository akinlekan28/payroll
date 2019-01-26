import React, { PureComponent } from 'react'

class SingleEmployeeTable extends PureComponent {
  render() {
      const {payrollRecords} = this.props;
      console.log(payrollRecords)
    return (
      <div>
          <div className="row">
            hello
          </div>
      </div>
    )
  }
}

export default SingleEmployeeTable
