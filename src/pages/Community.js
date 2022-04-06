import React from "react";
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
