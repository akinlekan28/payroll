import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getEmployees } from "../../../../actions/employeeActions";
import { getEmployeeYearlySlip } from "../../../../actions/payrollActions";
import SelectListGroup from "../../../common/SelectListGroup";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import SingleEmployeeTable from "./SingleEmployeeTable";

class SingleEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getEmployees();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .getEmployeeYearlySlip(this.state.employee)
      .then(res => {
        if (
          res.type === "VIEW_PAYROLL_RECORDS" &&
          Object.keys(res.payload).length === 0
        ) {
          toast.warn("Payslip record not found");
        }

        if (res.type === "GET_ERRORS" && typeof res.payload === "string") {
          toast.error("Please select an employee");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let date = new Date();
    const year = date.getFullYear();

    const { employees, loading } = this.props.employees;
    const { payrollRecords } = this.props.payrollRecords;
    let searchContainer, payslipTableContainer;

    if (employees === null || loading) {
      searchContainer = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {
        searchContainer = (
          <div>
            <div className="row">
              <div className="col-md-9">
                <div className="card-body">
                  <form onSubmit={this.onSubmit} className="form-inline">
                    <div className="col-md-4">
                      <SelectListGroup
                        placeholder="Select employee level"
                        name="employee"
                        value={this.state.employee}
                        onChange={this.onChange}
                        options={employees}
                      />
                    </div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-info btn-lg"
                        tabIndex="4"
                      >
                        Get payslips
                      </button>
                    </div>
                    <div className="col-md-2">
                    <Link to="/payroll/all" className="btn btn-lg btn-warning">Back</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

        if (payrollRecords === null || this.props.payrollRecords.loading) {
          payslipTableContainer = <Spinner />;
        } else {
          if (Object.keys(payrollRecords).length > 0) {
            payslipTableContainer = <SingleEmployeeTable payrollRecords={payrollRecords} />;    
          } else {
            payslipTableContainer = "";
          }
        }
      } else {
        searchContainer = <h4>No previous employee entries in the system</h4>;
      }
    }

    return (
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <SideBar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Aggregate payroll report</h1>
              </div>

              <h4 className="text-center mt-4">
                Generated employee payslips for the year {year}
              </h4>
              {searchContainer}
              {payslipTableContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

SingleEmployee.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees,
  payrollRecords: state.payroll
});

export default connect(
  mapStateToProps,
  { getEmployees, getEmployeeYearlySlip }
)(SingleEmployee);
