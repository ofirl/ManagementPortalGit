import React, { Component } from 'react';

import './Sidebar.css'

import Menu, { Heading, Divider } from './Menu';

// function Heading(props) {
//     return (
//         <h6 className="navbar-heading">
//             {props.heading}
//         </h6>

//     );
// }

// function Divider(props) {
//     return (
//         <hr className="navbar-divider my-3" />
//     );
// }

class Sidebar extends Component {
    render() {
        return (
            <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
                <div className="container-fluid">

                    {/* Brand */}
                    <a className="navbar-brand" href="index-2.html">
                        <img src="./assets/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
                    </a>

                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        {/* Navigation */}
                        <Menu show={true} name={'mainMenu'} main={true} items={
                            [
                                {
                                    name: 'Dashboards',
                                    featherIcon: 'home',
                                    href: 'sidebarDashboards',
                                    children: [
                                        {
                                            name: 'Default',
                                            href: 'index.html'
                                        },
                                        {
                                            name: 'Alternative',
                                            href: 'index.html',
                                            badge: 'soft-success',
                                            badgeText: 'New'
                                        }
                                    ]
                                },
                                {
                                    name: 'Scripts',
                                    featherIcon: 'code',
                                    href: 'sidebarScripts',
                                    children: [
                                        {
                                            name: 'General',
                                            href: 'sidebarScriptsGeneral',
                                            badge: 'soft-success',
                                            badgeText: 'New',
                                            children: [
                                                {
                                                    name: 'Add User Mapping',
                                                    href: 'script-input.html?script-id=0',
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
                                name: 'Getting Started',
                                featherIcon: 'clipboard',
                                href: 'getting-started.html'
                            },
                            {
                                name: 'Components',
                                featherIcon: 'book-open',
                                href: 'sidebarComponents',
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
                                    }
                                ]
                            }
                        ]} />

                        {/* Navigation */}
                        <ul className="navbar-nav mb-md-4">
                            <li className="nav-item">
                                <a className="nav-link " href="getting-started.html">
                                    <i className="fe fe-clipboard"></i> Getting started
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#sidebarComponents" data-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarComponents">
                                    <i className="fe fe-book-open"></i> Components
                                </a>
                                <div className="collapse " id="sidebarComponents">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a href="components.html#alerts" className="nav-link">
                                                Alerts
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#avatars" className="nav-link">
                                                Avatars
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#badges" className="nav-link">
                                                Badges
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#breadcrumb" className="nav-link">
                                                Breadcrumb
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#buttons" className="nav-link">
                                                Buttons
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#button-group" className="nav-link">
                                                Button group
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#cards" className="nav-link">
                                                Cards
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#charts" className="nav-link">
                                                Charts
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#dropdowns" className="nav-link">
                                                Dropdowns
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#forms" className="nav-link">
                                                Forms
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#icons" className="nav-link">
                                                Icons
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#lists" className="nav-link">
                                                Lists
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#loaders" className="nav-link">
                                                Loaders
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#modal" className="nav-link">
                                                Modal
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#navs" className="nav-link">
                                                Navs
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#navbarExample" className="nav-link">
                                                Navbar
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#page-headers" className="nav-link">
                                                Page headers
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#pagination" className="nav-link">
                                                Pagination
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#popovers" className="nav-link">
                                                Popovers
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#progress" className="nav-link">
                                                Progress
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#social-posts" className="nav-link">
                                                Social post
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#tables" className="nav-link">
                                                Tables
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#tooltips" className="nav-link">
                                                Tooltips
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#typography" className="nav-link">
                                                Typography
                                    </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="components.html#utilities" className="nav-link">
                                                Utilities
                                    </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="changelog.html">
                                    <i className="fe fe-git-branch"></i> Changelog <span className="badge badge-primary ml-auto">v1.3.1</span>
                                </a>
                            </li>
                        </ul>

                        {/* <!-- Push content down --> */}
                        <div className="mt-auto"></div>

                        {/* <!-- Customize --> */}
                        <a href="#modalDemo" className="btn btn-block btn-primary mb-4" data-toggle="modal">
                            <i className="fe fe-sliders mr-2"></i> Customize
                </a>

                        {/* <!-- User (md) --> */}
                        <div className="navbar-user d-none d-md-flex" id="sidebarUser">

                            {/* <!-- Icon --> */}
                            <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
                                <span className="icon">
                                    <i className="fe fe-bell"></i>
                                </span>
                            </a>

                            {/* <!-- Dropup --> */}
                            <div className="dropup">

                                {/* <!-- Toggle --> */}
                                <a href="#!" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="./assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle"
                                            alt="..." />
                                    </div>
                                </a>

                                {/* <!-- Menu --> */}
                                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                                    <a href="profile-posts.html" className="dropdown-item">Profile</a>
                                    <a href="settings.html" className="dropdown-item">Settings</a>
                                    <hr className="dropdown-divider" />
                                    <a href="sign-in.html" className="dropdown-item">Logout</a>
                                </div>

                            </div>

                            {/* <!-- Icon --> */}
                            <a href="#sidebarModalSearch" className="navbar-user-link" data-toggle="modal">
                                <span className="icon">
                                    <i className="fe fe-search"></i>
                                </span>
                            </a>

                        </div>


                    </div>
                    {/* <!-- / .navbar-collapse --> */}

                </div>
            </nav>
        );
    }
}

export default Sidebar;