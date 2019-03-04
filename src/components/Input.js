import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.css';

import Form from 'react-bootstrap/Form';

class Input extends Component {
    static Feedback = class Feedback extends Component {
        static propType = {
            /** feedback type */
            type: PropTypes.oneOf(['valid', 'invalid']),
            style: PropTypes.oneOf(['text', 'tooltip']),
            position: PropTypes.oneOf(['top', 'bottom']),
            text: PropTypes.string
        }
        static defaultProps = {
            type: 'valid',
            style: 'text',
            position: 'top',
            text: 'Error'
        }
        render() {
            let { type, style, position, text, children } = this.props;

            return (
                <Form.Control.Feedback type={type}>
                    <div className={`feedback-${style}-${position}`}>
                        {children}
                    </div>
                </Form.Control.Feedback>
            );
        }
    }

    constructor(props) {
        super(props);

        this.onInput = this.onInput.bind(this);
        this.clearInput = this.clearInput.bind(this);

        this.inputRef = React.createRef();
    }
    static propType = {
        /** icon for the input field */
        icon: PropTypes.string,
        /** size control */
        size: PropTypes.oneOf(['sm', 'lg']),
        /** icon position */
        prepend: PropTypes.bool,
        /** flush input */
        flush: PropTypes.bool,
        /** callback fired when onInput is called */
        onInput: PropTypes.func,
        /** is valid indicator - control styling */
        valid: PropTypes.bool,
        /** clear button will be present */
        clearButton: PropTypes.bool
    }
    static defaultProps = {
        prepend: false,
        flush: false,
        placeholder: '',
        clearButton: false
    }
    onInput(e) {
        e.preventDefault && e.preventDefault();

        // console.log(e.target.value);
        this.props.onInput && this.props.onInput(e.target.value, e);
    }
    clearInput() {
        this.inputRef.current.value = '';
        this.onInput({target: this.inputRef.current});
    }

    render() {
        let { icon, prepend, flush, onInput, className, size, valid, clearButton, ...others } = this.props;
        let isInvalid = valid == false;
        let isValid = valid == true;

        let inputIconClass = '';
        if (icon != null)
            inputIconClass = prepend ? 'form-control-prepended' : 'form-control-appended';

        return (
            <div className={`input-group input-group-merge ${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`}>
                <input ref={this.inputRef} type="text" placeholder={`${this.props.placeholder}`} onInput={this.onInput} {...others}
                    className={`form-control ${inputIconClass} ${flush ? 'form-control-flush' : ''} 
                    ${size ? `form-control-${size}` : ''} ${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''} ${className}`} />
                {
                    icon != null ? (
                        <div className={`input-group-${prepend ? 'prepend' : 'append'}`}>
                            <div className={`input-group-text ${flush ? 'form-control-flush' : null}`}>
                                <span className={`fe fe-${icon}`}></span>
                            </div>
                        </div>
                    ) : null
                }
                {
                    clearButton ? (
                        <div className={`input-group-append`}>
                            <div className={`input-group-text ${flush ? 'form-control-flush' : null}`}>
                                <span className={`fe fe-x-circle pointer`} onClick={this.clearInput}></span>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Input;