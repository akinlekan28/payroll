import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAnalytics } from "../../actions/dashActions";
import Spinner from "../common/Spinner";
import EmployeeRow from "./EmployeeRow";
import AdminCard from "./AdminCard";
import EmployeeCard from "./EmployeeCard";
import LevelCard from "./LevelCard";
import ExceptionCard from "./ExceptionCard";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnalytics();
  }

  render() {
    const { dashboard, loading } = this.props.dashboard;

    let dashboardContent;

    if (dashboard === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(dashboard).length > 0) {
        dashboardContent = (
          <React.Fragment>
            <div className="row">
              <AdminCard dashboard={dashboard} />
              <EmployeeCard dashboard={dashboard} />
              <LevelCard dashboard={dashboard} />
              <ExceptionCard dashboard={dashboard} />
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
  getAnalytics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { getAnalytics }
)(Dashboard);
