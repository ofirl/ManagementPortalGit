import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';

class AnimatedChild extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.myRef = React.createRef();
    }
    static defaultProps = {
        basic: true
    }
    componentDidUpdate() {
        let that = this;
        let effObj = {};

        // basic animation
        if (this.props.eff.type == null) {
            if (this.props.status == 'entering')
                effObj = this.props.eff.entering;
            else if (that.props.status == 'exiting') {
                effObj = this.props.eff.exiting;
            }
            else {
                effObj = {};
            }

            this.animeRef = anime({
                targets: this.myRef.current,
                ...effObj
            });
            this.animeRef.finished.then(() => console.log('done'));
        }
        // timeline
        else if (this.props.eff.type == 'timeline') {
            console.log('this.props.eff');
            console.log(this.props.eff);
            let timeArray = this.props.eff.timeline;
            this.animeRef = anime.timeline(timeArray[0]);

            timeArray.shift();

            timeArray.forEach(element => {
                console.log('element');
                console.log(element);
                let attr = JSON.parse(JSON.stringify(element.attr));
                if (attr.targets) {
                    console.log(this.myRef);
                    attr.targets = this.myRef.current.querySelectorAll(element.attr.targets);
                }
                console.log('attr');
                console.log(attr);
                this.animeRef.add(attr, element.offset);
            });
        }
    }
    render() {
        // console.log(this.props.children);
        let children = this.props.children;
        if (this.props.children.length == null)
            children = [this.props.children];

        // console.log(children);
        // if (children.length == 1) {
        //     let child = children[0];
        //     // console.log(child.type);
        //     // child.ref = this.myRef;
        //     this.myRef = this.props.itemRef;
        //     return (
        //         // children[0]
        //         // <child ref={this.myRef} />
        //         // children
        //         child
        //     );
        // }

        return (
            <div ref={this.myRef}>
                {children}
            </div>
        );
    }
}

class AnimatedComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let children;
        // if (this.props.children !== Array)
        //     children = [this.props.children];

        // console.log(this.props.children);

        let children = this.props.children;
        if (this.props.children.length == null)
            children = [this.props.children];

        // console.log(children);

        return (
            <Transition
                key={1}
                timeout={this.props.in ? this.props.eff.enterTimeout : this.props.eff.exitTimeout}
                mountOnEnter
                unmountOnExit
                in={this.props.in}
            >
                {
                    (status) => {
                        return (<AnimatedChild basic={this.props.basic} status={status} eff={this.props.eff} itemRef={this.props.itemRef}>{children}</AnimatedChild>);
                    }
                }
            </Transition>
        );
    }
}

export default AnimatedComponent;