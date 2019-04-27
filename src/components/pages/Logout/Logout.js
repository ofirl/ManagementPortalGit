import React, { Component } from 'react';

import './Logout.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions';

import Card from 'react-bootstrap/Card'

import PageHeader from '../../PageHeader/PageHeader';

// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Cookie from 'js-cookie';

class Logout extends Component {
    constructor(props) {
        super(props);
        
        sessionStorage.removeItem("profileId");
        this.props.boundActions.setProfile(-1);
        Cookie.remove('profileId');
    }
    
    render() {
        return (
            <div>
                Logout page - if you're seeing this there is a problem...
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        // profileId: state.profileId
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        ...ownProps,
        boundActions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
// export default Logout;