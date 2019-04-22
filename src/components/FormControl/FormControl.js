import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormControl.css';

class GeneralFormControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        }
    }
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.oneOf(['radio', 'checkbox']),
        checked: PropTypes.bool,
        containerClass: PropTypes.string,
        value: PropTypes.string,
        groupName: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func,
        label: PropTypes.string,
        inline: PropTypes.bool,
        variant: PropTypes.string,
        children: PropTypes.any
    }
    static defaultProps = {
        checked: false,
        label: " ",
        id: Math.floor(Math.random() * (100 - 1) ) + 1
    }

    onChange() {
        this.setState({ checked: !this.state.checked });
        this.props.onChange && this.props.onChange(this.state.checked);
    }

    render() {
        let { id, type, containerClass, value, groupName, checked, onChange, label, inline, variant, children } = this.props;

        return (
            <div className={`${containerClass} ${inline ? containerClass + "-inline" : ""} ${variant ? containerClass + "-" + variant : ""}`}>
                <input type={type} id={id} value={value} name={groupName} checked={checked} onChange={onChange} />
                {
                    label ?
                        <label for={id}> {label} </label>
                        : children
                }
            </div>
        );
    }
}

class Radio extends Component {
    render() {
        let { type, containerClass, ...others } = this.props;

        return (
            <GeneralFormControl type="radio" containerClass="radio" {...others} />
        );
    }
}

class Checkbox extends Component {
    render() {
        let { type, containerClass, ...others } = this.props;

        return (
            <GeneralFormControl type="checkbox" containerClass="checkbox" {...others} />
        );
    }
}

export default GeneralFormControl;
export { Radio, Checkbox };