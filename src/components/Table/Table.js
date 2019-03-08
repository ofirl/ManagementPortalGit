import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import memoizeOne from "memoize-one";

import './Table.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Form from 'react-bootstrap/Form';
import Select from '../Select/Select';

function naturalSort(a, b) {
    function chunkify(t) {
        let tz = [], x = 0, y = -1, n = 0, i, j;

        while (t[x] != null && (i = (j = t[x++]).charCodeAt(0))) {
            let m = (i === 46 || (i >= 48 && i <= 57));
            if (m !== n) {
                tz[++y] = "";
                n = m;
            }
            tz[y] += j;
        }
        return tz;
    }

    let aa = chunkify(a);
    let bb = chunkify(b);

    for (let x = 0; aa[x] && bb[x]; x++) {
        if (aa[x] !== bb[x]) {
            let c = Number(aa[x]), d = Number(bb[x]);
            if (c === aa[x] && d === bb[x]) {
                return c - d;
            } else return (aa[x] > bb[x]) ? 1 : -1;
        }
    }
    return aa.length - bb.length;
}

let tablePropTypes = {
    /** inner cell element */
    // innerCellAs: PropTypes.any,
    /** talbe is editable */
    editable: PropTypes.bool,
    /** class for the table */
    className: PropTypes.string,
    /** table columns */
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        accessor: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
        /** readonly column */
        readonly: PropTypes.bool
    })).isRequired,
    /** table items, items must have 'id' attribute to ditinguish between them */
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** table size control */
    size: PropTypes.oneOf(['sm']),
    /** nowrap control */
    nowrap: PropTypes.bool,
    /** table filter */
    filter: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({
                column: PropTypes.string,
                value: PropTypes.string
            })
        ])),
    /** table sort control */
    sort: PropTypes.shape({
        column: PropTypes.string,
        order: PropTypes.oneOf(['asc', 'des'])
    }),
    /** callback fired when item is updated */
    onItemUpdate: PropTypes.func,
    /** callback fired when error occured */
    onError: PropTypes.func
}

