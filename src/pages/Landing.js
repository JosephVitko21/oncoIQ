import React, {useState, useContext, useEffect} from "react";
import CaseCard from '../components/forum/list/CaseCard';
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import Login from "../components/nav/Login";
import { LoginPopContext } from "../context/GlobalContext"
import {makeAuthenticatedRequest} from "../utils/middleware";
import user from "../auth/user";
import CaseList from "../components/forum/list/CaseList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faMicroscope, faUsers} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function Landing() {

    const navigate = useNavigate();

    return (
        <div className="bg-navy min-vh-100">
            <div className="container mt-5">
                <Row style={{
                    paddingTop: '62px',
                    paddingBottom: '100px'
                }}>
                    <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <h1 className="text-white">Welcome to OncoIQ</h1>
                        <p className="text-white mb-4">
                            Get help diagnosing cases from <strong>expert pathologists</strong> and <strong>artificial intelligence</strong>
                        </p>
                        <Col xs='12' lg='4' style={{flexShrink: 'inherit'}}>
                            <Button
                                size='md'
                                style={{backgroundColor: '#EF476F', border: 'none'}}
                                color='white'
                                className='mt-4'
                            >Get Started
                            </Button>
                        </Col>

                    </Col>
                    <Col>
                        <img 
                            src='https://media.istockphoto.com/photos/state-of-the-art-science-equipment-picture-id887280966?k=20&m=887280966&s=612x612&w=0&h=s8oDmGevRI_wb4925lBLpzYR9EzX7Qn690IQIjZcvqE='
                            style={{maxWidth: '85%', borderRadius: '50%', paddingLeft: '10px', paddingRight: '10px'}}
                        />
                    </Col>
                </Row>
                <h3 style={{color: 'white', paddingBottom: '10px', borderBottom:`solid .25px rgba(255,255,255,0.25)`}} className="mb-4">
                    How it Works
                </h3>
                <Row className='mb-4 justify-content-center'>
                    <Col xs="9" sm="9" md="4" lg="4" xl="4" style={{marginBlockEnd: "40px"}}>
                        <Card>
                            <Card.Body style={{textAlign: 'center'}}>
                                <Card.Title className='mb-4'>
                                    Community
                                </Card.Title>
                                <FontAwesomeIcon className='mt-2 mb-4' icon={faUsers} style={{width: '100%', height: '5em', color: '#EF476F', opacity: '62%'}}/>
                                <Card.Text className='mt-2'>
                                    Collaborate with the global pathology community to solve cases.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="9" sm="9" md="4" lg="4" xl="4" style={{marginBlockEnd: "40px"}}>
                        <Card>
                            <Card.Body style={{textAlign: 'center'}}>
                                <Card.Title className='mb-4'>
                                    Intelligence
                                </Card.Title>
                                <FontAwesomeIcon className='mt-2 mb-4' icon={faBrain} style={{width: '100%', height: '5em', color: '#EF476F', opacity: '62%'}}/>
                                <Card.Text className='mt-2'>
                                    Take advantage of the latest AI technology to increase productivity.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="9" sm="9" md="4" lg="4" xl="4" style={{marginBlockEnd: "40px"}}>
                        <Card>
                            <Card.Body style={{textAlign: 'center'}}>
                                <Card.Title className='mb-4'>
                                    Experience
                                </Card.Title>
                                <FontAwesomeIcon className='mt-2 mb-4' icon={faMicroscope} style={{width: '100%', height: '5em', color: '#EF476F', opacity: '62%'}}/>
                                <Card.Text className='mt-2'>
                                    Consult specialists with decades of experience for help with difficult cases
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <h3 className='text-white mb-4' style={{marginTop: '80px', paddingBottom: '10px', borderBottom:`solid .25px rgba(255,255,255,0.25)`}}>Latest Cases</h3>
                <CaseList/>
                <div className='flex-grow-1 justify-content-center' style={{display: 'flex', marginTop: '40px'}}>
                    <Button style={{backgroundColor: '#06D6A0', border: 'none'}} onClick={() => navigate('/community')}>View More</Button>
                </div>

                {/*if logged in, navigate to community tab, otherwise show log in dialog*/}
            </div>
        </div>
    )
}