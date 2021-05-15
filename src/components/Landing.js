import React, {useState, useContext} from "react";
import {Button, Form, Modal, Card} from "react-bootstrap";
import {login, authFetch, useAuth, logout} from "../auth";
import Demo from "./Demo";
import Login from "./Login";
import Archive from './Archive';
import Upload from "./Upload"
import {LoginPopContext, NavContext} from "../context/GlobalContext"

export default function Landing() {
    const [demo, setDemo] = useState(false);
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    const {navState, setNavState} = useContext(NavContext);

    if (logged) {
        if (navState === "upload") {
            return <Upload />;
        }
        if (navState === "archive") {
            return <Archive />;
        }
    }

    if (demo) {
        return (
            <div className="container">
                <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
                    <Login />
                </Modal>
                <div className="row">
                    <div className="col-10 offset-1">
                        <Demo />
                        <Button className="mt-3 mb-3" variant="outline-info" onClick={() => setDemo(false)}>
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid h-100 bg-info">
            <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
                <Login />
            </Modal>
            <div className="row h-100 align-items-center">
                <div className="col text-center">
                    <h1 className="display-1 text-white">Welcome to oncoIQ</h1>
                    <h4 className="text-lightgrey">Using AI image recognition to help pathologists make diagnoses</h4>
                    <Button className="mt-3" variant="outline-light" onClick={() => setDemo(true)}>
                            How it works
                    </Button>
                </div>
            </div>
        </div>
    );
}
