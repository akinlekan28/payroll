import React, { Component } from "react";
import { Link } from "react-router-dom";

class MonthlySalaryTable extends Component {
  render() {
    const { employees } = this.props;

    let employeeDetails = employees.map(employee => (
      <tr key={employee._id}>
        <td>{employee.tag}</td>
        <td>{employee.name}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/payroll/monthly/viewslip/${employee._id}`}
            className="btn btn-success btn-sm"
          >
            View 
          </Link>
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">View to generate/export individual employee payslip</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-stripped" id="table-1">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{employeeDetails}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlySalaryTable;
