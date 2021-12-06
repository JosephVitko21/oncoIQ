import React, {useState, useContext, useEffect} from "react";
import CaseCard from '../components/forum/list/CaseCard';
import {Button, Modal} from "react-bootstrap";
import Login from "../components/nav/Login";
import { LoginPopContext } from "../context/GlobalContext"
import {makeAuthenticatedRequest} from "../utils/middleware";
import user from "../auth/user";
import CaseList from "../components/forum/list/CaseList";

export default function Landing() {
    return (
        <div className="bg-navy min-vh-100">
            <div className="container mt-5">
                <div style={{height: '200px'}}/>
                <h1 className="text-white">Welcome to OncoIQ</h1>
                <p className="text-white mb-4">
                    Get help diagnosing cases from the pathology community and artificial intelligence
                </p>
                <div style={{height: '250px'}}/>
                <h2 className='text-white'>Latest Cases</h2>
                <CaseList/>
                <Button>View More</Button>
                {/*if logged in, navigate to community tab, otherwise show log in dialog*/}
            </div>
        </div>
    )
}