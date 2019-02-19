import React, { Component } from 'react';

import './HomePage.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div class="header bg-dark pb-5">
                    <div class="container-fluid">

                        <div class="header-body">
                            <div class="row align-items-end">
                                <div class="col">
                                    <h6 class="header-pretitle text-secondary">
                                        Overview
                                    </h6>
                                    <h1 class="header-title text-white">
                                        Performance
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid mt--6">
                    test
                </div>

                <div>
                    HomePage
                </div>
            </div>
        );
    }
}

export default HomePage;