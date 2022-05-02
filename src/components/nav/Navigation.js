import React, {useContext, useState} from 'react';
import { Box, Flex, Heading, Text, Image, Button, Link } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { Dropdown, Modal } from "react-bootstrap";

import {login, authFetch, useAuth, logout} from "../../auth";
import logo from "./logo.svg"
import Login from "./Login";
import user from "../../auth/user";
import OutlineBtn from '../basic/OutlineBtn';


// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const [loginPop, setLoginPop] = useState(false);
    const [profilePic, setProfilePic] = useState(user.profilePic)

    let navigate = useNavigate();

    if (user.profilePic == null) {
        user.getUsername().then(() => {
            setProfilePic(user.profilePic)
        })
    }

    var logBtn;
    var navContent;
    if (logged) {
        logBtn = <Dropdown>
            <Dropdown.Toggle id='dropdown-basic' style={{backgroundColor: 'transparent', borderColor: 'transparent'}}>
                <img
                    className="profile-pic"
                    width="50px"
                    height="50px"
                    src={user.profilePic}
                    style={{borderRadius: '50%'}}
                />
            </Dropdown.Toggle>
            <DropdownMenu>
                <Dropdown.Item onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    Log Out
                </Dropdown.Item>
            </DropdownMenu>
        </Dropdown>

        navContent =
            <Box>
                <Link onClick={() => navigate("/community")}>Community</Link>
                <Link onClick={() => navigate("/slides")}>My Slides</Link>
            </Box>;
    } else {
        logBtn = <OutlineBtn colorArr={["black", "white"]} onClick={() => setLoginPop(true)}>Login</OutlineBtn>;
        navContent =
            <Box>
                <Link onClick={() => navigate("/community")}>Community</Link>
            </Box>;
    }

    return (
        <Flex mx="20px" mt="20px" alignItems="center" justifyContent="space-between">
            <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
                <Login setLoginPop={setLoginPop} />
            </Modal>

            <Flex alignItems="center">
                <Image src={logo} width="100px" onClick={() => navigate("/")} mr="40px" />
                {navContent}
            </Flex>
            {logBtn}
        </Flex>
    );
}
