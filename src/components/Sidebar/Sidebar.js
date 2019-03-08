import React, { Component } from 'react';

import './Sidebar.css'

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';

import Menu, { Heading, Divider } from '../Menu/Menu';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.toggleTopMenuCollapse = this.toggleTopMenuCollapse.bind(this);

        this.state = {
            topMenuIn: false
        }
    }
    toggleTopMenuCollapse() {
        console.log('toggle');
        this.setState({
            topMenuIn: !this.state.topMenuIn
        });
    }

    render() {
        return (
            <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
                <div className="container-fluid">

                    <span className="navbar-toggler-icon d-md-none pointer" onClick={this.toggleTopMenuCollapse}></span>

                    {/* Brand */}
                    <Link to="/" className="navbar-brand">
                        <img src="/assets/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
                    </Link>

                    {/* <!-- User (md) --> */}
                    <div className="navbar-user d-md-none">

                        <Icon type="search" className="navbar-user-link pointer mr-3" />
                        <Icon type="bell" className="navbar-user-link pointer mr-3" />

                        <Dropdown drop="left">
                            <Dropdown.Toggle as={Avatar} imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" size="sm" online={true} />
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} key="Profile" to="/profilepage"> Profile </Dropdown.Item>
                                <Dropdown.Item as={Link} key="Settings" to="/settings" > Settings </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} key="Logout" to="/logout"> Logout </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                    <Collapse in={this.state.topMenuIn} timeout={1}>

                        {/* Collapse */}
                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            {/* Navigation */}
                            <Menu show={true} name={'mainMenu'} main={true} onRedirect={this.toggleTopMenuCollapse} items={
                                [
                                    {
                                        name: 'Dashboards',
                                        featherIcon: 'home',
                                        // href: 'sidebarDashboards',
                                        children: [
                                            {
                                                name: 'Default',
                                                href: 'dashboard'
                                            },
                                            {
                                                name: 'Alternative',
                                                href: 'dashboard2',
                                                badge: 'soft-success',
                                                badgeText: 'New'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'Scripts',
                                        featherIcon: 'code',
                                        // href: 'sidebarScripts',
                                        children: [
                                            {
                                                name: 'General',
                                                // href: 'sidebarScriptsGeneral',
                                                badge: 'soft-success',
                                                badgeText: 'New',
                                                children: [
                                                    {
                                                        name: 'Add User Mapping',
                                                        href: 'script-input/0',
                                                        badge: 'soft-success',
                                                        badgeText: 'New',
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            } />

                            <Divider />
                            <Heading heading={'Documentation'} />

                            <Menu show={true} name={'documentationMenu'} main={true} items={[
                                {
                                    name: 'Getting started',
                                    featherIcon: 'clipboard',
                                    href: 'getting-started.html'
                                },
                                {
                                    name: 'Components',
                                    featherIcon: 'book-open',
                                    children: [
                                        {
                                            name: 'Alerts',
                                            href: 'components.html#alerts'
                                        },
                                        {
                                            name: 'Avatars',
                                            href: 'components.html#avatars'
                                        },
                                        {
                                            name: 'Badges',
                                            href: 'components.html#badges'
                                        },
                                        {
                                            name: 'Breadcrumb',
                                            href: 'components.html#breadcrumb'
                                        },
                                        {
                                            name: 'Buttons',
                                            href: 'components.html#buttons'
                                        },
                                        {
                                            name: 'Button group',
                                            href: 'components.html#button-group'
                                        },
                                        {
                                            name: 'Cards',
                                            href: 'components.html#cards'
                                        },
                                        {
                                            name: 'Charts',
                                            href: 'components.html#charts'
                                        },
                                        {
                                            name: 'Dropdowns',
                                            href: 'components.html#dropdowns'
                                        },
                                        {
                                            name: 'Forms',
                                            href: 'components.html#forms'
                                        },
                                        {
                                            name: 'Icons',
                                            href: 'components.html#icons'
                                        },
                                        {
                                            name: 'Lists',
                                            href: 'components.html#lists'
                                        },
                                        {
                                            name: 'Loaders',
                                            href: 'components.html#loaders'
                                        },
                                        {
                                            name: 'Modal',
                                            href: 'components.html#modal'
                                        },
                                        {
                                            name: 'Navs',
                                            href: 'components.html#navs'
                                        },
                                        {
                                            name: 'Navbar',
                                            href: 'components.html#navbarExample'
                                        },
                                        {
                                            name: 'Page headers',
                                            href: 'components.html#page-headers'
                                        },
                                        {
                                            name: 'Pagination',
                                            href: 'components.html#pagination'
                                        },
                                        {
                                            name: 'Popovers',
                                            href: 'components.html#popovers'
                                        },
                                        {
                                            name: 'Progress',
                                            href: 'components.html#progress'
                                        },
                                        {
                                            name: 'Social post',
                                            href: 'components.html#social-posts'
                                        },
                                        {
                                            name: 'Tables',
                                            href: 'components.html#tables'
                                        },
                                        {
                                            name: 'Tooltips',
                                            href: 'components.html#tooltips'
                                        },
                                        {
                                            name: 'Typography',
                                            href: 'components.html#typography'
                                        },
                                        {
                                            name: 'Utilities',
                                            href: 'components.html#utilities'
                                        }
                                    ]
                                },
                                {
                                    name: 'Changelog',
                                    href: 'changelog.html',
                                    featherIcon: 'git-branch',
                                    badge: 'primary',
                                    badgeText: 'v1.3.1'
                                }
                            ]} />



                            {/* <!-- Push content down --> */}
                            <div className="mt-auto mb-4"></div>

                            {/* <Button variant="primary" href="#modalDemo" className="mb-4">
                                <Icon type="sliders" className="mr-2" inline /> Customize
                            </Button> */}

                            {/* <!-- User (md) --> */}
                            <div className="navbar-user d-none d-md-flex" id="sidebarUser">

                                <Icon type="bell" className="navbar-user-link pointer" />

                                <Dropdown drop="up">
                                    <Dropdown.Toggle as={Avatar} imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" size="sm" online={true} />
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} key="Profile" to="/profilepage"> Profile </Dropdown.Item>
                                        <Dropdown.Item as={Link} key="Settings" to="/settings" > Settings </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} key="Logout" to="/logout"> Logout </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Icon type="search" className="navbar-user-link pointer" />

                            </div>


                        </div>
                        {/* <!-- / .navbar-collapse --> */}
                    </Collapse>

                </div>
            </nav>
        );
    }
}

export default Sidebar;