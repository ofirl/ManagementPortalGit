import React, { Component } from 'react';

import './HistorySection.css';

import Card from 'react-bootstrap/Card';

class HistorySection extends Component {
    render() {
        return (
            <Card className="col-6">
                <Card.Header> History </Card.Header>
                <Card.Body>
                    <Card.Text>
                        text asd asd asd asdas <br />
                        asdasa asd as das d
                            </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default HistorySection;