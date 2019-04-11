import React, { Component } from 'react';

import './ProfileSection.css';

import Card from 'react-bootstrap/Card';
import { LabeledInput } from '../../../Input/Input';
import Table, { TableCard } from '../../../Table/Table';

class ProfileSection extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row col-12 p-0 m-0">
                    <Card className="col-6">
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
                </div>

                <div className="row col-12 m-0 p-0">
                    <TableCard searchable allowAdvancedFilter={false} title="Predefined Connections" editable inputProps={{ flush: false, clearButton: false }} rowButtons={["copy", "remove"]} headerButtons={['new-row']} columns={
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
                            {
                                name: 'Default',
                                accessor: 'default',
                                // type: 'bool'
                            }
                        ]
                    } items={
                        [
                            {
                                name: 'CRM Prod',
                                system: 'CKP',
                                username: 'OFIRL'
                            }
                        ]
                    } />
                </div>

                {/* <div className="row justify-content-between m-0"> */}

                <div className="row col-12 m-0 p-0">

                    <div className="col col-6 pl-0">
                        <Card className="">
                            <Card.Header> Acount Data </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    text asd asd asd asd asd asd asd asd asd asd asd asd asd asd <br />
                                    asdasa asd as das d
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col col-6 pr-0">
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

                </div>


                {/* </div> */}

            </div>
        );
    }
}

export default ProfileSection;