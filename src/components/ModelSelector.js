import React, {useContext, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import ModelCard from "./ModelCard";

import user from "../utils/user";
import utils from "../utils/utils";
import domain from "../utils/site-domain";

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
        return (
            <>
                <div className="text-center">
                    <Button variant="outline-info" onClick={this.handleShow} size={this.props.size}>
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
                            <div className="row">
                                {console.log(this.state.data)}
                                {this.state.data.map((datum) => {
                                    console.log("datum:", datum)
                                    return (
                                        <div className='col-sm-6'>
                                            {this.renderModelCard(datum)}
                                        </div>
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
        const apiUrl = domain + '/models'
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