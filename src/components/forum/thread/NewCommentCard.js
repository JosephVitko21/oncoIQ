import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import { Box, Flex, Heading, Text, Button, Textarea } from '@chakra-ui/react';

import { login, authFetch, useAuth, logout } from "../../../auth";
import { makeAuthenticatedRequest } from "../../../utils/middleware";
import ErrorDialog from "../../upload/ErrorDialog";
import Btn from "../../basic/Btn"

let replyContent = "";

export default function NewCommentCard(props) {
    const [logged] = useAuth();
    const [showErrorDialog, setShowErrorDialog] = useState(false)

    if (!logged){
        return (
            <Flex 
                w="60vw" justifyContent="center" mb="30px" p="15px"
                borderRadius="7px" boxShadow="rgb(186 186 186 / 40%) 0px 4px 16px" bg="white" 
            >
                <Text fontSize="md">Login to reply</Text>
            </Flex>
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
            <Box 
                w="60vw" mb="30px" p="20px"
                border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px" 
            >
                <Heading fontSize="lg" mb="10px">Reply</Heading>
                <Textarea mb="10px" _focus={{ borderColor: "primary" }} onChange={(event) => replyContent = event.target.value} />
                <Flex justifyContent="center">
                    <Btn colorArr={["white", "primary"]} onClick={submitComment} type='submit'>Submit</Btn>
                </Flex>
            </Box>
            {showErrorDialog ? <ErrorDialog message='There was a problem submitting your reply'/> : <></>}
        </>

    );
}
