import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class SearchBar extends Component {
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
                <Link
                  to=""
                  data-toggle="sidebar"
                  className="nav-link nav-link-lg"
                >
                  <i className="fas fa-bars" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  data-toggle="search"
                  className="nav-link nav-link-lg d-sm-none"
                >
                  <i className="fas fa-search" />
                </Link>
              </li>
            </ul>
          </form>
          <ul className="navbar-nav navbar-right">
            <li className="dropdown">
              <Link
                to="#"
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
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  to="#"
                  onClick={this.logOut.bind(this)}
                  className="dropdown-item has-icon text-danger"
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </Link>
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
