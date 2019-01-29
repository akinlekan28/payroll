import React, { PureComponent } from 'react'
import {connect} from 'react-redux';
import {getMonthly} from '../../../actions/payrollActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';
import Footer from '../../dashboard/Footer';
import Spinner from '../../common/Spinner';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Contribution extends PureComponent {

    componentDidMount = () => {
      this.props.getMonthly()
    }
    
  render() {

    const {payrolls, loading} = this.props.payroll;

    const formatMoney = money => {
        let formatedValue = money
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return formatedValue;
      };
    
    let payrollContainer;

    if(payrolls === null || loading){
      payrollContainer = <Spinner />
  } else {
    if(Object.keys(payrolls).length > 0){

      payrollContainer = (
        <div className="card-body">
        <Link to="/payroll/all" className="btn btn-lg btn-warning mb-4">Back</Link>
            <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-lg btn-primary mb-4 ml-3"
                    table="table-to-xls"
                    filename="payroll_pension"
                    sheet="employee pension"
                    buttonText="Download excel"/>

            <h4 className="text-center mb-5">Employees Pension</h4>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-to-xls">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Pension Contribution</th>
                  </tr>
                </thead>
                <tbody>
                    {payrolls.payslip.map(payrollItem => (
                        <tr key={payrollItem._id}>
                            <td>{payrollItem.name}</td>
                            <td>{payrollItem.designation}</td>
                            <td><span>&#8358;</span>{formatMoney(payrollItem.pension.toFixed(2))}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Total Sum</strong></td>
                        <td><strong>---</strong></td>
                        <td><strong><span>&#8358;</span>{formatMoney(payrolls.pensionSum.toFixed(2))}</strong></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
      )
    }else {
      payrollContainer = <h4>Employee monthly payslips haven't been generated!</h4>
    }
  }
    
    return (
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
                  {payrollContainer}
                </section>
            </div>
            <Footer />
          </div>
        </div>
    )
  }
}

Contribution.propTypes = {
    getMonthly: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    payroll: state.payroll
})

export default connect(mapStateToProps, {getMonthly})(Contribution);
