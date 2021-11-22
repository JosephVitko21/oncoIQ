import React, {useState, useContext} from "react";
import CaseCard from '../components/CaseCard';
import { Stack, Center, Heading, Text } from "@chakra-ui/react";
import { Modal } from "react-bootstrap";
import Login from "../components/Login";
import { LoginPopContext } from "../context/GlobalContext"

export default function Explore() {
    const {loginPop, setLoginPop} = useContext(LoginPopContext);

    return (
        <>
        <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
            <Login />
        </Modal>
        <Center bg="#011c33">
            <Stack spacing={8} w="50%">
                <Heading fontSize="50px" color="white" mb={0}>
                    Help a Pathologists
                </Heading>
                <Text color="white">
                    Offer your advice to a Pathologist in need
                </Text>

                <CaseCard />
                <CaseCard />
                <CaseCard />
            </Stack>
        </Center> 
        </> 
    )
}
