import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Table.css';

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

class Table extends Component {
    constructor(props) {
        super(props);

        this.setFilter = this.setFilter.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.applySort = this.applySort.bind(this);
        this.sortItems = this.sortItems.bind(this);

        this.state = {
            items: props.items,
            filter: null,
            sort: null
        }
    }
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            sortable: PropTypes.bool
        })).isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        size: PropTypes.oneOf(['sm']),
        nowrap: PropTypes.bool,
        searchable: PropTypes.bool,
        filter: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({
                column: PropTypes.string,
                value: PropTypes.string
            })
        ]),
        sort: PropTypes.shape({
            column: PropTypes.string,
            order: PropTypes.oneOf(['asc', 'des'])
        })
    }
    static defaultProps = {
        items: [],
        nowrap: false,
        searchable: false
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let { nextFilter } = nextProps;
        if (nextFilter)
            this.setState({ filter: nextFilter });
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
    sortItems(sortObj) {
        if (sortObj == null) {
            if (this.state.sort == null)
                return this.state.items;
            else
                sortObj = this.state.sort;
        }
        // sortObj = this.state.sort;
        // if (sortObj == null)
        //     return this.state.items;

        console.log(sortObj);

        let { column, order } = sortObj;
        let sortedItems = this.state.items.sort((a, b) => {
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

    render() {
        let that = this;

        let { columns, size, nowrap } = this.props;
        let { items } = this.state;
        items = this.sortItems();

        console.log(items);

        return (
            <table className={`table ${size ? 'table-' + size : ''} ${nowrap ? 'table-nowrap' : ''} card-table`}>
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
                        items.reduce(function (acc, currentItem, idx, array) {
                            acc.push((
                                <tr key={idx}>
                                    {
                                        columns.reduce(function (acc, current, idx, array) {
                                            acc.push((<td key={idx}> {currentItem[current.accessor]} </td>));
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

export default Table;