import React, { Component } from 'react';

import './HistorySection.css';

import Card from 'react-bootstrap/Card';
import { TableCard } from '../../../Table/Table';

import DataManager from '../../../../assets/js/data.manager';

class HistorySection extends Component {
    constructor(props) {
        super(props);

        this.getItemsText = this.getItemsText.bind(this);
        this.itemClicked = this.itemClicked.bind(this);
    }

    getItemsText(items) {
        let transformFunc = function transformItem(i) {
            let textItem = {...i};
            textItem.script = DataManager.getScriptInfoById(textItem.script).name;

            let ranByProfile = DataManager.getProfileById(textItem.ranby);
            textItem.ranby = `${ranByProfile.firstname} ${ranByProfile.lastname}`;

            textItem.resultsObj = textItem.results;

            let totalNum = textItem.resultsObj.length;
            let successNum = textItem.resultsObj.filter( (r) => r.success ).length;
            textItem.results = `${successNum}/${totalNum} (${(successNum/totalNum * 100).toFixed(0)}%)`;

            return textItem;
        };

        return items.map(transformFunc);
    }
    itemClicked(itemId, item) {
        console.log(itemId);
        console.log(item);
    }

    render() {
        let items = DataManager.getAllHistory();
        let textItems = this.getItemsText(items);
        // console.log(items);

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
                <TableCard onItemClick={this.itemClicked} title="History" headerButtons={["case"]} searchable items={textItems} columns={[
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
                ]} >

                </TableCard>
            </div>
        );
    }
}

export default HistorySection;