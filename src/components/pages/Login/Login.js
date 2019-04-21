import React, { Component } from 'react';

import './Login.css';

// import Card from 'react-bootstrap/Card'

// import PageHeader from '../../PageHeader/PageHeader';

import Input from '../../Input/Input';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Login extends Component {
    render() {
        return (
            <div className="d-flex h-100">
                <div className="fluid-container align-self-center w-100">
                    <div className="row col justify-content-center">
                        <div className="col-3">
                            <div className="row justify-content-center mb-3">
                                <div className="display-4"> Sign In </div>
                            </div>
                            <div className="row justify-content-center mb-4">
                                <div className="text-muted"> access the management portal </div>
                            </div>
                            <div className="row mb-4">
                                <label> Username </label>
                                <Input placeholder="Username" />
                            </div>
                            <div className="row mb-4">
                                <div className="row col justify-content-between w-100 p-0 m-0 mb-2">
                                    Password
                                    <div className="form-text small text-muted">
                                        Forogt password?
                                    </div>
                                </div>
                                <Input placeholder="Enter your password" />
                            </div>
                            <div className="row mb-4">
                                <Button variant="primary" className="w-100"> Sign in </Button>
                            </div>
                            <div className="row justify-content-center text-muted small">
                                <div>
                                    Don't have an account yet?
                                    <span>
                                        <Link to="./signup"> Sign up. </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            
                        <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login