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
            return (
                <h1 className={`header-title ${this.props.className}`}>
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
            return (
                <h6 className={`header-pretitle ${this.props.className}`}>
                    {this.props.text}
                </h6>
            );
        }
    }

    static propTypes = {
        className: PropTypes.string
    }
    render() {
        return (
            <div className={`col mb-3 ml--3 ml-md--2 ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}

export default PageHeader;