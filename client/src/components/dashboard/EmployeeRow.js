import React, { Component } from 'react'

class EmployeeRow extends Component {

  render() {
      
      const employees = this.props.employeeDetails.map(employee => (
        <tr key={employee._id}>
            <td>{employee.tag}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.designation}</td>
            <td>{employee.department}</td>
        </tr>
      ))

    return (

        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                      <h4>Last Five Entry of Employees</h4>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Tag</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Designation</th>
                              <th>Department</th>
                            </tr>
                          </thead>
                          <tbody>
                              {employees}
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default EmployeeRow
