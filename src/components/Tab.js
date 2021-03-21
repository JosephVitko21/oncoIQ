import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Predict from './Predict';
import Archive from './Archive';
import Temp from './Temp'
import { ArchContext } from '../context/GlobalContext';
import {login, authFetch, useAuth, logout} from "../auth";
import ImageList from "./ImageList";

export default function Tab() {
    const {arch, setArch} = useContext(ArchContext);

    const [logged] = useAuth();

    if (!logged) {
        return null;
    }

    return (
        <div className='mt-5'>
            <Tabs defaultActiveKey="predict" id="uncontrolled-tab-example" onClick={() => setArch(true)}>
                <Tab eventKey="predict" title="Upload" className='custom-tab justify-content-center'>
                    <Predict />
                </Tab>
                <Tab eventKey="archive" title="Archive">
                    <ImageList />
                </Tab>
            </Tabs>
        </div>
    );
}
