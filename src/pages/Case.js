import React from 'react';
import ThreadCard from '../components/ThreadCard';
import ReplyCard from '../components/ReplyCard';

export default function Case() {
    return (
        <div className="bg-navy">
            <div className="container">
                <h1 className="text-white mb-4">Case Discussion</h1>

                <ThreadCard />
                <ReplyCard />
            </div> 
        </div>
    )
}
