import React, { Component } from 'react';

import './Sidebar.css'

import { /*BrowserRouter as Router, Route,*/ Link/*, Switch, Redirect*/ } from "react-router-dom";

// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';

import Menu, { Heading, Divider, MenuElement } from '../Menu/Menu';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import humanizeDuration from 'humanize-duration';
import DataManager from './../../assets/js/data.manager';
import Input from '../Input/Input';

class SearchComp extends Component {
    constructor(props) {
        super(props);

        this.searchInputRef = React.createRef();

        this.searchTermChanged = this.searchTermChanged.bind(this);
        this.getItemsLeaves = this.getItemsLeaves.bind(this);

        this.state = {
            searchTerm: ''
        }
    }

    searchTermChanged(value) {
        this.setState({ searchTerm: value });
    }
    getItemsLeaves(roots) {
        let leaves = [];

        roots.forEach(item => {
            if (item.children != null) {
                leaves = leaves.concat(this.getItemsLeaves(item.children));
                leaves = leaves.concat(item);
            }
            else
                leaves.push(item);
        });
        
        return leaves;
    }

    render() {
        return (
            <div className="navbar-vertical navbar-light">
                <Input icon="search" onInput={this.searchTermChanged} ref={this.searchInputRef} focus/>
                <ul className="navbar-nav">

                    {
                        this.getItemsLeaves(this.props.menuItems).filter((i) => i.name.match(new RegExp(this.state.searchTerm, "i"))).map((i) => {
                            let elementProps = {
                                key: i.name,
                                text: i.name,
                                icon: i.featherIcon,
                                href: i.href,
                                variant: i.variant,
                                badge: i.badge,
                                badgeText: i.badgeText,
                                onRedirect: this.props.closeFunc
                            };
                            if (i.children !== undefined) {
                                elementProps['children'] = i.children;
                            }

                            return <MenuElement {...elementProps} />;
                        })
                    }
                </ul>
            </div>
        );
    }
}

class StrongText extends Component {
    render() {
        return (
            <strong className="text-body inline"> {this.props.children} </strong>
        );
    }
}

class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.formatDuration = this.formatDuration.bind(this);
        this.humanizer = humanizeDuration.humanizer({
            language: 'shortEn',
            largest: 1,
            spacer: '',
            languages: {
                shortEn: {
                    y: () => 'y',
                    mo: () => 'mo',
                    w: () => 'w',
                    d: () => 'd',
                    h: () => 'h',
                    m: () => 'm',
                    s: () => 's',
                    ms: () => 'ms',
                }
            }
        });
    }

    static Who = (props) => (
        <StrongText> {props.children} </StrongText>
    )
    static What = (props) => (
        <span className="inline">
            {props.desc} <StrongText> {props.children} </StrongText>
        </span>
    )
    formatDuration(datetime) {
        return this.humanizer(Date.now() - datetime);
    }

    render() {
        let { badgeColor, badgeText, when } = this.props;
        return (
            <div className="row">
                <Avatar imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" size="sm" className="mr-4" />
                <div className="col">
                    <div className="row mb-1">
                        <Badge variant={badgeColor}> {badgeText} </Badge>
                    </div>
                    <div className="row small text-muted">
                        <span>
                            {this.props.children}
                        </span>
                    </div>
                </div>
                <div className="col-auto align-items-center d-flex">
                    <div className="small text-muted">
                        {this.formatDuration(when)}
                    </div>
                </div>
            </div>
        );
    }
}

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.toggleTopMenuCollapse = this.toggleTopMenuCollapse.bind(this);
        this.toggleShowNotifications = this.toggleShowNotifications.bind(this);
        this.toggleShowSearch = this.toggleShowSearch.bind(this);

        this.state = {
            topMenuIn: false,
            showNotifications: false,
            showSearch: false
        }
    }
    toggleTopMenuCollapse() {
        // console.log('toggle');
        this.setState({
            topMenuIn: !this.state.topMenuIn
        });
    }
    toggleShowNotifications() {
        this.setState({
            showNotifications: !this.state.showNotifications
        });
    }
    toggleShowSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        });
    }

    render() {
        let { showNotifications, showSearch } = this.state;
        let menuItems = DataManager.getMenuItems();

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
                            <Dropdown.Toggle className="dropdown-avatar-toggle">
                                <Avatar imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" size="sm" online={true} />
                            </Dropdown.Toggle>
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
                            <Menu show={true} name={'mainMenu'} main={true} onRedirect={this.toggleTopMenuCollapse} items={menuItems} />

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

                                <Icon type="bell" className="navbar-user-link pointer" onClick={this.toggleShowNotifications} />

                                <Dropdown drop="up">
                                    <Dropdown.Toggle className="dropdown-avatar-toggle">
                                        <Avatar imgSrc="/assets/img/avatars/profiles/avatar-1.jpg" size="sm" online={true} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} key="Profile" to="/profilepage"> Profile </Dropdown.Item>
                                        <Dropdown.Item as={Link} key="Settings" to="/settings" > Settings </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} key="Logout" to="/logout"> Logout </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Icon type="search" className="navbar-user-link pointer" onClick={this.toggleShowSearch} />

                            </div>

                            <Modal className="position-fixed modal-dialog-m-0 p-0 col-2" style={{ left: '0', top: '0', bottom: '0', background: '#152e4d' }} show={showNotifications} onHide={this.toggleShowNotifications}>
                                <Modal.Header closeButton>
                                    Notifications
                                </Modal.Header>
                                <Modal.Body className="col">
                                    {
                                        DataManager.getNotifications().map((n) => (
                                            <NotificationItem badgeColor={n.badgeColor} badgeText={n.badgeText} when={new Date(n.when)}>
                                                <NotificationItem.Who> {DataManager.getProfileById(n.who).firstname + " " + DataManager.getProfileById(n.who).lastname} </NotificationItem.Who>
                                                <NotificationItem.What desc={n.whatDesc}> {n.what} </NotificationItem.What>
                                            </NotificationItem>
                                        )).reduce((result, element, index, array) => {
                                            result.push(element);
                                            if (index < array.length - 1)
                                                result.push(<hr />);

                                            return result;
                                        }, [])
                                    }

                                </Modal.Body>
                            </Modal>

                            <Modal className="position-fixed modal-dialog-m-0 p-0 col-2" style={{ left: '0', top: '0', bottom: '0', background: '#152e4d' }} show={showSearch} onHide={this.toggleShowSearch}>
                                <Modal.Header closeButton>
                                    Search
                                </Modal.Header>
                                <Modal.Body className="col p-0">
                                    <SearchComp menuItems={menuItems} closeFunc={this.toggleShowSearch} />
                                </Modal.Body>
                            </Modal>

                        </div>
                        {/* <!-- / .navbar-collapse --> */}
                    </Collapse>

                </div>
            </nav>
        );
    }
}

export default Sidebar;