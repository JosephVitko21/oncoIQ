import React from 'react'
import {Card} from "react-bootstrap";

import domain from "../utils/site-domain";

export default function ModelCard(props) {
    let thumbnail_src = domain + props.thumbnail_url;
    let status_text = '';

    if (props.status === 0) {
        status_text = "Not Downloaded";
    } else if (props.status === 1) {
        status_text = "Sleeping";
    } else if (props.status === 2) {
        status_text = "Loaded";
    }
    console.log(thumbnail_src);

    return (
        <Card onClick={props.selectModel} className='model-card'>
            <div className="row">
                <div className="col-4">
                    <img
                        src={ thumbnail_src }
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="col-8">
                    <Card.Body>
                        <Card.Title>{ props.name }</Card.Title>
                        <Card.Text>{ status_text }</Card.Text>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}
