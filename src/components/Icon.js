import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {
    static propTypes = {
        /** class prefix - this is an escape hatch */
        bsPrefix: PropTypes.string.isRequired,
        /** href for the icon (will always render a span) */
        href: PropTypes.string,
        /** passed directly to the underlying element (<a> in case of href, <span> if not inline and <i> if inline) */
        className: PropTypes.string,
        /** icon type */
        type: PropTypes.string.isRequired,
        /** a callback fired when the icon is clicked */
        onClick: PropTypes.func,
        /** inline icon will not render a span */
        inline: PropTypes.bool
    }
    static defaultProps = {
        bsPrefix: 'fe',
        inline: false
    }

    render() {
        let { href, bsPrefix, className, type, onClick, inline, ...other } = this.props;

        if (href != null)
            return (
                <a href={href} className={className} onClick={onClick}>
                    <span className="icon" {...other}>
                        <i className={`${bsPrefix} ${bsPrefix}-${type}`}></i>
                    </span>
                </a>
            );

        let pointerClass = onClick != null ? 'pointer' : '';

        if (inline)
            return (
                <i className={`${bsPrefix} ${bsPrefix}-${type} ${className} ${pointerClass}`} {...other} onClick={onClick}></i>
            );

        return (
            <span className={`icon ${className} ${pointerClass}`} {...other} onClick={onClick}>
                <i className={`${bsPrefix} ${bsPrefix}-${type}`}></i>
            </span>
        );
    }
}

export default Icon;