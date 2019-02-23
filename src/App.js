import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Sidebar from './components/Sidebar';
import HomePage from './components/pages/HomePage'

import './assets/fonts/feather/feather.min.css';
import './assets/libs/highlight.js/styles/vs2015.css';
import './assets/libs/quill/dist/quill.core.css';
import './assets/libs/select2/dist/css/select2.min.css';
import './assets/libs/flatpickr/dist/flatpickr.min.css';

// import 'assets/css/theme.min.css';
import './assets/css/theme-dark.min.css';

import './Utility.css';

// pages
import Settings from './components/pages/Settings';
import Logout from './components/pages/Logout';
import Profile from './components/pages/Profile';
import ScriptInput from './components/pages/ScriptInput';

// import './assets/libs/jquery/dist/jquery.min.js';
// import './assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js';
// import './assets/libs/chart.js/dist/Chart.min.js';
// import './assets/libs/chart.js/Chart.extension.min.js';
// import './assets/libs/highlightjs/highlight.pack.min.js';
// import './assets/libs/flatpickr/dist/flatpickr.min.js';
// import './assets/libs/jquery-mask-plugin/dist/jquery.mask.min.js';
// import './assets/libs/list.js/dist/list.min.js';
// import './assets/libs/quill/dist/quill.min.js';
// import './assets/libs/dropzone/dist/min/dropzone.min.js';
// import './assets/libs/select2/dist/js/select2.min.js';

// import 'assets/js/theme.min.js';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>     

      <Router>
        <div>
          <Sidebar />

          <div className="main-content">
            {/* <Link to="/homepage"> home page </Link>
            <br />
            <Link to="/test"> test </Link>
            <br />
            <Link to="/asdasd"> asdasd </Link>
            <br /> */}

            <Switch>
              {/* homepage */}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/homepage" component={HomePage} />
              {/* utility pages */}
              <Route path="/settings" component={Settings} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
              {/* script pages */}
              <Route path="/script-input/:id" component={ScriptInput} />
              {/* 404 - not found */}
              <Route render={() => (<div> no match - 404 </div>)} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;