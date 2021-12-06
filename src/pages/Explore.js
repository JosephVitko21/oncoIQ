import React, {useState, useContext} from "react";
import CaseCard from '../components/forum/CaseCard';

export default function Explore() {
    return (
        <div className="bg-navy">
            <div className="container">
                <h1 className="text-white">Help a Pathologists</h1>
                <p className="text-white mb-4">
                    Offer your advice to a Pathologist in need
                </p>

                <CaseCard />
                <CaseCard />
                <CaseCard />
            </div> 
        </div> 
    )
}
