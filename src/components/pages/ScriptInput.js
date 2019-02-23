import React, { Component } from 'react';

import './ScriptInput.css';

import DataManager from '../../assets/js/data.manager';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Toggle from '../Toggle';
import PageHeader from '../PageHeader';
import Table from '../Table';

class ScriptInput extends Component {
    render() {
        console.log(DataManager.getScriptInfoById(4));
        console.log(DataManager.getScriptInfoById(0));

        return (
            <div>
                <div className="header bg-dark">
                    <div className="container-fluid">
                        <PageHeader>
                            <PageHeader.Body>
                                <PageHeader.Pretitle text="Script Execution" />
                                <PageHeader.Title text="<script name>" />
                            </PageHeader.Body>
                        </PageHeader>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {/* <Toggle /> */}
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Table Title
                                </Card.Title>
                            </Card.Header>
                            {/* <Card.Body> */}
                            <Table nowrap columns={[
                                {
                                    name: 'test',
                                    accessor: 'test'
                                }, 
                                {
                                    name: 'test2',
                                    accessor: 'test2'
                                }]} 
                                items={[{
                                    test: '1',
                                    test2: '1'
                                },
                                {
                                    test: '2',
                                    test2: '2'
                                },
                                {
                                    test: '3',
                                    test2: '3'
                                }
                                ]}>

                            </Table>
                            {/* </Card.Body> */}
                        </Card>
                    </div>
                </div>
            </div >
        );
    }
}

export default ScriptInput;