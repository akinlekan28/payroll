import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Login />
        </div>
      </Router> 
    );
  }
}

export default App;
