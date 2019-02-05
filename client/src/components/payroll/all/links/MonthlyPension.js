import React from "react";
import { Link } from "react-router-dom";

const MonthlyPension = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/pension" className="btn btn-lg btn-primary">
        Employees pension
      </Link>
    </div>
  </div>
);

export default MonthlyPension;
