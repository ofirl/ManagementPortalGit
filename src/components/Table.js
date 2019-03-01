import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Table.css';

import Card from 'react-bootstrap/Card';
import Input from './Input';

function naturalSort(a, b) {
    function chunkify(t) {
        let tz = [], x = 0, y = -1, n = 0, i, j;

        while (t[x] != null && (i = (j = t[x++]).charCodeAt(0))) {
            let m = (i == 46 || (i >= 48 && i <= 57));
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
            if (c == aa[x] && d == bb[x]) {
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
    /** table items */
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
    })
}

let tableDefaultProps = {
    items: [],
    nowrap: false
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

        this.state = {
            items: props.items,
            filter: null,
            sort: null
        }

        console.log(props);
        console.log(this);

        this.instance = this;
    }
    static propTypes = tablePropTypes
    static defaultProps = tableDefaultProps

    componentWillReceiveProps(nextProps, nextContext) {
        let { filter, sort } = nextProps;
        let nextState = {};
        if (filter)
            nextState.filter = filter;
        if (sort)
            nextState.sort = sort;

        this.setState(nextState);
    }
    setFilter(filter) {
        this.setState({ filter: filter });
    }
    addFilter(filter) {
        this.setState({ filter: { ...this.state.filter, ...filter } });
    }
    applySort(column, order) {
        if (order == undefined && order == null) {
            if (this.state.sort != null && this.state.sort.column == column)
                order = this.state.sort.order == 'asc' ? 'des' : 'asc';
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
        // sortObj = this.state.sort;
        // if (sortObj == null)
        //     return this.state.items;

        console.log(sortObj);

        let { column, order } = sortObj;
        let sortedItems = items.sort((a, b) => {
            console.log(`sorting ${a[column]} and ${b[column]}`);
            return naturalSort(a[column], b[column]);
        });

        if (order == 'des')
            sortedItems.reverse();

        return sortedItems;

        // this.setState({
        //     items: sortedItems
        // });
    }
    applyFilter(filter) {
        this.setState({ filter: filter });
    }
    filterItems(items, filterObj) {
        if (items == null)
            items = this.state.items;

        if (filterObj == null) {
            if (this.state.filter == null)
                return items;
            else
                filterObj = this.state.filter;
        }

        if (filterObj.length == 0)
            return items;

        if (filterObj[0] == null)
            filterObj = [filterObj];

        let filteredItems = items;
        filterObj.forEach(filter => {
            if (filter.value != null) {
                if (filter.column)
                    filteredItems = filteredItems.filter((i) => i[filter.column] == filter.value);
                else
                    filteredItems = filteredItems.filter((i) => Object.keys(i).some((key, idx) => key != 'id' && i[key].toString().match(new RegExp(filter.value))));
            }
            else
                filteredItems = filteredItems.filter(filter);
        });

        return filteredItems;
    }
    updateItem(itemId, column, newValue) {
        let itemIdx = this.state.items.findIndex((i) => i.id == itemId);
        if (itemIdx == -1) {
            console.log('Item ID could not be found, exiting...');
            return;
        }

        let updatedItems = this.state.items;
        updatedItems[itemIdx][column] = newValue;

        this.setState({ items: updatedItems });
    }

    render() {
        let that = this;

        let { className, columns, size, nowrap, editable } = this.props;
        let { items } = this.state;
        items = this.filterItems(items);
        items = this.sortItems(items);

        console.log(items);

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
                                    if (current.sortable == false)
                                        sortable = null;
                                }

                                acc.push((<th key={idx} className={`text-muted ${sortable ? 'pointer' : ''}`} {...sortable}> {current.name} </th>));
                                return acc;
                            }, [])
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
                                                (
                                                    <td key={colIdx} className="align-middle">
                                                        {
                                                            editable && current.readonly != true ?
                                                                (
                                                                    <Input value={currentItem[current.accessor]} flush onInput={(val) => that.updateItem(currentItem.id, current.accessor, val)} />
                                                                )
                                                                :
                                                                currentItem[current.accessor]
                                                        }
                                                    </td>
                                                )
                                            );
                                            return acc;
                                        }, [])
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
    static HeaderButtons = class HeaderButtons extends Component {
        render() {
            let { children, relatedTable } = this.props;

            if (children.length == null)
                children = [children];

            // children.map( (c) => React.cloneElement(c, {
            //     table: relatedTable
            // }));
            return children;
        }
    }
    static RowButtons = class RowButtons extends Component {
        render() {
            return this.props.children;
        }
    }

    constructor(props) {
        super(props);

        this.applyOmniFilter = this.applyOmniFilter.bind(this);

        this.state = {
            omniFilter: null
        }
    }
    static propTypes = {
        ...tablePropTypes,
        /** searchanble modifier */
        searchable: PropTypes.bool,
        /** table title */
        title: PropTypes.string
    }
    static defaultProps = {
        ...tableDefaultProps,
        searchable: false
    }

    applyOmniFilter(value) {
        if (value == '')
            this.setState({ omniFilter: null });
        else
            this.setState({ omniFilter: value });
    }

    render() {
        let { columns, items, size, nowrap, filter, sort, editable, title, searchable, children } = this.props;

        let tableFilter = [];
        if (this.state.omniFilter != null)
            tableFilter.push({ value: this.state.omniFilter });

        // if (children.length == null)
        //     children = [children];

        // let headerButtons = children.find((c) => c.type.name == "HeaderButtons");
        // let rowButtons = children.find((c) => c.type.name == "RowButtons");

        return (
            <Card>
                <Card.Header className="pb-1 pl-4">
                    <Card.Title className="mb-0">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col align-middle">
                                {title}
                            </div>
                            {
                                searchable ?
                                    (
                                        <div className="col-auto">
                                            <Input className="col-auto" icon="search" placeholder="Search" onInput={this.applyOmniFilter} prepend flush />
                                        </div>
                                    )
                                    : null
                            }
                            {
                                // headerButtons != null ?
                                //     React.cloneElement(headerButtons, { relatedTable: this})
                                //     : null
                            }
                        </div>
                    </Card.Title>
                </Card.Header>
                    <Table nowrap={nowrap} columns={columns} items={items} filter={tableFilter} editable />
                {/* {
                    React.forwardRef( (props, ref) => (<Table nowrap={nowrap} columns={columns} items={items} filter={tableFilter} instance={ref} editable />)).render()
                } */}
                {/* <Table nowrap={nowrap} columns={columns} items={items} filter={tableFilter} instance={this.tableInstance} editable /> */}
            </Card>
        );
    }
}

export default Table;
export { TableCard };