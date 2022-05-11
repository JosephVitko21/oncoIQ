import React from 'react';
import { Input, Text, Heading, Box, Flex } from '@chakra-ui/react'

export default function FormIn(props) {
    return (
        <Box {...props}>
            <Text fontSize="md" mb="5px">{props.title}</Text>
            <Input placeholder={props.placeholder} _focus={{ borderColor: "primary" }} onChange={props.onChange} type={props.type} />
        </Box>
    );
}
