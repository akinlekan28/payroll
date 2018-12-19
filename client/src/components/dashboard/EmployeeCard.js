import React, { Component } from 'react'

class EmployeeCard extends Component {
  render() {
      const {dashboard} = this.props;
    return (
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
    )
  }
}

export default EmployeeCard;
