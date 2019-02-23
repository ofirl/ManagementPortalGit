import React, { Component } from 'react';

import './Logout.css';

import Card from 'react-bootstrap/Card'

import PageHeader from '../PageHeader';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class Logout extends Component {
    render() {
        return (
            <div>
                <div className="header bg-dark">
                    <div className="container-fluid">
                        <PageHeader>
                            <PageHeader.Body>
                                <PageHeader.Pretitle text="Member" />
                                <PageHeader.Title text="Ofir Levi" />
                            </PageHeader.Body>
                        </PageHeader>
                    </div>
                </div>



                <div className="container-fluid">
                    <div className="row">
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