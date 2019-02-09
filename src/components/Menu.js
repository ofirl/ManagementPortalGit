import React, { Component } from 'react';
// import { CSSTransitionGroup, TransitionGroup, Transition } from 'react-transition-group';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';

import AnimatedComponent from './AnimatedComponent';

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

        return (
            // <TransitionGroup>
            //     <Transition
            // key={num}
            //     timeout={500}
            //     mountOnEnter
            //     unmountOnExit
            // >
            <li className="nav-item" ref={this.myRef}>
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
                    'max-height': ['0', ((props.items ? props.items.length + 1 : 1) * 40) + 'px'],
                    elasticity: 300,
                    duration: 500
                },
                exiting: {
                    'max-height': [((props.items ? props.items.length + 1 : 1) * 40) + 'px', '0'],
                    elasticity: 300,
                    duration: 500
                }
            }
        };
        this.myRef = React.createRef();
    }
    componentDidMount() {
        let currentHeight = this.myRef.current.scrollHeight;
        this.setState({ height: currentHeight });

        console.log('currentHeight : ' + this.props.name);
        console.log(currentHeight);
        // this.setState({
        //     menuAnimation: {
        //         enterTimeout: 500,
        //         exitTimeout: 500,
        //         entering: {
        //             'max-height': ['0', '100px'],
        //             //elasticity: 300,
        //             duration: 500
        //         },
        //         exiting: {
        //             translateX: ['0%', '100%'],
        //             elasticity: 0,
        //             duration: 500
        //         }
        //     }
        // });

        this.forceUpdate();
        // this.menuAnimation2 = {
        //     type: 'timeline',
        //     enterTimeout: 500,
        //     exitTimeout: 500,
        //     timeline: [
        //         {
        //             attr: {
        //                 easing: 'easeOutExpo',
        //                 duration: 750
        //             }
        //         },
        //         {
        //             attr: {
        //                 targets: ':nth-child(1)',
        //                 translateX: ['-100%', '0%'],
        //                 elasticity: 300,
        //                 duration: 500
        //             }
        //         },
        //         {
        //             attr: {
        //                 targets: ':nth-child(2)',
        //                 translateX: ['-100%', '0%'],
        //                 elasticity: 300,
        //                 duration: 500
        //             },
        //             offset: '+=600'
        //         },
        //         {
        //             attr: {
        //                 targets: ':nth-child(3)',
        //                 translateX: ['-100%', '0%'],
        //                 elasticity: 300,
        //                 duration: 500
        //             },
        //             offset: '0'
        //         }
        //     ]
        // }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ show: nextProps.show });
    }
    render() {
        let menuClass = this.props.main ? 'navbar-nav' : 'nav nav-sm flex-column';

        let listItems = [];
        if (this.props.items !== undefined) {
            let that = this;
            listItems = this.props.items.map(function (item) {
                let elementProps = {};
                if (item.children !== undefined) {
                    elementProps['children'] = item.children;
                }

                return (
                    <AnimatedComponent key={item.name} in={that.state.show} eff={that.state.menuAnimation}>
                        <MenuElement key={item.name} text={item.name} icon={item.featherIcon} href={item.href} badge={item.badge} badgeText={item.badgeText} {...elementProps} />
                    </AnimatedComponent>
                );
            })
        };

        return (
            <ul className={menuClass} ref={this.myRef}>
                <AnimatedComponent key={this.props.name} in={this.state.show} eff={this.state.menuAnimation}>
                    {listItems}
                </AnimatedComponent>
            </ul>
        );
    }
}

export default Menu;
export { Heading, Divider };