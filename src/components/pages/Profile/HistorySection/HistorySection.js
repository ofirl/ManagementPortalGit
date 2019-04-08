import React, { Component } from 'react';

import Collapse from 'react-bootstrap/Collapse'

import './HistorySection.css';

import Card from 'react-bootstrap/Card';
import { TableCard } from '../../../Table/Table';

import DataManager from '../../../../assets/js/data.manager';
import Button from 'react-bootstrap/Button';
import Icon from '../../../Icon/Icon';

class HistorySection extends Component {
    constructor(props) {
        super(props);

        this.getItemsText = this.getItemsText.bind(this);
        this.itemClicked = this.itemClicked.bind(this);

        this.state = {
            currentItem: null,
            showItemDetails: false
        }
    }

    getItemsText(items) {
        let transformFunc = function transformItem(i) {
            let textItem = { ...i };
            textItem.script = DataManager.getScriptInfoById(textItem.scriptId).name;

            let ranByProfile = DataManager.getProfileById(textItem.ranby);
            textItem.ranby = `${ranByProfile.firstname} ${ranByProfile.lastname}`;

            textItem.resultsObj = textItem.results;

            let totalNum = textItem.resultsObj.length;
            let successNum = textItem.resultsObj.filter((r) => r.success).length;
            textItem.results = `${successNum}/${totalNum} (${(successNum / totalNum * 100).toFixed(0)}%)`;

            return textItem;
        };

        return items.map(transformFunc);
    }
    itemClicked(itemId, item) {
        // console.log(itemId);
        // console.log(item);

        this.setState({ currentItem: item, showItemDetails: true });
    }

    render() {
        const { currentItem, showItemDetails } = this.state;
        let items = DataManager.getAllHistory();
        let textItems = this.getItemsText(items);

        let currentItemScriptInfo = currentItem ? DataManager.getScriptInfoById(currentItem.scriptId) : null;
        let defaultCoulmns = [
            {
                name: "Script",
                accessor: "script"
            },
            {
                name: "Date",
                accessor: "date"
            },
            {
                name: "Ran by",
                accessor: "ranby"
            },
            {
                name: "Results",
                accessor: "results"
            }
        ];
        let msgColumn = {
            name: 'Message',
            accessor: 'msg',
            sort: (msg) => {
                if (msg.some((m) => m.type === 'error'))
                    return 1;
                if (msg.some((m) => m.type === 'warning'))
                    return 2;
                if (msg.some((m) => m.type === 'info'))
                    return 3;

                return -1;
            },
            render: (msgs) => {
                let msgTypes = {
                    error: 'x-square',
                    warning: 'alert-triangle',
                    info: 'info'
                }
                return msgs.map((v, idx) => (
                    <div key={idx}>
                        <Icon type={msgTypes[v.type]} className={`mr-2 msg-icon-${v.type}`} />
                        {v.text}
                    </div>
                ));
            }
        }
        let capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        let successColumn = {
            name: 'Status',
            accessor: 'success',
            type: 'select',
            dropValues: ['fail', 'success'],
            render: (success) => [<Icon className={`mr-2 history-table-${success === "success" ? 'success' : 'fail'}`} type={success === "success" ? 'target' : 'target'} />, capitalize(success)]
        }

        let tableColumns = currentItem ? [...currentItemScriptInfo.inputs, ...currentItemScriptInfo.outputs, msgColumn, successColumn] : defaultCoulmns;

        let tableItems = currentItem ? currentItem.resultsObj.map((r) => {
            return {
                success: r.success ? 'success' : 'fail',
                ...r.input,
                ...r.output
            };
        }) : textItems;

        return (
            <div className="col-12">
                <Card className="col-6">
                    <Card.Header> History </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            text asd asd asd asdas <br />
                            asdasa asd as das d
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Button disabled={!showItemDetails} className="mb-1" variant="white" size="sm" onClick={() => this.setState({ showItemDetails: false })}> Show all history </Button>
                <Collapse in={!showItemDetails} timeout={350}>
                    <div>
                        <TableCard onItemClick={this.itemClicked} itemHoverEffect title="History" headerButtons={["case"]} searchable
                            items={textItems} columns={defaultCoulmns} >
                        </TableCard>
                    </div>
                </Collapse>
                <Collapse in={showItemDetails} timeout={350}>
                    <div>
                        <TableCard onItemClick={currentItem ? null : this.itemClicked} itemHoverEffect title="Item Details" headerButtons={["case"]} searchable
                            items={tableItems} columns={tableColumns} >
                        </TableCard>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default HistorySection;