import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Nav() {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">oncoIQ</Navbar.Brand>
            </Navbar>
        </div>
    );
}
