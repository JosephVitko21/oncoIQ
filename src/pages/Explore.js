import React, {useState, useContext, useEffect} from "react";
import CaseCard from '../components/forum/list/CaseCard';
import { Modal } from "react-bootstrap";
import Login from "../components/nav/Login";
import { LoginPopContext } from "../context/GlobalContext"
import {makeAuthenticatedRequest} from "../utils/middleware";
import user from "../auth/user";
import CaseList from "../components/forum/list/CaseList";

export default function Explore() {
    return (
        <div className="bg-navy min-vh-100">
            <div className="container">
                <h1 className="text-white">Explore Cases</h1>
                <p className="text-white mb-4">
                    Get feedbacks from our AI models and community of pathologists
                </p>

                <CaseList/>
            </div> 
        </div>
    )
}
