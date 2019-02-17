import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Sidebar from './components/Sidebar';

import './assets/fonts/feather/feather.min.css';
import './assets/libs/highlight.js/styles/vs2015.css';
import './assets/libs/quill/dist/quill.core.css';
import './assets/libs/select2/dist/css/select2.min.css';
import './assets/libs/flatpickr/dist/flatpickr.min.css';

// import 'assets/css/theme.min.css';
import './assets/css/theme-dark.min.css';

import './Utility.css';


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
            <Link to="/homepage"> homepage </Link>
            <Link to="/test"> test </Link>
            <Link to="/asdasd"> asdasd </Link>

            <Switch>
              <Route exact path="/" render={() => (<div> home page</div>)} />
              <Route exact path="/homepage" render={() => (<div> home page</div>)} />
              <Route path="/test" render={() => (<div> test</div>)} />
              <Route render={() => (<div> no match </div>)} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;