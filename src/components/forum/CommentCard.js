import React from 'react';

export default function CommentCard() {
    return (
        <div className="card mb-3">
            <img className="mx-auto" src="https://m.media-amazon.com/images/I/919hmlKVNhL._AC_SL1200_.jpg" width="50%" />
            <div className="card-body">
                <h5 className="card-title">Title</h5>
                <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </div>
    );
}
