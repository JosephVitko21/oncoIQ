import React, { useState } from 'react'
import {Badge} from 'react-bootstrap';

export default function Demo() {

    return (
        <div>
            <h1 className="mt-3">How it works</h1>
            <h5 className="text-info font-weight-bold mt-5">1. Select an AI model</h5>
            <img src="/screenshots/select.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">2. Upload the scanned pathology slide</h5>
            <img src="/screenshots/upload.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">3. Get predictions</h5>
            <p>The model will calculate the overall risk level and generate a heatmap to highlight high-risk areas. Hover your mouse over each tile to see the individual risk level.</p>
            <img src="/screenshots/result.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">The Archive</h5>
            <p>Review saved uploads and predictions</p>
            <img src="/screenshots/archive.PNG" className="w-100"></img>
        </div>
    );
}
