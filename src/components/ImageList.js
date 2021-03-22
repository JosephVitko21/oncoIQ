import React, {useContext, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"
import ImageDetailModal from "./ImageDetail";
import {Container} from "react-bootstrap";
const user =  require("./User");
const domain = require("./siteDomain");
const utils = require("./utils")


function Entry(props) {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let image_src = "http://localhost:5000/static/tissue_images/" + props.image_id + "/large.png"
    console.log(image_src)
    return (
        <Card>
            <Row>
                <Col className="col-md-4">
                    <img
                        src={ image_src }
                        width="100%"
                        height="100%"
                    />
                </Col>
                <Col className="col-md-8">
                    <Card.Body>
                        <Card.Title>{ props.name }</Card.Title>
                        <Card.Text className="text-muted">{ props.date }</Card.Text>
                        <ImageDetailModal imageID={props.image_id}/>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default class ImageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image_list_data: null,
        }
    }
    componentDidMount() {
        fetchUserImages()
            .then(data => {
                this.setState({
                    image_list_data: data,
                })
            })
    }
    render() {
        if (!this.state.image_list_data) return <p>Loading...</p>
        return <Container fluid>
            <Row>
                {console.log(this.state.image_list_data)}
                {this.state.image_list_data.map((datum) => {
                    console.log("datum:", datum)
                    return (
                        <Col className='col-sm-6'>
                            <Entry
                                image_id={datum.image_file}
                                name={datum.name}
                                date={datum.date}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    }
}

async function fetchUserImages() {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/api/get_user_images'
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
            },
            redirect: 'follow'
        }).then(response => {
            response.json()
                .then(data => {
                    console.log("data:", data)
                    if(data.status_code === 401) {
                        // if request returns 401, get new token and try again
                        console.log("refreshing token")
                        user.refreshToken()
                            .then(_ => {
                                fetchUserImages()
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
        }).catch(e => reject(e))
    })
}