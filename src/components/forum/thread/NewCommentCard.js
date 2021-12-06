import React from 'react';
import {login, authFetch, useAuth, logout} from "../../../auth";

export default function NewCommentCard() {
    const [logged] = useAuth();

    if (!logged){
        return (
            <div className="card p-3 mb-3">
                <h5 className="mb-3">Login to reply</h5>
            </div>
        );
    }

    return (
        <div className="card p-3 mb-3">
            <h5 className="mb-3">Reply</h5>
            <textarea className="w-100 mb-2"></textarea>
            <button className="btn btn-success">Submit</button>
        </div>
    );
}
