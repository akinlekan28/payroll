import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import { getPayroll } from "../../actions/payrollActions";
import PayslipTable from "./PayslipTable";
import { toast } from "react-toastify";

class MonthlySlip extends Component {
  componentDidMount = () => {
    this.props
      .getPayroll(this.props.match.params.id)
      .then(res => {
        if (res.type === "GET_ERRORS") {
          toast.error(res.payload.message);
          setTimeout(function() {
            window.location.href = "/payroll/monthly";
          }, 5000);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { payroll, loading } = this.props.payroll;

    let payslipTable;

    if (payroll === null || loading) {
      payslipTable = <Spinner />;
    } else {
      if (Object.keys(payroll).length > 0) {
        payslipTable = <PayslipTable payroll={payroll} />;
      } else {
        payslipTable = <h4>No previous employee entries!</h4>;
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
                <h1>Employee monthly payslip</h1>
              </div>
              {payslipTable}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

MonthlySlip.propTypes = {
  getPayroll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  payroll: state.payroll
});

export default connect(
  mapStateToProps,
  { getPayroll }
)(MonthlySlip);
