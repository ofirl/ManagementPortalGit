import React, { Component } from 'react';

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
    // getInitialState() {
    //     return {
    //         isClicked : false
    //     };
    // }
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
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

        if (this.props.children !== undefined) {
            linkHref = '#' + linkHref;
            navLink = (
                <a className="nav-link" href={linkHref} data-toggle="collapse" role="button" aria-expanded="false" aria-controls={this.props.href} onClick={this.handleClick}>
                    <i className={'fe fe-' + this.props.icon}></i> {this.props.text}
                </a>
            );

            subMenu = (
                <div className={"collapse" + (this.state.isClicked ? ' show' : '')} id={this.props.href}>
                    <Menu items={this.props.children} />
                </div>
            );
        }
        else {
            navLink = (
                <a className="nav-link" href={linkHref} >
                    <i className={'fe fe-' + this.props.icon}></i> {this.props.text}
                </a>
            );
        }

        return (
            <li className="nav-item">
                {navLink}
                {subMenu}
            </li>
        );
    }
    // componentDidMount() {
    //     this.setState({
    //         isClicked: false
    //     });
    //     // var element = $(ReactDOM.findDOMNode(this));
    //     // $('.collapse').collapse();
    // }
}

class Menu extends Component {
    render() {
        let menuClass = this.props.main ? 'navbar-nav mb-md-4' : 'nav nav-sm flex-column';

        let listItems = [];
        if (this.props.items !== undefined)
            listItems = this.props.items.map(function (item) {
                if (item.children !== undefined) {
                    return (
                        <MenuElement key={item.name} text={item.name} icon={item.featherIcon} href={item.href} children={item.children} />
                    );
                }
                else {
                    return (
                        <MenuElement key={item.name} text={item.name} icon={item.featherIcon} href={item.href} />
                    );
                }
            });

        return (
            <ul className={menuClass}>
                {listItems}
            </ul>
        );
    }
}

export default Menu;