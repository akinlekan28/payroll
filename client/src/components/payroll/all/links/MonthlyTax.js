import React from "react";
import { Link } from "react-router-dom";

const MonthlyTax = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/tax" className="btn btn-lg btn-primary">
        Employees Tax
      </Link>
    </div>
  </div>
);

export default MonthlyTax;
