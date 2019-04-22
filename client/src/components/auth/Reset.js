import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { resetPassword } from "../../actions/authActions";
import { toast } from "react-toastify";

class Reset extends Component {
  constructor() {
    super();

    this.state = {
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

    const userCredentials = {
      password: this.state.password,
      password2: this.state.password2
    };

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Set New Password "
    loadingBtn.appendChild(loadingComp)

    this.props.resetPassword(this.props.match.params.token, userCredentials)
    .then(res => {
        if(res.type === 'GET_SUCCESS'){
          toast.success("Yaay! password has been reset, proceed to login")
        }
        if(res.type === 'GET_ERRORS'){
          loadingBtn.innerHTML = "Set New password"
        }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login-bg">
        <div id="app">
          <section className="section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-5">
                  <div className="card card-primary mt-5">
                    <div className="card-header justify-content-center">
                      <h3>Set New Password</h3>
                    </div>
                    <p className="mx-auto text-warning">
                      *You can now set a new password for login!
                    </p>
                    <p className="mx-auto text-danger">{errors.noToken}</p>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                          placeholder="Enter new password"
                          label="Password"
                          type="password"
                          value={this.state.password}
                          name="password"
                          onChange={this.onChange}
                          error={errors.password}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          placeholder="Enter new password again"
                          label="Confirm Password"
                          type="password"
                          value={this.state.password2}
                          name="password2"
                          onChange={this.onChange}
                          error={errors.password2}
                          tabindex="1"
                        />

                        <p>
                          Done resetting ? <Link to="/">Back to login</Link>
                        </p>
                        <div className="form-group mt-4 mb-5">
                          <Button
                            type="submit"
                            classnameItems="btn-primary btn-lg btn-block"
                            btnName="Set New Password"
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

Reset.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(Reset);
