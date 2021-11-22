import React, {useState, useContext} from "react";
import {Button, Form, Modal, Card} from "react-bootstrap";
import Login from "../components/Login";
import Archive from './Archive';
import Upload from "./Upload"
import {LoginPopContext, NavContext} from "../context/GlobalContext"

export default function Landing() {
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    const {navState, setNavState} = useContext(NavContext);

    return (
        <div className="container-fluid h-100 bg-info">
            <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
                <Login />
            </Modal>
            <div className="row h-100 align-items-center">
                <div className="col text-center">
                    <h1 className="display-1 text-white">Welcome to oncoIQ</h1>
                    <h4 className="text-lightgrey">Using AI image recognition to help pathologists make diagnoses</h4>
                </div>
            </div>
        </div>
    );
}
