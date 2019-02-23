import React, { Component } from 'react';

import './Logout.css';

import Card from 'react-bootstrap/Card'

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class Logout extends Component {
    render() {
        return (
            <div>
                <div class="header bg-dark">
                    <div class="container-fluid">

                        <div class="header-body">
                            <div class="row align-items-end">
                                <div class="col">
                                    <h6 class="header-pretitle text-secondary">
                                        Logout
                                    </h6>
                                    <h1 class="header-title text-white">
                                        Logout
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="container-fluid">
                    <div class="row">
                        <Card className="col-6">
                            <Card.Header> Logout </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    text asd asd asd asdas <br />
                                    asdasa asd as das d
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Logout;