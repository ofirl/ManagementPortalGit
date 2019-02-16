import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

class Avatar extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        size: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl', 'xxl']),
        online: PropTypes.bool,
        shape: PropTypes.oneOf(['rounded', 'rounded-circle']),
        imgSrc: PropTypes.string,
        alt: PropTypes.string,
        ratio4by3: PropTypes.bool,
        initials: PropTypes.string
    }
    static defaultProps = {
        shape: 'rounded-circle',
        alt: '...',
        ratio4by3: false,
        initials: 'JD'
    }

    render() {
        let sizeClass = '';
        if (this.props.size != null)
            sizeClass = `avatar-${this.props.size}`;

        let onlineClass = '';
        if (this.props.online != null)
            onlineClass = this.props.online ? 'avatar-online' : 'avatar-offline';

        let ratioClass = this.props.ratio ? 'avatar-4by3' : '';

        let avatarImg;
        if (this.props.imgSrc != null) {
            avatarImg = (
                <img src={this.props.imgSrc} className={`avatar-img ${this.props.shape}`} alt={this.props.alt} />
            );
        }
        else {
            avatarImg= (
                <span className={`avatar-title ${this.props.shape}`}> {this.props.initials} </span>
            );
        }

        return (
            <div className={`avatar ${sizeClass} ${onlineClass} ${ratioClass}`}>
                {avatarImg}
            </div>
        );
    }
}

export default Avatar;