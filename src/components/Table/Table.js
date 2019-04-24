import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import memoizeOne from "memoize-one";

import './Table.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Collapse from 'react-bootstrap/Collapse'

import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Form from 'react-bootstrap/Form';
import Select from '../Select/Select';
import Toggle from '../Toggle/Toggle';
import { Radio, Checkbox } from '../FormControl/FormControl';

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
    /** filter will be case sensitive */
    filterCaseSensitive: PropTypes.bool,
    /** table sort control */
    sort: PropTypes.shape({
        column: PropTypes.string,
        order: PropTypes.oneOf(['asc', 'des'])
    }),
    /** callback fired when item is updated */
    onItemUpdate: PropTypes.func,
    /** callback fired when error occured */
    onError: PropTypes.func,
    /** callback fired when item is clicked */
    onItemClick: PropTypes.func,
    /** enable item hover effect */
    itemHoverEffect: PropTypes.bool
}

let tableDefaultProps = {
    items: [],
    nowrap: false,
    editable: false,
    filterCaseSensitive: false,
    itemHoverEffect: false
}

class EditableField extends Component {
    render() {
        let { column, size, value, onChange, allowNull, className, inputProps, rowNum } = this.props;

        if (column.type == null || column.type === "text") {
            return <Input size={size} value={value == null ? '' : value}
                onInput={onChange} clearButton containerClass={className} {...inputProps} />;
        }
        if (column.type === "select") {
            return (
                <Select selectedValue={value} dropValues={column.dropValues} allowNull={allowNull}
                    onChange={onChange} className={className}>
                </Select>
            );
        }
        if (column.type === "bool") {
            return (
                <Checkbox id={rowNum + "-" + column.accessor} checked={value} onChange={onChange} inline />
                // <Checkbox checked={value} inline />
            );
        }
        if (column.type === "radio") {
            return (
                <Radio id={rowNum + "-" + column.accessor} groupName={column.accessor} checked={value} onChange={onChange} inline />
                // <Radio checked={value} inline />
            );
        }

        return (<div> type not supported </div>);
    }
}

class TableCell extends Component {
    render() {
        let { editable, column, size, value, onChange, inputProps, rowNum } = this.props;

        return (<td className={`col align-middle`}>
            {
                (() => {
                    try {
                        if (editable && column.readonly !== true) {
                            return <EditableField column={column} rowNum={rowNum} size={size} value={value} onChange={onChange} inputProps={inputProps} />;
                        }
                        else {
                            if (column.type === "bool")
                                return <Checkbox id={rowNum + "-" + column.accessor} disabled checked={value} onChange={onChange} inline />;                            
                            if (column.type === "radio")
                                return <Radio id={rowNum + "-" + column.accessor} groupName={column.accessor} disabled checked={value} onChange={onChange} inline />;
                            if (column.render == null)
                                return value.toString();

                            return column.render(value);
                        }
                    }
                    catch (e) {
                        console.log(e);
                        return 'Error: could not read value';
                    }
                })()
            }
        </td>);
    }
}

