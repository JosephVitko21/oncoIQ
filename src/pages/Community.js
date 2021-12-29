import React, {useState, useContext, useEffect} from "react";
import CaseCard from '../components/forum/list/CaseCard';
import { Modal } from "react-bootstrap";
import Login from "../components/nav/Login";
import {makeAuthenticatedRequest} from "../utils/middleware";
import user from "../auth/user";
import CaseList from "../components/forum/list/CaseList";

export default function Community() {
    return (
        <div className="bg-navy min-vh-100">
            <div className="container mt-5">
                <h1 className="text-white">Help a Pathologist</h1>
                <p className="text-white mb-4">
                    Explore cases the pathology community needs help diagnosing
                </p>
                <br/>
                <CaseList/>
            </div> 
        </div>
    )
}
