import React from "react";

const PayslipCard = ({ dashboard }) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
    <div className="card card-statistic-1">
      <div className="card-icon bg-lt-b">
        <i className="fas fa-box-open" />
      </div>
      <div className="card-wrap">
        <div className="card-header">
          <h4>Monthly Generated Payslip</h4>
        </div>
        <div className="card-body">{dashboard.payslipCount}</div>
      </div>
    </div>
  </div>
);

export default PayslipCard;