class TableRowButton extends Component {
    render() {
        let { rowButtons, rowButtonTypes, itemId } = this.props;

        if (rowButtons == null)
            return null;

        return (
            <td key="rowButtons" className="col-auto align-middle">
                {
                    rowButtons.map((button) => {
                        let currentButtonType = rowButtonTypes[button];
                        let type, callback, tooltip;

                        type = currentButtonType.type;
                        callback = currentButtonType.callback(itemId);
                        tooltip = currentButtonType.tooltip;

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
        );
    }
}

class TableRow extends Component {
    render() {
        let { item, itemAttr, columns, editable, size, onChange, rowButtons, rowButtonTypes, inputProps, rowNum } = this.props;
        // console.log(item);
        let { className: itemClassName, ...others } = itemAttr;
        return (
            <tr className={`row ${itemClassName ? itemClassName : ''}`} {...others}>
                {
                    columns.reduce(function (acc, current, colIdx, array) {
                        // console.log(item);
                        acc.push(
                            <TableCell editable={editable} column={current} key={colIdx} size={size} value={item[current.accessor]}
                                onChange={(val) => onChange(item.id, current.accessor, val)} inputProps={inputProps} rowNum={rowNum} />
                        );
                        return acc;
                    }, [])
                }
                <TableRowButton rowButtons={rowButtons} rowButtonTypes={rowButtonTypes} itemId={item.id} />
            </tr>
        );
    }
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
        this.itemClicked = this.itemClicked.bind(this);

        this.state = {
            items: props.items,
            filter: null,
            sort: null,
            filterError: null
        }

        this.rowButtonTypes = {
            copy: {
                type: "copy",
                callback: (itemId) => (() => this.copyItem(itemId)),
                tooltip: "Copy Row"
            },
            remove: {
                type: "x-circle",
                callback: (itemId) => (() => this.deleteItem(itemId)),
                tooltip: "Delete Row"
            }
        }
    }

    static propTypes = tablePropTypes
    static defaultProps = tableDefaultProps

    componentDidUpdate(oldProps) {
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
        let sortConvert = this.props.columns.find((c) => c.accessor === column).sort;
        let sortedItems = items.sort((a, b) => {
            let aConv = sortConvert ? sortConvert(a[column]) : a[column];
            let bConv = sortConvert ? sortConvert(b[column]) : b[column];
            console.log(`sorting ${aConv} and ${bConv}`);
            return naturalSort(aConv, bConv);
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
                if (filter.column != null)
                    filteredItems = filteredItems.filter((i) => i[filter.column].toString().match(new RegExp(filter.value, this.props.filterCaseSensitive ? "" : "i")));
                else {
                    try {
                        filteredItems = filteredItems.filter((i) => Object.keys(i).some((key, idx) => {
                            if (key === 'id')
                                return false;

                            let matchStr = typeof i[key] == 'object' ? JSON.stringify(i[key]) : i[key].toString();
                            return matchStr.match(new RegExp(filter.value, this.props.filterCaseSensitive ? "" : "i"));
                        })
                        );
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
        // debugger;

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
    itemClicked(itemId, item) {
        this.props.onItemClick(itemId, item);
    }

    render() {
        let that = this;

        // debugger;

        let { className, columns, size, nowrap, editable, onItemClick, itemHoverEffect, inputProps } = this.props;
        let { items } = this.state;
        items = this.filterItems(items);
        items = this.sortItems(items);

        return (
            <table className={`table ${size ? 'table-' + size : ''} ${nowrap ? 'table-nowrap' : ''} card-table ${className ? className : ""} ${onItemClick || itemHoverEffect ? 'table-hover' : ''}`}>
                <thead>
                    <tr className="row">
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

                                acc.push((<th key={idx} className={`col text-muted ${sortable ? 'pointer' : ''}`} {...sortable}> {current.name} </th>));
                                return acc;
                            }, [])
                        }
                        {
                            that.props.rowButtons ?
                                (
                                    <th key="rowButtons" className={`col-auto text-muted`}> Actions </th>
                                )
                                : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items && items.length > 0 ?
                            items.reduce(function (acc, currentItem, rowIdx, array) {

                                let itemAttr = {};
                                if (onItemClick) {
                                    itemAttr.onClick = (e) => that.itemClicked(currentItem.id, currentItem);
                                    itemAttr.className = 'pointer';
                                }

                                acc.push((
                                    <TableRow key={rowIdx} rowNum={rowIdx} itemAttr={itemAttr} editable={editable} item={currentItem} rowButtons={that.props.rowButtons}
                                        rowButtonTypes={that.rowButtonTypes} onChange={that.updateItem} columns={columns} inputProps={inputProps} />
                                ));
                                return acc;
                            }, [])
                            : (<div className="d-flex col justify-content-center"> no data... </div>)
                    }
                </tbody>
            </table>
        );
    }
}

class AdvancedFilterField extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            value: props.value
        }
    }
    onChange(value) {
        // this.setState({ value: value });

        this.props.onChange && this.props.onChange(
            {
                column: this.props.column.accessor,
                value: value
            }
        );
    }

    render() {
        let { column, size, value } = this.props;

        return (
            <div className="row m-0 p-0 mb-1 align-items-center">
                <span className="">
                    {column.name}
                </span>
                <EditableField column={column} size={size} value={value} onChange={this.onChange} className="" />
            </div>
        );
    }
}

class AdvancedFilter extends Component {
    constructor(props) {
        super(props);

        this.onFilterChange = this.onFilterChange.bind(this);

        this.state = {
            filter: props.filter
        }
    }
    onFilterChange(filter) {
        let newFilter = { ...this.state.filter };

        if (filter.value == null || filter.value === '' || filter.value === '\xa0')
            delete newFilter[filter.column];
        else
            newFilter[filter.column] = filter.value;

        this.props.onChange && this.props.onChange(newFilter);

        // this.setState({filter: newFilter});
    }

