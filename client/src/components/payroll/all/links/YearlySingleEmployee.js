import React from "react";
import { Link } from "react-router-dom";

const YearlySingleEmployee = () => {
  return (
    <div className="card col-md-4">
      <div className="card-body mx-auto">
        <Link to="/payroll/all/yearly" className="btn btn-lg btn-primary">
          Single employee Record
        </Link>
      </div>
    </div>
  );
};

export default YearlySingleEmployee;
