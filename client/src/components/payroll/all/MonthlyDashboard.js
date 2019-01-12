import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom';
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';
import Footer from '../../dashboard/Footer';

class MonthlyDashboard extends PureComponent {
  render() {

    let date = new Date();
    const presentMonth = date.toLocaleString("en-us", { month: "long" });

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
              <div className="col-12 mt-5">
                <div className="card">
                  <div className="card-body">
                    <Link to="/payroll/all/withpension" className="btn btn-lg btn-primary">Payroll with pension</Link>
                    <Link to="/payroll/all/pension" className="btn btn-lg btn-primary ml-5">Employees pension</Link>
                  </div>
                </div>
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
