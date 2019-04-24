import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormControl.css';
import '../../assets/css/font-awesome.css';

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
        children: PropTypes.any
    }
    static defaultProps = {
        checked: false,
        label: " ",
        id: (Math.floor(Math.random() * (100 - 1) ) + 1).toString()
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
        let { id, type, containerClass, value, groupName, checked, label, inline, variant, children } = this.props;

        return (
            <div className={`${containerClass} ${inline ? containerClass + "-inline" : ""} ${variant ? containerClass + "-" + variant : ""}`}>
                <input ref={this.innerControlRef} type={type} id={id} value={value} name={groupName} checked={checked} onChange={this.onChange} />
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