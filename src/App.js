import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './redux/actions';

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
import Login from './components/pages/Login/Login';

// import DataManager from './assets/js/data.manager';

// import ProfileContext from './components/Context/ProfileContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProfile: props.profileId,
    }
  }

  render() {
    return (
      <Router>
        {
          this.props.profileId !== -1 ?
            (
              <div>
                <Sidebar />

                <div className="main-content">
                  <Switch>
                    {/* homepage */}
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/homepage" component={HomePage} />
                    {/* utility pages */}
                    <Route path="/settings" component={Settings} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/profilepage/:section?/:edit?" component={Profile} />
                    {/* script pages */}
                    <Route path="/script-input/:id" component={ScriptInput} />
                    {/* 404 - not found */}
                    <Route render={() => (<div> no match - 404 </div>)} />
                  </Switch>
                </div>

              </div>
            )
            :
            <Login />
        }
      </Router>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    profileId: state.profileId
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    ...ownProps,
    boundActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;