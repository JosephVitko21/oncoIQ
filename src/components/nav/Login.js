import React, {useState, useContext} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {login, authFetch, useAuth, logout} from "../../auth";
import domain from "../../utils/site-domain";
import { useNavigate, Link } from "react-router-dom";
import user from "../../auth/user";

export default function Login() {
    const [logged] = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [view, setView] = useState("login");
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();
    
    function handleLogin(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"password":password});

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(domain + "/users/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            
            if (result.access_token != null) {
                login(result.access_token);
                user.username = result.username
                console.log(result.access_token);

                navigate("/");
            } else {
                console.log("error message: ", result.message);
                setErrorMsg(result.message);
            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
    }

    function handleSignup(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"email":email,"password":password});

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(domain + "/users/register", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            // setView("login");
            setErrorMsg("Successfully signed up");
        })
        .catch((error) => {
            console.log("error: ", error);
            setErrorMsg("Successfully signed up");
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

    if (view === "signup") {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignup}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={handleEmailChange}/>
                        </Form.Group>

                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange}/>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </Form.Group>

                        <p className="text-success">{errorMsg}</p>

                        <button className="btn btn-navy" type="submit">
                            Sign Up
                        </button>
                        <button className="btn btn-outline-navy ml-2" onClick={() => setView(login)}>
                            Login
                        </button>
                    </Form>
                </Modal.Body>
            </div>
        );
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="w-auto" type="text" placeholder="Username" onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="w-auto" type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    </Form.Group>

                    <p className="text-danger">{errorMsg}</p>

                    <button className="btn btn-navy" type="submit">
                        Login
                    </button>
                    <button className="btn btn-outline-navy ml-2" onClick={() => setView("signup")}>
                        Sign Up
                    </button>
                </Form>
            </Modal.Body>
        </div>
    );
}