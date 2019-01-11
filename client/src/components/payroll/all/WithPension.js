import React, { PureComponent } from 'react'
import {connect} from 'react-redux';
import {getMonthly} from '../../../actions/payrollActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';
import Footer from '../../dashboard/Footer';

class WithPension extends PureComponent {

    componentDidMount = () => {
      this.props.getMonthly();
    }
    
  render() {
    const {payroll} = this.props.payroll
    console.log(payroll)
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
              Hello
            </section>
          </div>
          <Footer />
        </div>
      </div>
      </div>
    )
  }
}

WithPension.propTypes = {
    getMonthly: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    payroll: state.payroll
})

export default connect(mapStateToProps, {getMonthly})(WithPension);
