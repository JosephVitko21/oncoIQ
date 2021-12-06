import React, {useState, useContext} from "react";
import CaseCard from '../components/forum/CaseCard';
import { Modal } from "react-bootstrap";
import Login from "../components/nav/Login";
import { LoginPopContext } from "../context/GlobalContext"

export default function Explore() {
    const {loginPop, setLoginPop} = useContext(LoginPopContext);

    return (
        <>
        <Modal size="lg" show={loginPop} onHide={() => setLoginPop(false)}>
            <Login />
        </Modal>
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
        </> 
    )
}
