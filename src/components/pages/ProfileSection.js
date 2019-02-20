import React, { Component } from 'react';

import './ProfileSection.css';

import Card from 'react-bootstrap/Card';

class ProfileSection extends Component {
    render() {
        return (
            <Card className="col-6">
                <Card.Header> Profile </Card.Header>
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

export default ProfileSection;