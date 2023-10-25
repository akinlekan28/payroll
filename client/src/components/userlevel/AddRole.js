import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getUsers, assignRole } from '../../actions/authActions';
import SelectListGroup from '../common/SelectListGroup';
import SearchBar from '../dashboard/SearchBar';
import Sidebar from '../dashboard/SideBar';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import { roles } from '../common/Utilities';
import { toast } from 'react-toastify';

class AddRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      role: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.users;
    let currentUser = user.id;
    let loggedPrivilege = user.is_admin;

    const rolePayload = {
      user: this.state.user,
      role: this.state.role,
      currentUser,
      loggedPrivilege,
    };

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement('i');
    loadingComp.classList = 'fas fa-circle-notch fa-spin';
    loadingBtn.innerHTML = 'Assigning role ';
    loadingBtn.appendChild(loadingComp);

    this.props
      .assignRole(rolePayload)
      .then((res) => {
        if (res.type === 'ASSIGN_ROLE') {
          toast.success('Role successfully changed!');
          this.setState({
            user: '',
            role: '',
          });
        }

        loadingBtn.innerHTML = 'Assign Role';
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { errors } = this.state;
    let employeeContainer;

    const { users, loading } = this.props.users;

    if (loading || users == null) {
      employeeContainer = <Spinner />;
    } else {
      if (Object.keys(users).length > 0) {
        employeeContainer = (
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card-body mt-4">
                <form onSubmit={this.onSubmit}>
                  <SelectListGroup
                    name="user"
                    label="Administrator"
                    value={this.state.user}
                    options={users}
                    error={errors.user}
                    onChange={this.onChange}
                  />

                  <SelectListGroup
                    name="role"
                    label="Role"
                    value={this.state.role}
                    options={roles}
                    error={errors.role}
                    onChange={this.onChange}
                  />

                  <div className="text-center">
                    <Button
                      type="submit"
                      classnameItems="btn-info btn-lg"
                      btnName="Assign Role"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      } else {
        employeeContainer = (
          <h4>
            No administrator currently registered on the system.
          </h4>
        );
      }
    }

    return (
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <Sidebar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Assign Role</h1>
              </div>
              <h4 className="text-center mt-4">
                Select administrator to assign role
              </h4>
              {employeeContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

// AddRole.proptypes = {
//   getUsers: PropTypes.func.isRequired,
//   assignRole: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   users: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
  errors: state.errors,
  users: state.auth,
});

export default connect(mapStateToProps, { getUsers, assignRole })(
  AddRole
);
