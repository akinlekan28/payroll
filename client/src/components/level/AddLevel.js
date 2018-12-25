import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import TextFieldGroup from "../common/TextFieldGroup";

class AddLevel extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      basic: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {}

  render() {
    const { errors } = this.state;
    return (
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <SideBar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Add Employee Level</h1>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="justify-content-center text-danger">
                        *All fields are required
                      </h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <TextFieldGroup
                          type="text"
                          label="Level Name"
                          placeholder="Enter name"
                          name="name"
                          value={this.state.name}
                          error={errors.name}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="number"
                          label="Basic Salary"
                          placeholder="Enter basic salary"
                          name="basic"
                          value={this.state.basic}
                          error={errors.basic}
                          onChange={this.onChange}
                          tabindex="1"
                          info="Salary value should be without comma"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Level Description"
                          placeholder="Enter description"
                          name="description"
                          value={this.state.description}
                          error={errors.description}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            tabIndex="4"
                          >
                            Add Level
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddLevel);
