import React, {useContext} from 'react';
import {login, authFetch, useAuth, logout} from "../../auth";
import { LoginPopContext } from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom";
import logo from "../logo-white.svg"
import {Container, Modal, Nav, Navbar} from "react-bootstrap";
import Login from "./Login";
import user from "../../auth/user";

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    let navigate = useNavigate();

    var logBtn
    var navContent
    let navContentRight = <></>

    if (logged) {
        logBtn = <img
            className="profile-pic"
            width="50px"
            height="50px"
            src={user.profilePic}
            style={{borderRadius: '50%'}}
            onClick={() => logout()}
        />
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
                <Login />
            </Modal>
            <Navbar
                 style={{
                     backgroundColor: 'rgba(0,0,0,0)',
                     paddingTop: '1em',
                     paddingBottom: '1em'
                 }}
                 collapseOnSelect
                 expand="lg"
                 variant='dark'
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
