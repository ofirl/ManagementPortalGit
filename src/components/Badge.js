import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Badge.css';

class Badge extends Component {
    // constructor(props){
    //     super(props);
    // }
    static propTypes = {
        /** text inside the badge */
        text: PropTypes.string.isRequired,
        /** color class for the badge */
        colorClass: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'white',
            'soft-primary', 'soft-secondary', 'soft-success', 'soft-info', 'soft-warning', 'soft-danger', 'soft-light', 'soft-dark', 'soft-white']).isRequired,
        /** additional classes to apply */
        additionalClasses: PropTypes.arrayOf(PropTypes.string)
    }

    render() {
        let classes= '';
        if (this.props.additionalClasses != null)
            classes = this.props.additionalClasses.join(' ');

        return (
            <span className={`badge badge-${this.props.colorClass} ${classes}`}>{this.props.text}</span>
        );
    }
}

export default Badge;