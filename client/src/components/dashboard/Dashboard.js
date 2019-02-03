import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAnalytics, getNet } from "../../actions/dashActions";
import Spinner from "../common/Spinner";
import EmployeeRow from "./EmployeeRow";
import EmployeeCard from "./EmployeeCard";
import LevelCard from "./LevelCard";
import ExceptionCard from "./ExceptionCard";
import DeletedEmployeeCard from "./DeletedEmployeeCard";
import Netpay from "./Netpay";
import OtherPays from "./OtherPays";
import SalaryPay from "./SalaryPay";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnalytics();
    this.props.getNet();
  }

  render() {
    const { dashboard, net, loading } = this.props.dashboard;

    let dashboardContent;

    if (dashboard === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(dashboard).length > 0 && Object.keys(net).length > 0) {
        dashboardContent = (
          <React.Fragment>
            <div className="row">
              <EmployeeCard dashboard={dashboard} />
              <LevelCard dashboard={dashboard} />
              <ExceptionCard dashboard={dashboard} />
              <DeletedEmployeeCard dashboard={dashboard} />
            </div>
            <h4 className="text-center mb-3">Monthly Analysis</h4>
            <div className="row">
              <Netpay net={net} />
            </div>
            <h4 className="text-center mb-3">Yearly Analysis</h4>
            <div className="row">
              <SalaryPay
                net={net.netPay}
                cra={net.totalCra}
                bonus={net.totalBonus}
              />
              <OtherPays
                tax={net.totalTax}
                pension={net.totalPension}
                deduction={net.totalDeduction}
              />
            </div>
            <EmployeeRow employeeDetails={dashboard.employee} />
          </React.Fragment>
        );
      } else {
        dashboardContent = <h4>No employees in system...</h4>;
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
                <h1>Dashboard</h1>
              </div>
              {dashboardContent}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getAnalytics: PropTypes.func.isRequired,
  getNet: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { getAnalytics, getNet }
)(Dashboard);
