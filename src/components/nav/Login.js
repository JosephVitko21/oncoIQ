import React, {useState, useContext} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {login, authFetch, useAuth, logout} from "../../auth";
import domain from "../../utils/site-domain";
import { useNavigate, Link } from "react-router-dom";
import user from "../../auth/user";

const userData = {
    "title": null,
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

export default function Login(props) {
    const [logged] = useAuth();

    let initial_view = "login"
    if (props.showSignUpOnOpen) {
        initial_view = 'signup'
    }

    const [view, setView] = useState(initial_view);
    const [errorMsg, setErrorMsg] = useState(null);
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const clearFormData = () => {
        try {
            document.getElementById("sign-up-form").reset()
        } catch (e) {}
        try {
            document.getElementById("login-form").reset()
        } catch (e) {}
    }
    
    async function handleLogin(event) {
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

        let response = await fetch(domain + "/users/login", requestOptions)
        let data
        try {
            data = await response.json()
        } catch (e) {
            setSuccess(false)
            setErrorMsg('There was a problem logging in, please try again')
            clearFormData()
            return
        }
        if (response.status !== 200 || data.access_token == null) {
            setSuccess(false)
            setErrorMsg(data.message)
            clearFormData()
        } else {
            login(data.access_token);
            user.username = data.username
            console.log(data.access_token);

            await user.getUsername()

            props.setLoginPop(false)
            navigate("/");
        }
    }

    async function handleSignup(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // for (let key of Object.keys(userData)) {
        //     if (userData[key] == null) {
        //         userData[key] = lastUserData[key]
        //     }
        // }

        var raw = JSON.stringify(userData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(domain + "/users/register", requestOptions)
        if (response.status !== 200) {
            setSuccess(false)
            setErrorMsg(`Error signing up, please try again: ${await response.text()}`);
            console.log(userData)
            // console.log(lastUserData)
            // Object.assign(lastUserData, userData)
            // console.log(lastUserData)
        } else {
            try {
                // let data = await response.json()
                setErrorMsg("Successfully signed up");
                setSuccess(true);
                clearFormData()
            } catch (e) {
                console.log("error: ", e);
                setErrorMsg(`Error signing up, please try again`);
                // Object.assign(lastUserData, userData)
            }

        }
    }

    if (view === "signup") {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignup} id="sign-up-form">
                        <Form.Group>
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@email.com" onChange={(event) => userData.email = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control type="text" placeholder="JohnDoe123" onChange={(event) => userData.username = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password*</Form.Label>
                            <Form.Control type="password" placeholder="********" onChange={(event) => userData.password = event.target.value}/>
                        </Form.Group>

                        <br/>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Dr." onChange={(event) => userData.title = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control type="text" placeholder="John" onChange={(event) => userData.firstName = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name*</Form.Label>
                            <Form.Control type="text" placeholder="Doe" onChange={(event) => userData.lastName = event.target.value}/>
                        </Form.Group>

                        <br/>

                        <Form.Group>
                            <Form.Label>Position*</Form.Label>
                            <Form.Control type="text" placeholder="Pathologist" onChange={(event) => userData.position = event.target.value}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Workplace*</Form.Label>
                            <Form.Control type="text" placeholder="Hospital" onChange={(event) => userData.workplace = event.target.value}/>
                        </Form.Group>

                        <br/>

                        {/*<Form.Group>*/}
                        {/*    <Form.Label>Profile Pic URL</Form.Label>*/}
                        {/*    <Form.Control type="text" placeholder="http://website.com/images/myprofilepic" onChange={(event) => userData.profilePicUrl = event.target.value}/>*/}
                        {/*</Form.Group>*/}

                        {success ? <p className="text-success">{errorMsg}</p> :
                            <p className="text-danger">{errorMsg}</p>
                        }

                        <div className="d-flex flex-column align-items-center mt-4">
                            <button className="btn btn-navy w-50" type="submit">
                                Sign Up
                            </button>
                            <button className="btn btn-outline-navy mt-2 w-25" onClick={() => {
                                clearFormData()
                                setView(login)
                                setErrorMsg('')
                            }}>
                                Back to Login
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </>
        );
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin} id="login-form">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(event) => userData.username = event.target.value}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => userData.password = event.target.value}/>
                    </Form.Group>


                    {success ? <p className="text-success">{errorMsg}</p> :
                        <p className="text-danger">{errorMsg}</p>
                    }

                    <div className="d-flex flex-column align-items-center">
                        <button className="btn btn-navy mt-4 w-50" type="submit">
                            Login
                        </button>
                        <button className="btn btn-outline-navy mt-2 w-25" onClick={() => {
                            clearFormData()
                            setView("signup")
                            setErrorMsg('')
                        }}>
                            New User? Sign Up
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
}
