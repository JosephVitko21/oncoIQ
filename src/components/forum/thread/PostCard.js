import React, {useEffect, useState} from 'react';
import { Box, Flex, Heading, Text, Badge } from '@chakra-ui/react';

import PostFooter from "./PostFooter";
import googleDomain from "../../../utils/google-drive-domain";
import TileGrid from "../../archive/dialog/TileGrid";
import {makeAuthenticatedRequest} from "../../../utils/middleware";

export default function PostCard(props) {
    const [data, setData] = useState({})

    const getData = () => {
        makeAuthenticatedRequest('GET', '/images/' + props.image_id)
            .then(r => {
                setData(r)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box 
            w="60vw" mb="30px" p="20px"
            border="1px solid var(--chakra-colors-shadow)" borderRadius="7px" boxShadow="var(--chakra-colors-shadow) 0px 4px 16px" 
        >
            <Heading fontSize="xl" mb="30px" mt="10px">{data.name}</Heading>
            <Flex justifyContent="center">
                <Box w="50%">
                    <TileGrid
                        tiles={data.tiles}
                        id={data.image_id}
                        image_url={googleDomain + data.file_id}
                        num_rows={data.num_rows}
                        num_cols={data.num_cols}
                        showSlider={true}
                    />
                </Box>
            </Flex>
            <Text fontSize="md" mb="30px">{data.description}</Text>
            <PostFooter
                poster = {data.uploader}
                job={data.uploader_job}
                profilePic={data.uploader_profile_pic}
                date={data.date}
                borderTop="1px solid var(--chakra-colors-shadow)" pt="10px"
            />
        </Box>
    );
}

{/* <Card style={{marginBottom: '60px'}}>
    <Card.Header>
        <Card.Title className='mt-2'>
            {data.name}
        </Card.Title>
    </Card.Header>
    <Card.Body>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} className="mt-4 mb-4">
            <div style={{width: '50%'}}>
                <TileGrid
                    tiles={data.tiles}
                    id={data.image_id}
                    image_url={googleDomain + data.file_id}
                    num_rows={data.num_rows}
                    num_cols={data.num_cols}
                    showSlider={true}
                />
            </div>
        </div>
        {data.description}
    </Card.Body>

    <Card.Footer>
        <PostFooter
            poster = {data.uploader}
            job={data.uploader_job}
            profilePic={data.uploader_profile_pic}
            date={data.date}
        />
    </Card.Footer>
</Card> */}
