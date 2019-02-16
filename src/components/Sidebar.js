import React, { Component } from 'react';

import './Sidebar.css'

import Menu, { Heading, Divider } from './Menu';
import Avatar from './Avatar';

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
                                    <Avatar imgSrc="./assets/img/avatars/profiles/avatar-1.jpg" size="sm" online={true} />
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