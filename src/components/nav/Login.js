import React, {useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
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

import {login, authFetch, useAuth, logout} from "../../auth";
import domain from "../../utils/site-domain";
import user from "../../auth/user";
import FormIn from "../basic/FormIn";
import Btn from "../basic/Btn";
import OutlineBtn from "../basic/OutlineBtn";

const userData = {
    "title": null,
    "firstName": null,
    "lastName": null,
    "username": null,
    "email": null,
    "password": null,
    "position": null,
    "workplace": null,
    "website": null,
    "profilePicUrl": null
}

export default function Login(props) {
    const [logged] = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()

    let initial_view = "login"
    if (props.showSignUpOnOpen) {
        initial_view = 'signup'
    }

    const [view, setView] = useState(initial_view);
    const [errorMsg, setErrorMsg] = useState(null);
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const clearFormData = () => {
        try {
            document.getElementById("sign-up-form").reset()
        } catch (e) {}
        try {
            document.getElementById("login-form").reset()
        } catch (e) {}
    }
    
    async function handleLogin(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(userData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(domain + "/users/login", requestOptions)
        let data
        try {
            data = await response.json()
        } catch (e) {
            setSuccess(false)
            setErrorMsg('There was a problem logging in, please try again')
            clearFormData()
            return
        }
        if (response.status !== 200 || data.access_token == null) {
            setSuccess(false)
            setErrorMsg(data.message)
            clearFormData()
        } else {
            login(data.access_token);
            user.username = data.username
            console.log(data.access_token);

            await user.getUsername()

            navigate("/");
        }
    }

    async function handleSignup(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // for (let key of Object.keys(userData)) {
        //     if (userData[key] == null) {
        //         userData[key] = lastUserData[key]
        //     }
        // }

        var raw = JSON.stringify(userData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(domain + "/users/register", requestOptions)
        if (response.status !== 200) {
            setSuccess(false)
            setErrorMsg(`Error signing up, please try again: ${await response.text()}`);
            console.log(userData)
            // console.log(lastUserData)
            // Object.assign(lastUserData, userData)
            // console.log(lastUserData)
        } else {
            try {
                // let data = await response.json()
                setErrorMsg("Successfully signed up");
                setSuccess(true);
                clearFormData()
            } catch (e) {
                console.log("error: ", e);
                setErrorMsg(`Error signing up, please try again`);
                // Object.assign(lastUserData, userData)
            }

        }
    }

    const modalContent = () => {
        if (view == "signup") {
            return (
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton _focus={{ borderColor: "none", outline: "none" }} />
                    <ModalBody pt="0">
                        <Flex flexDirection="column" alignItems="center" px="20px" pb="20px">
                            <FormIn mb="15px" title="Email*" type="email" placeholder="johndoe@email.com" onChange={(event) => userData.email = event.target.value}/>
                            <FormIn mb="15px" title="Username*" type="text" placeholder="JohnDoe123" onChange={(event) => userData.username = event.target.value}/>
                            <FormIn mb="30px" title="Password*" type="password" placeholder="********" onChange={(event) => userData.password = event.target.value}/>
                            <FormIn mb="15px" title="Title" type="text" placeholder="Dr." onChange={(event) => userData.title = event.target.value}/>
                            <FormIn mb="15px" title="First Name*" type="text" placeholder="John" onChange={(event) => userData.firstName = event.target.value}/>
                            <FormIn mb="30px" title="Last Name*" type="text" placeholder="Doe" onChange={(event) => userData.lastName = event.target.value}/>
                            <FormIn mb="15px" title="Position*" type="text" placeholder="Pathologist" onChange={(event) => userData.position = event.target.value}/>
                            <FormIn title="Workplace*" type="text" placeholder="Hospital" onChange={(event) => userData.workplace = event.target.value}/>

                            {success ? <Text fontSize="sm" color='green'>{errorMsg}</Text> :
                                <Text fontSize="sm" color='red'>{errorMsg}</Text>
                            }
                            <Flex mt="20px">
                                <Btn mr="5px" colorArr={["white", "primary"]} onClick={handleLogin}>Sign up</Btn>
                                <OutlineBtn colorArr={["primary", "white"]} onClick={() => {
                                    clearFormData()
                                    setView("login")
                                    setErrorMsg('')
                                }}>
                                    Back to login
                                </OutlineBtn>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            );
        }

        return (
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton _focus={{ borderColor: "none", outline: "none" }} />
                <ModalBody pt="0">
                    <Flex flexDirection="column" alignItems="center" px="20px" pb="20px">
                        <FormIn mb="15px" title="Username" type="text" placeholder="Username" onChange={(event) => userData.username = event.target.value} />
                        <FormIn title="Password" type="password" placeholder="Password" onChange={(event) => userData.password = event.target.value} />
                        {success ? <Text fontSize="sm" color='green'>{errorMsg}</Text> :
                            <Text fontSize="sm" color='red'>{errorMsg}</Text>
                        }
                        <Flex mt="20px">
                            <Btn mr="5px" colorArr={["white", "primary"]} onClick={handleLogin}>Login</Btn>
                            <OutlineBtn colorArr={["primary", "white"]} onClick={() => {
                                clearFormData()
                                setView("signup")
                                setErrorMsg('')
                            }}>
                                Sign up
                            </OutlineBtn>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        );
    }

    return (
        <>
            <OutlineBtn colorArr={["black", "white"]} onClick={onOpen}>Login</OutlineBtn>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                {modalContent()}
            </Modal>
        </>
    );
}