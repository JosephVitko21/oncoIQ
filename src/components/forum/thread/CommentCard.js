import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import PostFooter from "./PostFooter";

export default function CommentCard(props) {
    return (
        <Box 
            w="60vw" mb="30px" p="20px"
            border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px" 
        >
            <Text fontSize="md" mb="30px">{props.content}</Text>
            <PostFooter
                poster = {props.authorName}
                job={props.authorJob}
                profilePic={props.authorProfilePic}
                date={props.date}
                borderTop="1px solid var(--chakra-colors-shadow)" pt="10px"
            />
        </Box>
    );
}
