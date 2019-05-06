import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

class Avatar extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    static propTypes = {
        /** size control */
        size: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl', 'xxl']),
        /** online indicator */
        online: PropTypes.bool,
        /** avatar shape */
        shape: PropTypes.oneOf(['rounded', 'rounded-circle']),
        /** image source path */
        imgSrc: PropTypes.string,
        /** alternative text for the image */
        alt: PropTypes.string,
        /** image ratio */
        ratio4by3: PropTypes.bool,
        /** initials (weill be shown in case there is no imgSrc) */
        initials: PropTypes.string,
        /** a callback fired when the avatar is clicked  */
        onClick: PropTypes.func
    }
    static defaultProps = {
        shape: 'rounded-circle',
        alt: '...',
        ratio4by3: false,
        initials: 'JD'
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick && this.props.onClick(e);
    }

    render() {
        let { className } = this.props;

        let sizeClass = '';
        if (this.props.size != null)
            sizeClass = `avatar-${this.props.size}`;

        let onlineClass = '';
        if (this.props.online != null)
            onlineClass = this.props.online ? 'avatar-online' : 'avatar-offline';

        let ratioClass = this.props.ratio ? 'avatar-4by3' : '';

        let pointerClass = this.props.onClick != null ? 'pointer' : '';

        let avatarImg = this.props.imgSrc ?
            <img src={this.props.imgSrc} className={`avatar-img ${this.props.shape}`} alt={this.props.alt} /> :
            <span className={`avatar-title ${this.props.shape}`}> {this.props.initials} </span>;

        return (
            <div className={`avatar ${sizeClass} ${onlineClass} ${ratioClass} ${pointerClass} ${className ? className : ''}`} onClick={this.handleClick}>
                {avatarImg}
            </div>
        );
    }
}

export default Avatar;