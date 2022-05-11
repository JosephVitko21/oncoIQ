import React from 'react';
import ModelSelector from "./models/ModelSelector";
import FileUploader from "./FileUploader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faFileImage, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Text, Heading, Box, Flex, Input, Textarea, Progress } from '@chakra-ui/react'

import domain from "../../utils/site-domain";
import ImageDetailModal from "../archive/dialog/ImageDetail";
import ErrorDialog from "./ErrorDialog";
import { makeAuthenticatedRequest } from "../../utils/middleware";
import Btn from '../basic/Btn';

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
            selectModelText: 'Select a Disease',
            imageDetailData: null,
            loading: false,
            loadingProgress: 0,
            loadingTotal: 0,
            loadingMessage: null,
            errorMessage: null,
            showErrorDialog: false,
            public: false,
            ai: false,
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
        formData.append('public', this.state.public)
        formData.append('ai', this.state.ai)
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
                    selectModelText: 'Select a Disease',
                    loading: false,
                    loadingCurrent: 0,
                    loadingTotal: 0,
                    loadingMessage: null,
                    public: false,
                    ai: false,
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
        const spinning = () => {
            if (this.state.loading) {
                return (
                    <Box w="100%">
                        <Progress isAnimated hasStripe colorScheme='blackAlpha' value={this.calculateLoadingProgress()} />
                        <Text textAlign="center">{this.state.loadingMessage}</Text>
                    </Box>  
                );
            }

            return <Btn colorArr={["white", "primary"]} onClick={this.submitForm}>Upload</Btn>;
        }

        return (
            <>
                {this.state.showErrorDialog ? (
                    <ErrorDialog
                        message={this.state.errorMessage}
                        hideAction={() => {this.setState({errorMessage: null, showErrorDialog: false,})}}
                    />
                ) : (
                    null
                )}

                {!this.state.selectedModel ? (
                    <Flex justifyContent="center" p="15px">
                        <ModelSelector
                            selectModel={(model) => this.setState({
                                selectedModel: model,
                                selectModelText: <FontAwesomeIcon icon={faChevronDown}/>,
                            })}
                            selectText={this.state.selectModelText}
                            size="lg"
                        />
                        {!this.state.imageDetailData ? (
                            null
                        ) : (
                            // TODO: Make this go to the archive tab when it closes
                            <ImageDetailModal
                                data={this.state.imageDetailData}
                                showOnCreate={true}
                            />
                        )}

                    </Flex>

                ) : (
                    // TODO: make form fields more relevant to those needed when sorting through patient data
                    <Flex flexDir="column" p="15px" rowGap="30px">
                        <Flex justifyContent="center" alignItems="center">
                            <Box textAlign="center" mr="10px">
                                <Heading fontSize="lg">Selected Disease:</Heading>
                                <Text fontSize="sm">{this.state.selectedModel.name}</Text>
                            </Box>
                            <ModelSelector
                                selectModel={(model) => this.setState({selectedModel: model})}
                                selectText={this.state.selectModelText}
                                size=""
                            />
                        </Flex>

                        <Flex justifyContent="center" columnGap="30px">
                            <Flex flexDir="column" rowGap="30px">
                                <Box>
                                    <Heading fontSize="md">Name</Heading>
                                    <Input
                                        border="none" borderRadius="0" borderBottom="2px solid var(--chakra-colors-shadow)"
                                        _focus={{ borderColor: "primary" }} _hover={{ borderColor: "primary" }}
                                        placeholder="Enter histology title" onChange={this.handleNameChange}
                                    />
                                </Box>
                                <Box>
                                    <Heading fontSize="md">Description</Heading>
                                    <Textarea
                                        border="none" borderRadius="0" borderBottom="2px solid var(--chakra-colors-shadow)"
                                        _focus={{ borderColor: "primary" }} _hover={{ borderColor: "primary" }}
                                        placeholder="Enter any additional details" onChange={this.handleDescriptionChange}
                                    />
                                </Box>
                            </Flex>
                            <Flex flexDir="column" alignItems="center" rowGap="15px">     
                                {!this.state.uploadAttempted ? (
                                    <Text fontSize='90px' color="shadow"><FontAwesomeIcon icon={faFileImage}/></Text>
                                ) : (
                                    <>
                                        {this.state.imageFile ? (
                                            <Text fontSize='90px' color="green"><FontAwesomeIcon icon={faCheck}/></Text>
                                        ) : (
                                            <Text fontSize='90px' color="red"><FontAwesomeIcon icon={faTimes}/></Text>
                                        )}
                                    </>
                                )}
                                        
                                <Text fontSize="sm" textAlign="center">{this.state.uploadMessage}</Text>
                                <FileUploader
                                    onFileSelectSuccess={(file) => this.handleUploadFile(file)}
                                    onFileSelectError={(error) => this.handleUploadError(error)}
                                />
                            </Flex>
                        </Flex>

                        <Flex justifyContent="center" columnGap="15px">
                            <Checkbox onChange={() => {this.setState({public: !this.state.public})}} colorScheme='gray'>Post to community forum:</Checkbox>
                            <Checkbox onChange={() => {this.setState({ai: !this.state.ai})}} colorScheme='gray'>Scan image with AI:</Checkbox>
                        </Flex>

                        <Flex justifyContent="center">
                            {spinning()}
                        </Flex>
                    </Flex>
                )}
            </>
        )
    }

}
