import React from "react";
import {faExclamationCircle, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

export default class ErrorDialog extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            show: true,
            data: null
        }
    }
    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.handleHide}
                size='sm'
                contentClassName='error-modal-container'
            >
                <div className="error-modal-content">
                    <ModalHeader>
                        <div className="icon-box">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>

                        <h4 className="modal-title w-100">Sorry!</h4>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-center">{this.props.message}</p>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger btn-block" onClick={this.handleHide}>OK</button>
                    </ModalFooter>
                </div>
            </Modal>
        )
    }
    handleHide = () => {
        this.setState({
            show: false,
        })
        if (this.props.hidden != null) {
            this.props.hideAction()
        }
    }

}