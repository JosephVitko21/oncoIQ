import React from "react";
import CaseList from "../components/forum/list/CaseList";

import { Box, Flex, Heading, Text, Image, Icon } from '@chakra-ui/react'

export default function Community() {
    return (
        <Box minH="100vh" bg="linear-gradient(0deg, rgba(246,236,250,1) 0%, rgba(255,255,255,1) 100%)">
            <Flex flexDirection="column" alignItems="center" mt="10vh">
                <Box w="60vw" mb="30px">
                    <Heading mb="10px">Help a Pathologist</Heading>
                    <Text fontSize="md" color="primary">Explore cases the pathology community needs help diagnosing</Text>
                </Box>
                <CaseList/>
            </Flex>
        </Box>
    )
}
