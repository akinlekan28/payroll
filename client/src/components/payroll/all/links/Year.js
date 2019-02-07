import React from "react";
import { Link } from "react-router-dom";

const Year = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/year" className="btn btn-lg btn-primary">
        Yearly Employee Records
      </Link>
    </div>
  </div>
);

export default Year;
