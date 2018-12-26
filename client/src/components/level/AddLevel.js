import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import LevelTab from "./LevelTab";
import AddLevelForm from "./AddLevelForm";
import ViewLevelForm from "./ViewLevelTable";

class AddLevel extends Component {

  render() {

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
                      <LevelTab />
                      <div className="col-12 col-sm-12 col-md-10">
                        <div className="tab-content no-padding" id="myTab2Content">
                          <div className="tab-pane fade show active" id="addlevel" role="tabpanel" aria-labelledby="addlevel-tab4">
                            <AddLevelForm />
                          </div>
                          <div className="tab-pane fade" id="profile4" role="tabpanel" aria-labelledby="profile-tab4">
                            <ViewLevelForm />
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

// const mapStateToProps = state => ({
//   errors: state.errors
// })

export default AddLevel;
