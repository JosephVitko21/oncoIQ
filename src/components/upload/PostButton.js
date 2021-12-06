import { Container, Button, lightColors, darkColors} from 'react-floating-action-button'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import Upload from "./Upload";

export default function PostButton() {
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    return (
        <>
            <Container>
                <Button
                    tooltip="Upload a histology image"
                    onClick={() => setShowUploadDialog(true)}
                    styles={{backgroundColor: "#7b32d9", color: lightColors.white}}
                >
                    {<FontAwesomeIcon icon={faPlus}/>}
                </Button>
            </Container>
            <div className='modalsContainer'>
                <Modal
                    size="lg"
                    show={showUploadDialog}
                    onHide={() => setShowUploadDialog(false)}
                >
                    <Modal.Header
                        closeButton
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                flexGrow: 1.5,
                                marginTop: 15,
                            }}
                        >
                            <Modal.Title>
                                Upload a Histology Image
                            </Modal.Title>
                            <p>Use AI or the pathology to help make a diagnosis</p>
                        </div>

                    </Modal.Header>
                    <Modal.Body>
                        <Upload />
                    </Modal.Body>
                </Modal>
            </div>
        </>

    )
}