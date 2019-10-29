import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Forgot from "./components/auth/Forgot";
import Reset from "./components/auth/Reset";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import EmployeeProfile from './components/employee/EmployeeProfile';
import Level from "./components/level/Level";
import EditLevel from './components/level/EditLevel';
import Exception from './components/exception/Exception';
import MonthlySalary from './components/payroll/MonthlySalary';
import MonthlySlip from './components/payroll/MonthlySlip';
import MonthlyDashboard from './components/payroll/all/MonthlyDashboard';
import WithPension from './components/payroll/all/WithPension';
import Contribution from './components/payroll/all/Contribution';
import Pension from './components/payroll/all/Pension';
import Tax from "./components/payroll/all/Tax";
import SingleEmployee from './components/payroll/all/records/SingleEmployee';
import AllEmployee from './components/payroll/all/records/AllEmployee';
import MonthlySlipRecord from './components/payroll/all/records/MonthlySlipRecord';
import AllTimeSingle from './components/payroll/all/records/AllTimeSingle';
import AllTimeMonthYear from './components/payroll/all/records/AllTimeMonthYear';
import AllTimeYear from './components/payroll/all/records/AllTimeYear';
import AddRole from './components/userlevel/AddRole';
import UploadEmployee from './components/employee/UploadEmployee';
import Documentation from './components/documentation/Doc';

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <ToastContainer autoClose={4000} />
            <Route exact path="/" component={Login} />
            <Route exact path="/forgot-password" component={Forgot} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/resetpassword/:token" component={Reset} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/employee" component={AddEmployee} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/employee/all"
                component={ViewEmployee}
              />
            </Switch>
            <Switch><PrivateRoute exact path="/employee/upload" component={UploadEmployee} />></Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/employee/edit/:id"
                component={EditEmployee}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/employee/view/:id"
                component={EmployeeProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/utilities/level" component={Level} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/utilities/level/editlevel/:id" component={EditLevel} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/utilities/exception" component={Exception} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/monthly" component={MonthlySalary} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/monthly/viewslip/:id" component={MonthlySlip} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all" component={MonthlyDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/withpension" component={WithPension} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/contribution" component={Contribution} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/pension" component={Pension} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/tax" component={Tax} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/yearly" component={SingleEmployee} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/allyearly" component={AllEmployee} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/monthly" component={MonthlySlipRecord} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/employeemonthyear" component={AllTimeSingle} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/monthyear" component={AllTimeMonthYear} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/payroll/all/year" component={AllTimeYear} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/user/role" component={AddRole} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/documentation" component={Documentation} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
