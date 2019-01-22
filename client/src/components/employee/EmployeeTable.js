import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEmployee } from "../../actions/employeeActions";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

class EmployeeTable extends Component {
  deleteDialog(id) {
    confirmAlert({
      title: "Delete employee record ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes Delete employee!",
          onClick: () => {
            this.props
              .deleteEmployee(id)
              .then(res => {
                if (res.type === "DELETE_EMPLOYEE"){
                  toast.success("Employee record deleted!")
                }
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: "No cancel delete!",
          onClick: () => {}
        }
      ]
    });
  }

  render() {
    const { employees } = this.props;

    let employeeDetails = employees.map(employee => (
      <tr key={employee._id}>
        <td>{employee.tag}</td>
        <td>{employee.name}</td>
        <td>{employee.levelName}</td>
        <td>{employee.email}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/employee/edit/${employee._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{" "}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, employee._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Employee details</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-stripped" id="table-1">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Name</th>
                      <th>Level</th>
                      <th>Email</th>
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

EmployeeTable.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
};


export default connect(
  null,
  { deleteEmployee }
)(EmployeeTable);
