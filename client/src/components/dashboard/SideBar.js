import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';

class SideBar extends Component {

    onHandleClick(e){
        e.preventDefault();

        this.props.logoutUser();
    }

render() {

    const { auth } = this.props;
   return (
    <div className="main-sidebar">
     <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
            <Link to="/dashboard">Payeroll</Link>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/dashboard">PR</Link>
        </div>
        <ul className="sidebar-menu">

            <li><Link to="/dashboard" className="nav-link" ><i className="fas fa-globe"></i> <span>Dashboard</span></Link></li>

            <li className="menu-header">Employee</li>
            <li><Link to="/employee" className="nav-link"><i className="fas fa-briefcase"></i> <span>Create profile</span></Link></li>
            <li><Link to="/employee/all" className="nav-link"><i className="fas fa-archive"></i> <span>View profiles</span></Link></li>

            <li className="menu-header">Payroll</li>
            <li><Link to="/payroll/monthly" className="nav-link"><i className="fas fa-calendar-alt"></i> <span>Monthly report</span></Link></li>
            <li><Link to="/payroll/all" className="nav-link"><i className="fas fa-paperclip"></i> <span>All report</span></Link></li>

            <li className="menu-header">Utilities</li>
            <li><Link to="/utilities/level" className="nav-link"><i className="fas fa-location-arrow"></i> <span>Employee level</span></Link></li>
            {auth.user.is_admin === 0 ? null : (<li><Link to="/utilities/exception" className="nav-link"><i className="fas fa-sign"></i> <span>Salary Exception</span></Link></li>) }

            <li className="menu-header">Extra</li> 
            <li><Link to="" className="nav-link" onClick={this.onHandleClick.bind(this)}><i className="fas fa-sign-out-alt"></i> <span>Logout</span></Link></li>

        </ul>
     </aside>
     <div className="p-3 mt-4 mb-4 hide-sidebar-mini">
        <Link to="/documentation" className="btn btn-primary btn-lg btn-icon-split btn-block">
              <i className="fas fa-info-circle"></i> <div>Documentation</div>
        </Link>
    </div>
    </div>
  )
}
}

SideBar.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(SideBar);
