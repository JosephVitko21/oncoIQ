import React, { useState } from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";
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

import ModelCard from "./ModelCard";
import { makeAuthenticatedRequest } from "../../../utils/middleware";
import OutlineBtn from '../../basic/OutlineBtn';

export default function ModelSelector(props) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleShow = () => {
        console.log("Loading models")
        makeAuthenticatedRequest('GET', '/models')
            .then(r => {
                console.log("loaded models")
                onOpen();
                setData(r);
            })
    }

    const handleHide = () => {
        onClose();
        setData(null);
    }

    console.log(data)

    // TODO: make this hide on selection
    // TODO: add search
    return (
        <>
            <OutlineBtn colorArr={["primary", "white"]} onClick={handleShow} >{props.selectText}</OutlineBtn>

            {data ? (
                <Modal isOpen={isOpen} onClose={handleHide}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center" borderBottom="1px solid var(--chakra-colors-shadow)">Select a Disease to Detect</ModalHeader>
                        <ModalCloseButton _focus={{ borderColor: "none", outline: "none" }} />
                        <ModalBody pt="0">
                            <Flex py="15px">
                                {data.map((datum) => {
                                    console.log("datum:", datum)
                                    return (
                                        <ModelCard
                                            thumbnail_url={datum.thumbnail}
                                            name={datum.name}
                                            status={datum.status}
                                            selectModel={() => props.selectModel(datum)}
                                        />
                                    )
                                })}
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : null}
        </>
    );
}
