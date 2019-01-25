import React, { PureComponent } from 'react'
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';
import Footer from '../../dashboard/Footer';
import MonthlyPayroll from './links/MonthlyPayroll';
import MonthlyPension from './links/MonthlyPension';
import MonthlyTax from './links/MonthlyTax';
import YearlySingleEmployee from './links/YearlySingleEmployee';

class MonthlyDashboard extends PureComponent {
  render() {

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
                <h1>Aggregate payroll report</h1>
              </div>
              <h4 className="text-center">Payroll Report for the month of {presentMonth}</h4>  
                <div className="row mt-5">
                  <MonthlyPayroll />
                  <MonthlyPension />
                  <MonthlyTax />
                </div>

              <h4 className="text-center mt-4">Payroll Report for the year {year}</h4> 
                <div className="row mt-5">
                  <YearlySingleEmployee />
                </div>

            </section>
          </div>
          <Footer />
        </div>
      </div>
      </div>
    )
  }
}

export default MonthlyDashboard;
