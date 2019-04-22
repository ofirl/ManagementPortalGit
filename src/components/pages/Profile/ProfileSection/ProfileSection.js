import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../../redux/actions';

import './ProfileSection.css';

// import { /*BrowserRouter as Router,*/ /* Route, */ /* Link, */ /*Switch */ /*, Redirect*/ } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import { LabeledInput } from '../../../Input/Input';
import { TableCard } from '../../../Table/Table';
import DataManager from '../../../../assets/js/data.manager';
import HistorySection from '../HistorySection/HistorySection';

class ProfileSection extends Component {
    // constructor(props) {
    //     super(props);

    //     // this.state = {
    //     //     profile: DataManager.getProfileById(props.profileId)
    //     // }
    // }

    render() {
        let profile = DataManager.getProfileById(this.props.profileId);

        // console.log(this.props.profileId);
        // ? why props.profileId is undefined ?????
        // let profileDefaultConnections = this.props.profileId !== -1 && this.props.profileId != null ? DataManager.getProfileById(this.props.profileId).personalization.logondata : [];
        let profileDefaultConnections = this.props.profileId !== -1 /*&& this.props.profileId != null*/ ? profile.personalization.logondata : [];

        return (
            <div className="container-fluid">
                <div className="row col-12 m--1">
                    <div className="col col-6 p-0 pr-1">
                        <Card className="">
                            <Card.Header> Personal Data </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <div className="row">
                                        <div className="col-6 pr-0 m-0">
                                            <LabeledInput label="Birthday" value={profile.birthday} readOnly flush />
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col col-6 m-0 p-0 pl-1">
                        <TableCard searchable allowAdvancedFilter={false} title="Predefined Connections"
                            inputProps={{ flush: false, clearButton: false }} columns={
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
                                        type: 'bool'
                                    }
                                ]
                            }
                            items={profileDefaultConnections}
                        />
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

                {/* <div className="row col-12 m-0 p-0">
                    <TableCard searchable allowAdvancedFilter={false} title="Predefined Connections"
                        inputProps={{ flush: false, clearButton: false }} columns={
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
                                    type: 'bool'
                                }
                            ]
                        }
                        items={profileDefaultConnections}
                    />
                </div> */}

                {/* <div className="row justify-content-between m-0"> */}

                <div className="row col-12 m--1 p-0">
                    <HistorySection />
                </div>

                {/* <div className="row col-12">
                    <div className="col col-6 m-0 p-0">
                        <Card className="">
                            <Card.Header> Account Actions </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Card.Link as={Link} to="/account/change-password"> Change Password </Card.Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
// export default ProfileSection;