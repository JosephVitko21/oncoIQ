import React from 'react';
import {Card} from "react-bootstrap";
import PostFooter from "./PostFooter";

export default function CommentCard(props) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Text >
                    {props.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <PostFooter
                    poster = {props.authorName}
                    job={props.authorJob}
                    profilePic={props.authorProfilePic}
                    date={props.date}
                />
            </Card.Footer>
        </Card>
    );
}
