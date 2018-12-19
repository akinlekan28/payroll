import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAnalytics } from "../../actions/dashActions";
import EmployeeRow from './EmployeeRow';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnalytics();
  }

  render() {
    const { dashboard, loading } = this.props.dashboard;

    let EmployeeContainer;

    if(dashboard === undefined || loading){
      EmployeeContainer = <h4>Loading employees...</h4>
    } else {
      if(Object.keys(dashboard).length > 0){
        EmployeeContainer = <EmployeeRow employeeDetails={dashboard.employee} />
      } else {
        EmployeeContainer = <h4>No employees in system...</h4>
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

              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="card card-statistic-1">
                    <div className="card-icon bg-primary">
                      <i className="far fa-user" />
                    </div>
                    <div className="card-wrap">
                      <div className="card-header">
                        <h4>Admins</h4>
                      </div>
                      <div className="card-body">{dashboard.adminCount}</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="card card-statistic-1">
                    <div className="card-icon bg-danger">
                      <i className="fas fa-briefcase" />
                    </div>
                    <div className="card-wrap">
                      <div className="card-header">
                        <h4>Employees</h4>
                      </div>
                      <div className="card-body">{dashboard.employeeCount}</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="card card-statistic-1">
                    <div className="card-icon bg-warning">
                      <i className="fas fa-tachometer-alt" />
                    </div>
                    <div className="card-wrap">
                      <div className="card-header">
                        <h4>Employee Levels</h4>
                      </div>
                      <div className="card-body">{dashboard.levelCount}</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="card card-statistic-1">
                    <div className="card-icon bg-success">
                      <i className="fas fa-lightbulb" />
                    </div>
                    <div className="card-wrap">
                      <div className="card-header">
                        <h4>Salary Exceptions</h4>
                      </div>
                      <div className="card-body">
                        {dashboard.exceptionCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {EmployeeContainer}
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
