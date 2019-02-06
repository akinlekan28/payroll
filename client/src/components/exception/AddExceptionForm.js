import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { addException } from "../../actions/exceptionActions";

class AddExceptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      employee: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const exceptionDetails = {
      amount: this.state.amount,
      employee: this.state.employee
    };

    this.props
      .addException(exceptionDetails)
      .then(res => {
        if (res.type === "ADD_EXCEPTION") {
          toast.success("Salary exception successfully added!");
          this.setState({
            amount: "",
            employee: ""
          });
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const { employees } = this.props;

    const exceptionFormContainer = (
      <form onSubmit={this.onSubmit}>
        <p className="text-danger text-center">{errors.exception}</p>
        <TextFieldGroup
          type="number"
          label="Amount"
          placeholder="Enter amount"
          name="amount"
          value={this.state.amount}
          error={errors.amount}
          onChange={this.onChange}
          tabindex="1"
          info="Enter value without comma"
        />

        <SelectListGroup
          label="Employee"
          placeholder="Select employee"
          name="employee"
          value={this.state.employee}
          onChange={this.onChange}
          error={errors.employee}
          options={employees}
        />

        <div className="text-center">
          <Button
            type="submit"
            classnameItems="btn-primary btn-lg"
            btnName="Add Exception"
          />
        </div>
      </form>
    );

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center text-danger">
              *All fields are required
            </h4>
          </div>
          <div className="card-body">{exceptionFormContainer}</div>
        </div>
      </div>
    );
  }
}

AddExceptionForm.propTypes = {
  employees: PropTypes.array.isRequired,
  addException: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addException }
)(AddExceptionForm);
