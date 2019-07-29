import React, { Component } from 'react';

import './Login.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions';

// import Card from 'react-bootstrap/Card'

// import PageHeader from '../../PageHeader/PageHeader';

import Input from '../../Input/Input';

import { /*BrowserRouter as Router, Route,*/ Link, /*Switch, Redirect,*/ withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import DataManager from './../../../assets/js/data.manager';
import Form from 'react-bootstrap/Form';

import Cookie from 'js-cookie';
import { Checkbox } from '../../FormControl/FormControl';

class Login extends Component {
    constructor(props) {
        super(props);

        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();

        this.signinClicked = this.signinClicked.bind(this);
        this.checkSessionProfile = this.checkSessionProfile.bind(this);

        this.state = {
            error: false,
            rememberLogin: false
        }

        this.checkSessionProfile();
    }
    signinClicked() {
        let profile = DataManager.getProfileByUsernameAndPassword(this.usernameInput.current.getValue(), this.passwordInput.current.getValue());
        if (profile) {
            if (this.state.rememberLogin)
                Cookie.set('profileId', profile.id, { expires: 7 });
            
            this.props.boundActions.setProfile(profile.id);
            sessionStorage.setItem("profileId", profile.id);
            this.props.history.push('./');
        }
        else
            this.setState({ error: true });
    }
    checkSessionProfile() {
        let sessionProfile = sessionStorage.getItem("profileId");

        if (sessionProfile)
            this.props.boundActions.setProfile(parseInt(sessionProfile));

        let cookieProfile = Cookie.get('profileId');
        if (cookieProfile) {
            cookieProfile = parseInt(cookieProfile);
            this.props.boundActions.setProfile(parseInt(cookieProfile));
            sessionStorage.setItem("profileId", cookieProfile);
        }
    }

    render() {
        let { error, rememberLogin } = this.state;

        return (
            <div className="d-flex h-100">
                <div className="fluid-container align-self-center w-100">
                    <div className="row col justify-content-center">
                        <div className="col-10 col-md-3 pr-4 mr-4">
                            <Form onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="row justify-content-center mb-3">
                                    <div className="display-4"> Sign In </div>
                                </div>
                                <div className="row justify-content-center mb-4">
                                    <div className="text-muted"> access the management portal </div>
                                </div>
                                <div className="row mb-4">
                                    <label> Username </label>
                                    <Input ref={this.usernameInput} placeholder="Username" tabIndex="1" />
                                </div>
                                <div className="row mb-4">
                                    <div className="row col justify-content-between w-100 p-0 m-0 mb-2">
                                        Password
                                    <div className="form-text small text-muted">
                                            Forogt password?
                                    </div>
                                    </div>
                                    <Input ref={this.passwordInput} type="password" placeholder="Enter your password" tabIndex="2" />
                                </div>
                                <div className="row mb-4 p-0 justify-content-center">
                                    <div className="" style={{marginTop: '-6px'}}>
                                        <Checkbox variant="primary" checked={rememberLogin} onChange={(remember) => this.setState({ rememberLogin: remember })} tabIndex="3" />
                                    </div>
                                    {/* <div className="col p-0 align-items-center"> */}
                                        <label className="m-0"> Remeber me </label>
                                    {/* </div> */}
                                </div>
                                <div className="row mb-4">
                                    <Button variant="primary" type="submit" className="w-100" onClick={this.signinClicked}> Sign in </Button>
                                </div>
                                {
                                    error ?
                                        (
                                            <div className="row justify-content-center mb-4">
                                                <div className="text-danger"> Wrong username or password </div>
                                            </div>
                                        )
                                        : null
                                }
                                <div className="row justify-content-center text-muted small">
                                    <div>
                                        Don't have an account yet?
                                    <span>
                                            <Link to="./signup"> Sign up. </Link>
                                        </span>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-3 justify-content-center pl-4 ml-4 d-none d-md-flex">
                            <img src="/assets/img/illustrations/happiness.svg" alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
// export default Login