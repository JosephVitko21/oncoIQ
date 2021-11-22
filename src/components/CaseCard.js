import React from 'react';
import { Box, Heading, Text, Badge, Image, Flex, Avatar } from "@chakra-ui/react";

export default function CaseCard() {
    return (
        <Flex p={5} borderWidth="1px" borderRadius="lg" bg="white" justify="space-between">
            <Box w="75%">
                <Badge borderRadius="full" px="2" colorScheme="teal" mb={2}>
                    Badge
                </Badge>

                <Heading fontSize="xl">Title</Heading>
                <Text mt={4} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Avatar name="Doctor" src="https://jooinn.com/images/specialist-doctor.jpg" />
            </Box>

            <Box>
                <Image src="https://m.media-amazon.com/images/I/919hmlKVNhL._AC_SL1200_.jpg" boxSize="200px" />
            </Box>
        </Flex>
    );
}
