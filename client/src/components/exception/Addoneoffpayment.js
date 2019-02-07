import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { months } from "../common/Utilities";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { addOneOffPayment } from "../../actions/exceptionActions";

class Addoneoffpayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      amount: "",
      employee: "",
      costType: "",
      month: "",
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
      costType: this.state.costType,
      month: this.state.month
    };

    this.props
      .addOneOffPayment(exceptionDetails)
      .then(res => {
        if (res.type === "ADD_ONE_OFF_PAYMENT") {
          toast.success("One off payment successfully added!");
          this.setState({
            name: "",
            amount: "",
            employee: "",
            costType: "",
            month: ""
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

        <TextFieldGroup
          type="text"
          label="Name"
          placeholder="Enter oneoff name"
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

        <SelectListGroup
          label="Month of payment"
          name="month"
          value={this.state.month}
          onChange={this.onChange}
          error={errors.month}
          options={months}
        />

        <div className="text-center">
          <Button type="submit" classnameItems="btn-primary btn-lg" btnName="Add Exception" />
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
          <div className="card-body">
            <p className="text-warning">*Added one off payments are automatically disabled in the system after a year</p>
            {exceptionFormContainer}
            </div>
        </div>
      </div>
    );
  }
}

Addoneoffpayment.propTypes = {
  employees: PropTypes.array.isRequired,
  addOneOffPayment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOneOffPayment }
)(Addoneoffpayment);
