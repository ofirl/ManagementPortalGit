import React, { Component } from 'react';

import './Toggle.css';

import PropTypes from 'prop-types';

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.toggleCheck = this.toggleCheck.bind(this);

        this.state = {
            checked: props.defaultChecked
        }
    }
    propTypes = {
        /** Default state of the toggle */
        defaultChecked: PropTypes.bool,
        /** Toggler text */
        text: PropTypes.string,
        /** callbakc fired before state change, can return false to prevent state change */
        onBeforeChange: PropTypes.func,
        /** call back fired after state change */
        onChange: PropTypes.func
    }
    defaultProps = {
        defaultChecked: false,
        onBeforeChange: () => true
    }

    toggleCheck() {
        let changeAllowed = this.props.onBeforeChange && this.props.onBeforeChange();
        if (changeAllowed == false)
            return;

        this.setState({
            checked: !this.state.checked
        });
        this.props.onChange && this.props.onChange();
    }

    render() {
        return (
            <button class={`dk-switch ${this.state.checked ? 'dk-switch-checked' : ''}`} onClick={this.toggleCheck}>
                <span class="dk-switch-inner">
                    {this.props.text}
                </span>
            </button>
        );
    }
}

export default Toggle;