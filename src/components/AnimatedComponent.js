import React, { Component, Fragment } from 'react';
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
    animate() {
        let animeObj;
        console.log('animating : ' + this.props.status);
        console.log(this.props.eff);

        if (this.props.status == 'entering')
            animeObj = this.props.eff.entering;
        else if (this.props.status == 'exiting')
            animeObj = this.props.eff.exiting;

        console.log('animeObj');
        console.log(animeObj);

        if (animeObj == null) {
            return;
        }

        // basic animation
        if (animeObj.type == null) {
            // if (this.props.status == 'entering')
            //     effObj = this.props.eff.entering;
            // else if (that.props.status == 'exiting') {
            //     effObj = this.props.eff.exiting;
            // }
            // else {
            //     effObj = {};
            // }

            let { timeout, ...effObj } = animeObj;

            console.log('ref');
            console.log(this.myRef.current);
            this.animeRef = anime({
                targets: this.myRef.current,
                ...effObj
            });
            this.animeRef.finished.then(() => console.log('done'));
        }
        // class
        else if (this.props.eff.type == 'class') {
            this.additionalProps = { 'className': animeObj.className };
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
    componentDidMount() {
        this.animate();
    }
    componentDidUpdate() {
        this.animate();
        // let that = this;
        // let effObj = {};

        // let animeObj;

        // if (this.props.state == 'entering')
        //     animeObj = this.props.eff.entering;
        // else if (this.props.status == 'exiting')
        //     animeObj = this.props.eff.exiting;

        // if (animeObj == null) {
        //     return;
        // }

        // console.log('animeObj');
        // console.log(animeObj);
        // // basic animation
        // if (animeObj.type == null) {
        //     // if (this.props.status == 'entering')
        //     //     effObj = this.props.eff.entering;
        //     // else if (that.props.status == 'exiting') {
        //     //     effObj = this.props.eff.exiting;
        //     // }
        //     // else {
        //     //     effObj = {};
        //     // }

        //     let { timeout, ...effObj } = animeObj;

        //     console.log(this.myRef.current);
        //     this.animeRef = anime({
        //         targets: this.myRef.current,
        //         ...effObj
        //     });
        //     this.animeRef.finished.then(() => console.log('done'));
        // }
        // // class
        // else if (this.props.eff.type == 'class') {
        //     this.additionalProps = { 'className': animeObj.className };
        // }
        // // timeline
        // else if (this.props.eff.type == 'timeline') {
        //     console.log('this.props.eff');
        //     console.log(this.props.eff);
        //     let timeArray = this.props.eff.timeline;
        //     this.animeRef = anime.timeline(timeArray[0]);

        //     timeArray.shift();

        //     timeArray.forEach(element => {
        //         console.log('element');
        //         console.log(element);
        //         let attr = JSON.parse(JSON.stringify(element.attr));
        //         if (attr.targets) {
        //             console.log(this.myRef);
        //             attr.targets = this.myRef.current.querySelectorAll(element.attr.targets);
        //         }
        //         console.log('attr');
        //         console.log(attr);
        //         this.animeRef.add(attr, element.offset);
        //     });
        // }
    }
    render() {
        // console.log(this.props.children);
        let children = this.props.children;
        // let test = React.cloneElement(this.props.children, {ref: this.myRef});
        // if (this.props.children.length == null || this.props.children.length == 1) {
        //     children = [this.props.children];
        //     // console.log('test');
        //     // console.log(this.additionalProps);
        //     let test = React.cloneElement(this.props.children[0], { /*ref: this.myRef,*/ ...this.additionalProps });
        //     let child = [test]
        //     return (<Fragment ref={this.myRef}>{test}</Fragment>);
        // }

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