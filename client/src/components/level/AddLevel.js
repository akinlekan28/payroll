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
                <h1>Employee Level Section</h1>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>From the dropdown navs, you can attach a bonus or a deductible to a level</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-2">
                        <ul className="nav nav-pills flex-column" id="myTab4" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" id="home-tab4" data-toggle="tab" href="#addlevel" role="tab" aria-controls="home" aria-selected="true">Add level</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="profile-tab4" data-toggle="tab" href="#profile4" role="tab" aria-controls="profile" aria-selected="false">View levels</a>
                          </li>
                          <div className="dropdown-divider"></div>
                          <li className="nav-item">
                            <a className="nav-link" id="contact-tab4" data-toggle="tab" href="#contact4" role="tab" aria-controls="contact" aria-selected="false">Add bonus</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="contact-tab4" data-toggle="tab" href="#contact4" role="tab" aria-controls="contact" aria-selected="false">View bonuses</a>
                          </li>
                          <div className="dropdown-divider"></div>
                          <li className="nav-item">
                            <a className="nav-link" id="contact-tab4" data-toggle="tab" href="#contact4" role="tab" aria-controls="contact" aria-selected="false">Add Deductable</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="contact-tab4" data-toggle="tab" href="#contact4" role="tab" aria-controls="contact" aria-selected="false">View Deductables</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 col-sm-12 col-md-10">
                        <div className="tab-content no-padding" id="myTab2Content">
                          <div className="tab-pane fade show active" id="addlevel" role="tabpanel" aria-labelledby="addlevel-tab4">
                            form
                          </div>
                          <div className="tab-pane fade" id="profile4" role="tabpanel" aria-labelledby="profile-tab4">
                            Sed sed metus vel lacus hendrerit tempus. Sed efficitur velit tortor, ac efficitur est lobortis quis. Nullam lacinia metus erat, sed fermentum justo rutrum ultrices. Proin quis iaculis tellus. Etiam ac vehicula eros, pharetra consectetur dui. Aliquam convallis neque eget tellus efficitur, eget maximus massa imperdiet. Morbi a mattis velit. Donec hendrerit venenatis justo, eget scelerisque tellus pharetra a.
                          </div>
                          <div className="tab-pane fade" id="contact4" role="tabpanel" aria-labelledby="contact-tab4">
                            Vestibulum imperdiet odio sed neque ultricies, ut dapibus mi maximus. Proin ligula massa, gravida in lacinia efficitur, hendrerit eget mauris. Pellentesque fermentum, sem interdum molestie finibus, nulla diam varius leo, nec varius lectus elit id dolor. Nam malesuada orci non ornare vulputate. Ut ut sollicitudin magna. Vestibulum eget ligula ut ipsum venenatis ultrices. Proin bibendum bibendum augue ut luctus.
                          </div>
                        </div>
                      </div>
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
