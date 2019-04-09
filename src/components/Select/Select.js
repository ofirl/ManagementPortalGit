import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Input from '../Input/Input';
import ListGroup from 'react-bootstrap/ListGroup';

import './Select.css';

class Select extends Component {
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.getSelectItems = this.getSelectItems.bind(this);

        // this.attachRef = target => this.setState({ target });
        // this.targetRef = React.createRef();

        let selectItems = this.getSelectItems();

        let selectedIndex = props.defaultItem;
        let selectedValue = props.defaultItem === -1 ? null : selectItems[props.defaultItem].id;

        if (props.selectedIndex) {
            selectedIndex = props.selectedIndex;
            selectedValue = selectItems[selectedIndex];
        }
        else if (props.selectedValue) {
            selectedIndex = selectItems.findIndex((i) => i.id === props.selectedValue);
            selectedValue = props.selectedValue;
        }

        this.state = {
            selectedIndex: selectedIndex,
            selectedValue: selectedValue
        }
    }
    static propTypes = {
        /** default item to select */
        defaultItem: PropTypes.number,
        /** allow null value */
        allowNull: PropTypes.bool,
        /** selected value */
        selectedValue: PropTypes.string,
        /** selected index - will override selected value */
        selectedIndex: PropTypes.number,
        /** callback fires whhne value changes */
        onChange: PropTypes.func,
        /** drop values (overrides children) */
        dropValues: PropTypes.arrayOf(PropTypes.string),
        /** used as select values */
        children: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            render: PropTypes.func
        }))
    }
    static defaultProps = {
        defaultItem: -1,
        children: [{ id: 'test' }],
        allowNull: true
    }

    componentDidUpdate(oldProps) {
        let selectedIndex, selectedValue;

        let selectItems = this.getSelectItems();

        if (this.props.selectedIndex) {
            selectedIndex = this.props.selectedIndex;
            selectedValue = selectItems[selectedIndex];
        }
        else if (this.props.selectedValue) {
            selectedIndex = selectItems.findIndex((i) => i.id === this.props.selectedValue);
            selectedValue = this.props.selectedValue;
        }

        if (selectedValue == null && selectedIndex == null)
            return;

        if (selectedValue !== this.state.selectedValue || selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: selectedIndex,
                selectedValue: selectedValue
            });
        }
    }

    getSelectItems() {
        let { dropValues, children, allowNull } = this.props;

        if (children != null && (children.length == null || children.length === 0))
            children = [children];

        let dropItems = dropValues ? dropValues.reduce((acc, val, idx) => {
            acc.push({ id: val });

            return acc;
        }, allowNull ? [{ id: '\xa0'}] : []) : children;

        return dropItems;
    }
    handleItemClick(itemId, value) {
        this.setState({
            selectedIndex: itemId,
            selectedValue: value
        });

        this.props.onChange && this.props.onChange(value, itemId);
    }

    render() {
        let { dropValues, children, className, selectedValue, selectedIndex, defaultItem, ...others } = this.props;
        selectedIndex = this.state.selectedIndex;
        selectedValue = this.state.selectedValue;
        // let {  } = this.state;

        let dropItems = this.getSelectItems();

        return (
            <>
                <OverlayTrigger
                    key={"top"}
                    placement={"bottom"}
                    trigger="focus"
                    // target={this.state.target}
                    overlay={
                        <ListGroup className="select-list">
                            {
                                dropItems.reduce((acc, child, idx) => {
                                    acc.push((
                                        <ListGroup.Item className={`pointer select-item ${idx === selectedIndex ? 'selected' : ''}`} key={idx} onClick={() => this.handleItemClick(idx, child.id)}>
                                            {
                                                child.render ? child.render : child.id
                                            }
                                        </ListGroup.Item>
                                    ));

                                    return acc;
                                }, [])
                            }
                        </ListGroup>
                    }
                >
                    <div /*ref={this.attachRef}*/ variant="white" tabIndex="-1" className={`input pointer form-control d-flex align-items-center ${className}`} onClick={this.handleClick} {...others}>
                        {
                            dropItems[this.state.selectedIndex] ? (
                                dropItems[this.state.selectedIndex].render ?
                                    dropItems[this.state.selectedIndex].render :
                                    dropItems[this.state.selectedIndex].id
                            ) : null
                        }
                    </div>
                </OverlayTrigger>
            </>
        );
    }
}

export default Select;