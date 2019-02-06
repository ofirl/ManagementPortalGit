import React, { Component } from 'react';

function Heading(props) {
    return (
        <h6 class="navbar-heading">
            {props.heading}
        </h6>

    );
}

function Divider(props) {
    return (
        <hr class="navbar-divider my-3" />
    );
}

class Menu extends Component {
    render() {
        return (
            <div class="collapse navbar-collapse" id="sidebarCollapse">
                <Divider />

                <Heading heading={'Documentation'}/>
            </div>
        );
    }
}

export default Menu;