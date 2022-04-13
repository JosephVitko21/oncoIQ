import React, {useContext, useState} from 'react';
import {login, authFetch, useAuth, logout} from "../../auth";
import { useNavigate } from "react-router-dom";
import logo from "../logo-white.svg"
import {Container, Dropdown, Modal, Nav, Navbar} from "react-bootstrap";
import Login from "./Login";
import user from "../../auth/user";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/DropdownMenu";

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const [loginPop, setLoginPop] = useState(false);
    const [profilePic, setProfilePic] = useState(user.profilePic)

    let navigate = useNavigate();

    var logBtn
    var navContent
    let navContentRight = <></>

    if (user.profilePic == null) {
        user.getUsername().then(() => {
            setProfilePic(user.profilePic)
        })
    }

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
            <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/community")}>Community</Nav.Link>
                <Nav.Link onClick={() => navigate("/slides")}>My Slides</Nav.Link>
            </Nav>;
    } else {
        logBtn = <button className="btn btn-outline-light" onClick={() => setLoginPop(true)}>Login</button>;
        navContent =
            <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/community")}>Community</Nav.Link>
            </Nav>;
    }

    navContentRight =
        <Nav style={{flexDirection: 'row'}}>
            {logBtn}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Nav>

    return (
        <Container>
            <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
                <Login setLoginPop={setLoginPop} />
            </Modal>
            <Navbar
                 collapseOnSelect
                 expand="lg"
                 variant='dark'
                 className="px-0 py-3"
            >
                <Navbar.Brand onClick={() => navigate("/")}>
                    <img src={logo} width="100"/>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {navContent}
                </Navbar.Collapse>
                {navContentRight}
            </Navbar>
        </Container>
    );
}
