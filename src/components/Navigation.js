import React, {useContext} from 'react';
import {login, authFetch, useAuth, logout} from "../auth";
import { LoginPopContext } from "../context/GlobalContext"
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Image, Spacer } from "@chakra-ui/react";
import logo from "./oncoiq-white.png"

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    let navigate = useNavigate();

    var logBtn = <Button colorScheme="gray" onClick={() => setLoginPop(true)}>Login</Button>
    var navContent = null;

    if (logged) {
        logBtn = <Button colorScheme="gray" onClick={() => logout()}>Logout</Button>
        navContent =
            <Breadcrumb color="white" separator=" ">
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/upload">Upload</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/archive">Archive</BreadcrumbLink>
                </BreadcrumbItem>
        </Breadcrumb>
    }

    return (
        <Flex bg="#011c33" align="center" p={2}>
            <Image src={logo} boxSize="5%" mr={5} />
            {navContent}
            <Spacer />
            {logBtn}
        </Flex>
    );
}
