import React from 'react';
import {Card} from "react-bootstrap";
import ImageDetailModal from "./ImageDetail";

import googleDomain from "../utils/google-drive-domain";
import utils from "../utils/utils";

export default function ArchiveEntry(props) {
    const image_src = googleDomain + props.file_id
    console.log(image_src)

    return (
        <Card className="archive-entry">
            <Card.Img variant="top" src={image_src} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="text-muted">{utils.timeSince(props.date)}</Card.Text>
                <ImageDetailModal fileID={props.file_id} imageID={props.image_id}/>
            </Card.Body>
        </Card>
    );
}
