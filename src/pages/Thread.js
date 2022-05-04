import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import ReplyCard from '../components/forum/thread/NewCommentCard';
import PostCard from "../components/forum/thread/PostCard";
import CommentList from "../components/forum/thread/CommentList";
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export default function Thread() {
    const navigate = useNavigate();

    const search = useLocation().search;
    const params = new URLSearchParams(search);
    let imageID = params.get('id');

    if (imageID == null) {
        navigate("/");
        return null;
    }

    return (
        <Box minH="100vh">
            <Flex flexDirection="column" alignItems="center" mt="30px">
                <Box w="60vw" mb="30px">
                    <Heading mb="30px">Case Discussion</Heading>
                    <PostCard
                        image_id ={imageID}
                    />
                    <CommentList
                        image_id={imageID}
                    />
                    <ReplyCard
                        image_id ={imageID}
                    />
                </Box>
            </Flex>
        </Box>
    )
}