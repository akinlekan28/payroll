import React from "react";

const AdminCard = ({ dashboard }) => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
    <div className="card card-statistic-1">
      <div className="card-icon bg-primary">
        <i className="far fa-user" />
      </div>
      <div className="card-wrap">
        <div className="card-header">
          <h4>Active Admins</h4>
        </div>
        <div className="card-body">{dashboard.adminCount}</div>
      </div>
    </div>
  </div>
);

export default AdminCard;
