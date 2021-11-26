import React from 'react';
import ModelListModal from "../components/ModelSelector";
import FileUploader from "../components/FileUploader";
import {Button, Col, ProgressBar, Row, Spinner} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import user from "../utils/user";
import domain from "../utils/site-domain";
import ImageDetailModal from "../components/ImageDetail";
import {faArrowDown, faArrowLeft, faChevronDown, faRedo} from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "../components/ErrorDialog";
import {makeAuthenticatedRequest} from "../utils/middleware";

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedModel: null,
            imageName: null,
            imageDescription: null,
            imageFile: null,
            uploadAttempted: false,
            uploadMessage: 'Only pics allowed: (jpg,jpeg,bmp,png)',
            selectModelText: 'Select a Model',
            imageDetailData: null,
            loading: false,
            loadingProgress: 0,
            loadingTotal: 0,
            loadingMessage: null,
            errorMessage: null,
            showErrorDialog: false,
        }
    }

    handleNameChange = (event) => {
        let name = event.target.value
        this.setState({
            imageName: name
        })
    }

    handleDescriptionChange = (event) => {
        let description = event.target.value
        this.setState({
            imageDescription: description
        })
    }

    handleUploadFile = (file) => {
        console.log("file:", file)
        this.setState({
            imageFile: file,
            uploadAttempted: true,
            uploadMessage: file.name
        })
    }

    handleUploadError = (error) => {
        this.setState({
            imageFile: null,
            uploadAttempted: true,
            uploadMessage: 'Error: Please upload a valid image'
        })
    }

    submitForm = () => {
        console.log("file to upload:", this.state.imageFile)
        console.log("model to upload:", this.state.selectedModel.file_name)
        let formData = new FormData();
        formData.append('file', this.state.imageFile)
        formData.append('model', this.state.selectedModel.file_name)
        formData.append('name', this.state.imageName)
        formData.append('description', this.state.imageDescription)
        console.log(formData)

        makeAuthenticatedRequest("POST", "/images/upload_image", formData)
            .then(async response => {
                this.setState({
                    loading: true
                })
                console.log("form upload response:", JSON.stringify(response))

                const data = await this.getProgress(domain + response.location)
                // polling is now complete
                console.log('polling is now complete')
                console.log('polling result:', data)
                this.setState({
                    selectedModel: null,
                    imageName: null,
                    imageDescription: null,
                    imageFile: null,
                    uploadAttempted: false,
                    uploadMessage: 'Only pics allowed: (jpg,jpeg,bmp,png)',
                    selectModelText: 'Select a Model',
                    loading: false,
                    loadingCurrent: 0,
                    loadingTotal: 0,
                    loadingMessage: null,
                })
            });
    }

    getProgress = async (location) => {
        // delay mechanism
        function wait(ms = 100) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }
        async function pollingFunction(url) {
            return new Promise(async function(resolve, reject) {
                // fetch the url to get a status update
                fetch(url,
                    {
                        'method': 'GET',
                    }).then(r => {
                        // convert the resulting data json to an object
                        r.json()
                            .then(data => {
                                if (data.state === 'PROGRESS' || data.state === 'PENDING') {
                                    // if the task state is either PROGRESS or PENDING
                                    reject(data)
                                } else if (data.state === 'ERROR') {
                                    // an error occurred server side, polling can conclude
                                    resolve(data)
                                } else {
                                    // if the task state is complete, polling can conclude
                                    console.log('Successfully got result. Polling should conclude')
                                    resolve(data)
                                }
                            }).catch(() => {
                                // if converting to JSON failed, an error has occurred and polling can stop
                                let data = {
                                    state: 'ERROR'
                                }
                                reject(data)
                        })
                    }).catch(() => {
                        // if the request failed, an error has occurred and polling can stop.
                        let data = {
                            state: 'ERROR'
                        }
                        reject(data)
                    })
            })

        }
        let continuePolling = true;
        let attempts = 0
        let maxAttempts = 500
        while (attempts < maxAttempts && continuePolling) {
            attempts++
            await wait()
            await pollingFunction(location)
                .then(data => {
                    console.log('Polling complete')
                    console.log(data)
                    continuePolling = false
                    if (data.state === 'ERROR') {
                        // a server-side error has occurred, display error dialog and break out of polling loop
                        this.setState({
                            errorMessage: data.status,
                            showErrorDialog: true,
                        })
                    } else {
                        // a successful result was obtained, the polling loop can break
                        console.log('result received. Polling loop can break')
                        this.setState({
                            loadingProgress: data.current,
                            loadingTotal: data.total,
                            loadingMessage: data.status,
                            imageDetailData: data.result,
                        })
                        return data.result;
                    }
                }).catch(data => {
                    // a result was not obtained from the server. Update the progress bar before trying again
                    console.log('Must continue polling')
                    console.log(data)
                    if (data.state !== 'ERROR') {
                        this.setState({
                            loadingProgress: data.current,
                            loadingTotal: data.total,
                            loadingMessage: data.status,
                        })
                    }
                })
        }
        if (attempts >= maxAttempts) {
            // max polling attempts were tried. Show the error dialog
            this.setState({
                errorMessage: 'File upload timed out',
                showErrorDialog: true,
            })
        }
    }

    calculateLoadingProgress = () => {
        let progress = 100 * (parseFloat(this.state.loadingProgress) / parseFloat(this.state.loadingTotal))
        console.log("Loading progress:", progress)
        return progress
    }

    render() {
        let spinning;
        if (this.state.loading) {
            spinning =
                <button className='btn btn-navy w-100' type='submit' size='lg'>
                    <ProgressBar animated striped variant="info" now={this.calculateLoadingProgress()} label={this.state.loadingMessage} />
                </button>;
        } else {
            spinning =
                <button className='btn btn-navy w-100' type='submit' size='lg' onClick={this.submitForm}>
                    Post
                </button>;
        }

        return (
            <div className="container text-center mt-5">
                <h3>Ask the Community</h3>

                <div className='upload-form validate-form d-flex'>
                    <Col xs={12} md={6}>
                        <div className="wrap-input validate-input mb-5" data-validate="Name is required">
                            <span className="label-input">Title</span>
                            <input
                                className="input text-center"
                                type="text"
                                name="name"
                                placeholder="Enter title name"
                                onChange={this.handleNameChange}
                            />
                            <span className="focus-input"/>
                        </div>
                        <div className="wrap-input validate-input mb-5" data-validate="Message is required">
                            <span className="label-input">Description</span>
                            <textarea
                                className="input text-center"
                                name="message"
                                placeholder="Enter case description"
                                onChange={this.handleDescriptionChange}
                            />
                            <span className="focus-input"/>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div >
                            <div className="wrap-input validate-input file-input-container text-center mb-5">
                                <h1 className="imgupload">
                                    {!this.state.uploadAttempted ? (
                                        <i className="fa fa-file-image-o"/>
                                    ) : (
                                        <>
                                            {this.state.imageFile ? (
                                                <i className="fa fa-check text-success"/>
                                            ) : (
                                                <i className="fa fa-times text-danger"/>
                                            )}
                                        </>
                                    )}
                                </h1>
                                <p id="namefile">{this.state.uploadMessage}</p>

                                <div className='d-flex justify-content-center mb-4'>
                                    <FileUploader
                                        onFileSelectSuccess={(file) => this.handleUploadFile(file)}
                                        onFileSelectError={(error) => this.handleUploadError(error)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Row className='flex-grow-1 justify-content-center mt-4'>
                        <div className='flex-grow-1 mb-4 d-flex justify-content-center'>
                            {spinning}
                        </div>
                    </Row>
                </div>
            </div>
        )
    }

}
