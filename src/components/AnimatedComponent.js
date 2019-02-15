import React from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

let propTypes = {
    /** key is required in any list of components */
    keyProp: PropTypes.any.isRequired,
    /** timeout for the animation - 
     * can be a number or an object to seperate enter animation from exit */
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            enter: PropTypes.number,
            exit: PropTypes.number
        })
    ]),
    /** will the component show */
    in: PropTypes.bool.isRequired,
    /** See Transition official documentation */
    mountOnEnter: PropTypes.bool,
    /** See Transition official documentation */
    unmountOnExit: PropTypes.bool,
    /** See Transition official documentation */
    appear: PropTypes.bool,
    /** See Transition official documentation */
    enter: PropTypes.bool,
    /** See Transition official documentation */
    exit: PropTypes.bool,
    /** animation config */
    animationConfig: PropTypes.shape({
        timeout: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                enter: PropTypes.number,
                exit: PropTypes.number
            })
        ]).isRequired,
        enter: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        }),
        entering: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        }),
        entered: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        }),
        exit: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        }),
        exiting: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        }),
        exited: PropTypes.shape({
            type: PropTypes.arrayOf(PropTypes.oneOf(['class', 'style', 'height'])).isRequired,
            className: PropTypes.string,
            style: PropTypes.object
        })
    }).isRequired,
    /** hook - see official Transition documentation */
    onEnter: PropTypes.func,
    /** hook - see official Transition documentation */
    onEntering: PropTypes.func,
    /** hook - see official Transition documentation */
    onEntered: PropTypes.func,
    /** hook - see official Transition documentation */
    onExit: PropTypes.func,
    /** hook - see official Transition documentation */
    onExiting: PropTypes.func,
    /** hook - see official Transition documentation */
    onExited: PropTypes.func
}

