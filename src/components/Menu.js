import React, { Component } from 'react';
// import { CSSTransitionGroup, TransitionGroup, Transition } from 'react-transition-group';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import anime from 'animejs';

import AnimatedComponent, { animateComponent } from './AnimatedComponent';

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
                <span className={`badge badge-${this.props.badge} ml-auto`}>{this.props.badgeText}</span>
            );
        }

        // navlink & submenu
        let attr = {};
        if (this.props.children !== undefined) {
            attr['data-toggle'] = 'collapse';
            attr['aria-expanded'] = this.state.isClicked;
            attr['onClick'] = this.handleClick;
            linkHref = '#' + linkHref;

            // console.log(this.state.isClicked);
            // submenu
            // if (this.state.isClicked)
            subMenu = <Menu show={this.state.isClicked} items={this.props.children} />;
        }

        navLink = (
            <a className="nav-link" href={linkHref} {...attr}>
                <i className={'fe fe-' + this.props.icon}></i> {this.props.text}
                {badge}
            </a>
        );

        let classes = ['nav-item'];
        let styles = {};
        if (this.props.animationClassName != null)
            classes = classes.concat(this.props.animationClassName);
        if (this.props.animationStyle != null)
            styles = {...styles, ...this.props.animationStyle}
        // if (this.props.animationClassName != null)
        //     classes = classes.concat(this.props.animationClassName);
        // if (this.props.animationtStyle != null)
        //     styles = styles.concat(this.props.animationtStyle);

        return (
            // <TransitionGroup>
            //     <Transition
            // key={num}
            //     timeout={500}
            //     mountOnEnter
            //     unmountOnExit
            // >
            <li className={classes.join(' ')} style={styles} ref={this.myRef}>
                {navLink}
                {subMenu}
            </li>
            //     </Transition>
            // </TransitionGroup>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show == null ? false : props.show,
            height: 0,
            menuAnimation: {
                enterTimeout: 500,
                exitTimeout: 500,
                entering: {
                    timeout: 500,
                    'max-height': ['0', ((props.items ? props.items.length + 1 : 1) * 40) + 'px'],
                    elasticity: 300,
                    duration: 500
                },
                exiting: {
                    // type: 'class',
                    // className: 'example-leave example-leave-active',
                    timeout: 500,
                    'max-height': [((props.items ? props.items.length + 1 : 1) * 40) + 'px', '0'],
                    elasticity: 300,
                    duration: 500
                }
            }
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
            name: PropTypes.string,
            featherIcon: PropTypes.string,
            href: PropTypes.string,
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

                // let AnimatedMenuElement = animateComponent(MenuElement);
                
                return (
                        <AnimatedMenuElement key={item.name} in={that.state.show} menuAnimation={that.props.menuAnimation} text={item.name} icon={item.featherIcon} href={item.href} badge={item.badge} badgeText={item.badgeText} {...elementProps} />
                    // <AnimatedComponent key={item.name} in={that.state.show} eff={that.state.menuAnimation}>
                    //     <MenuElement key={item.name} text={item.name} icon={item.featherIcon} href={item.href} badge={item.badge} badgeText={item.badgeText} {...elementProps} />
                    // </AnimatedComponent>
                );
            })
        };

        return (
            <ul className={menuClass} ref={this.myRef}>
                
                {/* <AnimatedComponent key={this.props.name} in={this.state.show} eff={this.state.menuAnimation}> */}
                    {listItems}
                {/* </AnimatedComponent> */}

                {/* <Transition timeout={1000} in={this.state.show} unmountOnExit>
                    {
                        (status) => (
                            <MenuElement key="test" text={status} href="#" />
                        )
                    }
                </Transition> */}
            </ul>
        );
    }
}

export default Menu;
export { Heading, Divider };