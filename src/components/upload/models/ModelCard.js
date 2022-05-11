import React from 'react'
import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react';

import domain from "../../../utils/site-domain";

export default function ModelCard(props) {
    let thumbnail_src = domain + props.thumbnail_url;
    let status_text = '';

    if (props.status === 0) {
        status_text = "Not Downloaded";
    } else if (props.status === 1) {
        status_text = "Sleeping";
    } else if (props.status === 2) {
        status_text = "Loaded";
    }
    console.log(thumbnail_src);

    return (
        <Flex 
            w="80%" justifyContent="space-between" mb="30px" p="5px"
            border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px" 
            transition="transform .2s" _hover={{ transform: "scale(1.05)" }}
            onClick={props.selectModel}
            cursor="pointer"
        >
            <Image w="25%" borderRadius="5px" src={thumbnail_src} />
            <Flex w="70%" flexDirection="column" justifyContent="space-around">
                <Heading fontSize="lg" mb="15px">{props.name}</Heading>
                <Text fontSize="sm" color="primary">{status_text}</Text>
            </Flex>
        </Flex>
    );
}
