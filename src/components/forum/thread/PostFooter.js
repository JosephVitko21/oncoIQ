import {Col, Row} from "react-bootstrap";
import moment from "moment";
import React from "react";

export default function PostFooter(props) {
    return (
        <Row>
            <Col style={{flexBasis: 'auto', maxWidth: 'none', flexGrow: 0.0, width: 'auto'}}>
                <img className="profile-pic" width="50" src={props.profilePic} />
            </Col>
            <Col>
                <p className='mb-0'>{props.poster}</p>
                <small>{props.job}</small>
            </Col>
            <div className='mr-4 mt-2'>
                <p>{moment.utc(props.date).fromNow()}</p>
            </div>
        </Row>
    )
}