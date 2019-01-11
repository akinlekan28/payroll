import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { ToastContainer } from "react-toastify";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Forgot from "./components/auth/Forgot";
import Reset from "./components/auth/Reset";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import Level from "./components/level/Level";
import EditLevel from './components/level/EditLevel';
import Exception from './components/exception/Exception';
import MonthlySalary from './components/payroll/MonthlySalary';
import MonthlySlip from './components/payroll/MonthlySlip';
import MonthlyDashboard from './components/payroll/all/MonthlyDashboard';
import WithPension from './components/payroll/all/WithPension';

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
            <Switch>
              <PrivateRoute
                exact
                path="/employee/edit/:id"
                component={EditEmployee}
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
