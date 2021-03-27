import React, {useContext, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

import user from "../utils/user";
import utils from "../utils/utils";
import domain from "../utils/site-domain";

function Model_Card(props) {
    let thumbnail_src = domain + props.thumbnail_url
    let status_text = ''
    if (props.status === 0) {
        status_text = "Not Downloaded"
    } else if (props.status === 1) {
        status_text = "Sleeping"
    } else if (props.status === 2) {
        status_text = "Loaded"
    }
    console.log(thumbnail_src)
    return (
        <Card onClick={props.selectModel} className='model-card'>
            <Row>
                <Col className="col-md-4">
                    <img
                        src={ thumbnail_src }
                        width="100%"
                        height="100%"
                    />
                </Col>
                <Col className="col-md-8">
                    <Card.Body>
                        <Card.Title>{ props.name }</Card.Title>
                        <Card.Text>{ status_text }</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default class ModelSelector extends React.Component {
    renderModelCard(model_datum) {
        console.log("creating model card")
        return <Model_Card
            thumbnail_url={model_datum.thumbnail}
            name={model_datum.name}
            status={model_datum.status}
            selectModel={() => this.props.selectModel(model_datum)}
        />
    }
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            show: false,
            data: null
        }
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <Button variant="outline-primary" onClick={this.handleShow} size={this.props.size}>
                        {this.props.selectText}
                    </Button>
                </div>
                {this.state.data ? (
                    <Modal
                        size="lg"
                        show={this.state.show}
                        onHide={this.handleHide}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Choose a Model
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                {console.log(this.state.data)}
                                {this.state.data.map((datum) => {
                                    console.log("datum:", datum)
                                    return (
                                        <Col className='col-sm-6'>
                                            {this.renderModelCard(datum)}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Modal.Body>
                    </Modal>
                ) : <></>}
            </>
        )
    }
    handleShow = () => {
        console.log("Loading models")
        fetchModels()
            .then(r => {
                console.log("loaded models")
                this.setState({
                    show: true,
                    data: r,
                })
            })
    }

    handleHide = () => {
        this.setState({
            show: false,
            data: null,
        })
    }
}

async function fetchModels() {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/api/models'
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
            },
            redirect: 'follow'
        }).then(response => {
            response.json()
                .then(data => {
                    console.log("data:", data)
                    // return data
                    resolve(data);
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
        }).catch(e => reject(e))
    })
}