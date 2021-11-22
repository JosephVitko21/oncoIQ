import React, {useContext} from 'react';
import {Button, Navbar, Nav} from 'react-bootstrap';
import {login, authFetch, useAuth, logout} from "../auth";
import { LoginPopContext } from "../context/GlobalContext"
import { useNavigate } from "react-router-dom";

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    let navigate = useNavigate();

    var logBtn = <Button variant="outline-light" onClick={() => setLoginPop(true)}>Login</Button>;
    var navContent = null;

    if (logged) {
        logBtn = <Button variant="outline-light" onClick={() => logout()}>Logout</Button>;
        navContent =
            <Nav className="mr-auto">
                <Nav.Link onClick={() => navigate("/upload")}>Upload</Nav.Link>
                <Nav.Link onClick={() => navigate("/archive")}>Archive</Nav.Link>
            </Nav>;
    }

    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Navbar.Brand onClick={() => navigate("/")}>oncoIQ</Navbar.Brand>
                {navContent}
                <Navbar.Collapse className="justify-content-end">
                    {logBtn}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
