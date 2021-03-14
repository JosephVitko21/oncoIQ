import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Predict from './Predict';
import Archive from './Archive';
import Temp from './Temp'
import { LoginContext } from '../context/GlobalContext';
import {login, authFetch, useAuth, logout} from "../auth";

export default function Tab() {
    const {loggedin, setLogin} = useContext(LoginContext);

    const [logged] = useAuth();

    if (!logged) {
        return null;
    }

    return (
        <div className='mt-5'>
            <Tabs defaultActiveKey="predict" id="uncontrolled-tab-example">
                <Tab eventKey="predict" title="New Predictions">
                    <Temp />
                </Tab>
                <Tab eventKey="archive" title="Archive">
                    <Archive />
                </Tab>
            </Tabs>
        </div>
    );
}
