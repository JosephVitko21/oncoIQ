import React, {useEffect, useState} from 'react';

import user from "../auth/user";
import domain from "../utils/site-domain";
import ImageDetailModal from "../components/archive/dialog/ImageDetail";
import {Button, FormControl, FormLabel, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter, faSearch, faSort} from '@fortawesome/free-solid-svg-icons'
import {makeAuthenticatedRequest} from "../utils/middleware";
import {useNavigate} from "react-router-dom";
import Btn from '../components/basic/Btn';

export default function Slides() {
    const [imgList, setImgList] = useState([]);
    const [nextPageToGet, setNextPageToGet] = useState(0);
    const [allShown, setAllShown] = useState(false)

    let navigate = useNavigate();

    const getImages = async () => {
        console.log('getting images')
        let username = user.username
        if (!username) {
            username = await user.getUsername()
        }
        console.log(`username: ${username}`)
        if (!username) {
            navigate('/')
            return
        }

        makeAuthenticatedRequest('GET', `/users/${user.username}/images?page=${nextPageToGet}`)
            .then(data => {
                setImgList(imgList.concat(data))
                if (!data || data.length < 12) {
                    setAllShown(true)
                } else {
                    setNextPageToGet(nextPageToGet + 1)
                }
            });
    }

    useEffect(() => {
        getImages()
    }, [])


    if (!imgList) return <p>Loading...</p>
    // TODO: Separate the search box and button from the filter and sort buttons
    // TODO: Add search, filter, sort, functionality
    return (
        <div className="container text-center" style={{backgroundColor: 'white', minWidth: '100vw', minHeight: '100vh'}}>
            <h3 className='pt-5'>My Slide Archive</h3>
            <p>Click or tap on a histology to view its details</p>
            <br />
            <Row className='search-row'>
                <div className='form-outline'>
                    <FormControl type="search" id="searchForm" placeholder="Search"/>
                </div>
                <Button variant='light'><FontAwesomeIcon icon={faSearch} /></Button>
                <div className='justify-content-end'>
                    <Button variant='light'><FontAwesomeIcon icon={faFilter} /></Button>
                    <Button variant='light'><FontAwesomeIcon icon={faSort} /></Button>
                </div>
            </Row>
            <div className="archive-gallery container d-flex flex-wrap mt-4">
                {imgList.map((datum) => {
                    //console.log("datum:", datum)
                    return (
                        <ImageDetailModal
                            file_id={datum.file_id}
                            image_id={datum.image_id}
                            name={datum.name}
                            date={datum.date}
                            risk_level={datum.risk_level}
                            model={datum.model}
                        />
                    );
                })}
            </div>
            {!allShown ? (
                <div className='flex-grow-1 justify-content-center mt-4'>
                    <Btn colorArr={["white", "primary"]} onClick={getImages}>View More</Btn>;
                </div>
            ) : <></>}
        </div>
    );
}
