import React from "react";
import SearchBar from "../../dashboard/SearchBar";
import SideBar from "../../dashboard/SideBar";
import Footer from "../../dashboard/Footer";
import MonthlyPayroll from "./links/MonthlyPayroll";
import MonthlyPension from "./links/MonthlyPension";
import MonthlyTax from "./links/MonthlyTax";
import YearlySingleEmployee from "./links/YearlySingleEmployee";
import YearlyAllEmployee from "./links/YearlyAllEmployee";
import YearlyMonthlyslip from "./links/YearlyMonthlyslip";
import EmployeeMonthYear from "./links/EmployeeMonthYear";
import MonthYear from "./links/MonthYear";
import Year from "./links/Year";

const MonthlyDashboard = () => {
  let date = new Date();
  const presentMonth = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();

  return (
    <div>
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <SideBar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Payroll report</h1>
              </div>
              <h4 className="text-center">
                Payroll Report for the month of {presentMonth}
              </h4>
              <div className="row mt-3">
                <MonthlyPayroll />
                <MonthlyPension />
                <MonthlyTax />
              </div>

              <h4 className="text-center mt-3">
                Payroll Report for the year {year}
              </h4>
              <div className="row mt-4">
                <YearlyMonthlyslip />
                <YearlySingleEmployee />
                <YearlyAllEmployee />
              </div>

              <h4 className="text-center mt-3">
                All Time Payroll Report
              </h4>
              <div className="row mt-4">
                <EmployeeMonthYear />
                <MonthYear />
                <Year />
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MonthlyDashboard;
