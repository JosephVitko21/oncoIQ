import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Predict from './Predict';
import Archive from './Archive';

export default function Tab() {
    return (
        <div>
            <Tabs defaultActiveKey="predict" id="uncontrolled-tab-example">
                <Tab eventKey="predict" title="New Predictions">
                    <Predict />
                </Tab>
                <Tab eventKey="archive" title="Archive">
                    <Archive />
                </Tab>
            </Tabs>
        </div>
    );
}