let tableDefaultProps = {
    items: [],
    nowrap: false,
    editable: false
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.setFilter = this.setFilter.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.applySort = this.applySort.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.itemsChanged = this.itemsChanged.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.copyItem = this.copyItem.bind(this);
        this.setError = this.setError.bind(this);

        this.state = {
            items: props.items,
            filter: null,
            sort: null,
            filterError: null
        }
    }
    static propTypes = tablePropTypes
    static defaultProps = tableDefaultProps

    componentDidUpdate(oldProps) {
        // console.log(this.props);
        if (oldProps.filter !== this.props.filter)
            this.setFilter(this.props.filter);
        if (oldProps.items !== this.props.items)
            this.setState({ items: this.props.items });
    }
    setFilter(filter) {
        this.setState({ filter: filter });
    }
    addFilter(filter) {
        this.setState({ filter: { ...this.state.filter, ...filter } });
    }
    applySort(column, order) {
        if (order == null) {
            if (this.state.sort != null && this.state.sort.column === column)
                order = this.state.sort.order === 'asc' ? 'des' : 'asc';
            else
                order = 'asc';
        }

        let sortObj = {
            column: column,
            order: order
        };

        // let sortedItems = this.sortItems(sortObj);

        this.setState({
            sort: sortObj
            // items: sortedItems
        });
    }
    sortItems(items, sortObj) {
        if (items == null)
            items = this.state.items;

        if (sortObj == null) {
            if (this.state.sort == null)
                return items;
            else
                sortObj = this.state.sort;
        }

        let { column, order } = sortObj;
        let sortedItems = items.sort((a, b) => {
            console.log(`sorting ${a[column]} and ${b[column]}`);
            return naturalSort(a[column], b[column]);
        });

        if (order === 'des')
            sortedItems.reverse();

        return sortedItems;
    }
    applyFilter(filter) {
        this.setState({ filter: filter });
    }
    filterItems(items, filterObj) {
        if (items == null)
            items = this.state.items;

        if (filterObj == null) {
            if (this.state.filter == null) {
                this.setError('filterError', null);
                return items;
            }
            else
                filterObj = this.state.filter;
        }

        if (filterObj.length === 0) {
            this.setError('filterError', null);
            return items;
        }

        if (filterObj[0] == null)
            filterObj = [filterObj];

        let filteredItems = items;
        filterObj.forEach(filter => {
            if (filter.value != null) {
                if (filter.column)
                    filteredItems = filteredItems.filter((i) => i[filter.column] === filter.value);
                else {
                    try {
                        filteredItems = filteredItems.filter((i) => Object.keys(i).some((key, idx) => key !== 'id' && i[key].toString().match(new RegExp(filter.value))));
                        this.setError('filterError', null);
                    }
                    catch (e) {
                        this.setError('filterError', 'Bad RegExp');

                        console.warn('bad reg exp');
                    }
                }
            }
            else
                filteredItems = filteredItems.filter(filter);
        });

        return filteredItems;
    }
    setError(type, msg) {
        if (this.state[type] !== msg) {
            let newState = {};
            newState[type] = msg;

            setTimeout(() => {
                this.setState(newState);
                this.props.onError && this.props.onError(type, msg);
            }, 1);
        }
    }
    updateItem(itemId, column, newValue) {
        let itemIdx = this.state.items.findIndex((i) => i.id === itemId);
        if (itemIdx === -1) {
            console.log('Item ID could not be found, exiting...');
            return;
        }

        let updatedItems = this.state.items;
        updatedItems[itemIdx][column] = newValue;

        updatedItems = this.itemsChanged(itemId, updatedItems);

        this.setState({ items: updatedItems });
    }
    deleteItem(itemId) {
        let itemIdx = this.state.items.findIndex((i) => i.id === itemId);
        let updatedItems = this.state.items;
        updatedItems.splice(itemIdx, 1);

        updatedItems = this.itemsChanged(itemId, updatedItems);

        this.setState({ items: updatedItems });
    }
    copyItem(itemId) {
        let originalItem = this.state.items.find((i) => i.id === itemId);
        let newItem = {};
        Object.keys(originalItem).forEach(key => {
            newItem[key] = originalItem[key];
        });
        newItem.id = Math.max(...this.state.items.map((i) => i.id), 0) + 1;

        let updatedItems = this.state.items;
        updatedItems.push(newItem);

        updatedItems = this.itemsChanged(itemId, updatedItems);

        this.setState({ items: updatedItems });
    }
    itemsChanged(itemId, items) {
        if (this.props.onItemUpdate) {
            let callbackItems = this.props.onItemUpdate(itemId, items);
            if (callbackItems != null)
                items = callbackItems;
        }

        return items;
    }

    render() {
        let that = this;

        let { className, columns, size, nowrap, editable } = this.props;
        let { items } = this.state;
        items = this.filterItems(items);
        items = this.sortItems(items);

        return (
            <table className={`table ${size ? 'table-' + size : ''} ${nowrap ? 'table-nowrap' : ''} card-table ${className}`}>
                <thead>
                    <tr>
                        {
                            columns.reduce(function (acc, current, idx) {
                                let sortable = {
                                    'data-sort': true,
                                    onClick: () => that.applySort(current.accessor)
                                };
                                if (typeof current == 'object') {
                                    if (current.sortable === false)
                                        sortable = null;
                                }

                                acc.push((<th key={idx} className={`text-muted ${sortable ? 'pointer' : ''}`} {...sortable}> {current.name} </th>));
                                return acc;
                            }, [])
                        }
                        {
                            that.props.rowButtons ?
                                (
                                    <th key="rowButtons" className={`text-muted`}> Actions </th>
                                )
                                : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.reduce(function (acc, currentItem, rowIdx, array) {
                            acc.push((
                                <tr key={rowIdx}>
                                    {
                                        columns.reduce(function (acc, current, colIdx, array) {
                                            acc.push(
                                                <td key={colIdx} className="align-middle">
                                                    {
                                                        (() => {
                                                            if (editable && current.readonly !== true) {
                                                                if (current.type == null || current.type === "text") {
                                                                    return <Input size={size} value={currentItem[current.accessor]}
                                                                        onInput={(val) => that.updateItem(currentItem.id, current.accessor, val)} />;
                                                                }
                                                                else if (current.type === "select") {
                                                                    return (
                                                                        <Select selectedValue={currentItem[current.accessor]} dropValues={current.dropValues} onChange={(val) => that.updateItem(currentItem.id, current.accessor, val)}>
                                                                            {/* {
                                                                                [{
                                                                                    id: "test1",
                                                                                    render: <div>test11</div>
                                                                                },
                                                                                {
                                                                                    id: "test2",
                                                                                    render: <div>test22</div>
                                                                                }]
                                                                            } */}
                                                                        </Select>
                                                                    );
                                                                }
                                                            }
                                                            else
                                                                return currentItem[current.accessor]
                                                        })()
                                                    }
                                                </td>
                                            );
                                            return acc;
                                        }, [])
                                    }
                                    {
                                        that.props.rowButtons ?
                                            (
                                                <td key="rowButtons" className="align-middle">
                                                    {
                                                        that.props.rowButtons.map((button) => {
                                                            let type, callback, tooltip;

                                                            if (button === 'copy') {
                                                                type = "copy";
                                                                callback = () => that.copyItem(currentItem.id);
                                                                tooltip = "Copy Row";
                                                            }
                                                            else if (button === 'remove') {
                                                                type = "x-circle";
                                                                callback = () => that.deleteItem(currentItem.id);
                                                                tooltip = "Delete Row";
                                                            }

                                                            return (
                                                                <OverlayTrigger
                                                                    key={`${button}RowButton`}
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip>
                                                                            {tooltip}
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Icon key={`${button}Icon`} type={type} className="float-right mr-2 ml-2" inline
                                                                        onClick={callback} />
                                                                </OverlayTrigger>
                                                            );
                                                        })
                                                    }
                                                </td>
                                            )
                                            : null
                                    }
                                </tr>
                            ));
                            return acc;
                        }, [])
                    }
                </tbody>
            </table>
        );
    }
}

