import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {login, authFetch, useAuth, logout} from "../auth";

export default function Nav() {
    const [logged] = useAuth();

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">oncoIQ</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {
                        logged? <Button variant="outline-light" onClick={() => logout()}>Logout</Button> : null
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
