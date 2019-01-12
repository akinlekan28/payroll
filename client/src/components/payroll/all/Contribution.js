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
    
    return (
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
                  {/* {payrollContainer} */}
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
