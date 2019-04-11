import React, { Component } from 'react';

import './ProfileSection.css';

import Card from 'react-bootstrap/Card';
import { LabeledInput } from '../../../Input/Input';
import Table from '../../../Table/Table';

class ProfileSection extends Component {
    render() {
        return (
            <div className="container-fluid">

                <Card className="col-12">
                    <Card.Header> Personal Data </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div className="row">
                                <div className="col-6 m-0">
                                    <LabeledInput label="First name" />
                                </div>
                                <div className="col-6 m-0">
                                    <LabeledInput label="Last name" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6 m-0">
                                    <LabeledInput label="Nickname" />
                                </div>
                                <div className="col-6 m-0">
                                    <LabeledInput label="Birthday" />
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <div className="row justify-content-between m-0">

                    <div className="col col-5 m--1 p-0">

                        <Card className="">
                            <Card.Header> Acount Data </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    text asd asd asd asd asd asd asd asd asd asd asd asd asd asd <br />
                                    asdasa asd as das d
                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="">
                            <Card.Header> Change Password </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    text asd asd asd asd asd asd asd asd asd asd asd asd asd asd <br />
                                    asdasa asd as das d
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>

                    <div className="col col-7">
                        <Card className="">
                            <Card.Header> Defaults </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Table rowButtons={["copy", "remove"]} columns={
                                        [
                                            {
                                                name: 'Name',
                                                accessor: 'name'
                                            },
                                            {
                                                name: 'System',
                                                accessor: 'system'
                                            },
                                            {
                                                name: 'Username',
                                                accessor: 'username'
                                            },
                                        ]
                                        } />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProfileSection;