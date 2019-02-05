import React from "react";
import { Link } from "react-router-dom";

const YearlyAllEmployee = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/allyearly" className="btn btn-lg btn-primary">
        All employee Records
      </Link>
    </div>
  </div>
);

export default YearlyAllEmployee;
