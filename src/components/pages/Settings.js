import React, { Component } from 'react';

import './Settings.css';

import Card from 'react-bootstrap/Card'

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import PageHeader from '../PageHeader';

class Settings extends Component {
    render() {
        return (
            <div>
                <div className="header bg-dark">
                    <div className="container-fluid">
                        <PageHeader>
                            <PageHeader.Body>
                                <PageHeader.Pretitle text="Profile" />
                                <PageHeader.Title text="Settings" />
                            </PageHeader.Body>
                        </PageHeader>
                    </div>
                </div>



                <div class="container-fluid">
                    <div class="row">
                        <Card className="col-6">
                            <Card.Header> Settings </Card.Header>
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

export default Settings;