import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import googleDomain from "../../../utils/google-drive-domain";
import {Badge, Col, Row} from "react-bootstrap";
import RiskBadge from "../../archive/RiskBadge";
import utils from "../../../utils/utils";
import moment from "moment";
import PostFooter from "../thread/PostFooter";

export default function CaseCard(props) {
    const navigate = useNavigate();

    let image_src
    if (!props.file_id) {
        // load the placeholder image
        image_src = "https://2rri712hg8ztbbaed491mw10-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/placeholder-square.png"
    } else {
        image_src = googleDomain + props.file_id
    }
    
    return (
        <div className="card mb-4 pointer" onClick={() => navigate("/thread?id="+props.image_id)}>
            <div className="row no-gutters">
                <div className="col-md-3 my-auto p-2">
                    <img className="card-img-top" src={image_src} />
                </div>

                <div className="col-md-8 p-2">
                    <Col className="justify-content-around flex-column" style={{display: "flex", height: "100%"}}>
                        <div>
                            <Row>
                                <p className='mr-2'><Badge pill style={{color: "white", backgroundColor: "#EF476F", opacity: 0.75}}>{props.model}</Badge></p>
                                {props.risk_level != null ?
                                    <RiskBadge risk_level={props.risk_level} size="sm" className='mr-2' style={{opacity: 0.75}}/>
                                    : <></>}
                            </Row>
                            <h3>{props.name}</h3>
                            <p>{props.description}</p>
                        </div>

                        <div style={{borderTop: "solid 0.5px #eeeeee", paddingTop: '15px'}}>
                            <PostFooter
                                poster={props.poster}
                                profilePic={props.profilePic}
                                job={props.job}
                                date={props.date}

                            />
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    );
}
