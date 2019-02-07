import React from "react";
import { Link } from "react-router-dom";

const MonthYear = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link to="/payroll/all/monthyear" className="btn btn-lg btn-primary">
        Monthly/Yearly Employee Records
      </Link>
    </div>
  </div>
);

export default MonthYear;
