import React, {useContext} from 'react';
import {login, authFetch, useAuth, logout} from "../../auth";
import { LoginPopContext } from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom";
import logo from "../oncoiq-white.png"

// TODO: add a profile icon that contains the sign out button
export default function Navigation() {
    const [logged] = useAuth();
    const {loginPop, setLoginPop} = useContext(LoginPopContext);
    let navigate = useNavigate();

    var logBtn = <button className="btn btn-outline-light" onClick={() => setLoginPop(true)}>Login</button>;
    var navContent = <div className="navbar-nav mr-auto"></div>;

    if (logged) {
        logBtn = <button className="btn btn-outline-light" onClick={() => logout()}>Logout</button>;
        navContent =
            <div className="navbar-nav mr-auto">
                <a className="nav-link" onClick={() => navigate("/")}>Explore</a>
                <a className="nav-link" onClick={() => navigate("/post")}>Post</a>
                <a className="nav-link" onClick={() => navigate("/ai")}>AI</a>
                <a className="nav-link" onClick={() => navigate("/archive")}>Archive</a>
            </div>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-navy">
                <a className="navbar-brand" onClick={() => navigate("/")}>
                    <img src={logo} width="100"></img>
                </a>
                {navContent}
                {logBtn}
            </nav>
        </div>
    );
}
