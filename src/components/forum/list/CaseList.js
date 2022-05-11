import React, { useEffect, useState } from "react";
import { Flex, Text } from '@chakra-ui/react';

import {makeAuthenticatedRequest} from "../../../utils/middleware";
import CaseCard from "./CaseCard";
import OutlineBtn from "../../basic/OutlineBtn";

export default function CaseList(props) {
    const [postList, setPostList] = useState([]);
    const [nextPageToGet, setNextPageToGet] = useState(0);
    const [allShown, setAllShown] = useState(false)

    const getPosts = () => {
        makeAuthenticatedRequest('GET', `/images?page=${nextPageToGet}`)
            .then(data => {
                setPostList(postList.concat(data))
                if (!data || data.length < 12) {
                    setAllShown(true)
                } else {
                    setNextPageToGet(nextPageToGet + 1)
                }
            });
    }

    useEffect(() => {
        getPosts()
    }, [])

    if (!postList) return <Text>Loading...</Text>

    return(
        <>
            {postList.map((datum) => {
                console.log("datum:", datum)
                return (
                    <CaseCard
                        file_id={datum.file_id}
                        name={datum.name}
                        date={datum.date}
                        description={datum.description}
                        model={datum.model}
                        poster={datum.uploader}
                        profilePic={datum.uploader_profile_pic}
                        job={datum.uploader_job}
                        risk_level={datum.risk_level}
                        image_id={datum.image_id}
                    />
                );
            })}
            {!allShown ? (
                <Flex flexDirection="column" alignItems="center">
                    <OutlineBtn colorArr={["black", "white"]} onClick={() => getPosts}>View More</OutlineBtn>
                </Flex>
            ) : null}
        </>
    )


}