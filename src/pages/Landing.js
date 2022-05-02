import React, { useState, useContext, useEffect } from "react";
import { faBrain, faMicroscope, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text, Image, Icon } from '@chakra-ui/react'

import { useAuth } from "../auth";
import slideSample from "./slide-sample.png"

import CaseList from "../components/forum/list/CaseList";
import HowCards from "../components/landing/HowCards";
import OutlineBtn from "../components/basic/OutlineBtn";


export default function Landing() {
    const navigate = useNavigate();
    const [logged] = useAuth();
    const [loginPop, setLoginPop] = useState(false);


    return (
        <>
            <Flex justifyContent="space-between" alignItems='center' h="100vh">
                <Box ml="20vw">
                    {/* linear-gradient(90deg, rgba(120,83,134,1) 0%, rgba(216,173,196,1) 50%) */}
                    <Heading fontSize='80px' bg="linear-gradient(135deg, rgba(168,118,202,1) 0%, rgba(219,126,171,1) 60%)" color="transparent" backgroundClip="text">Pathology</Heading>
                    <Heading fontSize='80px' bg="linear-gradient(135deg, rgba(168,118,202,1) 0%, rgba(219,126,171,1) 60%)" color="transparent" backgroundClip="text">Transformed</Heading>
                    <Heading fontSize="md" mt="20px">Get help diagnosing cases from expert pathologists and artificial intelligence</Heading>
                </Box>

                <Image src={slideSample} objectFit="contain" h="100%" />
            </Flex>
            <Box bg="linear-gradient(0deg, rgba(246,236,250,1) 0%, rgba(255,255,255,1) 100%)" pb="50px">
                <Flex flexDirection="column" alignItems="center" mt="10vh">
                    <Heading fontSize='40px'>How it works</Heading>
                    <Flex justifyContent='space-between' alignItems='center' mt="20px">
                        <HowCards icon={faUsers} title="Community">Collaborate with the global pathology community to solve cases.</HowCards>
                        <HowCards icon={faBrain} title="Intelligence">Take advantage of the latest AI technology to increase productivity.</HowCards>
                        <HowCards icon={faMicroscope} title="Experience">Consult specialists with decades of experience for help with difficult cases.</HowCards>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" alignItems="center" mt="10vh">
                    <Heading mb="20px">Latest Cases</Heading>
                    <CaseList/>
                    <OutlineBtn colorArr={["black", "white"]} onClick={() => navigate('/community')}>View More</OutlineBtn>
                </Flex>
            </Box>
        </>
    )
}