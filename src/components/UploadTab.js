import Predict from "./Predict";
import React from "react";
import Tab from "./Tab";

export default function UploadTab() {
    return (
        <Tab eventKey="upload" title="Upload" className='custom-tab justify-content-center'>
            <Predict />
        </Tab>
        )
}