import React from 'react';
import CommentCard from '../components/forum/CommentCard';
import ReplyCard from '../components/forum/NewCommentCard';

export default function Case() {
    return (
        <div className="bg-navy">
            <div className="container">
                <h1 className="text-white mb-4">Case Discussion</h1>

                <CommentCard />
                <ReplyCard />
            </div> 
        </div>
    )
}
