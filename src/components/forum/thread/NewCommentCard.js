import React, {useState} from 'react';
import {login, authFetch, useAuth, logout} from "../../../auth";
import {Card} from "react-bootstrap";
import {makeAuthenticatedRequest} from "../../../utils/middleware";
import ErrorDialog from "../../upload/ErrorDialog";
import {useNavigate} from "react-router-dom";

export default function NewCommentCard(props) {
    const [logged] = useAuth();
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    
    let replyContent = ""

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
            // TODO: Refresh the page somehow

            window.location.reload();
        } catch (e) {
            setShowErrorDialog(true)
        }
        
    }

    return (
        <>
            <Card className=" p-3 mb-4 mt-4">
                <h5 className="mb-3">Reply</h5>
                <textarea className="w-100 mb-2" onChange={(event) => replyContent = event.target.value}/>
                <button className="btn btn-success" onClick={submitComment} type='submit'>Submit</button>
            </Card>
            {showErrorDialog ? <ErrorDialog message='There was a problem submitting your reply'/> : <></>}
        </>

    );
}
