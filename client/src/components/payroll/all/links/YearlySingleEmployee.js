import React from "react";
import { Link } from "react-router-dom";

const YearlySingleEmployee = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/yearly" className="btn btn-lg btn-primary">
        Single employee Records
      </Link>
    </div>
  </div>
);

export default YearlySingleEmployee;
