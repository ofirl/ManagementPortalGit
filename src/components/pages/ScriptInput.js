import React, { Component } from 'react';

import './ScriptInput.css';

import DataManager from '../../assets/js/data.manager';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class ScriptInput extends Component {
    render() {
        console.log(DataManager.getScriptInfoById(4));
        console.log(DataManager.getScriptInfoById(0));
        return (
            <div>
                
            </div>
        );
    }
}

export default ScriptInput;