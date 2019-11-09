import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let loadingBtn = document.querySelector(".loading");
    let loadingComp = document.createElement("i");
    loadingComp.classList = "fas fa-circle-notch fa-spin";
    loadingBtn.innerHTML = "Login ";
    loadingBtn.appendChild(loadingComp);

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props
      .loginUser(loginData)
      .then(res => {
        if (res && res.type === "GET_ERRORS") {
          loadingBtn.innerHTML = "Login";
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login-bg">
        <div id="app">
          <section className="section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-5 mt-5">
                  <div className="card card-primary mt-5 login-refix">
                    <div className="card-header justify-content-center">
                      <h3>Login</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                          placeholder="Email Address"
                          label="Email"
                          type="email"
                          value={this.state.email}
                          name="email"
                          onChange={this.onChange}
                          error={errors.email}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          placeholder="Password"
                          label="Password"
                          type="password"
                          value={this.state.password}
                          name="password"
                          onChange={this.onChange}
                          error={errors.password}
                          tabindex="1"
                        />
                        <p>
                          Forgot password ?{" "}
                          <Link to="/forgot-password">reset</Link>
                        </p>
                        <div className="form-group mt-4 mb-5">
                          <Button
                            type="submit"
                            classnameItems="btn-primary btn-lg btn-block"
                            btnName="Login"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="text-muted text-center">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/register">Create One</Link>
                      </p>
                    </div>
                  </div>
                  <div className="simple-footer text-white">
                    Copyright &copy; Payeroll 2018
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
