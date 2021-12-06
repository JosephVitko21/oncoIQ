import React, {useState, useContext} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {login, authFetch, useAuth, logout} from "../../auth";
import domain from "../../utils/site-domain";
import { useNavigate, Link } from "react-router-dom";
import user from "../../auth/user";
import { LoginPopContext } from "../../context/GlobalContext"

export default function Login() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);

    const [view, setView] = useState("login");
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    const userData = {
        "firstName": null,
        "lastName": null,
        "username": null,
        "email": null,
        "password": null,
        "position": null,
        "workplace": null,
        "website": null,
        "profilePicUrl": null
    }
    
    function handleLogin(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username": userData.username,"password": userData.password});

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

                setLoginPop(false)
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

        var raw = JSON.stringify(userData);

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

    if (view === "signup") {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignup}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" onChange={(event) => userData.firstName = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" onChange={(event) => userData.lastName = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={(event) => userData.email = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(event) => userData.username = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => userData.password = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Position" onChange={(event) => userData.position = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Workplace</Form.Label>
                            <Form.Control type="text" placeholder="Workplace" onChange={(event) => userData.workplace = event.target.value}/>
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
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="w-auto" type="text" placeholder="Username" onChange={(event) => userData.username = event.target.value}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="w-auto" type="password" placeholder="Password" onChange={(event) => userData.password = event.target.value}/>
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
