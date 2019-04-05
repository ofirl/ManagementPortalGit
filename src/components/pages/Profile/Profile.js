import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as reducers from '../../../redux/reducers/profileId';

import * as actions from '../../../redux/actions'

import './Profile.css';

import { /*BrowserRouter as Router,*/ Route, Link, Switch/*, Redirect*/ } from "react-router-dom";

// import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

import Avatar from '../../Avatar/Avatar';
import PageHeader from '../../PageHeader/PageHeader';
import ProfileSection from './ProfileSection/ProfileSection';
import HistorySection from './HistorySection/HistorySection';
import Nav from 'react-bootstrap/Nav';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSection: 'profile'
        }
        this.props.boundActions.setProfile(2);
    }

    render() {
        // console.log(this.props.match.params.section);
        return (
            <div>
                <div className="header bg-dark">
                    <Image src="/assets/img/covers/profile-cover-1.jpg" className="header-img-top" alt="..." fluid />

                    <div className="container-fluid">
                        <PageHeader>
                            <PageHeader.Body className="header-body mt--5 mt-md--6" style={{ 'borderBottom': 'none' }}>
                                <div className="row align-items-end">
                                    <div className="col-auto">
                                        <Avatar size="xxl" imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded-circle border border-4 border-body" />
                                    </div>

                                    <PageHeader>
                                        <PageHeader.Pretitle text="Member" />
                                        <PageHeader.Title text="Ofir Levi" />
                                    </PageHeader>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <Nav variant="tabs" defaultActiveKey={this.props.match.params.section || "profile"}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="profile" as={Link} to={`/profilepage/profile`}>Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="history" as={Link} to={`/profilepage/history`}>History</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                            </PageHeader.Body>
                        </PageHeader>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <Switch>
                            <Route path="/profilepage/profile" component={ProfileSection} />
                            <Route path="/profilepage/history" component={HistorySection} />
                            <Route path="/" component={ProfileSection} />
                        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);