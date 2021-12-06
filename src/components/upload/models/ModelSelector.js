import React, {useContext, useState} from 'react';
import {Modal, Button, Col} from "react-bootstrap";
import ModelCard from "./ModelCard";

import user from "../../../auth/user";
import utils from "../../../utils/utils";
import domain from "../../../utils/site-domain";
import {makeAuthenticatedRequest} from "../../../utils/middleware";

export default class ModelSelector extends React.Component {
    renderModelCard(model_datum) {
        console.log("creating model card")
        return <ModelCard
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
        // TODO: make this hide on selection
        // TODO: add search
        return (
            <>
                <div className="text-center">
                    <button className="btn btn-outline-navy" onClick={this.handleShow} size={this.props.size}>
                        {this.props.selectText}
                    </button>
                </div>
                {this.state.data ? (
                    <Modal
                        size="lg"
                        show={this.state.show}
                        onHide={this.handleHide}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Select a Disease to Detect
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                {console.log(this.state.data)}
                                {this.state.data.map((datum) => {
                                    console.log("datum:", datum)
                                    return (
                                        <Col lg="6" sm="12">
                                            {this.renderModelCard(datum)}
                                        </Col>
                                    )
                                })}
                            </div>
                        </Modal.Body>
                    </Modal>
                ) : <></>}
            </>
        )
    }
    handleShow = () => {
        console.log("Loading models")
        makeAuthenticatedRequest('GET', '/models')
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
