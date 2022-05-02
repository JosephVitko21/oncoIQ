import React from 'react';
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HowCards(props) {
    return (
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" textAlign="center" w="20vw" h="15vw" borderRadius="7px" p="15px" boxShadow="rgb(186 186 186 / 40%) 0px 4px 16px" bg="white" mr="30px">
            <Heading fontSize="lg">{props.title}</Heading>
            <Text fontSize="50px" color="primary"><FontAwesomeIcon icon={props.icon} /></Text>
            <Text fontSize="md">{props.children}</Text>
        </Flex>
    );
}
