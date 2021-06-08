import React from 'react';
import {Modal, Button, Card, Badge, Image} from "react-bootstrap";

import user from "../utils/user";
import utils from "../utils/utils";
import domain from "../utils/site-domain";
import TileGrid from "./TileGrid";
import googleDomain from "../utils/google-drive-domain";

export default class ImageDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: (!!this.props.showOnCreate),
            data: this.props.data,
        }
    }

    render() {
        return (
            <>
                {!this.props.showOnCreate ? (
                    <>
                        <Button variant="outline-info" onClick={this.handleShow} size="sm">
                            Show Details
                        </Button>
                        <Button variant="outline-danger ml-3" onClick={this.handleRemove} size="sm">
                            Delete
                        </Button>
                    </>

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
                                <h5><Badge pill variant="danger">Overall Risk: {utils.makePercentage(this.state.data.risk_level, 0)}</Badge></h5>
                                {console.log("data to render:", this.state.data)}
                                <TileGrid
                                    tiles={this.state.data.tiles}
                                    id={this.state.data.id}
                                    image_url={googleDomain + this.state.data.file_id}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                ) : <></>}
            </>
        )
    }
    handleShow = () => {
        fetchData(this.props.imageID)
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
        fetchRemoveImage(this.props.imageID)
            .then(r => {
                window.location.reload();
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
