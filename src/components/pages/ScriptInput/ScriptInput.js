import React, { Component } from 'react';

import './ScriptInput.css';

import DataManager from '../../../assets/js/data.manager';

// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse'

import Toggle from '../../Toggle/Toggle';
import PageHeader from '../../PageHeader/PageHeader';
import /*Table,*/ { TableCard } from '../../Table/Table';
import Input from '../../Input/Input';
import Select from '../../Select/Select';

import ProfileContext from '../../Context/ProfileContext';

class ScriptInput extends Component {
    constructor(props, context) {
        super(props);

        this.toggleRef = React.createRef();
        this.logonUserRef = React.createRef();
        this.logonSystemRef = React.createRef();

        this.toggelCollapse = this.toggelCollapse.bind(this);
        this.predefinedConnectionSelected = this.predefinedConnectionSelected.bind(this);

        let logondata = context.profile.personalization.logondata;
        let dropValues = logondata.reduce((acc, curr, idx) => {
            acc.push(curr.name);
            return acc;
        }, []);

        let defaultIndex = logondata.findIndex((d) => d.default);
        let logonDefaultSystem = '';
        let logonDefaultUser = '';
        if (defaultIndex !== -1) {
            logonDefaultSystem = logondata[defaultIndex].system;
            logonDefaultUser = logondata[defaultIndex].username;
        }

        this.state = {
            logonCollapsed: false,
            logonSystem: () => this.logonSystemRef.current && this.logonSystemRef.current.getValue(),
            logonUser: () => this.logonUserRef.current && this.logonUserRef.current.getValue(),
            logonDefaultSystem: logonDefaultSystem,
            logonDefaultUser: logonDefaultUser,
            logonData: logondata,
            logonDropValues: dropValues,
            logonDefaultDropIndex: defaultIndex
        }
    }

    static contextType = ProfileContext
    toggelCollapse() {
        this.setState({ logonCollapsed: !this.state.logonCollapsed });
    }
    predefinedConnectionSelected(value, index) {
        let selectedConnection = this.state.logonData[index];

        this.logonSystemRef.current.setValue(selectedConnection.system);
        this.logonUserRef.current.setValue(selectedConnection.username);
    }

    render() {
        // console.log(DataManager.getScriptInfoById(0));
        let { logonCollapsed, logonDropValues, logonDefaultDropIndex, logonDefaultSystem, logonDefaultUser } = this.state;

        let scriptInfo = DataManager.getScriptInfoById(parseInt(this.props.match.params.id));
        if (scriptInfo == null) {
            return (
                <div>
                    <div className="header bg-dark">
                        <div className="container-fluid">
                            <PageHeader>
                                <PageHeader.Body>
                                    <PageHeader.Pretitle text="Script Execution" />
                                    <PageHeader.Title text="Unknown" />
                                </PageHeader.Body>
                            </PageHeader>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            Cant find script data, try clicking the link from the menu, <br />
                            If you still see this message contact the admin and let them know of the problem.
                        </div>
                    </div>
                </div>
            );
        }

        return (
            // <ProfileContext.Consumer>
            //     {
            //         ({ profile, toggleTheme }) => {
            //             return (
            // <ProfileContext.Consumer>
            //     {(profileContext) => {
            //         return (
            <div>
                <div className="header bg-dark">
                    <div className="container-fluid">
                        <PageHeader>
                            <PageHeader.Body>
                                <PageHeader.Pretitle text="Script Execution" />
                                <PageHeader.Title text={scriptInfo.name} />
                            </PageHeader.Body>
                        </PageHeader>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row pb-4" dangerouslySetInnerHTML={{ __html: scriptInfo.description }}>
                    </div>

                    <div className="row">
                        <Card className="col-auto">
                            <Card.Header className="row pb-1 pl-4">
                                <Card.Title className="mb-0 d-flex align-items-center">
                                    <div>
                                        Logon data :
                                    </div>
                                    <div className="mr-auto"></div>
                                    <Toggle onChange={this.toggelCollapse} defaultChecked={true}> New Session </Toggle>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row pb-4 align-items-center">
                                    <label className="col-8 mb-0">
                                        Predefind connections :
                                    </label>
                                    <Select className="col-4" dropValues={logonDropValues} defaultItem={logonDefaultDropIndex} onChange={this.predefinedConnectionSelected} />
                                </div>
                                <div className="row d-flex align-items-center">
                                    <label className="col-4"> Logon system : </label>
                                    <Input className="col-8" ref={this.logonSystemRef} defaultValue={logonDefaultSystem} />
                                </div>
                                <Collapse in={!logonCollapsed} className="">
                                    <div className="row align-items-center">
                                        <span className="col-12 pt-4"></span>
                                        <label className="col-4"> Username : </label>
                                        <Input className="col-8" ref={this.logonUserRef} defaultValue={logonDefaultUser} />
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="row">
                        <TableCard title="Input" nowrap editable searchable headerButtons={['new-row']} rowButtons={['copy', 'remove']} columns={[
                            {
                                name: 'test',
                                accessor: 'test'
                            },
                            {
                                name: 'test2',
                                accessor: 'test2',
                                // readonly: true,
                                type: 'select',
                                dropValues: ['test1', 'test2']
                            }]}
                            items={[{
                                id: 1,
                                test: 'asdasd',
                                test2: 'test2'
                            },
                            {
                                id: 2,
                                test: '2',
                                test2: 'test2'
                            },
                            {
                                id: 3,
                                test: '3',
                                test2: 'test1'
                            },
                            {
                                id: 4,
                                test: '33',
                                test2: 'test2'
                            },
                            {
                                id: 5,
                                test: '34',
                                test2: 'test1'
                            }
                            ]}>
                            {/* <TableCard.HeaderButtons>
                                {
                                    React.cloneElement( (props) => (
                                        <div onClick={function () { console.log(this.props) }}>
                                            test
                                        </div>
                                    ), {} )
                                }
                            </TableCard.HeaderButtons> */}
                            {/* <TableCard.RowButtons>
                                <div>
                                    test
                                </div>
                            </TableCard.RowButtons> */}
                        </TableCard>
                    </div>
                </div>
            </div >
            //         )}
            //     }
            // </ProfileContext.Consumer>
            //         );
            //     }
            //     }
            // </ProfileContext.Consumer>
        );
    }
}

export default ScriptInput;