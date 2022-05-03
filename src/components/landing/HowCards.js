import React from 'react';
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HowCards(props) {
    return (
        <Flex 
            flexDirection="column" justifyContent="space-around" alignItems="center" textAlign="center" w="20vw" h="15vw" p="15px" mr="30px"
            borderRadius="7px" boxShadow="rgb(186 186 186 / 40%) 0px 4px 16px" bg="white"
            transition="transform .2s" _hover={{ transform: "scale(1.05)" }}
        >
            <Heading fontSize="lg">{props.title}</Heading>
            <Text fontSize="50px" color="primary"><FontAwesomeIcon icon={props.icon} /></Text>
            <Text fontSize="md">{props.children}</Text>
        </Flex>
    );
}
