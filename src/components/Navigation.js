import React, {useContext} from 'react';
import {Button, Navbar, Nav} from 'react-bootstrap';
import {login, authFetch, useAuth, logout} from "../auth";
import {LoginPopContext, NavContext} from "../context/GlobalContext"

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    const {navState, setNavState} = useContext(NavContext);

    var logBtn = <Button variant="outline-light" onClick={() => setLoginPop(true)}>Login</Button>;
    var navContent = null;

    if (logged) {
        logBtn = <Button variant="outline-light" onClick={() => logout()}>Logout</Button>;
        navContent =
            <Nav className="mr-auto">
                <Nav.Link href="#Upload" onClick={() => setNavState("upload")}>Upload</Nav.Link>
                <Nav.Link href="#Archive" onClick={() => setNavState("archive")}>Archive</Nav.Link>
            </Nav>;
    }

    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Navbar.Brand href="#home">oncoIQ</Navbar.Brand>
                {navContent}
                <Navbar.Collapse className="justify-content-end">
                    {logBtn}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
