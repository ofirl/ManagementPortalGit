import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './PageHeader.css';

class PageHeader extends Component {
    static Title = class Title extends Component {
        static propTypes = {
            text: PropTypes.string.isRequired,
            className: PropTypes.string
        }
        render() {
            let { className, ...others} = this.props;
            return (
                <h1 className={`header-title ${className}`} {...others}>
                    {this.props.text}
                </h1>
            );
        }
    }
    static Pretitle = class Pretitle extends Component {
        static propTypes = {
            text: PropTypes.string.isRequired,
            className: PropTypes.string
        }
        render() {
            let { className, ...others} = this.props;
            return (
                <h6 className={`header-pretitle ${className}`} {...others}>
                    {this.props.text}
                </h6>
            );
        }
    }
    static Body = class Body extends Component {
        render() {
            let { className, ...others} = this.props;
            return (
                <div className={`header-body ${className}`} {...others}>
                    {this.props.children}
                </div>
            );
        }
    }

    static propTypes = {
        className: PropTypes.string
    }
    render() {
        let { className, ...others} = this.props;
        return (
            <div className={`col mb-3 ml--3 ml-md--2 ${this.props.className}`} {...others}>
                {this.props.children}
            </div>
        );
    }
}

export default PageHeader;