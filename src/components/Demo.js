import React, { useState } from 'react'
import {Badge} from 'react-bootstrap';
import Tile from './Tile';

export default function Demo() {
    var image = []
    const risk = [
        [0.86, 0.84, 0.41, 0.12, 0.59],
        [0.80, 0.79, 0.35, 0.30, 0.44],
        [0.49, 0.32, 0.80, 0.77, 0.18],
        [0.68, 0.66, 0.85, 0.54, 0.74],
        [0.58, 0.64, 0.15, 0.70, 0.85],
    ]

    var r = 0;
    for (let i = 1; i <= 5; i ++) {
        image.push(
            <div className='card-group w-75'>
                <Tile
                    image={"/demo-tiles/large_0" + i + "_01.png"}
                    riskScore={risk[r][0]}
                />
                <Tile
                    image={"/demo-tiles/large_0" + i + "_02.png"}
                    riskScore={risk[r][1]}
                />
                <Tile
                    image={"/demo-tiles/large_0" + i + "_03.png"}
                    riskScore={risk[r][2]}
                />
                <Tile
                    image={"/demo-tiles/large_0" + i + "_04.png"}
                    riskScore={risk[r][3]}
                />
                <Tile
                    image={"/demo-tiles/large_0" + i + "_05.png"}
                    riskScore={risk[r][4]}
                />
            </div>
        );

        r++;
    }

    return (
        <div>
            <h1 className="mt-3">How it works</h1>
            <h5 className="text-info font-weight-bold mt-5">1, Select an AI model</h5>
            <img src="/screenshots/select.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">2, Upload the scanned pathology slide</h5>
            <img src="/screenshots/upload.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">3, Get predictions</h5>
            <p>The model will generate a heatmap to highlight high-risk areas. Hover your mouse over each tile to see the individual risk level.</p>
            <h5><Badge pill variant="danger">Overall Risk: 58%</Badge></h5>
            {image}
            <h5 className="text-info font-weight-bold mt-5">The Archive</h5>
            <p>Review saved uploads and predictions</p>
            <img src="/screenshots/archive.PNG" className="w-100"></img>
        </div>
    );
}
