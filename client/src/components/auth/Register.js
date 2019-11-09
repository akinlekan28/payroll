import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    let loadingBtn = document.querySelector(".loading");
    let loadingComp = document.createElement("i");
    loadingComp.classList = "fas fa-circle-notch fa-spin";
    loadingBtn.innerHTML = "Registering ";
    loadingBtn.appendChild(loadingComp);

    this.props
      .registerUser(userData)
      .then(res => {
        if (res.type === "ADD_USER"){
          return ((toast.success("User successfully registered, proceed to login!")) && (loadingBtn.innerHTML = "Register"))
        }
        if (res.type === "GET_ERRORS") {
          loadingBtn.innerHTML = "Register";
        }
      })
      .catch(err => console.log(err));
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
                  <div className="card card-primary">
                    <div className="card-header justify-content-center">
                      <h3>Register</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                          placeholder="Full Name"
                          label="Name"
                          type="text"
                          value={this.state.name}
                          name="name"
                          onChange={this.onChange}
                          error={errors.name}
                          tabindex="1"
                        />

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

                        <TextFieldGroup
                          placeholder="Confirm Password"
                          label="Confirm Password"
                          type="password"
                          value={this.state.password2}
                          name="password2"
                          onChange={this.onChange}
                          error={errors.password2}
                          tabindex="1"
                        />
                        <p>
                          Registered ? <Link to="/">Login</Link>
                        </p>
                        <div className="form-group mt-3 mb-3">
                          <Button
                            type="submit"
                            classnameItems="btn-primary btn-lg btn-block"
                            tabIndex="4"
                            btnName="Register"
                          />
                        </div>
                      </form>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
