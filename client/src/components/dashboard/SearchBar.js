import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Avatar from "./avatar.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class SearchBar extends Component {
  
  state = {
    isOpen: false
  }
  
  logOut(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <nav className="navbar navbar-expand-lg main-navbar">
          <form className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li>
                <a
                  href=""
                  data-toggle="sidebar"
                  className="nav-link nav-link-lg"
                >
                  <i className="fas fa-bars"/>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-toggle="search"
                  className="nav-link nav-link-lg d-sm-none"
                >
                  <i className="fas fa-search" />
                </a>
              </li>
            </ul>
          </form>
          <ul className="navbar-nav navbar-right">
            <li><Link to="/employee/upload" className="btn btn-warning">Upload Employee Records</Link></li>
          <li className="dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle nav-link-lg nav-link-user"
              >
                <i className="fas fa-cog" style={{ width: "30px" }}></i>
                <div className="d-sm-none d-lg-inline-block">
                  Admin settings
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  to="/user/role"
                  className="dropdown-item has-icon text-primary"
                >
                Add role
                </Link>
              </div>
            </li>
            <li className="dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle nav-link-lg nav-link-user"
              >
                <img
                  alt="avatar"
                  src={Avatar}
                  style={{ width: "30px" }}
                  className="rounded-circle mr-1"
                />
                <div className="d-sm-none d-lg-inline-block">
                  Hi, {user.name}
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  href="#"
                  onClick={this.logOut.bind(this)}
                  className="dropdown-item has-icon text-danger"
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

SearchBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SearchBar);