class AnimatedComponent extends React.Component {
    static propTypes = propTypes
    static defaultProps = {
        timeout: 1000,
        mountOnEnter: true,
        unmountOnExit: true,
        appear: true,
        enter: true,
        exit: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    render() {
        setTimeout(() => {
            this.setState({ show: !this.state.show });
        }, 5000);

        // let animatedExample = animateComponent((props) => {
        //     (
        //         <div className={props.animationClassName} style={props.animationStyle}>
        //             test
        //         </div>
        //     )
        // });

        // return <animatedExample {...this.props} key={1} in={this.state.show} />

        return (
            <Transition
                key={this.props.keyProp || 1}
                timeout={this.props.timeout || 1000}
                mountOnEnter={this.props.mountOnEnter || true}
                unmountOnExit={this.props.unmountOnExit || true}
                appear={this.props.appear || true}
                enter={this.props.enter || true}
                exit={this.props.exit || true}
                in={this.state.show}
                onEntering={this.onEntering}
                onEnter={this.onEnter}
                onEntered={this.onEntered}
                onExit={this.onExit}
                onExiting={this.onExiting}
                onExited={this.onExited}
            >
                {
                    (status) => {
                        return <div status={status} > play with me! </div>
                    }
                }
            </Transition>
        )
    }
}


function animateComponent(WrappedComponent) {

    class AnimatedComponent2 extends React.Component {
        static propTypes = propTypes
        static defaultProps = AnimatedComponent.defaultProps

        constructor(props) {
            super(props);

            this.onEnter = this.onEnter.bind(this);
            this.onEntering = this.onEntering.bind(this);
            this.onEntered = this.onEntered.bind(this);

            this.onExit = this.onExit.bind(this);
            this.onExiting = this.onExiting.bind(this);
            this.onExited = this.onExited.bind(this);

            this.updateDefaults = this.updateDefaults.bind(this);

            this.state = {
                defaultClass: '',
                animationClass: '',
                defaultStyle: {},
                animationStyle: {}
            }

            // this.updateDefaults();
        }

        updateDefaults() {
            let newState = {};

            let enterAnimation = this.props.animationConfig.enter;

            if (enterAnimation != null) {
                if (enterAnimation.type.includes('class'))
                    newState.defaultClass = enterAnimation.className;
                if (enterAnimation.type.includes('style'))
                    newState.defaultStyle = enterAnimation.style;
            }

            this.setState(newState);
        }

        onEnter(node, isAppearing) {
            // console.log('enter');
            // console.log(isAppearing);

            this.setState({
                animationClass: '',
                animationStyle: {}
            });

            if (!isAppearing)
                this.updateDefaults();
        }
        onEntering(node, isAppearing) {
            // console.log('entering');

            let newState = {};

            setTimeout(() => {
                let enteringAnimation = this.props.animationConfig.entering;

                if (enteringAnimation != null) {
                    if (enteringAnimation.type.includes('class'))
                        newState.animationClass = enteringAnimation.className;
                    if (enteringAnimation.type.includes('style'))
                        newState.animationStyle = { ...newState.animationStyle, ...enteringAnimation.style };
                    if (enteringAnimation.type.includes('height'))
                        newState.animationStyle = { ...newState.animationStyle, height: node.scrollHeight + 'px' };
                }

                this.setState(newState);
            }, 10);
        }
        onEntered(node, isAppearing) {
            // console.log('entered');

            let newState = {};

            let enteredAnimation = this.props.animationConfig.entered;

            let style = { ...this.state.animationStyle };
            delete style.height;
            newState.animationStyle = style;

            if (enteredAnimation != null) {
                if (enteredAnimation.type.includes('class'))
                    newState.animationClass = enteredAnimation.className;
                if (enteredAnimation.type.includes('style'))
                    newState.animationStyle = enteredAnimation.style;
            }

            this.setState(newState);
        }
        onExit(node) {
            // console.log('exit');
            // console.log(node.scrollHeight);

            this.setState({
                animationClass: '',
                animationStyle: {}
            })

            let newState = {};

            let exitAnimation = this.props.animationConfig.exit;

            if (exitAnimation != null) {
                if (exitAnimation.type.includes('class'))
                    newState.defaultClass = exitAnimation.className;
                if (exitAnimation.type.includes('style'))
                    newState.defaultStyle = exitAnimation.style;
                if (exitAnimation.type.includes('height'))
                    newState.defaultStyle = { ...newState.defaultStyle, height: node.scrollHeight + 'px' };
            }

            this.setState(newState);
        }
        onExiting(node) {
            // console.log('exiting');

            let newState = {};

            setTimeout(() => {
                let exitingAnimation = this.props.animationConfig.exiting;

                if (exitingAnimation != null) {
                    if (exitingAnimation.type.includes('class'))
                        newState.animationClass = exitingAnimation.className;
                    if (exitingAnimation.type.includes('style'))
                        newState.animationStyle = exitingAnimation.style;
                    if (exitingAnimation.type.includes('height'))
                        newState.animationStyle = { ...newState.animationStyle, height: '0px' };
                }

                this.setState(newState);
            }, 10);
        }
        onExited(node) {
            // console.log('exited');

            this.setState({
                defaultClass: '',
                defaultStyle: {},
                animationClass: '',
                animationStyle: {}
            });

            this.updateDefaults();
        }

        render() {
            let animationAttr = {
                animationClassName: `${this.state.defaultClass} ${this.state.animationClass}`,
                animationStyle: { ...this.state.defaultStyle, ...this.state.animationStyle }
            }

            // console.log(this.state);

            return (
                <Transition
                    key={this.props.keyProp || 1}
                    timeout={this.props.animationConfig.timeout || 1000}
                    mountOnEnter={this.props.mountOnEnter || true}
                    unmountOnExit={this.props.unmountOnExit || true}
                    appear={this.props.appear || true}
                    enter={this.props.enter || true}
                    exit={this.props.exit || true}
                    in={this.props.in}
                    onEntering={this.onEntering}
                    onEnter={this.onEnter}
                    onEntered={this.onEntered}
                    onExit={this.onExit}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    {
                        (status) => {
                            return <WrappedComponent status={status} {...animationAttr} {...this.props} />
                        }
                    }
                </Transition>
            )
        }
    }

    return AnimatedComponent2;
}

export default AnimatedComponent;
export { animateComponent };