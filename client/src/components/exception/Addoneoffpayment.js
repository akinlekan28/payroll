import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
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
        if (res.type === "ADD_OTHER_EXCEPTION") {
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

    const months = [
        {name: "January", value: "January", _id: "January"},
        {name: "February", value: "February", _id: "February"},
        {name: "March", value: "March", _id: "March"},
        {name: "April", value: "April", _id: "April"},
        {name: "May", value: "May", _id: "May"},
        {name: "June", value: "June", _id: "June"},
        {name: "July", value: "July", _id: "July"},
        {name: "August", value: "August", _id: "August"},
        {name: "September", value: "September", _id: "September"},
        {name: "October", value: "October", _id: "October"},
        {name: "November", value: "November", _id: "November"},
        {name: "December", value: "December", _id: "December"},
        
    ]

    const exceptionFormContainer = (
      <form onSubmit={this.onSubmit}>
        <p className="text-danger text-center">{errors.exception}</p>

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
          <button type="submit" className="btn btn-primary btn-lg" tabIndex="4">
            Add Exception
          </button>
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
