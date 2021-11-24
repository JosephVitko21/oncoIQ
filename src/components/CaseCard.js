import React from 'react';
import { useNavigate, Link } from "react-router-dom";

export default function CaseCard() {
    const navigate = useNavigate();
    
    return (
        <div className="card mb-4 pointer" onClick={() => navigate("/case")}>
            <div className="row no-gutters">
                <div className="col-md-4 my-auto p-2">
                    <img className="card-img-top" src="https://m.media-amazon.com/images/I/919hmlKVNhL._AC_SL1200_.jpg" />
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <span className="badge badge-pill badge-info mb-2" >Badge</span>
                        <h3 className="card-title">Title</h3>
                        <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <img className="profile-pic" width="50" src="https://st2.depositphotos.com/1006318/5909/v/600/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
