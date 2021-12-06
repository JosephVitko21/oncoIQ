import {useEffect, useState} from "react";
import {makeAuthenticatedRequest} from "../../../utils/middleware";
import CommentCard from "./CommentCard";

export default function CommentList(props) {
    const [comments, setComments] = useState([])

    const getData = () => {
        makeAuthenticatedRequest('GET', '/posts/' + props.image_id + '/comments')
            .then(r => {
                let data = r.comments
                setComments(data)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <>
            {comments.map((datum) => {
                return <CommentCard
                    authorName={datum.authorName}
                    authorProfilePic={datum.authorProfilePic}
                    authorJob={datum.authorJob}
                    date={datum.timestamp}
                    content={datum.content}
                />
            })}
        </>

    )
}