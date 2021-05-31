import React from 'react';
import ModelListModal from "./ModelSelector";
import FileUploader from "./FileUploader";
import {Button, Spinner} from "react-bootstrap";

import user from "../utils/user";
import domain from "../utils/site-domain";
import ImageDetailModal from "./ImageDetail";

export default class Upload extends React.Component {
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
        fetchUploadFile(formData)
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
                })
            });
    }

    getProgress = async (location) => {
        // delay mechanism
        function wait(ms = 1000) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }
        async function pollingFunction(url) {
            return new Promise(async function(resolve, reject) {
                fetch(url,
                    {
                        'method': 'GET',
                    }).then(r => {
                        r.json()
                            .then(data => {
                                if (data.state === 'PROGRESS') {
                                    reject(data)
                                } else {
                                    console.log('Successfully got result. Polling should conclude')
                                    resolve(data)
                                }
                            }).catch(() => {
                                let data = {
                                    state: 'ERROR'
                                }
                                reject(data)
                        })
                    }).catch(() => {
                    let data = {
                        state: 'ERROR'
                    }
                    reject(data)
                    })
            })

        }
        let continuePolling = true;
        let attempts = 0
        while (attempts < 100 && continuePolling) {
            attempts++
            await wait()
            await pollingFunction(location)
                .then(data => {
                    console.log('Progress complete')
                    console.log(data)
                    this.setState({
                        loadingProgress: data.current,
                        loadingTotal: data.total,
                        loadingMessage: data.status,
                        imageDetailData: data.result,
                    })
                    continuePolling = false
                    return data.result;
                }).catch(data => {
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
        console.log('polling loop broken out of')
    }

    render() {
        let spinning;
        if (this.state.loading) {
            spinning =
                <Button className='w-100' variant='info' type='submit' size='lg'>
                    <Spinner animation="border" variant="light" />
                </Button>;
        } else {
            spinning =
                <Button className='w-100' variant='info' type='submit' size='lg' onClick={this.submitForm}>
                    Upload
                </Button>;
        }

        return (
            <div className="container text-center mt-5">
                <h3>Upload a Histology Image</h3>

                {!this.state.selectedModel ? (
                    <>
                        <p>One of our AI models will predict its cancer risk</p>
                        <br/>
                        <ModelListModal
                            selectModel={(model) => this.setState({selectedModel: model, selectModelText: '↶'})}
                            selectText={this.state.selectModelText}
                            size="lg"
                        />
                        {!this.state.imageDetailData ? (
                            <></>
                        ) : (
                            // TODO: Make this go to the archive tab when it closes
                            <ImageDetailModal
                                data={this.state.imageDetailData}
                                showOnCreate={true}
                            />
                        )}

                    </>

                ) : (
                    <>
                        <br/>
                        <div className="d-flex justify-content-around align-items-center mb-5">
                            <div>
                                <h5 className='mb-0'>Selected Model:</h5>
                                <p className='mb-0 text-muted'>{this.state.selectedModel.name}</p>
                            </div>
                            <ModelListModal
                                selectModel={(model) => this.setState({selectedModel: model})}
                                selectText={this.state.selectModelText}
                                size=""
                            />
                        </div>
                        
                        <div className='upload-form validate-form'>
                            <div className="wrap-input validate-input mb-5" data-validate="Name is required">
                                <span className="label-input">Name</span>
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    placeholder="Enter image name"
                                    onChange={this.handleNameChange}
                                />
                                <span className="focus-input"/>
                            </div>
                            <div className="wrap-input validate-input mb-5" data-validate="Message is required">
                                <span className="label-input">Description</span>
                                <textarea
                                    className="input"
                                    name="message"
                                    placeholder="Image description here ..."
                                    onChange={this.handleDescriptionChange}
                                />
                                <span className="focus-input"/>
                            </div>
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

                                    <div className='d-flex justify-content-center'>
                                        <FileUploader
                                            onFileSelectSuccess={(file) => this.handleUploadFile(file)}
                                            onFileSelectError={(error) => this.handleUploadError(error)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-4 d-flex justify-content-center'>
                                {spinning}
                            </div>
                        </div>
                    </>
                )}

            </div>
        )
    }

}

async function fetchUploadFile(formData) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/images/upload_image'
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
            },
            body: formData,
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
                                fetchUploadFile(formData)
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
