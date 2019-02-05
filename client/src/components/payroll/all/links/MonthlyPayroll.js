import React from "react";
import { Link } from "react-router-dom";

const MonthlyPayroll = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/withpension" className="btn btn-lg btn-primary">
        Payroll with pension
      </Link>
    </div>
  </div>
);

export default MonthlyPayroll;
