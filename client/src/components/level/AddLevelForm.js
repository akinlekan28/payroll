import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import TextFieldGroup from "../common/TextFieldGroup";
import { addLevel } from "../../actions/levelActions";
import Button from "../common/Button";

class AddLevelForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      basic: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Adding "
    loadingBtn.appendChild(loadingComp)

    const levelDetails = {
      name: this.state.name,
      basic: this.state.basic,
      description: this.state.description
    };

    this.props
      .addLevel(levelDetails)
      .then(res => {
        if (res.type === "ADD_LEVEL") {
          toast.success("Level information successfully added!");
          this.setState({
            name: "",
            basic: "",
            description: ""
          });

          loadingBtn.innerHTML = "Add Level"
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center text-danger">
              *All fields are required
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
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
                <Button classnameItems="btn-primary btn-lg" type="submit" btnName="Add Level" />         
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddLevelForm.propTypes = {
  addLevel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addLevel }
)(AddLevelForm);
