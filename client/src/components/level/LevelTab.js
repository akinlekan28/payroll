import React from "react";

const LevelTab = () => {
  return (
    <div className="col-12 col-sm-12 col-md-2">
      <ul className="nav nav-pills flex-column" id="myTab4" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="home-tab4"
            data-toggle="tab"
            href="#addlevel"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Add level
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewlevel-tab4"
            data-toggle="tab"
            href="#viewlevel"
            role="tab"
            aria-controls="viewlevel"
            aria-selected="false"
          >
            View levels
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="addbonus-tab4"
            data-toggle="tab"
            href="#addbonus"
            role="tab"
            aria-controls="addbonus"
            aria-selected="false"
          >
            Add bonus
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewbonus-tab4"
            data-toggle="tab"
            href="#viewbonus"
            role="tab"
            aria-controls="viewbonus"
            aria-selected="false"
          >
            View bonuses
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="deductable-tab4"
            data-toggle="tab"
            href="#deductable"
            role="tab"
            aria-controls="deductable"
            aria-selected="false"
          >
            Add Deduction
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewdeductable-tab4"
            data-toggle="tab"
            href="#viewdeductable"
            role="tab"
            aria-controls="viewdeductable"
            aria-selected="false"
          >
            View Deductions
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LevelTab;
