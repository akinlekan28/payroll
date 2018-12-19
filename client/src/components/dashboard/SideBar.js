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
  return (
    <div className="main-sidebar">
     <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
            <Link to="/dashboard">Payroller</Link>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/dashboard">PR</Link>
        </div>
        <ul className="sidebar-menu">
            <li className="menu-header">Employee</li>
            <li className="dropdown">
                <a href="" className="nav-link has-dropdown">
                <i className="fas fa-briefcase"></i><span>Employee</span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to="/employee/create" className="nav-link">Create profile</Link></li>
                    <li><Link to="/employee/view" className="nav-link">View profiles</Link></li>
                </ul>
            </li>

            <li className="menu-header">Payroll</li>
            <li className="dropdown">
                <a href="" className="nav-link has-dropdown">
                <i className="fas fa-paperclip"></i><span>Payroll</span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to="/payroll/monthly" className="nav-link">Monthly report</Link></li>
                    <li><Link to="/payroll/all" className="nav-link">All report</Link></li>
                </ul>
            </li>

            <li className="menu-header">Utilities</li>
            <li className="dropdown">
                <a href="" className="nav-link has-dropdown">
                <i className="fas fa-cogs"></i><span>Utilities</span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to="/utilities/level" className="nav-link">Employee level</Link></li>
                    <li><Link to="/utilities/exception" className="nav-link">Salary Exception</Link></li>
                </ul>
            </li>

            <li className="menu-header">Extra</li> 
            <li><a href="" className="nav-link" onClick={this.onHandleClick.bind(this)}><i className="fas fa-sign-out-alt"></i> <span>Logout</span></a></li>

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
