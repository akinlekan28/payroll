import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLevel, editLevel } from "../../actions/levelActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { toast } from "react-toastify";

class EditLevel extends Component {
  componentDidMount() {
    this.props.getLevel(this.props.match.params.id);
  }

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      basic: "",
      description: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.levels) {
      const levels = nextProps.levels.levels;

      levels.name = !isEmpty(levels.name) ? levels.name : "";
      levels.basic = !isEmpty(levels.basic) ? levels.basic : "";
      levels.description = !isEmpty(levels.description)
        ? levels.description
        : "";

      let basicSalary = levels.basic.toString();

      this.setState({
        name: levels.name,
        basic: basicSalary,
        description: levels.description
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const levelData = {
      id: this.props.match.params.id,
      name: this.state.name,
      basic: this.state.basic,
      description: this.state.description
    };

    this.props
      .editLevel(levelData)
      .then(res => {
        if (res.type === "VIEW_LEVELS")
          toast.success("Level information successfully edited!");
        this.setState({
          name: "",
          basic: "",
          description: ""
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;

    const { levels, loading } = this.props.levels;

    let levelContainer;

    if (levels === null || loading) {
      levelContainer = <Spinner />;
    } else {
      if (Object.keys(levels).length > 0) {
        levelContainer = (
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4 className="justify-content-center text-danger">
                    *All fields are required
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      type="text"
                      label="Name"
                      placeholder="Enter level name"
                      name="name"
                      value={this.state.name}
                      error={errors.name}
                      onChange={this.onChange}
                      tabindex="1"
                    />

                    <TextFieldGroup
                      type="number"
                      label="Basic salary"
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
                      label="Description"
                      placeholder="Enter level description"
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
                        Edit Level
                      </button>
                      <Link
                        to="/utilities/level"
                        className="btn btn-warning btn-lg ml-3"
                      >
                        Back
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        levelContainer = <option>Selected level not found</option>;
      }
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
                <h1>Edit Level </h1>
              </div>
              {levelContainer}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

EditLevel.propTypes = {
  getLevel: PropTypes.func.isRequired,
  editLevel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getLevel, editLevel }
)(EditLevel);
