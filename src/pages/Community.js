import React from "react";
import CaseList from "../components/forum/list/CaseList";

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default function Community() {
    return (
        <Box minH="100vh">
            <Flex flexDirection="column" alignItems="center" mt="30px">
                <Box w="60vw" mb="30px">
                    <Heading mb="10px">Help a Pathologist</Heading>
                    <Text fontSize="md" color="primary">Explore cases the pathology community needs help diagnosing</Text>
                </Box>
                <CaseList/>
            </Flex>
        </Box>
    )
}
