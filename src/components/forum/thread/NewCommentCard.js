import React, {useState} from 'react';
import {login, authFetch, useAuth, logout} from "../../../auth";
import {Card} from "react-bootstrap";
import {makeAuthenticatedRequest} from "../../../utils/middleware";
import ErrorDialog from "../../upload/ErrorDialog";

export default function NewCommentCard(props) {
    const [logged] = useAuth();
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [replyContent, setReplyContent] = useState("")

    if (!logged){
        return (
            <div className="card p-3 mb-3">
                <h5 className="mb-3">Login to reply</h5>
            </div>
        );
    }

    const submitComment = async () => {
        console.log('submitting comment')
        try {
            if (replyContent == null) {
                throw Error;
            }
            let formData = {
                'content': replyContent
            }
            await makeAuthenticatedRequest('POST', '/posts/' + props.image_id + '/comments', JSON.stringify(formData))
            window.location.reload()
        } catch (e) {
            setShowErrorDialog(true)
        }
    }

    const handleDescriptionChange = (event) => {
        let content = event.target.value
        setReplyContent(content)
    }

    return (
        <>
            <Card className=" p-3 mb-3">
                <h5 className="mb-3">Reply</h5>
                <textarea className="w-100 mb-2" onChange={handleDescriptionChange}/>
                <button className="btn btn-success" onClick={submitComment} type='submit'>Submit</button>
            </Card>
            {showErrorDialog ? <ErrorDialog message='There was a problem submitting your reply'/> : <></>}
        </>

    );
}
