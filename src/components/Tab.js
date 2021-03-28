import React, {useContext} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Archive from './Archive';
import {login, authFetch, useAuth, logout} from "../auth";
import Upload from "./Upload"

export default function Tab() {
    const [logged] = useAuth();

    if (!logged) {
        return null;
    }

    return (
        <div className='container mt-5'>
            <Tabs className="text-info" defaultActiveKey="predict" id="uncontrolled-tab-example">
                <Tab eventKey="predict" title="Upload" className='custom-tab justify-content-center'>
                    <Upload />
                </Tab>
                <Tab eventKey="archive" title="Archive">
                    <Archive />
                </Tab>
            </Tabs>
        </div>
    );
}
