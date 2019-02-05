import React from "react";

const OneoffCard = ({ dashboard }) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
    <div className="card card-statistic-1">
      <div className="card-icon bg-lt-one">
        <i className="fas fa-bullseye" />
      </div>
      <div className="card-wrap">
        <div className="card-header">
          <h4>One-off Payments</h4>
        </div>
        <div className="card-body">{dashboard.oneOff}</div>
      </div>
    </div>
  </div>
);

export default OneoffCard;
