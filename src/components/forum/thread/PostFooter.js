import React from "react";
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import moment from "moment";

export default function PostFooter(props) {
    return (
        <Flex justifyContent="space-between" alignItems="center" borderTop="1px solid" borderTopColor="gray.200" pt="15px" w="90%">
            <Flex>
                <Image width="50px" src={props.profilePic} borderRadius="50%" mr="15px" />
                <Box>
                    <Text fontSize="md">{props.poster}</Text>
                    <Text fontSize="sm">{props.job}</Text>
                </Box>
            </Flex>
            <Text>{moment.utc(props.date).fromNow()}</Text>
        </Flex>
    );
}
{/* <Row>
    <Col style={{flexBasis: 'auto', maxWidth: 'none', flexGrow: 0.0, width: 'auto'}}>
        <img className="profile-pic" width="50" src={props.profilePic} style={{borderRadius: '50%'}}/>
    </Col>
    <Col>
        <p className='mb-0'>{props.poster}</p>
        <small>{props.job}</small>
    </Col>
    <div className='mr-4 mt-2'>
        <p>{moment.utc(props.date).fromNow()}</p>
    </div>
</Row> */}