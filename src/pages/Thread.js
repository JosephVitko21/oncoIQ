import React from 'react';
import CommentCard from '../components/forum/thread/CommentCard';
import ReplyCard from '../components/forum/thread/NewCommentCard';
import PostCard from "../components/forum/thread/PostCard";
import {useLocation, useNavigate} from "react-router-dom";

export default function Thread() {
    const navigate = useNavigate()

    const search = useLocation().search
    const params = new URLSearchParams(search)
    let imageID = params.get('id')

    if (imageID == null) {
        navigate("/")
        return<></>
    }

    return (
        <div className="bg-navy min-vh-100">
            <div className="container">
                <h1 className="text-white mb-4">Case Discussion</h1>
                <PostCard
                    image_id ={imageID}
                />
                <CommentCard />
                <ReplyCard />
            </div>
        </div>
    )
}