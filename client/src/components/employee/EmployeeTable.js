import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEmployee } from "../../actions/employeeActions";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import TextFieldGroup from '../common/TextFieldGroup';

class EmployeeTable extends Component {

  state = {
    search: ''
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase();
      document.querySelectorAll("#search-item").forEach(payslipRow => {
        const item = payslipRow.firstChild.textContent;
        const name = payslipRow.childNodes[1].textContent;
        if (item.toLowerCase().indexOf(text) !== -1 || name.toLowerCase().indexOf(text) !== -1) {
          payslipRow.style.display = "table-row";
        } else {
          payslipRow.style.display = "none";
        }
      });
    });
  }

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
                if (res.type === "DELETE_EMPLOYEE") {
                  toast.success("Employee record deleted!");
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
    const { employees, auth } = this.props;

    let employeeDetails = employees.map(employee => (
      <tr key={employee._id} id="search-item">
        <td>{employee.tag}</td>
        <td>{employee.name}</td>
        <td>{employee.levelName}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/employee/view/${employee._id}`}
            className="btn btn-info btn-sm"
          >
            View
          </Link>{" "}
          <Link
            to={`/employee/edit/${employee._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{" "}
          {auth.user.is_admin === 0 ? null : (<button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, employee._id)}
          >
            Delete
          </button>)}
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-12">
        <p>Delete button for employee is diabled for demo purposes</p>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Basic employee details</h4>
            </div>
            <div className="live-search ml-4">
            <TextFieldGroup
                  type="text"
                  name="search"
                  label="Search payslip"
                  placeholder="Employee tag or name"
                  value={this.state.search}
                  onChange={this.onChange.bind(this)}
                  tabindex="1"
                  className="live-search"
                />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-stripped" id="table-1">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Name</th>
                      <th>Level</th>
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
  deleteEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteEmployee }
)(EmployeeTable);
