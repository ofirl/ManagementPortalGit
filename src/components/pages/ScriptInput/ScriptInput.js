import React, { Component } from 'react';

import './ScriptInput.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';

import DataManager from '../../../assets/js/data.manager';

// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse'
import Alert from 'react-bootstrap/Alert'

import Toggle from '../../Toggle/Toggle';
import PageHeader from '../../PageHeader/PageHeader';
import /*Table,*/ { TableCard } from '../../Table/Table';
import Input from '../../Input/Input';
import Select from '../../Select/Select';

import ProfileContext from '../../Context/ProfileContext';
import Button from 'react-bootstrap/Button';

class ScriptInput extends Component {
    constructor(props) {
        super(props);

        this.toggleRef = React.createRef();
        this.logonUserRef = React.createRef();
        this.logonSystemRef = React.createRef();

        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.toggelCollapse = this.toggelCollapse.bind(this);
        this.predefinedConnectionSelected = this.predefinedConnectionSelected.bind(this);
        this.executeScript = this.executeScript.bind(this);
        this.saveDataForLater = this.saveDataForLater.bind(this);

        // let logondata = context.profile.personalization.logondata;
        let logondata = props.profileId !== -1 && props.profileId != null ? DataManager.getProfileById(props.profileId).personalization.logondata : [];
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
            inputTableItems: [{
                id: 1,
                test: 'asdasd',
                test2: 'test2'
            }],
            logonCollapsed: false,
            logonSystem: () => this.logonSystemRef.current && this.logonSystemRef.current.getValue(),
            logonUser: () => this.logonUserRef.current && this.logonUserRef.current.getValue(),
            logonDefaultSystem: logonDefaultSystem,
            logonDefaultUser: logonDefaultUser,
            logonData: logondata,
            logonDropValues: dropValues,
            logonDefaultDropIndex: defaultIndex,
            showExecutionAlert: false
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

    onUpdateItem(itemId, updatedItems) {
        console.log(updatedItems);
        this.setState({ inputTableItems: updatedItems });
    }

    executeScript() {
        // TODO: execute script
        this.setState({ showExecutionAlert: true });
    }
    saveDataForLater() {
        //  TODO : save for later
    }

    render() {
        // console.log(DataManager.getScriptInfoById(0));
        let { inputTableItems, logonCollapsed, logonDropValues, logonDefaultDropIndex, logonDefaultSystem, logonDefaultUser, showExecutionAlert } = this.state;

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
            <div className="">
                {
                    showExecutionAlert ? (
                        <Alert className="" show={showExecutionAlert} variant="soft-warning" onClose={() => console.log('alertClosed')}>
                            <Alert.Heading>Error</Alert.Heading>
                            <p>
                                There are errors in the input data,
                                are you sure you want to execute the script?
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => this.setState({ showExecutionAlert: false })} variant="danger" className="mr-2">
                                    Ignore and Execute
                                </Button>
                                <Button onClick={() => this.setState({ showExecutionAlert: false })} variant="primary">
                                    Cancel
                                </Button>
                            </div>
                        </Alert>
                    ) : null
                }

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

                    <div className="row justify-content-around">
                        {/* <Card className="col-auto">
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
                                    <Select className="col-4" dropValues={logonDropValues} allowNull={false} defaultItem={logonDefaultDropIndex} onChange={this.predefinedConnectionSelected} />
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
                        </Card> */}

                        {/* <Card className="col-auto">
                            <Card.Header className="row pb-1 pl-4 flex-grow-0">
                                <Card.Title className="mb-0 d-flex align-items-center">
                                    Execution Controls
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row justify-content-around">
                                    <Button variant="primary" onClick={this.executeScript}>
                                        Execute
                                    </Button>
                                    <div className="col-auto"></div>
                                    <Button variant="secondary" onClick={this.saveDataForLater}>
                                        Save for later
                                </Button>
                                </div>
                            </Card.Body>
                        </Card> */}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <TableCard title="Input" nowrap editable searchable headerButtons={['new-row', 'import']} rowButtons={['copy', 'remove']}
                                onItemUpdate={this.onUpdateItem} columns={[
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
                                items={inputTableItems}
                            // items={[
                            //     {
                            //     id: 1,
                            //     test: 'asdasd',
                            //     test2: 'test2'
                            // },
                            // {
                            //     id: 2,
                            //     test: '2',
                            //     test2: 'test2'
                            // },
                            // {
                            //     id: 3,
                            //     test: '3',
                            //     test2: 'test1'
                            // },
                            // {
                            //     id: 4,
                            //     test: '33',
                            //     test2: 'test2'
                            // },
                            // {
                            //     id: 5,
                            //     test: '34',
                            //     test2: 'test1'
                            // }
                            // ]}>
                            >
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
                </div>

                <div className="position-sticky ml-4 mr-4" style={{ bottom: '0' }}>
                    <Card>
                        <Card.Body className="row p-3 d-flex align-items-center">
                            <div className="col-auto">
                                Logon Data :
                            </div>
                            <div className="col-auto">
                                <Toggle onChange={this.toggelCollapse} defaultChecked={true}> New Session </Toggle>
                            </div>
                            <div className="col-auto">
                                Predefined <br /> Connection :
                            </div>
                            <div className="col-auto">
                                <Select placement="top" dropValues={logonDropValues} allowNull={false} defaultItem={logonDefaultDropIndex} onChange={this.predefinedConnectionSelected} />
                            </div>
                            <div className="col-auto">
                                Logon <br /> system :
                            </div>
                            <div className="col-auto">
                                <Input ref={this.logonSystemRef} defaultValue={logonDefaultSystem} />
                            </div>
                            <Collapse in={!logonCollapsed} className="col-auto">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        Username :
                                    </div>
                                    <div className="col-auto">
                                        <Input className="" ref={this.logonUserRef} defaultValue={logonDefaultUser} />
                                    </div>
                                </div>
                            </Collapse>
                            <div className="mr-auto"></div>
                            <div className="col-auto">
                                <Button variant="primary" onClick={this.executeScript}>
                                    Execute
                                </Button>
                            </div>
                            <div className="col-auto">
                                <Button variant="secondary" onClick={this.saveDataForLater}>
                                    Save for later
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        profileId: state.profileId
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        ...ownProps,
        boundActions: bindActionCreators(actions, dispatch)
    };
}

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default ScriptInput;
export default connect(mapStateToProps, mapDispatchToProps)(ScriptInput);