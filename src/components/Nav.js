import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {login, authFetch, useAuth, logout} from "../auth";
import {LoginPopContext} from "../context/GlobalContext"

export default function Nav() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);

    var logBtn = <Button variant="outline-light" onClick={() => setLoginPop(true)}>Login</Button>;

    if (logged) {
        logBtn = <Button variant="outline-light" onClick={() => logout()}>Logout</Button>;
    }

    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Navbar.Brand href="#home">oncoIQ</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {logBtn}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
