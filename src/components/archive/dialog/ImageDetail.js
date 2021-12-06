import React from 'react';
import {Modal, Button, Card, Badge, Image, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TileGrid from "./TileGrid";
import googleDomain from "../../../utils/google-drive-domain";
import RiskBadge from "../RiskBadge";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ErrorDialog from "../../upload/ErrorDialog";
import {makeAuthenticatedRequest} from "../../../utils/middleware";

export default class ImageDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: (!!this.props.showOnCreate),
            data: this.props.data,
        }
    }

    render() {
        let image_src
        if (!this.props.file_id) {
            // load the placeholder image
            image_src = "https://2rri712hg8ztbbaed491mw10-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/placeholder-square.png"
        } else {
            image_src = googleDomain + this.props.file_id
        }

        // TODO: handle editing
        // TODO: confirm delete dialog
        // TODO: clean up format, especially the description and adding the model.
        // TODO: add a slider to toggle between no overlay, semi-transparent overlay, and solid overlay
        // TODO: Find a way to handle wrapping/overflow from long names in the preview card
        // TODO: Fix footer buttons not working on iOS
        return (
            <>
                {!this.props.showOnCreate ? (
                        <Col xs="6" sm="6" md="6" lg="4" xl="3">
                            <Card className="archive-entry transform-on-hover" onClick={this.handleShow}>
                                <Card.Img variant="top" src={image_src} />
                                <div className="archive-card-body">
                                    <Card.Title>{this.props.name}</Card.Title>
                                    <Card.Subtitle className='mb-1'>{this.props.model}</Card.Subtitle>
                                    <Card.Text className="text-muted">{moment.utc(this.props.date).fromNow()}</Card.Text>
                                    <RiskBadge risk_level={this.props.risk_level} />
                                </div>
                            </Card>
                        </Col>
                ) : (
                    <></>
                    )}

                {this.state.data ? (
                    <div className='modalsContainer'>
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
                        {!this.props.file_id && !this.props.showOnCreate ? (
                            <ErrorDialog
                                message="There seems to be an issue loading this image. You may want to delete and reupload it."
                            />
                        ) : <></>}
                    </div>

                ) : <></>}
            </>
        )
    }
    handleShow = () => {
        console.log('showing')
        makeAuthenticatedRequest('GET', '/images/' + this.props.image_id)
            .then(r => {
                this.setState({
                    show: true,
                    data: r,
                })
            })
    }

    handleHide = () => {
        // this.props.handleHide()
        console.log('hiding dialog')
        this.setState({
            show: false,
            data: null,
        })
    }

    handleRemove = async () => {
        await makeAuthenticatedRequest('DELETE', '/images/' + this.props.image_id + '/remove')
        console.log('finished fetching remove image')
        this.handleHide()
        window.location.reload()
    }
}
