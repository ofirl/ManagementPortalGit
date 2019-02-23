import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Collapse from 'react-bootstrap/Collapse'
import Badge from 'react-bootstrap/Badge'

import { animateComponent } from './AnimatedComponent';

import './Menu.css'

function Heading(props) {
    return (
        <h6 className="navbar-heading">
            {props.heading}
        </h6>

    );
}

function Divider(props) {
    return (
        <hr className="navbar-divider my-3" />
    );
}

class MenuElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.myRef = React.createRef();
    }
    handleClick() {
        this.setState({
            isClicked: !this.state.isClicked
        });
    }
    render() {
        let linkHref = this.props.href;
        let navLink;
        let subMenu = null;
        let badge = null;

        // badge
        if (this.props.badge !== undefined) {
            badge = (
                <Badge variant={this.props.badge} className="ml-auto"> {this.props.badgeText} </Badge>
            );
        }

        // navlink & submenu
        let icon = null;
        if (this.props.icon != null) {
            icon = (<i className={'fe fe-' + this.props.icon}></i>);
        }

        let innerNavLink = [icon, this.props.text, badge];

        let attr = {};
        if (this.props.children != null) {
            attr['data-toggle'] = 'collapse';
            attr['aria-expanded'] = this.state.isClicked;
            attr['onClick'] = this.handleClick;
            // attr['to'] = ``;
            // linkHref = '#' + linkHref;

            subMenu = <Menu show={this.state.isClicked} items={this.props.children} />;

            navLink = (
                <a className="nav-link pointer" href={linkHref} {...attr}>
                    {icon} {this.props.text}
                    {badge}
                </a>
            );
        }
        else {
            attr['to'] = `/${linkHref}`;

            navLink = (
                <Link className="nav-link" {...attr}>
                    {icon} {this.props.text}
                    {badge}
                </Link>
            );
        }

        let classes = ['nav-item'];
        let styles = {};
        if (this.props.animationClassName != null)
            classes = classes.concat(this.props.animationClassName);
        if (this.props.animationStyle != null)
            styles = { ...styles, ...this.props.animationStyle }

        return (
            <li className={classes.join(' ')} style={styles} ref={this.myRef}>
                {navLink}
                {subMenu}
            </li>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show == null ? false : props.show,
            height: 0
        };
        this.myRef = React.createRef();
        this.animatedItem = animateComponent(MenuElement);
    }
    static propTypes = {
        /** show the menu */
        show: PropTypes.bool,
        /** name for the menu (will be used also as key) */
        name: PropTypes.string,
        /** this menu is a main menu and will be styled accordingly */
        main: PropTypes.bool,
        /** menu items */
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            featherIcon: PropTypes.string,
            href: PropTypes.string,
            badge: PropTypes.string,
            badgeText: PropTypes.string,
            children: PropTypes.arrayOf(PropTypes.object)
        }))
    }
    static defaultProps = {
        show: false,
        name: 'noName',
        main: false,
        items: [],
        menuAnimation: {
            timeout: {
                enter: 350,
                exit: 350
            },
            enter: {
                type: ['class'],
                className: 'example-appear'
            },
            entering: {
                type: ['class', 'height'],
                className: 'example-appear-active'
            },
            exit: {
                type: ['class', 'height'],
                className: 'example-leave',
            },
            exiting: {
                type: ['class', 'height'],
                className: 'example-leave-active'
            }
        }
    }
    componentDidMount() {
        let currentHeight = this.myRef.current.scrollHeight;
        this.setState({ height: currentHeight });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ show: nextProps.show });
    }
    render() {
        let menuClass = this.props.main ? 'navbar-nav' : 'nav nav-sm flex-column';

        let AnimatedMenuElement = this.animatedItem;

        let listItems = [];
        if (this.props.items !== undefined) {
            let that = this;
            listItems = this.props.items.map(function (item) {
                let elementProps = {};
                if (item.children !== undefined) {
                    elementProps['children'] = item.children;
                }

                return (
                    <MenuElement key={item.name} text={item.name} icon={item.featherIcon} href={item.href} badge={item.badge} badgeText={item.badgeText} {...elementProps} />
                );
            })
        };

        return (
            <ul className={menuClass} ref={this.myRef}>
                <Collapse in={this.state.show} timeout={350}>
                    <div>
                        {listItems}
                    </div>
                </Collapse>
            </ul>
        );
    }
}

export default Menu;
export { Heading, Divider };