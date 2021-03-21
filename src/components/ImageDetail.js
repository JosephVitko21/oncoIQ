import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

const domain = require("./siteDomain");
const user = require("./User")
const utils = require("./utils")

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            opacity: this.props.riskScore,
            color: "rgb(255, 0, 0)"
        }

    }
    render() {
        console.log(this.props)
        const overlayStyle = {
            opacity: this.state.opacity,
            backgroundColor: this.state.color,
        }
        const textStyle = {
            opacity: (this.state.hover ? 1 : 0)
        }

        return (
            <Card className="risk-card">
                <img src={ this.props.image } />
                <div
                    className="risk-overlay"
                    style={ overlayStyle }
                    onMouseEnter={this.handleHoverOn}
                    onMouseLeave={this.handleHoverOff}

                >
                    <div className="risk-text" style={ textStyle }>
                        { utils.makePercentage(this.props.riskScore) }
                    </div>
                </div>
            </Card>
        )
    }
    handleHoverOn = () => {
        let greenAndBlue = Math.round(255 * (1 - this.props.riskScore))
        this.setState({
            hover: true,
            opacity: 1,
            color: "rgb(255," + greenAndBlue + "," + greenAndBlue + ")",
        })
    }
    handleHoverOff = () => {
        this.setState({
            hover: false,
            opacity: this.props.riskScore,
            color: "rgb(255, 0, 0)"
        })
    }
}

class TileGrid extends React.Component {
    renderTile(i) {
        {console.log("props to render:", this.props)}
        return <Tile
            image={domain + "/static/tissue_images/" + this.props.id + "/" + this.props.tiles[i].file_name}
            riskScore={this.props.tiles[i].risk_level}
        />
    }
    render() {
        return (
            <div className="custom-card">
                <div className="card-group">
                    {this.renderTile(0)}
                    {this.renderTile(1)}
                    {this.renderTile(2)}
                    {this.renderTile(3)}
                    {this.renderTile(4)}
                </div>
                <div className="card-group">
                    {this.renderTile(5)}
                    {this.renderTile(6)}
                    {this.renderTile(7)}
                    {this.renderTile(8)}
                    {this.renderTile(9)}
                </div>
                <div className="card-group">
                    {this.renderTile(10)}
                    {this.renderTile(11)}
                    {this.renderTile(12)}
                    {this.renderTile(13)}
                    {this.renderTile(14)}
                </div>
                <div className="card-group">
                    {this.renderTile(15)}
                    {this.renderTile(16)}
                    {this.renderTile(17)}
                    {this.renderTile(18)}
                    {this.renderTile(19)}
                </div>
                <div className="card-group">
                    {this.renderTile(20)}
                    {this.renderTile(21)}
                    {this.renderTile(22)}
                    {this.renderTile(23)}
                    {this.renderTile(24)}
                </div>
            </div>
        )
    }
}

export default class ImageDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            data: null
        }
    }

    render() {
        if (!this.state.data) return (
            <Button variant="outline-primary" onClick={this.handleShow} size="sm">
                Show Details
            </Button>
        )

        return (
            <>
                <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            { this.state.data.name }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="image-detail">
                            <p>Overall Risk: {utils.makePercentage(this.state.data.risk_level)}</p>
                            {console.log("data to render:", this.state.data)}
                            <TileGrid
                                tiles={this.state.data.tiles}
                                id={this.state.data.image_file}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
        this.setState({
            show: false,
            data: null,
        })
    }
}

async function fetchData(imageID) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/api/get_tiles'
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"image_file": imageID}),
            redirect: 'follow'
        }).then(r => {
            let resp = r.json()
                .then(r => {
                    console.log(r)
                    resolve(r)
                })
        }).catch(function (err) {
            reject(err)
        })
    })
}
