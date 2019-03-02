import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { runInThisContext } from 'vm';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Input from './Input';
import ListGroup from 'react-bootstrap/ListGroup';

import './Select.css';

class Select extends Component {
    constructor(props) {
        super(props);

        this.attachRef = target => this.setState({ target });

        this.state = {
            selected: props.defaultItem
        }
    }
    static propTypes = {
        /** default item to select */
        defaultItem: PropTypes.number
    }
    static defaultProps = {
        defaultItem: -1
    }

    render() {
        const { children } = this.props;

        return (
            <>
                <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    trigger="focus"
                    overlay={
                        <ListGroup className="select-list">
                            {
                                children.reduce((acc, child, idx) => {
                                    acc.push((
                                        <ListGroup.Item className="pointer" key={idx} onClick={() => this.setState({ selected: idx })}>
                                            {child}
                                        </ListGroup.Item>
                                    ));

                                    return acc;
                                }, [])
                            }
                            {/* <ListGroup.Item onClick={() => this.setState({ selected: 1 })}>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
                        </ListGroup>
                    }
                >
                    <div variant="white" tabIndex="-1" className="input pointer form-control d-flex align-items-center" onClick={this.handleClick}>
                        {children[this.state.selected]}
                    </div>
                </OverlayTrigger>
            </>
        );
    }
}

export default Select;