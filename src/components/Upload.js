import React from 'react';
import ModelListModal from "./ModelSelector";
import Row from "react-bootstrap/Row";
import {FileUploader} from "./FileUploader";

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
            selectModelText: 'Select a Model'
        }
    }

    handleUploadFile = (file) => {
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

    render() {
        return (
            <div className='mt-4'>
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
                        <form className='upload-form validate-form'>
                            <div className="wrap-input validate-input mb-5" data-validate="Name is required">
                                <span className="label-input">Name</span>
                                <input className="input" type="text" name="name" placeholder="Enter image name" />
                                <span className="focus-input"/>
                            </div>
                            <div className="wrap-input validate-input mb-5" data-validate="Message is required">
                                <span className="label-input">Description</span>
                                <textarea className="input" name="message" placeholder="Image description here ..."/>
                                <span className="focus-input"/>
                            </div>
                            <Row >
                                <div className="wrap-input validate-input file-input-container text-center">
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
                            </Row>
                        </form>
                    </>
                )}

            </div>
        )
    }

}
