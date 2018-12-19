import React, { Component } from "react";

class AdminCard extends Component {
  render() {
    const { dashboard } = this.props;
    return (
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
    );
  }
}

export default AdminCard;