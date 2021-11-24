import React from 'react';

export default function ReplyCard() {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title mb-3">Reply</h5>
                <textarea className="bg-light w-100 mb-2"></textarea>
                <button className="btn btn-success">Submit</button>
            </div>
        </div>
    );
}
