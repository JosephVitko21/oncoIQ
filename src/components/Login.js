import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LoginContext } from '../context/GlobalContext';
import {login, authFetch, useAuth, logout} from "../auth";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [logged] = useAuth();

    const {loggedin, setLogin} = useContext(LoginContext);
    
    function handleSubmit(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"password":password});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://oncoiq-backend.herokuapp.com/api/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            
            if (result.access_token != null) {
                login(result.access_token);
                console.log(result.access_token);
                setLogin(true);
            }
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    function handleUsernameChange(event) {
        event.preventDefault();
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    if (logged) {
        return null;
    }

    return (
        <div className='mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Username' onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' onChange={handlePasswordChange}/>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Login
                </Button>
            </Form>
        </div>
    );
}
