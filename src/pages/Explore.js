import React, {useState, useContext, useEffect} from "react";
import CaseCard from '../components/forum/CaseCard';
import { Modal } from "react-bootstrap";
import Login from "../components/nav/Login";
import { LoginPopContext } from "../context/GlobalContext"
import {makeAuthenticatedRequest} from "../utils/middleware";
import user from "../auth/user";
import CaseList from "../components/forum/CaseList";

export default function Explore() {
    return (
        <div className="bg-navy" style={{minHeight: '100vh'}}>
            <div className="container">
                <h1 className="text-white">Help a Pathologists</h1>
                <p className="text-white mb-4">
                    Offer your advice to a Pathologist in need
                </p>

                <CaseList/>
            </div> 
        </div>
    )
}
