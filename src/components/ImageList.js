import React, {useContext, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"
import ImageDetailModal from "./ImageDetail";
import User from "./User";
import {Container} from "react-bootstrap";
const domain = require("./siteDomain");


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
        const apiUrl = domain + '/api/get_user_images'
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + User.getAuthToken(),
            },
            redirect: 'follow'
        }).then(response => response.json())
            .then(data => {
                console.log("data:", data)
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