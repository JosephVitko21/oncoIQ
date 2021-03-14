import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {login, authFetch, useAuth, logout} from "../auth";

export default function Nav() {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">oncoIQ</Navbar.Brand>
                <button onClick={() => logout()}>Logout</button>
            </Navbar>
        </div>
    );
}
