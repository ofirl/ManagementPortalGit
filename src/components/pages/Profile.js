import React, { Component } from 'react';

import './Profile.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Avatar from '../Avatar';
import PageHeader from '../PageHeader';
import ProfileSection from './ProfileSection';
import HistorySection from './HistorySection';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSection: 'profile'
        }
    }

    render() {
        return (
            <div>
                <div className="header bg-dark">
                    <Image src="/assets/img/covers/profile-cover-1.jpg" className="header-img-top" alt="..." fluid />

                    <div className="container-fluid">
                        <div className="header-body mt--5 mt-md--6" style={{ 'borderBottom': 'none' }}>
                            <div className="row align-items-end">
                                <div className="col-auto">
                                    <Avatar size="xxl" imgSrc="assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded-circle border border-4 border-body" />
                                </div>

                                <PageHeader>
                                    <PageHeader.Pretitle text="Member" />
                                    <PageHeader.Title text="Ofir Levi" />
                                </PageHeader>

                            </div>
                            <div className="row align-items-center">
                                <div className="col">
                                    <Tabs defaultActiveKey="profile" onSelect={key => this.setState({ currentSection: key })}>
                                        <Tab eventKey="profile" title="Profile" />
                                        <Tab eventKey="history" title="History" />
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="container-fluid">
                    <div className="row">
                        <Switch location={{ pathname: `/${this.state.currentSection}` }}>
                            <Route path="/profile" component={ProfileSection} />
                            <Route path="/history" component={HistorySection} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;