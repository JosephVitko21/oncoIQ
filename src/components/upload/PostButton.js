import React, { useState } from "react";
import { Container, Button, lightColors, darkColors } from 'react-floating-action-button'
import { faCamera, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Text } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure 
} from '@chakra-ui/react'

import Upload from "./Upload";

export default function PostButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Container>
                <Button
                    tooltip="Upload a histology image"
                    onClick={onOpen}
                    styles={{backgroundColor: "var(--chakra-colors-secondary)", color: "white"}}
                >
                    {<FontAwesomeIcon icon={faPlus}/>}
                </Button>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" borderBottom="1px solid var(--chakra-colors-shadow)">
                        <Text>Upload a Histology Image</Text>
                        <Text fontSize="sm" fontWeight="normal" color="primary">Use AI or the community to help make a diagnosis</Text>
                    </ModalHeader>
                    <ModalCloseButton _focus={{ borderColor: "none", outline: "none" }} />
                    <ModalBody pt="0">
                        <Upload />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}