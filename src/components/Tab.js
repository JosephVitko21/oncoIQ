import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Archive from './Archive';
import { ArchContext } from '../context/GlobalContext';
import {login, authFetch, useAuth, logout} from "../auth";
import Upload from "./Upload"

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
                    <Upload
                        switchTab = {() => setArch(true)}
                    />
                </Tab>
                <Tab eventKey="archive" title="Archive">
                    <Archive />
                </Tab>
            </Tabs>
        </div>
    );
}
