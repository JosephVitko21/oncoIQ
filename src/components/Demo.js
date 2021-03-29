import React, { useState } from 'react'
import {Badge} from 'react-bootstrap';
import Tile from './Tile';
import TileGrid from "./TileGrid";

export default function Demo() {
    const tiles = [{id: "1HLxCP1mnXdqBONtuHq7psAb9xHIG2I1S", risk_level: 0.5153807997703552},
        {id: "1UBFSqVpVl65Gd_1PP_2b1TUpL6RaCCKS", risk_level: 0.38082003593444824},
        {id: "1uGj-JPkfvjYgOwFW1QH1sfh3ECKLKSJv", risk_level: 0.5654041767120361},
        {id: "1-ScOpkPsZ3zA4URNLcSI-AIHu0uxUcm6", risk_level: 0.4352198541164398},
        {id: "1g2dvgDoY7aTbHebmdRx0K_N9NSHwrCe5", risk_level: 0.15558315813541412},
        {id: "1LcVz9eQfTP2UfCJM-lfAFGxROnlnCJls", risk_level: 0.6589469313621521},
        {id: "1y0NqtFPkGF-BHCrp-pYfAZnTzpYJFcp7", risk_level: 0.7139288187026978},
        {id: "1lSY_oR5c1V6cYyi1EQT4oNrgsgm327D_", risk_level: 0.8020737171173096},
        {id: "1nqhoS9ZgccULWoByKAThnlwtd7n5hsTO", risk_level: 0.8452499508857727},
        {id: "1_ScvoquDFF-ZRXA9ohBFl4pds_Bl7Hsd", risk_level: 0.6028939485549927},
        {id: "1pb-7-WorNdnxuESDNZdknFV17S9TR3KC", risk_level: 0.33209022879600525},
        {id: "1Qx9JoMDOt98-mdA-Y-s75AqvIMFCE7Gv", risk_level: 0.6751946806907654},
        {id: "156y2cE9P0Z7Ug0Tbrw5_St29IH1oyrDo", risk_level: 0.7519523501396179},
        {id: "1stE3dLADnBG2355vlioCanFQJQ8ws56G", risk_level: 0.7884353995323181},
        {id: "1shYp104xlQv3qT0OdDFGMiGxk1apivjB", risk_level: 0.5601320862770081},
        {id: "1VERxFUXsfF0o7J56ql3cpqb7N-WS9typ", risk_level: 0.19635586440563202},
        {id: "1Y-G8gg6msa0dfzJDz_wtneHBMYlyMc_J", risk_level: 0.4808307886123657},
        {id: "1Vm-lnkj-h_biHF3aNFrAi-hgAOdkU1VT", risk_level: 0.860715389251709},
        {id: "14QO5iR5k5tXpiFVY94mvUKt-qq6YD04Z", risk_level: 0.8626291751861572},
        {id: "1hkWtdV6CErdxuNK7ZZ-p2qNAwJfMPdg5", risk_level: 0.5128795504570007},
        {id: "1Q9HG6zzQnHvhZsyeY-8i2It2IdfhZajU", risk_level: 0.34555795788764954},
        {id: "1u7l-tXwKfhbAQa30aJgZBFusXdEP9A7J", risk_level: 0.8157142400741577},
        {id: "1dSHvgbjQlr6UmXv1c9hrVaVMneY8D6M9", risk_level: 0.8443787097930908},
        {id: "1L-V5PxBhqTAvh5jXZ9Em1dJfra29DnMs", risk_level: 0.7808331251144409},
        {id: "1nNYwfh5NB7453iaz6otaANQdQi6pHZef", risk_level: 0.6796820163726807}]

    return (
        <div>
            <h1 className="mt-3">How it works</h1>
            <h5 className="text-info font-weight-bold mt-5">1. Select an AI model</h5>
            <img src="/screenshots/select.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">2. Upload the scanned pathology slide</h5>
            <img src="/screenshots/upload.PNG" className="w-100"></img>
            <h5 className="text-info font-weight-bold mt-5">3. Get predictions</h5>
            <p>The model will generate a heatmap to highlight high-risk areas. Hover your mouse over each tile to see the individual risk level.</p>
            <h5><Badge pill variant="danger">Overall Risk: 61%</Badge></h5>
            <TileGrid
                tiles={tiles}
            />
            <h5 className="text-info font-weight-bold mt-5">The Archive</h5>
            <p>Review saved uploads and predictions</p>
            <img src="/screenshots/archive.PNG" className="w-100"></img>
        </div>
    );
}
