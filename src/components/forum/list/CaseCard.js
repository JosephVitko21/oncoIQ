import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react';

import RiskBadge from "../../archive/RiskBadge";
import PostFooter from "../thread/PostFooter";
import googleDomain from "../../../utils/google-drive-domain";

export default function CaseCard(props) {
    const navigate = useNavigate();

    let image_src
    if (!props.file_id) {
        // load the placeholder image
        image_src = "https://2rri712hg8ztbbaed491mw10-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/placeholder-square.png"
    } else {
        image_src = googleDomain + props.file_id
    }
    
    return (
        <Flex 
            w="60vw" justifyContent="space-between" mb="30px" p="15px"
            border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px" 
            transition="transform .2s" _hover={{ transform: "scale(1.05)" }}
            onClick={() => navigate("/thread?id="+props.image_id)}
            cursor="pointer"
        >
            <Image w="25%" borderRadius="7px" src={image_src} />
            <Flex w="70%" flexDirection="column" justifyContent="space-around">
                <Box>
                    <Flex mb="15px">
                        <Badge color="white" bg="primary" mr="5px">{props.model}</Badge>
                        {
                            props.risk_level != null ?
                            <RiskBadge risk_level={props.risk_level} /> : null
                        }
                    </Flex>
                    <Heading fontSize="2xl" mb="15px">{props.name}</Heading>
                    <Text fontSize="md">{props.description}</Text>
                </Box>
                <PostFooter
                    poster={props.poster}
                    profilePic={props.profilePic}
                    job={props.job}
                    date={props.date}
                    borderTop="1px solid var(--chakra-colors-shadow)" pt="10px" w="90%"
                />
            </Flex>
        </Flex>
        
    );
}