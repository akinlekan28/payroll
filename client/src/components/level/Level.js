import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLevels } from "../../actions/levelActions";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import LevelTab from "./LevelTab";
import AddLevelForm from "./AddLevelForm";
import ViewLevelTable from "./ViewLevelTable";
import AddBonusForm from "./AddBonusForm";
import ViewBonusTable from "./ViewBonusTable";
import Spinner from "../common/Spinner";
import AddDeductableForm from "./AddDeductableForm";
import ViewDeductableTable from "./ViewDeductableTable";

class Level extends Component {
  _isMounted = false;

  componentDidMount = () => {
    this.props.getLevels();
  };

  render() {
    let levelContainer;

    const { levels, loading } = this.props.levels;

    if (levels === null || loading) {
      levelContainer = <Spinner />;
    } else {
      levelContainer = (
        <div className="tab-content no-padding" id="myTab2Content">
          <div
            className="tab-pane fade show active"
            id="addlevel"
            role="tabpanel"
            aria-labelledby="addlevel-tab4"
          >
            <AddLevelForm />
          </div>
          <div
            className="tab-pane fade"
            id="viewlevel"
            role="tabpanel"
            aria-labelledby="viewlevel-tab4"
          >
            <ViewLevelTable levels={levels} />
          </div>
          <div
            className="tab-pane fade"
            id="addbonus"
            role="tabpanel"
            aria-labelledby="addbonus-tab4"
          >
            <AddBonusForm levels={levels} />
          </div>
          <div
            className="tab-pane fade"
            id="viewbonus"
            role="tabpanel"
            aria-labelledby="viewbonus-tab4"
          >
            <ViewBonusTable levels={levels} />
          </div>
          <div
            className="tab-pane fade"
            id="deductable"
            role="tabpanel"
            aria-labelledby="deductable-tab4"
          >
            <AddDeductableForm levels={levels} />
          </div>
          <div
            className="tab-pane fade"
            id="viewdeductable"
            role="tabpanel"
            aria-labelledby="viewdeductable-tab4"
          >
            <ViewDeductableTable levels={levels} />
          </div>
        </div>
      );
    }

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
                    <h4>
                      From the dropdown navs, you can attach a bonus or a
                      deductible to a level
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <LevelTab />
                      <div className="col-12 col-sm-12 col-md-10">
                        {levelContainer}
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

Level.propTypes = {
  levels: PropTypes.object.isRequired,
  getLevels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getLevels }
)(Level);
