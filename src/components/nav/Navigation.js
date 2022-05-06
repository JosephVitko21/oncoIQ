import React, { useContext, useState } from 'react';
import { Box, Flex, Heading, Text, Image, Button, Link } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

import { login, authFetch, useAuth, logout } from "../../auth";
import logo from "./logo.svg"
import Login from "./Login";
import user from "../../auth/user";


// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
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
        logBtn = 
            <Menu>
                <MenuButton _focus={{ outline: "none" }} bg="transparent"><Image width="50px" src={user.profilePic} borderRadius="50%" /></MenuButton>
                <MenuList>
                    <MenuItem 
                        _focus={{ outline: "none" }} _hover={{ outline: "none", bg: "primary", color: "white" }}
                        onClick={() => logout()}
                    >
                        Log Out
                    </MenuItem>
                </MenuList>
            </Menu>;

        navContent =
            <Box>
                <Link mr="15px" onClick={() => navigate("/community")}>Community</Link>
                <Link onClick={() => navigate("/slides")}>My Slides</Link>
            </Box>;
    } else {
        logBtn = <Login />;
        navContent =
            <Box>
                <Link onClick={() => navigate("/community")}>Community</Link>
            </Box>
    }

    return (
        <Flex mx="20px" mt="20px" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
                <Image src={logo} width="100px" onClick={() => navigate("/")} mr="40px" />
                {navContent}
            </Flex>
            {logBtn}
        </Flex>
    );
}
