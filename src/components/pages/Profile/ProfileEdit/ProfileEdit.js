import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../../redux/actions';

import './ProfileEdit.css';

// import { /*BrowserRouter as Router,*/ /* Route, */ /*Link,*/ /*Switch */ /*, Redirect*/ } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Input, { LabeledInput } from '../../../Input/Input';
import { TableCard } from '../../../Table/Table';
import DataManager from '../../../../assets/js/data.manager';
import Button from 'react-bootstrap/Button';
import { DatePicker } from '../../../FormControl/FormControl';
import { setToValue } from '../../../../assets/js/Utilities';
import Form from 'react-bootstrap/Form';

class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.profileFieldChanged = this.profileFieldChanged.bind(this);
        this.changeProfilePassword = this.changeProfilePassword.bind(this);

        this.state = {
            updatedProfile: DataManager.getProfileById(props.profileId)
        };
    }

    profileFieldChanged(fieldId, value) {
        let newProfile = this.state.updatedProfile;
        setToValue(newProfile, value, fieldId);

        this.setState({ updatedProfile: newProfile });
    }
    changeProfilePassword() {
        //Todo: change profie password here
        console.log('change profile password here');
    }

    render() {
        let { updatedProfile } = this.state;
        let profile = this.props.profileId !== -1 ? DataManager.getProfileById(this.props.profileId) : null;

        // console.log(this.props.profileId);
        // ? why props.profileId is undefined ????? nvm... doesnt happen anymore
        let profileDefaultConnections = this.props.profileId !== -1 /*&& this.props.profileId != null*/ ? profile.personalization.logondata : [];
        // profileDefaultConnections.forEach(connection => {
        //     connection.default = connection.default || false;
        // });

        return (
            <div className="container-fluid">
                <div className="row col-12 p-0 m-0">
                    <div className="col col-6 p-0 pr-1">
                        <Card className="">
                            <Card.Header> Personal Data </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <div className="row p-0">
                                        <div className="col-6 p-0 m-0">
                                            <LabeledInput label="First name" onInput={(value) => this.profileFieldChanged("firstname", value)} defaultValue={profile.firstname} />
                                        </div>
                                        <div className="col-6 pr-0 m-0">
                                            <LabeledInput label="Last name" onInput={(value) => this.profileFieldChanged("lastname", value)} defaultValue={profile.lastname} />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6 p-0 m-0">
                                            <LabeledInput label="Username" onInput={(value) => this.profileFieldChanged("account.username", value)} defaultValue={profile.account.username} />
                                        </div>
                                        <div className="col-6 pr-0 m-0">
                                            {/* <LabeledInput label="Birthday" defaultValue={profile.birthday} /> */}
                                            <div className="row">
                                                <div className="col-auto align-items-center d-flex">
                                                    <label className="m-0"> Birthday : </label>
                                                </div>
                                                <div className="col">
                                                    <DatePicker clearButton={false} onChange={(date) => this.profileFieldChanged("birthday", date[0])}
                                                        options={{
                                                            altInput: true,
                                                            defaultDate: new Date(updatedProfile.birthday)
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <div className="col col-6 m-0 p-0 pl-1">
                        <Card className="">
                            <Card.Header> Acount Data </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    text asd asd asd asd asd asd asd asd asd asd asd asd asd asd <br />
                                    asdasa asd as das d
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </div> */}
                </div>

                <div className="row col-12 m-0 p-0">
                    <TableCard searchable allowAdvancedFilter={false} title="Predefined Connections" editable
                        inputProps={{ flush: false, clearButton: false }} rowButtons={["copy", "remove"]} headerButtons={['new-row']} columns={
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
                                    type: 'radio'
                                }
                            ]
                        }
                        items={profileDefaultConnections}
                    />
                </div>

                {/* <div className="row justify-content-between m-0"> */}

                <div className="row col-12">
                    <div className="col col-6 m-0 p-0">
                        <Card className="">
                            <Card.Header> Change Password </Card.Header>
                            <Card.Body>
                                {/* <Card.Text>
                                    <Card.Link as={Link} to="/account/change-password"> Change Password </Card.Link>
                                </Card.Text> */}
                                <Form>
                                    <div className="col">
                                        <div className="row mb-2">
                                            <div className="col-3 d-flex align-items-center">
                                                <label className="m-0"> Old Password </label>
                                            </div>
                                            <div className="col">
                                                <Input />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-3 d-flex align-items-center">
                                                <label> New Password </label>
                                            </div>
                                            <div className="col">
                                                <Input />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3 d-flex align-items-center">
                                                <label> Repeat Password </label>
                                            </div>
                                            <div className="col">
                                                <Input />
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <Button type="submit" onClick={(e) => {e.preventDefault(); this.changeProfilePassword();}} variant="white" className="mr-3 mt-4 w-15"> Save </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>

                </div>


                {/* </div> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
// export default ProfileEdit;