import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./store";

import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Login />
          </div>
          </Router>
      </Provider> 
    );
  }
}

export default App;