    render() {
        let { columns, size, filter } = this.props;

        return (
            <div className="mb-3">
                <h5> Advanced filter </h5>
                {
                    columns.map((c) => <AdvancedFilterField key={c.accessor} column={c} size={size}
                        value={filter ? filter[c.accessor] : null} onChange={this.onFilterChange} />)
                }
            </div>
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
        this.toggleFilterCaseSensitive = this.toggleFilterCaseSensitive.bind(this);
        this.applyAdvancedFilter = this.applyAdvancedFilter.bind(this);
        this.toggleAdvancedFilter = this.toggleAdvancedFilter.bind(this);

        this.state = {
            items: props.items,
            omniFilter: null,
            filterCaseSensitive: false,
            advancedFilter: null,
            showAdvancedFilter: props.showAdvancedFilter
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
        headerButtons: PropTypes.arrayOf(PropTypes.oneOf(['new-row', 'case'])),
        /** row button options */
        rowButtons: PropTypes.arrayOf(PropTypes.oneOf(['copy', 'remove'])),
        /** allow advanced filter */
        allowAdvancedFilter: PropTypes.bool,
        /** show advanced filter as default */
        showAdvancedFilter: PropTypes.bool
    }
    static defaultProps = {
        ...tableDefaultProps,
        searchable: false,
        allowAdvancedFilter: true,
        showAdvancedFilter: false
    }

    applyOmniFilter(value) {
        if (value === '')
            this.setState({ omniFilter: null });
        else
            this.setState({ omniFilter: value });
    }
    toggleFilterCaseSensitive() {
        this.setState({ filterCaseSensitive: !this.state.filterCaseSensitive });
    }
    toggleAdvancedFilter() {
        this.setState({ showAdvancedFilter: !this.state.showAdvancedFilter });
    }
    applyAdvancedFilter(filter) {
        this.setState({ advancedFilter: filter });
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
        // debugger;
        if (this.props.onItemUpdate) {
            let callbackItems = this.props.onItemUpdate(itemId, items);
            if (callbackItems != null)
                items = callbackItems;
        }

        // debugger;

        this.setState({ items: items });

        return items;
    }
    onError(type, msg) {
        let newState = {};
        newState[type] = msg;

        this.setState(newState);
    }
    componentDidUpdate(oldProps) {
        if (oldProps.filter !== this.props.filter)
            this.setFilter(this.props.filter);
        if (oldProps.items !== this.props.items)
            this.setState({ items: this.props.items });
    }

    render() {
        let { filter, title, searchable, headerButtons, items, columns, allowAdvancedFilter, ...others } = this.props;
        let stateItems = this.state.items;
        let { filterError, advancedFilter, showAdvancedFilter } = this.state;

        let tableFilter = [];
        if (filter != null)
            tableFilter = tableFilter.concat(filter);
        if (this.state.omniFilter != null)
            tableFilter.push({ value: this.state.omniFilter });
        if (this.state.advancedFilter != null)
            tableFilter.push(...Object.keys(this.state.advancedFilter).reduce((acc, f) => { acc.push({ column: f, value: this.state.advancedFilter[f] }); return acc; }, []));

        // console.log(tableFilter);
        // if (children.length == null)
        //     children = [children];

        // let headerButtons = children.find((c) => c.type.name == "HeaderButtons");
        // let rowButtons = children.find((c) => c.type.name == "RowButtons");

        // why the items prop doesnt change???!!!
        // let test = items;
        // console.log(this.state.items);

        return (
            <Card className="col-12">
                <Form>
                    <Card.Header className="pb-1 pl-4">
                        <Card.Title className="mb-0">
                            <div className="row align-items-center">
                                <div className="col-auto align-middle">
                                    {title}
                                </div>
                                {
                                    searchable ?
                                        (
                                            <div className="col">
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
                                    headerButtons != null ?
                                        headerButtons.map((button) => {
                                            if (button === "new-row")
                                                return (
                                                    <Button key={button} variant="white" size="sm" onClick={this.addNewItem}>
                                                        New Row
                                                        {/* <Icon type="plus" />  */}
                                                    </Button>
                                                );
                                            if (button === "case")
                                                return (
                                                    <Toggle key={button} defaultChecked={false} onChange={this.toggleFilterCaseSensitive} >
                                                        Case sensitive
                                                    </Toggle>
                                                );
                                            return null;
                                        })
                                        : null
                                }
                                {
                                    allowAdvancedFilter ?
                                        <Toggle className="ml-2" key="advancedFilterToggle" defaultChecked={false} onChange={this.toggleAdvancedFilter} >
                                            Advanced Filter
                                        </Toggle>
                                        : null
                                }
                            </div>
                            {
                                allowAdvancedFilter ?
                                    <Collapse in={showAdvancedFilter} timeout={350}>
                                        <div>
                                            <AdvancedFilter key="advancedFilter" columns={columns} filter={advancedFilter} onChange={this.applyAdvancedFilter} />
                                        </div>
                                    </Collapse>
                                    : null
                            }
                        </Card.Title>
                    </Card.Header>
                    <Table tableInstance={this.tableInstance} items={stateItems} filter={tableFilter} columns={columns} {...others}
                        onItemUpdate={this.onItemUpdate} ref={this.innerTable} onError={this.onError} filterCaseSensitive={this.state.filterCaseSensitive} />
                </Form>
            </Card>
        );
    }
}

export default Table;
export { TableCard };