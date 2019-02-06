import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { toast } from "react-toastify";
import { addOtherException } from "../../actions/exceptionActions";
import Button from "../common/Button";

class AddOtherExceptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      amount: "",
      employee: "",
      costType: "",
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
      name: this.state.name,
      amount: this.state.amount,
      employee: this.state.employee,
      costType: this.state.costType
    };

    this.props
      .addOtherException(exceptionDetails)
      .then(res => {
        if (res.type === "ADD_OTHER_EXCEPTION") {
          toast.success("Other exception successfully added!");
          this.setState({
            name: "",
            amount: "",
            employee: "",
            costType: ""
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

    const options = [
      { name: "Income", value: "income", _id: "income" },
      { name: "Deduction", value: "deduction", _id: "deduction" }
    ];

    const exceptionFormContainer = (
      <form onSubmit={this.onSubmit}>
        <p className="text-danger text-center">{errors.exception}</p>

        <TextFieldGroup
          type="text"
          label="Name"
          placeholder="Enter exception name"
          name="name"
          value={this.state.name}
          error={errors.name}
          onChange={this.onChange}
          tabindex="1"
        />

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

        <SelectListGroup
          label="Cost Type"
          name="costType"
          value={this.state.costType}
          onChange={this.onChange}
          error={errors.costType}
          options={options}
        />

        <div className="text-center">
          <Button type="submit" classnameItems="btn-primary btn-lg" btnName="Add Exception"/>
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

AddOtherExceptionForm.propTypes = {
  employees: PropTypes.array.isRequired,
  addOtherException: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOtherException }
)(AddOtherExceptionForm);
