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
            id="profile-tab4"
            data-toggle="tab"
            href="#profile4"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            View levels
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab4"
            data-toggle="tab"
            href="#contact4"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Add bonus
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab4"
            data-toggle="tab"
            href="#contact4"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            View bonuses
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab4"
            data-toggle="tab"
            href="#contact4"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Add Deductable
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab4"
            data-toggle="tab"
            href="#contact4"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            View Deductables
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LevelTab;
