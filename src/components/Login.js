import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {login, authFetch, useAuth, logout} from "../auth";
import domain from "../utils/site-domain";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signup, setSignup] = useState(false);

    const [logged] = useAuth();
    
    function handleLogin(event) {
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

        fetch(domain + "/api/users/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            
            if (result.access_token != null) {
                login(result.access_token);
                console.log(result.access_token);
            }
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    function handleSignup(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"email":email,"password":password});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(domain + "/api/users/register", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setSignup(false);
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

    function handleEmailChange(event) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    if (logged) {
        return null;
    }

    if (signup) {
        return (
            <div className='mt-5'>
                <Form onSubmit={handleSignup}>
                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Email' onChange={handleEmailChange}/>
                    </Form.Group>

                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='Username' onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={handlePasswordChange}/>
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Sign Up
                    </Button>
                    <Button className='ml-2' variant='outline-primary' onClick={() => setSignup(false)}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }

    return (
        <div className='mt-5 d-flex justify-content-center'>
            <div className='p-5'>
                <h1>Welcome to oncoIQ</h1>
                <p>Using AI image recognition to help pathologists make diagnoses</p>
            </div>
            <div>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control className='w-auto' type='text' placeholder='Username' onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className='w-auto' type='password' placeholder='Password' onChange={handlePasswordChange}/>
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Login
                    </Button>
                    <Button className='ml-2' variant='outline-primary' onClick={() => setSignup(true)}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
}
