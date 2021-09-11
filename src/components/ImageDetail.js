import React from 'react';
import {Modal, Button, Card, Badge, Image, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import user from "../utils/user";
import utils from "../utils/utils";
import domain from "../utils/site-domain";
import TileGrid from "./TileGrid";
import googleDomain from "../utils/google-drive-domain";
import RiskBadge from "./RiskBadge";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default class ImageDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: (!!this.props.showOnCreate),
            data: this.props.data,
        }
    }

    render() {
        const image_src = googleDomain + this.props.file_id
        // TODO: handle editing
        // TODO: confirm delete dialog
        // TODO: clean up format, especially the description and adding the model.
        // TODO: add a slider to toggle between no overlay, semi-transparent overlay, and solid overlay
        // TODO: Find a way to handle wrapping/overflow from long names in the preview card
        return (
            <>
                {!this.props.showOnCreate ? (
                        <Col xs="6" sm="6" md="6" lg="4" xl="3">
                            <Card className="archive-entry transform-on-hover" onClick={this.handleShow}>
                                <Card.Img variant="top" src={image_src} />
                                <div className="archive-card-body">
                                    <Card.Title>{this.props.name}</Card.Title>
                                    <Card.Subtitle className='mb-1'>{this.props.model}</Card.Subtitle>
                                    <Card.Text className="text-muted">{moment(this.props.date).fromNow()}</Card.Text>
                                    <RiskBadge risk_level={this.props.risk_level} />
                                </div>
                            </Card>
                        </Col>
                ) : (
                    <></>
                    )}

                {this.state.data ? (
                    <Modal
                        size="lg"
                        show={this.state.show}
                        onHide={this.handleHide}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                { this.state.data.name }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="image-detail">
                                <RiskBadge risk_level={this.props.risk_level} />
                                {console.log("data to render:", this.state.data)}
                                <TileGrid
                                    tiles={this.state.data.tiles}
                                    id={this.state.data.id}
                                    image_url={googleDomain + this.state.data.file_id}
                                    num_rows={this.state.data.num_rows}
                                    num_cols={this.state.data.num_cols}
                                />
                            </div>
                            <p>{this.state.data.description}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Row className='mr-auto'>
                                <Button variant="outline-danger" className='mr-2' onClick={this.handleRemove}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                                <Button variant="outline-secondary" className='mr-auto'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Row>
                            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                ) : <></>}
            </>
        )
    }
    handleShow = () => {
        console.log('showing')
        fetchData(this.props.image_id)
            .then(r => {
                this.setState({
                    show: true,
                    data: r,
                })
            })
    }

    handleHide = () => {
        // this.props.handleHide()
        this.setState({
            show: false,
            data: null,
        })
    }

    handleRemove = () => {
        fetchRemoveImage(this.props.image_id)
            .then(r => {
                this.handleHide()
                window.location.reload()
            })
    }
}

async function fetchData(imageID) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/images/' + imageID
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        }).then(r => {
            let resp = r.json()
                .then(data => {
                    console.log(data)
                    console.log("data:", data)
                    if(data.status_code === 401) {
                        // if request returns 401, get new token and try again
                        console.log("refreshing token")
                        user.refreshToken()
                            .then(_ => {
                                fetchData()
                                    .then(response => {
                                        response.json()
                                            .then(data => {
                                                if(data.status_code === 200) {
                                                    // if it works this time, return data
                                                    resolve(data)
                                                } else {
                                                    console.log("Refresh token failed, going back to login page")
                                                    reject("Could not log in")
                                                }
                                            }).catch(err => reject(err))
                                    }).catch(err => reject(err))
                            }).catch(err => reject(err))
                    } else {
                        // otherwise, return data
                        resolve(data);
                    }
                }).catch(err => reject(err))
        }).catch(err => reject(err))
    })
}


async function fetchRemoveImage(imageID) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/images/' + imageID + '/remove'
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        }).then(r => {
            let resp = r.json()
                .then(data => {
                    console.log(data)
                    console.log("data:", data)
                    if(data.status_code === 401) {
                        // if request returns 401, get new token and try again
                        console.log("refreshing token")
                        user.refreshToken()
                            .then(_ => {
                                fetchRemoveImage()
                                    .then(response => {
                                        response.json()
                                            .then(data => {
                                                if(data.status_code === 200) {
                                                    // if it works this time, return data
                                                    resolve(data)
                                                } else {
                                                    console.log("Refresh token failed, going back to login page")
                                                    reject("Could not log in")
                                                }
                                            }).catch(err => reject(err))
                                    }).catch(err => reject(err))
                            }).catch(err => reject(err))
                    } else {
                        // otherwise, return data
                        resolve(data);
                    }
                }).catch(err => reject(err))
        }).catch(err => reject(err))
    })
}
