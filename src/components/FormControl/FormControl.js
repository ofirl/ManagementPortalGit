import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormControl.css';
import '../../assets/css/font-awesome.css';

import Flatpickr from 'react-flatpickr'

class GeneralFormControl extends Component {
    constructor(props) {
        super(props);

        this.innerControlRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.state = {
            // checked: props.checked
        }
    }
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.oneOf(['radio', 'checkbox']),
        checked: PropTypes.bool,
        containerClass: PropTypes.string,
        value: PropTypes.string,
        groupName: PropTypes.string,
        onChange: PropTypes.func,
        label: PropTypes.string,
        inline: PropTypes.bool,
        variant: PropTypes.string,
        children: PropTypes.any,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        checked: false,
        disabled: false,
        // value: false,
        label: " ",
        id: (Math.floor(Math.random() * (100 - 1)) + 1).toString()
    }
    componentDidUpdate(oldProps) {
        // debugger;
        // if (oldProps.checked !== this.props.checked)
        // this.setState({checked: this.props.checked});
    }

    onChange() {
        // this.setState({ checked: !this.state.checked });
        // debugger;
        this.props.onChange && this.props.onChange(this.innerControlRef.current.checked);
    }

    render() {
        let { id, type, containerClass,/* value,*/ groupName, checked, label, inline, variant, children, disabled } = this.props;

        if (checked == null)
            checked = false;

        return (
            <div className={`${containerClass} ${inline ? containerClass + "-inline" : ""} ${variant ? containerClass + "-" + variant : ""}`}>
                <input ref={this.innerControlRef} type={type} id={id} /*value={value}*/ name={groupName} checked={checked} onChange={this.onChange} disabled={disabled} />
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

class DatePicker extends Component {
    defaultProps = {
        clearButton: true
    }
    render() {
        let defaultOptions = {
            dateFormat: "d-m-Y",
            altInput: true,
            wrap: true
            // allowInput: true
        }
        let { options, clearButton, ...others } = this.props;
        options = { ...defaultOptions, ...options };

        return (
            // <Flatpickr className="form-control" options={options} {...others} />
            <Flatpickr options={options} {...others} className="col p-0">
                <div className={`input-group input-group-merge`}>
                    <input className={`form-control ${clearButton ? "form-control-appended" : "" }`} type='text' data-input />
                    {
                        clearButton ? (
                            <div className={`input-group-append`}>
                                <div className={`input-group-text`}>
                                    <span className={`fe fe-x-circle pointer`} data-clear></span>
                                </div>
                            </div>
                        )
                            : null
                    }
                </div>
            </Flatpickr>
        );
    }
}

export default GeneralFormControl;
export { Radio, Checkbox, DatePicker };