import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);

        this.onInput = this.onInput.bind(this);
    }
    static propType = {
        /** icon for the input field */
        icon: PropTypes.string,
        /** icon position */
        prepend: PropTypes.bool,
        /** flush input */
        flush: PropTypes.bool,
        /** callback fired when onInput is called */
        onInput: PropTypes.func
    }
    static defaultProps = {
        prepend: false,
        flush: false,
        placeholder: ''
    }
    onInput(e) {
        e.preventDefault();

        // console.log(e.target.value);
        this.props.onInput && this.props.onInput(e.target.value, e);
    }

    render() {
        let { icon, prepend, flush, onInput, className, ...others} = this.props;
        let inputIconClass = '';
        if (icon != null)
            inputIconClass = prepend ? 'form-control-prepended' : 'form-control-appended';

        return (
            <div className="input-group input-group-merge">
                <input type="text" className={`form-control ${inputIconClass} ${this.props.flush ? 'form-control-flush' : null} ${className}`} placeholder={`${this.props.placeholder}`} onInput={this.onInput} {...others} />
                {
                    icon != null ? (
                        <div className={`input-group-${prepend ? 'prepend' : 'append'}`}>
                            <div className={`input-group-text ${flush ? 'form-control-flush' : null}`}>
                                <span className={`fe fe-${icon}`}></span>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Input;