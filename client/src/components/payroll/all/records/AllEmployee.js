import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllYearlyPayslip } from "../../../../actions/payrollActions";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";
import AllEmployeeTable from "./AllEmployeeTable";

class AllEmployee extends Component {
  componentDidMount = () => {
    this.props.getAllYearlyPayslip();
  };

  render() {
    let date = new Date();
    const year = date.getFullYear();

    const { payrollRecordsYearly, loading } = this.props.payrollRecordsYearly;
    let AllEmployeeSlipContainer;

    if (payrollRecordsYearly === null || loading) {
      AllEmployeeSlipContainer = <Spinner />;
    } else {
      if (Object.keys(payrollRecordsYearly).length > 0) {
        AllEmployeeSlipContainer = (
          <AllEmployeeTable payroll={payrollRecordsYearly} />
        );
      } else {
        AllEmployeeSlipContainer = (
          <h4 className="text-center mt-5">No previously generated payslips</h4>
        );
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
                <h1>Payroll report</h1>
              </div>

              <h4 className="text-center mt-4">
                All employee payslips generated for the year {year}
              </h4>
              {AllEmployeeSlipContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

AllEmployee.propTypes = {
  getAllYearlyPayslip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  payrollRecordsYearly: state.payroll
});

export default connect(
  mapStateToProps,
  { getAllYearlyPayslip }
)(AllEmployee);
