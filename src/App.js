import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route,/* Link,*/ Switch/*, Redirect*/ } from "react-router-dom";

import './assets/fonts/feather/feather.min.css';
import './assets/libs/highlight.js/styles/vs2015.css';
import './assets/libs/quill/dist/quill.core.css';
import './assets/libs/select2/dist/css/select2.min.css';
import './assets/libs/flatpickr/dist/flatpickr.min.css';

// import 'assets/css/theme.min.css';
import './assets/css/theme-dark.min.css';

import './Utility.css';


// pages
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './components/pages/HomePage/HomePage'
import Settings from './components/pages/Settings/Settings';
import Logout from './components/pages/Logout/Logout';
import Profile from './components/pages/Profile/Profile';
import ScriptInput from './components/pages/ScriptInput/ScriptInput';

import DataManager from './assets/js/data.manager';

import ProfileContext from './components/Context/ProfileContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProfile: null,

      profileContext: {
        profile: DataManager.getProfileById(0),
        setProfile: (profile) => { this.setState({ currentProfile: profile }) },
      }
    }
  }

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

      <ProfileContext.Provider value={this.state.profileContext}>
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
                <Route path="/profilepage/:section?" component={Profile} />
                {/* script pages */}
                <Route path="/script-input/:id" component={ScriptInput} />
                {/* 404 - not found */}
                <Route render={() => (<div> no match - 404 </div>)} />
              </Switch>
            </div>

          </div>
        </Router>
      </ProfileContext.Provider>
    );
  }
}

export default App;