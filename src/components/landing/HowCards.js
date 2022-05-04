import React from 'react';
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HowCards(props) {
    return (
        <Flex 
            flexDirection="column" justifyContent="space-around" alignItems="center" textAlign="center" w="20vw" h="15vw" p="15px" mr="30px"
            border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px"
            transition="transform .2s" _hover={{ transform: "scale(1.05)" }}
        >
            <Heading fontSize="lg">{props.title}</Heading>
            <Text fontSize="50px" color="primary"><FontAwesomeIcon icon={props.icon} /></Text>
            <Text fontSize="md">{props.children}</Text>
        </Flex>
    );
}