class TableCard extends Component {
    constructor(props) {
        super(props);

        this.applyOmniFilter = this.applyOmniFilter.bind(this);
        this.getNewItemFromTemplate = this.getNewItemFromTemplate.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onError = this.onError.bind(this);

        this.state = {
            items: props.items,
            omniFilter: null
        }

        this.innerTable = React.createRef();
    }
    static propTypes = {
        ...tablePropTypes,
        /** searchanble modifier */
        searchable: PropTypes.bool,
        /** table title */
        title: PropTypes.string,
        /** function to return the template to use when creating new items, usefull for default values on new items */
        itemTemplate: PropTypes.func,
        /** header button options */
        headerButtons: PropTypes.arrayOf(PropTypes.oneOf(['new-row'])),
        /** row button options */
        rowButtons: PropTypes.arrayOf(PropTypes.oneOf(['copy', 'remove']))
    }
    static defaultProps = {
        ...tableDefaultProps,
        searchable: false
    }

    applyOmniFilter(value) {
        if (value === '')
            this.setState({ omniFilter: null });
        else
            this.setState({ omniFilter: value });
    }
    getNewItemFromTemplate() {
        let maxId = Math.max(...this.state.items.map((i) => i.id), 0);

        let newItem = {};
        if (this.props.itemTemplate != null)
            newItem = this.props.itemTemplate(maxId + 1);
        else {
            this.props.columns.forEach(col => {
                if (col.accessor === 'id')
                    return;

                newItem[col.accessor] = '';
            });
            newItem.id = maxId + 1;
        }

        return newItem;
    }
    addNewItem() {
        let newItem = this.getNewItemFromTemplate();
        let updatedItems = [...this.state.items, newItem];

        this.setState({ items: updatedItems });
        updatedItems = this.onItemUpdate(newItem.id, updatedItems);
    }
    onItemUpdate(itemId, items) {
        if (this.props.onItemUpdate) {
            let callbackItems = this.props.onItemUpdate(itemId, items);
            if (callbackItems != null)
                items = callbackItems;
        }

        this.setState({ items: items });

        return items;
    }
    onError(type, msg) {
        let newState = {};
        newState[type] = msg;

        this.setState(newState);
    }

    render() {
        let { filter, title, searchable, headerButtons, items, ...others } = this.props;
        let stateItems = this.state.items;
        let { filterError } = this.state;

        let tableFilter = [];
        if (filter != null)
            tableFilter = tableFilter.concat(filter);
        if (this.state.omniFilter != null)
            tableFilter.push({ value: this.state.omniFilter });

        // if (children.length == null)
        //     children = [children];

        // let headerButtons = children.find((c) => c.type.name == "HeaderButtons");
        // let rowButtons = children.find((c) => c.type.name == "RowButtons");

        // why the items prop doesnt change???!!!
        // let test = items;
        // console.log(this.state.items);

        return (
            <Card>
                <Form>
                    <Card.Header className="pb-1 pl-4">
                        <Card.Title className="mb-0">
                            <div className="row align-items-center">
                                <div className="col align-middle">
                                    {title}
                                </div>
                                {
                                    searchable ?
                                        (
                                            <div className="col-auto">
                                                <Form.Group className="align-middle mb-0">
                                                    <Form.Control as={Input} className="col-auto" icon="search" placeholder="Search" clearButton
                                                        onInput={this.applyOmniFilter} prepend flush valid={filterError != null ? false : null} />
                                                    <Input.Feedback type="invalid">
                                                        {filterError}
                                                    </Input.Feedback>
                                                </Form.Group>
                                            </div>
                                        )
                                        : null
                                }
                                {
                                    headerButtons !== null ?
                                        headerButtons.map((button) => {
                                            if (button === "new-row")
                                                return (
                                                    <Button key={button} variant="white" size="sm" onClick={this.addNewItem}> New Row </Button>
                                                );
                                            return null;
                                        })
                                        : null
                                }
                            </div>
                        </Card.Title>
                    </Card.Header>
                    <Table tableInstance={this.tableInstance} items={stateItems} filter={tableFilter} {...others}
                        onItemUpdate={this.onItemUpdate} ref={this.innerTable} onError={this.onError} />
                </Form>
            </Card>
        );
    }
}

export default Table;
export { TableCard };