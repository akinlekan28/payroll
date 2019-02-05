import React from "react";
import { Link } from "react-router-dom";

const YearlyMonthlyslip = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/monthly" className="btn btn-lg btn-primary">
        Monthly employee Records
      </Link>
    </div>
  </div>
);

export default YearlyMonthlyslip;
